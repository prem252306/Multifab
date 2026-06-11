import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo({ className = "", showText = true }) {
  const [isHovered, setIsHovered] = useState(false);

  // Vertices of the outer hexagon for rendering mechanical nodes
  const nodes = [
    { cx: 50, cy: 10 },
    { cx: 84.6, cy: 30 },
    { cx: 84.6, cy: 70 },
    { cx: 50, cy: 90 },
    { cx: 15.4, cy: 70 },
    { cx: 15.4, cy: 30 }
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-3 select-none cursor-pointer ${className}`}
    >
      {/* Animated SVG Graphic */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-11 h-11 md:w-12 md:h-12 overflow-visible"
      >
        {/* Sonar Ripple Wave (Radiating outwards from center) */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          stroke="currentColor"
          strokeWidth="3"
          className="text-orange-500 gold:text-[#d4af37] light:text-slate-800"
          animate={{
            scale: [1, 4.2],
            opacity: [0.8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeOut"
          }}
        />

        {/* Second offset ripple wave for layered depth */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-orange-400 gold:text-[#bf953f] light:text-slate-500"
          animate={{
            scale: [1, 3],
            opacity: [0.6, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            delay: 0.9,
            ease: "easeOut"
          }}
        />

        {/* Group 1: Outer Hexagon + Vertex Bolts (Rotates clockwise, speeds up on hover) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 4.5 : 22, // speeds up 5x on hover
            ease: "linear"
          }}
          style={{ originX: "50px", originY: "50px" }}
        >
          {/* Hexagon Outline */}
          <motion.path
            d="M50 10 L84.6 30 L84.6 70 L50 90 L15.4 70 L15.4 30 Z"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-orange-500 gold:text-[#d4af37] light:text-slate-800"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Hexagonal joint bolt circles */}
          {nodes.map((node, idx) => (
            <motion.circle
              key={idx}
              cx={node.cx}
              cy={node.cy}
              r={isHovered ? 5 : 3.5}
              fill="currentColor"
              className="text-slate-900 dark:text-slate-950 gold:text-black border border-white"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                color: isHovered ? "var(--accent)" : "currentColor"
              }}
              animate={{
                scale: isHovered ? [1, 1.25, 1] : 1
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: idx * 0.15
              }}
            />
          ))}
        </motion.g>

        {/* Group 2: Inner Diamond (Rotates counter-clockwise on hover) */}
        <motion.g
          animate={isHovered ? { rotate: -360 } : { rotate: 0 }}
          transition={{
            repeat: isHovered ? Infinity : 0,
            duration: 8,
            ease: "linear"
          }}
          style={{ originX: "50px", originY: "50px" }}
        >
          <motion.path
            d="M50 30 L70 50 L50 70 L30 50 Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            className="text-slate-300 dark:text-white gold:text-[#bf953f] light:text-slate-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Central pulsing core dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="6.5"
          fill="currentColor"
          className="text-orange-500 gold:text-[#d4af37] light:text-slate-800"
          animate={{
            scale: isHovered ? [1, 1.4, 1] : 1
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Brand Text Column */}
      {showText && (
        <div className="flex flex-col font-outfit text-left">
          <motion.span
            animate={
              isHovered
                ? {
                    textShadow: [
                      "0 0 0px rgba(212,175,55,0)",
                      "0 0 10px rgba(249,115,22,0.6)",
                      "0 0 0px rgba(212,175,55,0)"
                    ]
                  }
                : {}
            }
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="text-xl md:text-2xl font-black tracking-tight text-white dark:text-white gold:text-[#d4af37] light:text-slate-900 leading-none"
          >
            MULTIFAB
          </motion.span>
          <motion.span
            animate={
              isHovered
                ? {
                    letterSpacing: ["0.25em", "0.3em", "0.25em"]
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              ease: "easeInOut"
            }}
            className="text-[9px] font-bold tracking-[0.25em] text-orange-500 gold:text-slate-400 light:text-slate-500 mt-1.5 uppercase leading-none"
          >
            ENGINEERING
          </motion.span>
        </div>
      )}
    </div>
  );
}
