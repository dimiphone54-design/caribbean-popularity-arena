"use client";

import { useState } from "react";

const ASSISTANT_RESPONSES: Record<string, string> = {
  nursing: "Best AI for nursing studies: ChatGPT (explanations), Picmonic (visual mnemonics), SimpleNursing (videos), UWorld (practice questions), Nuance DAX (documentation). Try: 'Explain the difference between type 1 and type 2 diabetes' or 'Quiz me on pharmacology'.",
  restaurant: "Starting a restaurant? Use ChatGPT (business planning), Canva (menu design), Square AI (POS), Toast (ordering), Yelp AI (reviews management). Try: 'Create a 3-month business plan for a small restaurant'.",
  doctor: "Top AI for doctors: ChatGPT (clinical notes), Microsoft Copilot (documentation), Gemini (research). Medical disclaimer: these tools assist professionals and are not a replacement for licensed medical advice.",
  programming: "Top AI for coding: Claude, ChatGPT, GitHub Copilot, Cursor, Devin. Try: 'Write a React component for a login form' or 'Debug this Python error'.",
  lawyer: "AI for lawyers: Claude (analysis), ChatGPT (research), Lexis+ AI (case law), CoCounsel (document review). Try: 'Summarize this contract clause' or 'Compare these two statutes'.",
  teacher: "AI for teachers: ChatGPT (lesson plans), Canva (presentations), Khanmigo (tutoring), Quizizz AI (quizzes). Try: 'Create a 45-minute lesson plan on photosynthesis'.",
  designer: "AI for designers: Midjourney (images), Figma AI (layouts), Canva (graphics), DALL·E (concept art). Try: 'Generate a logo concept for a coffee shop called Bean There'.",
  farmer: "AI for farmers: ChatGPT (crop planning), Climate AI (weather), FarmLogs (field mapping). Try: 'Create a crop rotation plan for a 50-acre farm'.",
  writer: "AI for writers: Claude (long-form), ChatGPT (editing), Grammarly (proofreading), Jasper (marketing copy). Try: 'Rewrite this paragraph to be more persuasive'.",
  default: "I can help you find the best AI tools for your profession or studies. Tell me what you do or what you're learning, and I'll recommend the right tools.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("nurs") || lower.includes("nurse")) return ASSISTANT_RESPONSES.nursing;
  if (lower.includes("restaurant") || lower.includes("chef") || lower.includes("cook")) return ASSISTANT_RESPONSES.restaurant;
  if (lower.includes("doctor") || lower.includes("medical") || lower.includes("physician")) return ASSISTANT_RESPONSES.doctor;
  if (lower.includes("program") || lower.includes("code") || lower.includes("developer") || lower.includes("engineer")) return ASSISTANT_RESPONSES.programming;
  if (lower.includes("law") || lower.includes("lawyer") || lower.includes("attorney")) return ASSISTANT_RESPONSES.lawyer;
  if (lower.includes("teach") || lower.includes("teacher") || lower.includes("educat")) return ASSISTANT_RESPONSES.teacher;
  if (lower.includes("design") || lower.includes("artist") || lower.includes("creative")) return ASSISTANT_RESPONSES.designer;
  if (lower.includes("farm") || lower.includes("agri")) return ASSISTANT_RESPONSES.farmer;
  if (lower.includes("writ") || lower.includes("author") || lower.includes("content")) return ASSISTANT_RESPONSES.writer;
  return ASSISTANT_RESPONSES.default;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input.trim() };
    const response = getResponse(input);
    setMessages((prev) => [...prev, userMsg, { role: "assistant", text: response }]);
    setInput("");
  };

  return (
    <section className="rounded-3xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🤖</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">AI Assistant</p>
          <h2 className="text-lg font-semibold text-white">What do you need help with today?</h2>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`rounded-2xl px-4 py-3 text-sm leading-6 ${msg.role === "user" ? "ml-8 bg-cyan-300/10 text-white" : "mr-8 bg-white/[0.04] text-white/80"}`}>
              {msg.text}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="I'm a nursing student..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-300/40"
        />
        <button
          type="button"
          onClick={handleSend}
          className="rounded-xl bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Ask
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {["I'm a nursing student", "I want to start a restaurant", "Best AI for coding", "I'm a teacher"].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => { setInput(suggestion); }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/50 transition hover:text-white/80"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}
