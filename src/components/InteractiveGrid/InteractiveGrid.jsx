import { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    // Particles array
    let particles = [];
    const particleCount = Math.min(100, Math.floor((width * height) / 15000));

    class Particle {
      constructor(x, y) {
        this.originX = x;
        this.originY = y;
        this.x = x + (Math.random() - 0.5) * 40;
        this.y = y + (Math.random() - 0.5) * 40;
        this.size = Math.random() * 2 + 1.5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.density = Math.random() * 20 + 10;
      }

      update() {
        // Base drift motion
        this.x += this.vx;
        this.y += this.vy;

        // Keep near original origin position
        const dxOrigin = this.originX - this.x;
        const dyOrigin = this.originY - this.y;
        this.vx += dxOrigin * 0.003;
        this.vy += dyOrigin * 0.003;

        // Friction to damp velocity
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Repel from mouse coordinates
        const dxMouse = mouse.x - this.x;
        const dyMouse = mouse.y - this.y;
        const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dyMouse, dxMouse);
          // Push away
          this.vx -= Math.cos(angle) * force * 1.5;
          this.vy -= Math.sin(angle) * force * 1.5;
        }
      }

      draw(colors) {
        ctx.fillStyle = colors.node;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const cols = Math.floor(Math.sqrt((particleCount * width) / height));
      const rows = Math.floor(particleCount / cols);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellWidth + cellWidth / 2;
          const y = r * cellHeight + cellHeight / 2;
          particles.push(new Particle(x, y));
        }
      }
    };

    initParticles();

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Detect Theme dynamically
      const htmlEl = document.documentElement;
      let colors = {
        node: "rgba(249, 115, 22, 0.4)", // orange
        line: "rgba(249, 115, 22, 0.08)",
      };

      if (htmlEl.classList.contains("gold")) {
        colors = {
          node: "rgba(212, 175, 55, 0.45)", // gold
          line: "rgba(212, 175, 55, 0.12)",
        };
      } else if (htmlEl.classList.contains("light")) {
        colors = {
          node: "rgba(100, 116, 139, 0.25)", // slate-gray
          line: "rgba(100, 116, 139, 0.05)",
        };
      }

      // Update and Draw Particles
      particles.forEach((p) => {
        p.update();
        p.draw(colors);
      });

      // Draw connecting lines
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are close
          if (dist < 150) {
            const opacity = (150 - dist) / 150;
            ctx.strokeStyle = colors.line.replace(/[\d\.]+\)$/, `${opacity * 0.15})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}
