import { FaWhatsapp, FaTimes, FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Magnetic from "../Magnetic/Magnetic";

export default function WhatsappButton() {
  // Tooltip states
  const [showWaTooltip, setShowWaTooltip] = useState(false);
  const [showAiTooltip, setShowAiTooltip] = useState(false);
  
  // Chat drawer states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to MultiFab Engineering. How can I assist you with your project today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Show AI tooltip after 4 seconds
    const aiTimer = setTimeout(() => {
      if (!chatOpen) setShowAiTooltip(true);
    }, 4000);

    // Show WA tooltip after 6 seconds
    const waTimer = setTimeout(() => {
      setShowWaTooltip(true);
    }, 6000);

    return () => {
      clearTimeout(aiTimer);
      clearTimeout(waTimer);
    };
  }, [chatOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    // Add User Message
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Bot Response
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      const query = text.toLowerCase();

      if (query.includes("quote") || query.includes("price") || query.includes("cost")) {
        replyText = "To get a detailed price estimate, you can use our interactive Spec Calculator on our Products page, or submit a request on our Contact form.";
      } else if (query.includes("cert") || query.includes("iso") || query.includes("quality")) {
        replyText = "MultiFab is ISO 9001:2015 certified. You can inspect our QC workflow and inspection protocols on our Quality page.";
      } else if (query.includes("job") || query.includes("career") || query.includes("work")) {
        replyText = "We are currently hiring CNC operators and QA technicians! Please review open roles and submit your application on our Careers page.";
      } else {
        replyText = "I would be happy to connect you directly with one of our project estimators. Click below to continue on WhatsApp:";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
    }, 1200);
  };

  const quickChips = [
    { label: "Fabrication Quote", query: "How do I request a quote?" },
    { label: "ISO Certifications", query: "Are you ISO certified?" },
    { label: "Open Positions", query: "What careers are open?" }
  ];

  return (
    <div className="fixed right-6 z-[999] flex flex-col items-end">
      
      {/* 1. Chatbot Drawer Panel (Positioned above the AI Button) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-44 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[450px] z-[9999]"
          >
            {/* Chat Header */}
            <div className="bg-slate-900 gold:bg-black p-5 border-b border-white/5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 gold:bg-[#d4af37]/15 border border-orange-500/20 gold:border-[#d4af37]/25 flex items-center justify-center text-lg text-orange-500 gold:text-[#d4af37]">
                  <FaRobot />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm font-outfit text-white">MultiFab Assistant</h4>
                  <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950 gold:bg-black/50 text-sm">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl leading-relaxed text-left ${
                      m.sender === "user"
                        ? "bg-orange-500 gold:bg-[#d4af37] text-white gold:text-slate-950 font-semibold rounded-tr-none"
                        : "bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/10 text-slate-800 dark:text-gray-200 gold:text-gray-100 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p>{m.text}</p>
                    
                    {m.sender === "bot" && m.text.includes("Calculator") && (
                      <Link to="/products" onClick={() => setChatOpen(false)} className="inline-block mt-3 text-xs font-bold text-orange-500 gold:text-[#d4af37] underline">
                        Open Spec Calculator →
                      </Link>
                    )}
                    {m.sender === "bot" && m.text.includes("Quality page") && (
                      <Link to="/quality" onClick={() => setChatOpen(false)} className="inline-block mt-3 text-xs font-bold text-orange-500 gold:text-[#d4af37] underline">
                        View ISO Quality Workflow →
                      </Link>
                    )}
                    {m.sender === "bot" && m.text.includes("Careers page") && (
                      <Link to="/career" onClick={() => setChatOpen(false)} className="inline-block mt-3 text-xs font-bold text-orange-500 gold:text-[#d4af37] underline">
                        Apply on Careers Board →
                      </Link>
                    )}
                    {m.sender === "bot" && m.text.includes("WhatsApp") && (
                      <a href="https://wa.me/919429328956" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-xs font-black text-green-500 underline">
                        <FaWhatsapp /> Chat on WhatsApp →
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-900 gold:bg-[#121212] p-4 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/10 text-slate-400">
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 gold:border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50 dark:bg-slate-950 gold:bg-black/30">
              {quickChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleSendMessage(chip.query)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/15 text-xs font-semibold text-slate-600 dark:text-gray-300 gold:text-gray-300 hover:border-orange-500 gold:hover:border-[#d4af37] transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-4 bg-white dark:bg-slate-900 gold:bg-[#121212] border-t border-slate-100 dark:border-slate-800 gold:border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow px-4 py-2.5 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/20 rounded-xl text-xs md:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <button className="p-3 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white gold:text-slate-950 rounded-xl hover:opacity-95 transition-all text-sm">
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. AI Chatbot Floating Trigger (Positioned at bottom-24 right-6) */}
      <div className="fixed bottom-24 right-6 flex items-center justify-end z-[999]">
        <AnimatePresence>
          {showAiTooltip && !chatOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="mr-3 bg-slate-900 dark:bg-slate-800 gold:bg-[#121212] gold:border gold:border-[#d4af37]/20 text-white text-xs md:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-2xl whitespace-nowrap"
            >
              AI Specs Estimator 🤖
            </motion.div>
          )}
        </AnimatePresence>

        <Magnetic>
          <motion.button
            onClick={() => {
              setChatOpen(!chatOpen);
              setShowAiTooltip(false);
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            animate={chatOpen ? {} : {
              y: [0, -6, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            className="w-16 h-16 rounded-full bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white gold:text-slate-950 flex items-center justify-center text-3xl shadow-2xl transition-all duration-300"
          >
            {chatOpen ? <FaTimes /> : <FaRobot />}
          </motion.button>
        </Magnetic>
      </div>

      {/* 3. Direct WhatsApp Contact Link (Positioned at bottom-6 right-6) */}
      <div className="fixed bottom-6 right-6 flex items-center justify-end z-[999]">
        <AnimatePresence>
          {showWaTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="mr-3 bg-slate-900 dark:bg-slate-800 gold:bg-[#121212] gold:border gold:border-[#d4af37]/20 text-white text-xs md:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-2xl whitespace-nowrap"
            >
              Direct WhatsApp 💬
            </motion.div>
          )}
        </AnimatePresence>

        <Magnetic>
          <motion.a
            href="https://wa.me/919429328956"
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(34, 197, 94, 0.6)"
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 0.5 // staggered vertical bounce effect
            }}
            className="w-16 h-16 rounded-full bg-green-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white gold:text-slate-950 flex items-center justify-center text-3xl shadow-2xl transition-all duration-300"
            onMouseEnter={() => setShowWaTooltip(true)}
            onMouseLeave={() => setShowWaTooltip(false)}
          >
            <FaWhatsapp />
          </motion.a>
        </Magnetic>
      </div>

    </div>
  );
}