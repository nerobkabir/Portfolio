"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, Bot } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are an AI assistant embedded inside Kabir Hossain's developer portfolio website.
Your role is to act as a smart, professional, and friendly portfolio guide.

🎯 Your Goals:
- Help visitors understand Kabir's skills, projects, and experience
- Guide recruiters to hire him
- Answer questions clearly and professionally
- Keep responses short, engaging, and helpful (max 3-5 sentences)

👨‍💻 About Kabir:
- Name: Kabir Hossain
- Location: Feni, Bangladesh
- Role: Full Stack Web Developer
- Tech Stack: JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, Firebase, Tailwind CSS, TypeScript
- Competitive Programming: Codeforces (rating 1074, 179 solved), LeetCode (36 solved), CodeChef (rating 1064)
- Portfolio: https://modern-portfolio-phi-flame.vercel.app/
- GitHub: https://github.com/nerobkabir
- Email: nerob2308@gmail.com
- Phone: +880 1856 846615
- WhatsApp: https://wa.me/8801856846615
- LinkedIn: https://www.linkedin.com/in/kabir-hossain123

🚀 Projects (8 total):
1. DevHire — AI-powered developer hiring platform. Next.js 15, TypeScript, Node.js, MongoDB, Google Gemini AI, Recharts. Live: https://devhire-client-app.vercel.app
2. LocalChefBazaar — MERN marketplace for home-cooked meals with Stripe payments. Live: https://localchefbazaar-31da8.web.app
3. NexChat — Real-time chat app with Socket.io, typing indicators, read receipts. Live: https://nexchat-frontend-six.vercel.app
4. GreenGadgets Hub — Eco-friendly e-commerce with CO₂ savings tracker. Live: https://green-gadgets-hub.vercel.app
5. Artify — Creative artwork showcase platform with Firebase auth. Live: https://bejewelled-panda-60b4b5.netlify.app
6. Skillswap — Skill sharing & learning community platform. Live: https://harmonious-paprenjak-77441a.netlify.app
7. CareNext — Childcare & elderly care booking with email invoices. Live: https://care-nest-five.vercel.app
8. Hero Apps — App discovery platform with install tracking. Live: https://candid-monstera-42301f.netlify.app

💡 Instructions:
- Always respond in a professional and friendly tone
- Keep answers concise (max 3-5 sentences)
- If asked about projects → explain clearly with value and impact
- If asked "Why hire Kabir?" → highlight skills, dedication, learning mindset, and AI project experience
- If asked for contact → provide email nerob2308@gmail.com and encourage reaching out
- If asked unrelated questions → politely redirect to portfolio topics
- Never make up fake experience or incorrect info
- Use emojis sparingly and professionally
- When mentioning links, format them cleanly`;

const QUICK_PROMPTS = [
  "Why hire Kabir?",
  "Show me his projects",
  "What's his tech stack?",
  "How to contact him?",
];

export default function PortfolioChat() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Hi! 👋 I'm Kabir's AI portfolio assistant. I can tell you about his projects, skills, and experience. How can I help you today?",
    },
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [hasNew,   setHasNew]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text ?? "Sorry, I couldn't get a response. Please try again.";
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: reply };
      setMessages(prev => [...prev, assistantMsg]);
      if (!open) setHasNew(true);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Connection error. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      <style>{`
        @keyframes chatIn   { from{opacity:0;transform:translateY(20px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes msgIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        .chat-window { animation: chatIn .3s cubic-bezier(.16,1,.3,1) forwards; }
        .msg-item    { animation: msgIn .25s cubic-bezier(.16,1,.3,1) forwards; }
        .typing-dot  { animation: bounce .9s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: .15s; }
        .typing-dot:nth-child(3) { animation-delay: .3s; }
        .chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(99,102,241,.3) transparent; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,.3); border-radius: 4px; }
      `}</style>

      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          boxShadow: "0 0 25px rgba(99,102,241,0.5), 0 8px 24px rgba(0,0,0,0.3)",
          display: open ? "none" : "flex",
        }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {hasNew && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-black"
            style={{ animation:"pulse 1.5s ease-in-out infinite" }} />
        )}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div
          className="chat-window fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden border border-white/[0.08]"
          style={{
            width: "min(380px, calc(100vw - 24px))",
            height: "min(560px, calc(100vh - 48px))",
            background: "#080b12",
            boxShadow: "0 0 0 1px rgba(99,102,241,0.2), 0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0 border-b border-white/[0.07]"
            style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1))" }}>
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080b12]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white/90 leading-none mb-0.5">Kabir's AI Assistant</p>
              <p className="text-[10px] text-emerald-400">Online · Ask me anything</p>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.08]">
              <X className="w-4 h-4 text-white/40 hover:text-white/70" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll">
            {messages.map((msg) => (
              <div key={msg.id} className="msg-item flex gap-2.5"
                style={{ flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                  style={msg.role === "user"
                    ? { background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", borderBottomRightRadius:4 }
                    : { background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.82)", borderBottomLeftRadius:4, border:"1px solid rgba(255,255,255,0.06)" }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="msg-item flex gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="rounded-2xl px-4 py-3 flex gap-1.5 items-center"
                  style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.06)", borderBottomLeftRadius:4 }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full block"
                      style={{ background:"rgba(99,102,241,0.7)" }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts — shown only when there's just the intro */}
          {messages.length === 1 && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {QUICK_PROMPTS.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-indigo-500/30 text-indigo-300/80 hover:bg-indigo-500/15 hover:text-indigo-300 transition-all duration-200"
                  style={{ background:"rgba(99,102,241,0.07)" }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0 border-t border-white/[0.07]"
            style={{ background:"rgba(255,255,255,0.02)" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about skills, projects…"
              disabled={loading}
              className="flex-1 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200"
              style={{
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.08)",
                color:"rgba(255,255,255,0.8)",
                caretColor:"#6366f1",
              }}
              onFocus={e => { e.target.style.borderColor = "rgba(99,102,241,0.5)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              style={{
                background: input.trim() ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.06)",
              }}>
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}