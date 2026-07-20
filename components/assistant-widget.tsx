"use client";

import { FormEvent, useRef, useState } from "react";
import { MAX_ASSISTANT_MESSAGE_LENGTH, type AssistantMessage } from "@/lib/assistant-contract";

const appointmentHref = "mailto:caleb@trustedacademy.net?subject=Appointment%20request%20%E2%80%94%20TRUSTed%20Digital%20Architecture";
const suggestedQuestions = [
  "Which service fits my project?",
  "How does your process work?",
  "Request an appointment",
];

const greeting: AssistantMessage = {
  role: "assistant",
  content: "Welcome. I can answer questions about TRUSTed Digital Architecture, help clarify your project, or guide you to the right next step.",
};

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const openAssistant = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSending) return;

    const userMessage: AssistantMessage = { role: "user", content: trimmedContent };
    const conversation = [...messages, userMessage].slice(-10);

    setMessages(conversation);
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      const data = await response.json() as { message?: string; error?: string };

      if (!response.ok || !data.message) {
        throw new Error(data.error || "The assistant could not respond.");
      }

      const assistantMessage: AssistantMessage = { role: "assistant", content: data.message };
      setMessages((current) => [...current, assistantMessage].slice(-10));
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "";
      setError(
        message && message !== "Failed to fetch"
          ? message
          : "The assistant is not available right now. Please email caleb@trustedacademy.net for help.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <div className="assistant-widget">
      {isOpen && (
        <section className="assistant-panel" id="trusted-assistant" role="dialog" aria-label="TRUSTed website assistant">
          <header className="assistant-header">
            <div><span>TRUSTed</span><strong>Digital Architecture Assistant</strong></div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant">×</button>
          </header>

          <div className="assistant-messages" aria-live="polite" aria-busy={isSending}>
            {messages.map((message, index) => (
              <p className={`assistant-message assistant-message-${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === "assistant" ? "TRUSTed" : "You"}</span>
                {message.content}
              </p>
            ))}
            {isSending && <p className="assistant-thinking"><span />Thinking</p>}
          </div>

          {messages.length === 1 && (
            <div className="assistant-suggestions" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => (
                <button type="button" key={question} onClick={() => void sendMessage(question)}>{question}</button>
              ))}
            </div>
          )}

          {error && <p className="assistant-error" role="alert">{error}</p>}

          <form className="assistant-form" onSubmit={submitMessage}>
            <label htmlFor="assistant-message">Ask about services, solutions, or your project</label>
            <div>
              <textarea
                id="assistant-message"
                ref={inputRef}
                value={draft}
                maxLength={MAX_ASSISTANT_MESSAGE_LENGTH}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="How can TRUSTed help my business?"
                rows={2}
              />
              <button type="submit" disabled={isSending || !draft.trim()} aria-label="Send message">→</button>
            </div>
          </form>

          <div className="assistant-disclosure">
            <p>Messages are processed by OpenAI. Do not share sensitive or confidential information.</p>
            <a href={appointmentHref}>Request an appointment by email</a>
            <small>Appointments are not confirmed until a human responds.</small>
          </div>
        </section>
      )}

      <button
        type="button"
        className="assistant-launcher"
        aria-expanded={isOpen}
        aria-controls="trusted-assistant"
        onClick={isOpen ? () => setIsOpen(false) : openAssistant}
      >
        <span aria-hidden="true">✦</span>
        {isOpen ? "Close assistant" : "Ask TRUSTed"}
      </button>
    </div>
  );
}
