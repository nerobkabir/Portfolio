"use client";
import React, { useState } from "react";
import {
  Mail, Phone, MapPin, MessageCircle,
  Github, Linkedin, ArrowUpRight, Send, Check,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_jjwxlze";
const EMAILJS_TEMPLATE_ID = "template_3ke32uy";
const EMAILJS_PUBLIC_KEY  = "7MC_iQg1tSY_zEnZb";

/* ── Minimal underline input ──────────────────────────────────────── */
function Field({
  label, name, type = "text", placeholder, value, onChange,
}: {
  label: string; name: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] tracking-[0.18em] uppercase font-medium transition-colors duration-200"
          style={{ color: focused ? "rgba(96,165,250,0.8)" : "#FFFFFF" }}>
          {label}
        </label>
        {focused && (
          <span className="text-[9px] text-blue-400/40 tracking-wide">required</span>
        )}
      </div>
      <input
        type={type} name={name} required placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm text-white outline-none pb-2.5"
        style={{
          borderBottom: `1px solid ${focused ? "rgba(96,165,250,0.45)" : "rgba(255,255,255,0.07)"}`,
          transition: "border-color 0.25s",
        }}
      />
    </div>
  );
}

function TextareaField({
  label, name, placeholder, value, onChange,
}: {
  label: string; name: string; placeholder: string;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] tracking-[0.18em] uppercase font-medium transition-colors duration-200"
          style={{ color: focused ? "rgba(96,165,250,0.8)" : "#FFFFFF" }}>
          {label}
        </label>
      </div>
      <textarea
        name={name} required rows={4} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm text-white outline-none pb-2.5 resize-none"
        style={{
          borderBottom: `1px solid ${focused ? "rgba(96,165,250,0.45)" : "rgba(255,255,255,0.07)"}`,
          transition: "border-color 0.25s",
        }}
      />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: {
  icon: React.ElementType; label: string; value: string; href?: string;
}) {
  const inner = (
    <div className="group flex items-center gap-3.5 py-3 transition-all duration-200 hover:translate-x-1">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-white/[0.05]"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <Icon className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 transition-colors duration-200" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-0.5">{label}</p>
        <p className="text-sm text-white transition-colors duration-200 truncate">{value}</p>
      </div>
      {href && (
        <ArrowUpRight className="w-3 h-3 text-white/0 group-hover:text-white/25 transition-all duration-200 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="block border-b border-white/[0.04] last:border-0">{inner}</a>
  ) : (
    <div className="border-b border-white/[0.04] last:border-0">{inner}</div>
  );
}

export default function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"" | "sending" | "success" | "error">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        e.target as HTMLFormElement, EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 6000);
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" className="relative py-6 md:py-7 overflow-hidden">

      {/* ghost text */}
      <div className="absolute right-0 top-1/2 select-none pointer-events-none hidden xl:block"
        style={{
          fontSize: "200px", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1,
          WebkitTextStroke: "1px rgba(255,255,255,0.022)", color: "transparent",
          transform: "translateY(-50%) translateX(14%)",
        }}>
        HELLO
      </div>

      {/* corner lines */}
      <div className="absolute top-12 left-4 md:left-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-px h-10 bg-gradient-to-b from-blue-500/25 to-transparent" />
        <div className="absolute top-0 left-0 w-10 h-px bg-gradient-to-r from-blue-500/25 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

        {/* section label */}
        <div className="flex items-center gap-3 mb-14 md:mb-16">
          <span className="w-6 h-px bg-blue-400/50" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-blue-400/60 font-medium">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 xl:gap-24 items-start">

          {/* ── LEFT ── */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
                <span className="text-white">Let's build</span><br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  together.
                </span>
              </h2>
              <p className="mt-4 text-white text-sm leading-relaxed max-w-xs">
                Open for freelance, collabs & full-time roles.
                Usually respond within a few hours.
              </p>
            </div>

            <div>
              <ContactRow icon={Mail}          label="Email"    value="nerob2308@gmail.com" href="mailto:nerob2308@gmail.com" />
              <ContactRow icon={Phone}         label="Phone"    value="+880 1856 846615"     href="tel:+8801856846615" />
              <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat on WhatsApp"     href="https://wa.me/8801856846615" />
              <ContactRow icon={MapPin}        label="Location" value="Feni, Bangladesh" />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { icon: Github,   label: "GitHub",   href: "https://github.com/nerobkabir" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kabir-hossain123" },
                { icon: Mail,     label: "Email",    href: "mailto:nerob2308@gmail.com" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                  <s.icon className="w-3 h-3" />{s.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-white tracking-[0.12em]">Available for new projects</span>
            </div>
          </div>

          {/* ── RIGHT — FORM ── */}
          <div className="relative">

            {/* subtle top accent line */}
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.016)", border: "1px solid rgba(255,255,255,0.055)" }}>

              {/* form top bar */}
              <div className="flex items-center justify-between px-7 pt-6 pb-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.15)" }}>
                    <Mail className="w-3.5 h-3.5 text-blue-400/70" />
                  </div>
                  <span className="text-sm text-white font-medium">Send a message</span>
                </div>

                {/* status indicator */}
                <div className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  secure
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-7 pt-6 pb-7 space-y-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Name"  name="user_name"  placeholder="John Doe"
                    value={form.name}  onChange={v => setForm({ ...form, name: v })} />
                  <Field label="Email" name="user_email" type="email" placeholder="john@example.com"
                    value={form.email} onChange={v => setForm({ ...form, email: v })} />
                </div>

                {/* Subject */}
                <Field label="Subject" name="subject" placeholder="Project · Collaboration · Freelance"
                  value={form.subject} onChange={v => setForm({ ...form, subject: v })} />

                {/* Message */}
                <TextareaField label="Message" name="message"
                  placeholder={"Hello Kabir,\nI'd love to work together on..."}
                  value={form.message} onChange={v => setForm({ ...form, message: v })} />

                {/* Character hint */}
                {form.message.length > 0 && (
                  <p className="text-[10px] text-white/15 text-right -mt-2">
                    {form.message.length} chars
                  </p>
                )}

                {/* Status */}
                {status === "success" && (
                  <div className="flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm text-green-400/70"
                    style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}>
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Sent! I'll reply within 24 hours.
                  </div>
                )}
                {status === "error" && (
                  <div className="py-3 px-4 rounded-xl text-sm text-red-400/60"
                    style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)" }}>
                    Something went wrong — please try again.
                  </div>
                )}

                {/* Submit row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-250 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
                    style={{
                      background: status === "success"
                        ? "rgba(74,222,128,0.08)"
                        : "rgba(255,255,255,0.05)",
                      border: status === "success"
                        ? "1px solid rgba(74,222,128,0.2)"
                        : "1px solid rgba(255,255,255,0.09)",
                      color: status === "success"
                        ? "rgba(74,222,128,0.75)"
                        : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {/* hover fill */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"
                      style={{ background: "linear-gradient(135deg,rgba(96,165,250,0.07),rgba(167,139,250,0.07))" }} />

                    <span className="relative flex items-center gap-2">
                      {status === "sending" ? (
                        <>
                          <div className="w-3.5 h-3.5 border border-white/20 border-t-white/50 rounded-full animate-spin" />
                          <span className="text-white/40">Sending…</span>
                        </>
                      ) : status === "success" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Message
                          <ArrowUpRight className="w-3 h-3 -ml-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* keyboard hint */}
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/12">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/[0.07] text-white/15" style={{ background: "rgba(255,255,255,0.03)" }}>
                      ⌘
                    </kbd>
                    <kbd className="px-1.5 py-0.5 rounded border border-white/[0.07] text-white/15" style={{ background: "rgba(255,255,255,0.03)" }}>
                      ↵
                    </kbd>
                    <span className="text-white/10 ml-0.5">to send</span>
                  </div>
                </div>
              </form>
            </div>

            {/* bottom glow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.15),rgba(167,139,250,0.15),transparent)" }} />
          </div>

        </div>
      </div>
    </section>
  );
}