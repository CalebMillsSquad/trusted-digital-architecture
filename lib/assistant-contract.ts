export const MAX_ASSISTANT_MESSAGES = 10;
export const MAX_ASSISTANT_MESSAGE_LENGTH = 1200;

export type AssistantRole = "user" | "assistant";
export type AssistantMessage = { role: AssistantRole; content: string };

type ParseResult =
  | { ok: true; messages: AssistantMessage[] }
  | { ok: false; error: string };

export function parseAssistantRequest(value: unknown): ParseResult {
  if (!value || typeof value !== "object" || !("messages" in value)) {
    return { ok: false, error: "A messages array is required." };
  }

  const messages = (value as { messages?: unknown }).messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: "Add a message before sending." };
  }

  if (messages.length > MAX_ASSISTANT_MESSAGES) {
    return { ok: false, error: "This conversation is too long. Start a new chat." };
  }

  const normalized: AssistantMessage[] = [];

  for (const message of messages) {
    if (!message || typeof message !== "object") {
      return { ok: false, error: "One or more messages are invalid." };
    }

    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;

    if (role !== "user" && role !== "assistant") {
      return { ok: false, error: "One or more message roles are invalid." };
    }

    if (typeof content !== "string") {
      return { ok: false, error: "One or more messages are invalid." };
    }

    const trimmedContent = content.trim();

    if (!trimmedContent || trimmedContent.length > MAX_ASSISTANT_MESSAGE_LENGTH) {
      return { ok: false, error: `Messages must be between 1 and ${MAX_ASSISTANT_MESSAGE_LENGTH} characters.` };
    }

    normalized.push({ role, content: trimmedContent });
  }

  if (normalized.at(-1)?.role !== "user") {
    return { ok: false, error: "The latest message must be from the visitor." };
  }

  return { ok: true, messages: normalized };
}
