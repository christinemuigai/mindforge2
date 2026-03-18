import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiX, FiImage, FiSmile } from "react-icons/fi";
import { BsStars, BsShieldCheck } from "react-icons/bs";
import { MdOutlineChildCare } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const commonPrompts = [
    { icon: "🤰", text: "I'm feeling dizzy and weak during pregnancy" },
    { icon: "👶", text: "My baby has a mild fever, what should I do?" },
    { icon: "🍎", text: "What are safe foods during pregnancy?" },
    { icon: "💆", text: "How can I relieve back pain after childbirth?" },
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  const handleSend = async () => {
    if (!message.trim() && !image) return;

    const userMsg = { sender: "user", text: message };
    if (imagePreview) userMsg.image = imagePreview;
    setChatHistory((prev) => [...prev, userMsg]);

    const currentMessage = message;
    setMessage("");
    setIsTyping(true);

    const formData = new FormData();
    formData.append("message", currentMessage);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/chat-with-image",
        { method: "POST", body: formData }
      );
      const data = await response.json();

      if (data.reply) {
        setChatHistory((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else if (data.error) {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: `⚠️ ${data.error}` },
        ]);
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Could not reach the server. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
      setImage(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatBotText = (text) => {
    // Simple markdown-like formatting
    return text.split("\n").map((line, i) => {
      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        return (
          <div key={i} className="flex gap-2 ml-2 mt-1">
            <span className="text-purple-400 shrink-0">•</span>
            <span dangerouslySetInnerHTML={{ __html: line.replace(/^[-•]\s*/, "") }} />
          </div>
        );
      }
      // Numbered items
      const numMatch = line.trim().match(/^(\d+)\.\s(.*)$/);
      if (numMatch) {
        return (
          <div key={i} className="flex gap-2 ml-2 mt-1">
            <span className="text-purple-400 font-semibold shrink-0">{numMatch[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: numMatch[2] }} />
          </div>
        );
      }
      return line ? (
        <p key={i} className="mt-1" dangerouslySetInnerHTML={{ __html: line }} />
      ) : (
        <br key={i} />
      );
    });
  };

  const hasMessages = chatHistory.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-b from-slate-50 to-purple-50/30">
      <p className="text-xl mt-0.5 text-center text-slate-400 mt-3">
            ⚠️ Not medical advice. For health issues visit a licensed clinic.
          </p>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          /* ─── Empty State ─── */
          <div className="flex flex-col items-center justify-center h-full px-6 pb-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-200 mb-6"
            >
              <MdOutlineChildCare className="text-white text-4xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl font-bold text-slate-800 mb-2"
            >
              How can I help you today?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-slate-500 text-center max-w-md mb-10"
            >
              Ask me anything about maternal health, pregnancy, or child care.
              I'm here to help you and your little one.
            </motion.p>
            {/* Disclaimer */}
            
            {/* Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
              {commonPrompts.map((prompt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => {
                    setMessage(prompt.text);
                    inputRef.current?.focus();
                  }}
                  className="group flex items-start gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-4 text-left text-sm text-slate-700
                             hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md hover:shadow-purple-100/50
                             transition-all duration-200 cursor-pointer"
                >
                  <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform">{prompt.icon}</span>
                  <span className="leading-relaxed">{prompt.text}</span>
                </motion.button>
              ))}
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 mt-10 text-xs text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <BsStars className="text-purple-400" /> Powered by AI
              </span>
              <span className="flex items-center gap-1.5">
                <BsShieldCheck className="text-green-400" /> Private & Secure
              </span>
            </motion.div>
          </div>
        ) : (
          /* ─── Messages ─── */
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
            <AnimatePresence initial={false}>
              {chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
                >
                  {/* Bot Avatar */}
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mr-3 mt-1 shrink-0 shadow-sm">
                      <MdOutlineChildCare className="text-white text-sm" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl rounded-br-md shadow-md shadow-purple-200/50"
                        : "bg-white text-slate-700 rounded-2xl rounded-bl-md shadow-sm border border-slate-100"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Upload"
                        className="rounded-xl mb-2 max-w-full max-h-48 object-cover"
                      />
                    )}
                    {msg.text && (
                      <div>
                        {msg.sender === "bot" ? formatBotText(msg.text) : msg.text}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start mb-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mr-3 mt-1 shrink-0 shadow-sm">
                  <MdOutlineChildCare className="text-white text-sm" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* ─── Input Area ─── */}
      <div className="border-t border-slate-200/80 bg-white/80 backdrop-blur-lg px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {/* Image Preview */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-xl p-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{image?.name}</p>
                    <p className="text-xs text-slate-400">Ready to send</p>
                  </div>
                  <button
                    onClick={removeImage}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Row */}
          <div className="flex items-end gap-2">
            <div className="flex-1 flex items-end bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 
                            focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 
                            transition-all duration-200">
              <textarea
                ref={inputRef}
                rows={1}
                placeholder="Ask about maternal or child health…"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  // Auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm resize-none leading-relaxed"
                style={{ maxHeight: "120px" }}
              />
              <div className="flex items-center gap-1 ml-2 shrink-0">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                  title="Attach image"
                >
                  <FiImage size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={(!message.trim() && !image) || isTyping}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white
                         hover:from-purple-700 hover:to-purple-800 
                         disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed
                         shadow-md shadow-purple-200/50 hover:shadow-lg hover:shadow-purple-300/50
                         disabled:shadow-none
                         transition-all duration-200 active:scale-95 shrink-0"
            >
              <FiSend size={18} />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {/* Footer text */}
          <p className="text-center text-xs text-slate-400 mt-3">
            ⚠️ Not medical advice. For health issues visit a licensed clinic.
          </p>
        </div>
      </div>
    </div>
  );
}
