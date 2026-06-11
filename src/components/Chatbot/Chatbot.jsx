import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser, FaCompass } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to MultiFab Engineering. I am your virtual assistant. How can I assist you with custom fabrications, products, or career applications today?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Check if we are on an admin page - don't render chatbot there
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(window.location.pathname.startsWith("/admin"));
    };
    checkAdmin();
    // Watch path changes
    const interval = setInterval(checkAdmin, 500);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (isAdmin) return null;

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Generate response after a short delay
    setTimeout(() => {
      const response = generateBotResponse(userMsg);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 800);
  };

  const selectOption = (optText) => {
    setMessages((prev) => [...prev, { sender: "user", text: optText }]);
    setTimeout(() => {
      const response = generateBotResponse(optText);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 700);
  };

  const generateBotResponse = (text) => {
    const q = text.toLowerCase();

    if (q.includes("product") || q.includes("valve") || q.includes("gauge") || q.includes("meter") || q.includes("catalog")) {
      return "MultiFab specializes in high-precision, certified components: Control Valves (precise regulation), Analog Pressure Gauges (chemical-resistant dials), and Electromagnetic Flow Meters. You can view specifications and 3D models in our Products tab!";
    }
    if (q.includes("spec") || q.includes("weight") || q.includes("calculator") || q.includes("thickness") || q.includes("dimension")) {
      return "Our 'Technical Specs & Weight Calculator' dynamically models workpiece weights, lead times, and fabrication costs based on alloy grades (Stainless Steel, Carbon Steel, Brass, Titanium) and dimensions (length, width, thickness). You can request direct quotes using these specs.";
    }
    if (q.includes("career") || q.includes("job") || q.includes("hiring") || q.includes("apply") || q.includes("resume") || q.includes("work")) {
      return "We are actively recruiting CNC Operators, QA Inspectors, and Senior Design Engineers. Visit our Careers page to upload your resume and submit your application details directly to our HR portal.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("location") || q.includes("address")) {
      return "You can reach MultiFab Engineering via email at contact@multifab.com or call our offices. Alternatively, drop a message on our Contact page and our engineering sales team will reach out within 24 hours.";
    }
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("help")) {
      return "Hello! I can help you with: 1) Product specs & catalogs, 2) Technical Weight Estimator features, 3) Uploading resumes for job openings, or 4) Reaching our contact sales team. Let me know what you'd like to explore!";
    }

    return "Thank you for the message. For customized engineering consultations or formal bulk proposals, please leave a brief message on our Contact page or use the Technical Estimator quote trigger. Is there anything else I can help you with?";
  };

  const quickReplies = [
    "View Product Catalog",
    "How does the Calculator work?",
    "Check Careers / Openings",
    "Contact Sales Office"
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-inter flex flex-col items-start">
      {/* Chat window panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            className="w-[340px] md:w-[380px] h-[480px] bg-slate-900/90 border border-white/5 gold:border-[#d4af37]/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between backdrop-blur-xl mb-4"
          >
            {/* Header */}
            <div className="bg-slate-950 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-orange-500/10 text-orange-400 gold:bg-[#d4af37]/10 gold:text-[#d4af37] rounded-xl text-lg animate-pulse">
                  <FaRobot />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white font-outfit">MultiFab Assistant</h3>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    AI Agent Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close Chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span
                    className={`p-2 rounded-xl text-xs shrink-0 ${
                      msg.sender === "user"
                        ? "bg-orange-500/10 text-orange-400 gold:bg-[#d4af37]/10 gold:text-[#d4af37]"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                  </span>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white"
                        : "bg-slate-950/60 border border-white/5 text-slate-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Options */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => selectOption(reply)}
                    className="text-[10px] bg-slate-950/80 hover:bg-slate-950 text-slate-400 hover:text-orange-400 gold:hover:text-[#d4af37] border border-white/5 rounded-full px-3 py-1.5 transition-all flex items-center gap-1"
                  >
                    <FaCompass className="text-[9px]" />
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Form Input Footer */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-slate-950 border-t border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Ask about products, specs, careers..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow px-4 py-2 bg-slate-900/60 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-xs placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white rounded-xl hover:opacity-95 transition-all disabled:opacity-30 active:scale-95"
                aria-label="Send Message"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white rounded-full shadow-2xl shadow-orange-500/20 gold:shadow-[#d4af37]/20 flex items-center justify-center hover:opacity-95 transition-all text-xl"
        title="Open Support Chat"
        aria-label="Toggle Chatbot Window"
      >
        <FaComments className="animate-pulse" />
      </motion.button>
    </div>
  );
}
