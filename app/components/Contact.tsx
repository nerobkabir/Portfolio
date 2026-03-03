"use client";
import React, { useState } from "react";
import {
  Mail, Phone, MapPin, MessageCircle, Github, Linkedin,
  Sparkles, ArrowUpRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_jjwxlze";
const EMAILJS_TEMPLATE_ID = "template_3ke32uy";
const EMAILJS_PUBLIC_KEY = "7MC_iQg1tSY_zEnZb";

const contactMethods = [
  { icon: Mail, title: "Email", value: "nerob2308@gmail.com", link: "mailto:nerob2308@gmail.com", color: "blue", gradient: "from-blue-500 to-blue-600" },
  { icon: Phone, title: "Phone", value: "+880 1856 846615", link: "tel:+8801856846615", color: "purple", gradient: "from-purple-500 to-purple-600" },
  { icon: MessageCircle, title: "WhatsApp", value: "+880 1856 846615", link: "https://wa.me/8801856846615", color: "green", gradient: "from-green-500 to-green-600" },
  { icon: MapPin, title: "Location", value: "Feni, Bangladesh", link: undefined, color: "pink", gradient: "from-pink-500 to-pink-600" },
];

const quickSocials = [
  { icon: Github, label: "GitHub", link: "https://github.com/nerobkabir", color: "gray", hover: "hover:bg-gray-800" },
  { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/kabir-hossain123", color: "blue", hover: "hover:bg-blue-700" },
  { icon: MessageCircle, label: "Messenger", link: "https://m.me/...", color: "blue", hover: "hover:bg-blue-600" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.target as HTMLFormElement, EMAILJS_PUBLIC_KEY);
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus(""), 5000);
    } catch (error) {
      console.error("Email send failed:", error);
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-float opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[90px] animate-float-delayed opacity-30"></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-pink-500/10 rounded-full blur-[80px] animate-float-slow opacity-25"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
            <div className="relative px-8 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-blue-400 font-medium text-sm md:text-base flex items-center gap-2">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                CONTACT
              </span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient bg-[length:200%_200%]">Connect</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span>
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Got a project in mind? Let's turn your ideas into reality!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
          {/* Left – Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 p-5 transition-all duration-500 hover:shadow-2xl overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className={`w-6 h-6 text-${method.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1">{method.title}</p>
                      <p className={`text-white text-base font-medium group-hover:text-${method.color}-400 transition-colors duration-300`}>
                        {method.value}
                      </p>
                    </div>
                    {method.link && (
                      <ArrowUpRight className={`w-5 h-5 text-${method.color}-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`} />
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Connect */}
            <div className="bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Quick Connect
              </h3>
              <p className="text-gray-400 text-sm mb-6">Prefer direct messaging? Connect with me on these platforms:</p>
              <div className="flex gap-4">
                {quickSocials.map((social, index) => (
                  <a key={index} href={social.link} target="_blank" rel="noopener noreferrer"
                    className={`group relative flex-1 min-w-[100px] p-4 rounded-xl border border-white/10 ${social.hover} transition-all duration-300 hover:scale-105`}
                  >
                    <div className="relative flex flex-col items-center gap-2">
                      <social.icon className={`w-6 h-6 text-${social.color}-400 group-hover:text-white transition-colors duration-300`} />
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">{social.label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 font-medium">Response Time</span>
                <span className="text-sm text-gray-400">Usually within hours</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full w-3/4 animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-sm mt-3">⚡ Super responsive for project inquiries and collaborations</p>
            </div>
          </div>

          {/* Right – Form */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-blue-500/10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              <h3 className="text-2xl font-bold text-white mb-2">Send me a message</h3>
              <p className="text-gray-400 mb-8">Fill out the form below and I'll get back to you soon</p>

              <form id="contact-form" onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                      Your Name
                    </label>
                    <input type="text" name="user_name" required placeholder="John Doe" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                      Your Email
                    </label>
                    <input type="email" name="user_email" required placeholder="john@example.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></div>
                    Subject
                  </label>
                  <input type="text" name="subject" required placeholder="Project Inquiry / Collaboration" value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-pink-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    Message
                  </label>
                  <textarea rows={5} name="message" required placeholder="Hello Kabir, I'd like to discuss a project with you..." value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-green-500 transition-all duration-300 placeholder:text-gray-500 focus:bg-white/10 resize-none"
                  ></textarea>
                </div>

                {formStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-green-400 font-medium">Message sent successfully!</p>
                        <p className="text-green-400/70 text-sm">I'll get back to you within 24 hours</p>
                      </div>
                    </div>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 text-sm">✕</span>
                      </div>
                      <div>
                        <p className="text-red-400 font-medium">Failed to send message</p>
                        <p className="text-red-400/70 text-sm">Please try again or contact me directly</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 group relative overflow-hidden ${formStatus === "sending" ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02]"}`}
                >
                  {formStatus === "sending" ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5" />
                        Send Message
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </>
                  )}
                </button>

                <p className="text-gray-500 text-sm text-center">
                  Your information is secure. I respect your privacy and won't share your details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}