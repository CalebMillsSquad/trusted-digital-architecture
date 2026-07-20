import { describe, expect, it } from "vitest";
import {
  MAX_ASSISTANT_MESSAGE_LENGTH,
  MAX_ASSISTANT_MESSAGES,
  parseAssistantRequest,
} from "../lib/assistant-contract";
import { ASSISTANT_INSTRUCTIONS, ASSISTANT_MODEL } from "../lib/assistant-knowledge";

describe("website assistant contract", () => {
  it("accepts and normalizes a valid conversation", () => {
    const result = parseAssistantRequest({
      messages: [
        { role: "assistant", content: " Welcome " },
        { role: "user", content: " Which service fits my project? " },
      ],
    });

    expect(result).toEqual({
      ok: true,
      messages: [
        { role: "assistant", content: "Welcome" },
        { role: "user", content: "Which service fits my project?" },
      ],
    });
  });

  it("rejects malformed, oversized, and assistant-ended conversations", () => {
    expect(parseAssistantRequest({ messages: [] }).ok).toBe(false);
    expect(parseAssistantRequest({ messages: [{ role: "user", content: "x".repeat(MAX_ASSISTANT_MESSAGE_LENGTH + 1) }] }).ok).toBe(false);
    expect(parseAssistantRequest({ messages: Array.from({ length: MAX_ASSISTANT_MESSAGES + 1 }, () => ({ role: "user", content: "Hello" })) }).ok).toBe(false);
    expect(parseAssistantRequest({ messages: [{ role: "assistant", content: "Hello" }] }).ok).toBe(false);
  });

  it("grounds the model and preserves appointment and claim guardrails", () => {
    expect(ASSISTANT_MODEL).toBe("gpt-5.6-terra");
    expect(ASSISTANT_INSTRUCTIONS).toContain("Do not claim an appointment is scheduled or confirmed");
    expect(ASSISTANT_INSTRUCTIONS).toContain("Do not invent pricing");
    expect(ASSISTANT_INSTRUCTIONS).toContain("caleb@trustedacademy.net");
    expect(ASSISTANT_INSTRUCTIONS).toContain("Website Architecture");
  });
});
