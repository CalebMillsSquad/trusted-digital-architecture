import type { Metadata } from "next";
import { AssistantWidget } from "@/components/assistant-widget";
import "./globals.css";
import "./expanded.css";

export const metadata: Metadata = {
  title: "TRUSTed Digital Architecture | Designing the Digital Foundation of Modern Business",
  description: "Premium digital architecture for websites, software, AI systems, platforms, automation, and managed digital operations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
