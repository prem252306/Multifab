import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeDViewer({ materialType = "Steel", thickness = 10, length = 1000, width = 1000 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions scaling factor (map physical mm to Three.js units)
    const scaleThickness = Math.max(0.5, Math.min(4, thickness / 20));
    const scaleRadius = Math.max(1, Math.min(5, (length + width) / 500));

    // Colors & Shader settings based on material type
    let metalColor = 0xa0a0a0;
    let roughness = 0.2;
    let metalness = 0.9;

    if (materialType.includes("Brass") || materialType.includes("Gold")) {
      metalColor = 0xd4af37; // gold/brass
      roughness = 0.15;
      metalness = 1.0;
    } else if (materialType.includes("Titanium")) {
      metalColor = 0x4f5d75; // gunmetal blue-gray
      roughness = 0.25;
      metalness = 0.85;
    } else if (materialType.includes("Copper")) {
      metalColor = 0xb87333; // copper
      roughness = 0.18;
      metalness = 0.95;
    } else {
      // Steel / default
      metalColor = 0xe2e8f0; // bright silver
      roughness = 0.2;
      metalness = 0.9;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    // Transparent or theme matching background
    scene.background = null; 

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 5, 8);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 10, 7);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go below floor
    controls.minDistance = 4;
    controls.maxDistance = 15;

    // 6. Grid floor (subtle technical look)
    const gridHelper = new THREE.GridHelper(20, 20, 0xfa7316, 0x334155);
    gridHelper.position.y = -2;
    // Adapt grid color for gold theme
    if (document.documentElement.classList.contains("gold")) {
      gridHelper.material.color.setHex(0xd4af37);
    }
    scene.add(gridHelper);

    // 7. Procedural Workpiece - Helical Gear Group
    const gearGroup = new THREE.Group();

    // Material with metal textures
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: metalColor,
      roughness: roughness,
      metalness: metalness,
      bumpScale: 0.05,
    });

    // Central core cylinder
    const coreGeom = new THREE.CylinderGeometry(scaleRadius, scaleRadius, scaleThickness, 32);
    const coreMesh = new THREE.Mesh(coreGeom, metalMaterial);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    gearGroup.add(coreMesh);

    // Central shaft sleeve (raised lip)
    const lipGeom = new THREE.CylinderGeometry(scaleRadius * 0.4, scaleRadius * 0.4, scaleThickness * 1.3, 24);
    const lipMesh = new THREE.Mesh(lipGeom, metalMaterial);
    lipMesh.castShadow = true;
    gearGroup.add(lipMesh);

    // Add gear teeth (arranged around the outer cylinder)
    const teethCount = 16;
    const toothLength = scaleRadius * 0.25;
    const toothWidth = scaleRadius * 0.16;
    const toothGeom = new THREE.BoxGeometry(toothWidth, scaleThickness, toothLength);

    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeom, metalMaterial);
      
      // Helical angle twist
      tooth.rotation.y = -angle;
      tooth.rotation.x = 0.1; // slight twist
      
      tooth.position.set(
        Math.sin(angle) * (scaleRadius + toothLength * 0.3),
        0,
        Math.cos(angle) * (scaleRadius + toothLength * 0.3)
      );
      
      tooth.castShadow = true;
      tooth.receiveShadow = true;
      gearGroup.add(tooth);
    }

    scene.add(gearGroup);

    // 8. Animation loop
    let lastTime = 0;
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      // Slow passive rotation
      if (gearGroup) {
        gearGroup.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      coreGeom.dispose();
      lipGeom.dispose();
      toothGeom.dispose();
      metalMaterial.dispose();
    };
  }, [materialType, thickness, length, width]);

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] bg-slate-900/10 dark:bg-slate-950/20 gold:bg-black/40 border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
      {/* HUD Info Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none font-outfit">
        <span className="text-orange-500 gold:text-[#d4af37] text-xs font-bold uppercase tracking-widest">
          3D SPEC INSPECTOR
        </span>
        <h4 className="text-white text-lg font-black mt-1">
          Procedural Gear Workpiece
        </h4>
        <p className="text-slate-400 text-xs mt-0.5">
          Material: {materialType} | Radius: {(length/100).toFixed(1)} cm
        </p>
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full bg-orange-500/15 gold:bg-[#d4af37]/15 text-orange-500 gold:text-[#d4af37] text-[10px] font-bold tracking-widest uppercase">
          WebGL Live
        </span>
      </div>

      {/* Main Canvas Mount */}
      <div ref={mountRef} className="w-full h-full flex-grow" />

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10">
        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Drag to Orbit • Scroll to Zoom
        </span>
      </div>
    </div>
  );
}
