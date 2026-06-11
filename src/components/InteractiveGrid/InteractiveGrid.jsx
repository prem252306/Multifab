import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveGrid() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup (Orthographic for full-screen quad)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear container and append canvas
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Uniforms configuration
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(-1000.0, -1000.0) },
      u_theme: { value: 0 },
      u_mouse_active: { value: 0.0 }
    };

    // 5. Shader Material definition
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform int u_theme;
      uniform float u_mouse_active;
      
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        // Pixel coordinates normalized
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Correct aspect ratio
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Project mouse coordinate with aspect ratio mapping
        vec2 mouseNDC = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float distToMouse = length(p - mouseNDC);
        
        // Mouse warp offset (push fluid current away from cursor)
        vec2 mouseWarp = vec2(0.0);
        if (u_mouse_active > 0.5 && distToMouse < 1.2) {
          float strength = (1.2 - distToMouse) * 0.35;
          vec2 dir = normalize(p - mouseNDC);
          mouseWarp = dir * strength;
        }

        // Domain warping fBm passes
        vec2 q = vec2(
          fbm(p + mouseWarp + vec2(0.0, 0.0) + u_time * 0.04),
          fbm(p + mouseWarp + vec2(5.2, 1.3) + u_time * 0.04)
        );

        vec2 r = vec2(
          fbm(p + q * 1.2 + vec2(1.7, 9.2) + u_time * 0.06),
          fbm(p + q * 1.2 + vec2(8.3, 2.8) + u_time * 0.06)
        );

        // Volumetric fluid current height
        float f = fbm(p + r * 1.5);
        
        vec3 col = vec3(0.0);

        if (u_theme == 1) {
          // Luxury Gold Theme - Molten Gold Shimmer
          vec3 colA = vec3(0.18, 0.11, 0.02); // Deep bronze/black backing
          vec3 colB = vec3(0.72, 0.54, 0.18); // Medium gold
          vec3 colC = vec3(0.98, 0.94, 0.68); // Specular highlight pale gold
          vec3 colD = vec3(0.50, 0.34, 0.08); // Accent copper
          
          col = mix(colA, colB, f);
          col = mix(col, colC, dot(q, r) * 0.5);
          col = mix(col, colD, r.y * 0.35);
          col += pow(f, 4.0) * vec3(0.35, 0.25, 0.08); // Golden light emission
        } else if (u_theme == 2) {
          // Light Theme - Liquid Silver / Mercury Shimmer
          vec3 colA = vec3(0.88, 0.90, 0.94); // Pale silver
          vec3 colB = vec3(0.58, 0.64, 0.74); // Steel shadow
          vec3 colC = vec3(1.0, 1.0, 1.0);    // High specular highlight white
          vec3 colD = vec3(0.40, 0.46, 0.58); // Slate tint
          
          col = mix(colA, colB, f);
          col = mix(col, colC, dot(q, r) * 0.4);
          col = mix(col, colD, r.x * 0.25);
        } else {
          // Dark Theme (Default) - Obsidian Obsidian and Orange Magma
          vec3 colA = vec3(0.03, 0.04, 0.06); // Obsidian black
          vec3 colB = vec3(0.96, 0.40, 0.05); // Molten Orange Magma
          vec3 colC = vec3(0.08, 0.03, 0.01); // Dark brown-orange backing
          vec3 colD = vec3(0.35, 0.12, 0.02); // Deep copper
          
          col = mix(colA, colB, f * f * 1.4);
          col = mix(col, colC, q.x * 0.45);
          col = mix(col, colD, r.y * 0.25);
          col += pow(f, 6.0) * vec3(0.5, 0.15, 0.0); // Magma glow
        }

        // Apply contrast profile
        col = clamp(col, 0.0, 1.0);
        col = col * col * (3.0 - 2.0 * col);
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false
    });

    // 6. Geometry definition (Full-screen quad plane)
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // 7. Mouse handlers tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      uniforms.u_mouse.value.set(x, y);
      uniforms.u_mouse_active.value = 1.0;
    };

    const handleMouseLeave = () => {
      uniforms.u_mouse_active.value = 0.0;
    };

    const handleMouseEnter = () => {
      uniforms.u_mouse_active.value = 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseenter", handleMouseEnter);

    // 8. Resize handlers tracking
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation loop loop
    let startTime = performance.now();
    let animationFrameId;

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001; // elapsed time in seconds
      uniforms.u_time.value = elapsed;

      // Detect active HTML theme classes
      const htmlEl = document.documentElement;
      let themeVal = 0; // Default dark magma
      if (htmlEl.classList.contains("gold")) {
        themeVal = 1; // Gold
      } else if (htmlEl.classList.contains("light")) {
        themeVal = 2; // Light silver
      }
      uniforms.u_theme.value = themeVal;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 10. Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", handleResize);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-45 select-none"
    />
  );
}
