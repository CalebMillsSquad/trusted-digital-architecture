import { createHash } from "node:crypto";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ASSISTANT_INSTRUCTIONS, ASSISTANT_MODEL } from "@/lib/assistant-knowledge";
import { parseAssistantRequest } from "@/lib/assistant-contract";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_REQUESTS = 12;

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();

function getVisitorId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const rawIdentifier = forwardedFor || request.headers.get("x-real-ip") || "local-visitor";
  return createHash("sha256").update(rawIdentifier).digest("hex").slice(0, 64);
}

function checkRateLimit(visitorId: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(visitorId);

  if (!existing || existing.resetAt <= now) {
    if (rateLimitStore.size > 1_000) {
      for (const [key, entry] of rateLimitStore) {
        if (entry.resetAt <= now) rateLimitStore.delete(key);
      }
    }

    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(visitorId, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS - 1, resetAt };
  }

  if (existing.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_REQUESTS - existing.count, resetAt: existing.resetAt };
}

function responseHeaders(rateLimit: ReturnType<typeof checkRateLimit>) {
  return {
    "Cache-Control": "no-store",
    "X-RateLimit-Limit": String(RATE_LIMIT_REQUESTS),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
  };
}

export async function POST(request: Request) {
  const visitorId = getVisitorId(request);
  const rateLimit = checkRateLimit(visitorId);
  const headers = responseHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "The assistant has received several requests. Please wait a few minutes and try again." },
      { status: 429, headers },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "That request is too large." }, { status: 413, headers });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The request could not be read." }, { status: 400, headers });
  }

  const parsed = parseAssistantRequest(body);

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "The assistant is not configured yet. Please email caleb@trustedacademy.net." },
      { status: 503, headers },
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: ASSISTANT_MODEL,
      instructions: ASSISTANT_INSTRUCTIONS,
      input: parsed.messages,
      max_output_tokens: 350,
      reasoning: { effort: "none" },
      safety_identifier: visitorId,
      store: false,
      text: { verbosity: "low" },
    });

    const message = response.output_text.trim();

    if (!message) {
      return NextResponse.json(
        { error: "The assistant could not prepare a reply. Please try again." },
        { status: 502, headers },
      );
    }

    return NextResponse.json({ message }, { headers });
  } catch (error) {
    const isQuotaError = error instanceof OpenAI.APIError && error.code === "insufficient_quota";
    const isRateLimitError = error instanceof OpenAI.APIError && error.status === 429 && !isQuotaError;
    const status = isQuotaError ? 503 : isRateLimitError ? 429 : 502;
    const message = isQuotaError
      ? "The assistant is not available yet. Please email caleb@trustedacademy.net for help."
      : isRateLimitError
        ? "The assistant is temporarily busy. Please wait a moment and try again."
        : "The assistant is unavailable right now. Please email caleb@trustedacademy.net.";

    return NextResponse.json({ error: message }, { status, headers });
  }
}
