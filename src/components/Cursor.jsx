import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 22 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track coordinates for trail generation
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);

      // Fetch dynamic colors based on active theme
      const htmlEl = document.documentElement;
      let particleColor = "rgba(249, 115, 22, 0.7)"; // orange default
      if (htmlEl.classList.contains("gold")) {
        particleColor = "rgba(212, 175, 55, 0.8)"; // gold
      } else if (htmlEl.classList.contains("light")) {
        particleColor = "rgba(59, 130, 246, 0.7)"; // blue
      }

      // Generate spark trail based on speed/distance moved
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 3) {
        // Create 1-2 sparks per step
        for (let i = 0; i < Math.min(3, Math.floor(distance / 6) + 1); i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 3.5 + 1.5,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.2, // slightly drift upward
            alpha: 1.0,
            color: particleColor,
            decay: Math.random() * 0.025 + 0.015
          });
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    // Click burst explosion sparks
    const handleMouseDown = (e) => {
      const htmlEl = document.documentElement;
      let burstColor = "rgba(249, 115, 22, 0.9)"; // orange
      if (htmlEl.classList.contains("gold")) {
        burstColor = "rgba(212, 175, 55, 0.95)"; // gold
      } else if (htmlEl.classList.contains("light")) {
        burstColor = "rgba(59, 130, 246, 0.9)"; // blue
      }

      const sparkCount = 18;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 4 + 2.5;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          color: burstColor,
          decay: Math.random() * 0.03 + 0.02
        });
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Global Hover Listener
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target && (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest("select") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.classList.contains("cursor-pointer") ||
          target.closest(".cursor-pointer")
        );
      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Canvas Particles loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hidden, mouseX, mouseY]);

  // Dynamic values based on active theme
  const getThemeColors = () => {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains("gold")) {
      return { accent: "#d4af37", rgb: "212, 175, 55" };
    }
    if (htmlEl.classList.contains("light")) {
      return { accent: "#3b82f6", rgb: "59, 130, 246" };
    }
    return { accent: "#fa7316", rgb: "249, 115, 22" }; // Orange dark default
  };

  const colors = getThemeColors();

  if (hidden) return null;

  return (
    <>
      {/* 1. Full-screen Transparent Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[999999]"
      />

      {/* 2. Outer Rotating Halo Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: hovered ? "60px" : "36px",
          height: hovered ? "60px" : "36px",
          borderRadius: "50%",
          border: `1.5px solid ${colors.accent}`,
          backgroundColor: hovered ? `rgba(${colors.rgb}, 0.08)` : "rgba(0, 0, 0, 0)",
          pointerEvents: "none",
          zIndex: 999998,
          backdropFilter: hovered ? "blur(3px)" : "none",
          boxShadow: hovered ? `0 0 16px ${colors.accent}` : "none",
        }}
        animate={{
          scale: hovered ? 1.15 : 1,
          rotate: hovered ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      />

      {/* 3. Secondary Outer Ring (Concentric, counter-rotates on hover) */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: hovered ? "70px" : "44px",
          height: hovered ? "70px" : "44px",
          borderRadius: "50%",
          border: `1px dashed ${colors.accent}`,
          opacity: hovered ? 0.6 : 0,
          pointerEvents: "none",
          zIndex: 999997,
        }}
        animate={{
          rotate: hovered ? -360 : 0,
        }}
        transition={{
          rotate: { repeat: hovered ? Infinity : 0, duration: 8, ease: "linear" },
          default: { type: "spring", stiffness: 220, damping: 20 }
        }}
      />

      {/* 4. Inner solid Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          backgroundColor: colors.accent,
          boxShadow: `0 0 8px ${colors.accent}`,
          pointerEvents: "none",
          zIndex: 999999,
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}