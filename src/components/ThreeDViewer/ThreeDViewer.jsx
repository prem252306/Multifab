import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeDViewer({
  materialType = "Steel",
  thickness = 10,
  length = 1000,
  width = 1000,
  shapeType = "Gear",
  isStressSimulating = false
}) {
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
    const ambientLight = new THREE.AmbientLight(0xffffff, isStressSimulating ? 0.7 : 0.4);
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
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 4;
    controls.maxDistance = 15;

    // 6. Grid floor (subtle technical look)
    const gridHelper = new THREE.GridHelper(20, 20, 0xfa7316, 0x334155);
    gridHelper.position.y = -2;
    if (document.documentElement.classList.contains("gold")) {
      gridHelper.material.color.setHex(0xd4af37);
    }
    scene.add(gridHelper);

    // 7. Procedural FEA Stress Gradient Helper
    const applyStressColors = (geometry) => {
      const position = geometry.attributes.position;
      if (!position) return;

      const colors = [];
      const colorObj = new THREE.Color();

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);

        let stress = 0;
        if (shapeType === "Gear") {
          const dist = Math.sqrt(x * x + z * z);
          stress = Math.abs(Math.sin(dist * 3.0 + y * 2)) * 0.8 + 0.2;
        } else if (shapeType === "Flange") {
          const dist = Math.sqrt(x * x + z * z);
          const radiusDiff = Math.abs(dist - scaleRadius * 0.7);
          stress = Math.max(0.1, 1.0 - radiusDiff * 2.2);
        } else {
          // Valve stem connection joints stress concentrations
          stress = Math.abs(Math.cos(y * 2.0 + x * 1.2)) * 0.7 + 0.3;
        }

        // HSL mapping from blue (0.7 - low stress) to red (0.0 - high stress)
        const hue = Math.max(0, Math.min(0.7, 0.7 - stress * 0.7));
        colorObj.setHSL(hue, 1.0, 0.5);
        colors.push(colorObj.r, colorObj.g, colorObj.b);
      }

      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    };

    // 8. Shared Material Configuration
    const material = new THREE.MeshStandardMaterial({
      color: isStressSimulating ? 0xffffff : metalColor,
      roughness: isStressSimulating ? 0.4 : roughness,
      metalness: isStressSimulating ? 0.2 : metalness,
      vertexColors: isStressSimulating,
    });

    // 9. Procedural Workpiece Assembly
    const workpieceGroup = new THREE.Group();
    const geometriesToDispose = [];

    if (shapeType === "Flange") {
      // Flange geometry: Outer circular collar
      const collarGeom = new THREE.CylinderGeometry(scaleRadius, scaleRadius, scaleThickness, 32);
      if (isStressSimulating) applyStressColors(collarGeom);
      geometriesToDispose.push(collarGeom);
      
      const collarMesh = new THREE.Mesh(collarGeom, material);
      collarMesh.castShadow = true;
      collarMesh.receiveShadow = true;
      workpieceGroup.add(collarMesh);

      // Central dark cylinder representing pipe passage hole
      const holeGeom = new THREE.CylinderGeometry(scaleRadius * 0.38, scaleRadius * 0.38, scaleThickness * 1.05, 32);
      geometriesToDispose.push(holeGeom);
      const holeMaterial = new THREE.MeshStandardMaterial({ color: 0x05070a, roughness: 0.8 });
      const holeMesh = new THREE.Mesh(holeGeom, holeMaterial);
      workpieceGroup.add(holeMesh);

      // Radial bolted studs
      const boltCount = 8;
      const boltRadius = scaleRadius * 0.12;
      const boltHeight = scaleThickness * 1.5;
      const boltGeom = new THREE.CylinderGeometry(boltRadius, boltRadius, boltHeight, 16);
      if (isStressSimulating) applyStressColors(boltGeom);
      geometriesToDispose.push(boltGeom);

      for (let i = 0; i < boltCount; i++) {
        const angle = (i / boltCount) * Math.PI * 2;
        const bolt = new THREE.Mesh(boltGeom, material);
        bolt.position.set(
          Math.sin(angle) * (scaleRadius * 0.72),
          0,
          Math.cos(angle) * (scaleRadius * 0.72)
        );
        bolt.castShadow = true;
        workpieceGroup.add(bolt);
      }

    } else if (shapeType === "Valve") {
      // Pipeline channel
      const pipeGeom = new THREE.CylinderGeometry(scaleRadius * 0.28, scaleRadius * 0.28, scaleRadius * 2.5, 16);
      pipeGeom.rotateZ(Math.PI / 2);
      if (isStressSimulating) applyStressColors(pipeGeom);
      geometriesToDispose.push(pipeGeom);
      const pipeMesh = new THREE.Mesh(pipeGeom, material);
      pipeMesh.castShadow = true;
      workpieceGroup.add(pipeMesh);

      // Spherical central valve body
      const bodyGeom = new THREE.SphereGeometry(scaleRadius * 0.55, 24, 24);
      if (isStressSimulating) applyStressColors(bodyGeom);
      geometriesToDispose.push(bodyGeom);
      const bodyMesh = new THREE.Mesh(bodyGeom, material);
      bodyMesh.castShadow = true;
      workpieceGroup.add(bodyMesh);

      // Stem cylinder extending upwards
      const stemHeight = scaleThickness * 1.6;
      const stemGeom = new THREE.CylinderGeometry(scaleRadius * 0.08, scaleRadius * 0.08, stemHeight, 12);
      stemGeom.translate(0, stemHeight * 0.5, 0);
      if (isStressSimulating) applyStressColors(stemGeom);
      geometriesToDispose.push(stemGeom);
      const stemMesh = new THREE.Mesh(stemGeom, material);
      stemMesh.castShadow = true;
      workpieceGroup.add(stemMesh);

      // Torus handwheel on top of the stem
      const wheelRadius = scaleRadius * 0.35;
      const tubeRadius = scaleRadius * 0.06;
      const wheelGeom = new THREE.TorusGeometry(wheelRadius, tubeRadius, 8, 24);
      wheelGeom.rotateX(Math.PI / 2);
      wheelGeom.translate(0, stemHeight, 0);
      if (isStressSimulating) applyStressColors(wheelGeom);
      geometriesToDispose.push(wheelGeom);
      const wheelMesh = new THREE.Mesh(wheelGeom, material);
      wheelMesh.castShadow = true;
      workpieceGroup.add(wheelMesh);

    } else {
      // Default: Helical Gear
      const coreGeom = new THREE.CylinderGeometry(scaleRadius, scaleRadius, scaleThickness, 32);
      if (isStressSimulating) applyStressColors(coreGeom);
      geometriesToDispose.push(coreGeom);
      const coreMesh = new THREE.Mesh(coreGeom, material);
      coreMesh.castShadow = true;
      coreMesh.receiveShadow = true;
      workpieceGroup.add(coreMesh);

      const lipGeom = new THREE.CylinderGeometry(scaleRadius * 0.4, scaleRadius * 0.4, scaleThickness * 1.3, 24);
      if (isStressSimulating) applyStressColors(lipGeom);
      geometriesToDispose.push(lipGeom);
      const lipMesh = new THREE.Mesh(lipGeom, material);
      lipMesh.castShadow = true;
      workpieceGroup.add(lipMesh);

      const teethCount = 16;
      const toothLength = scaleRadius * 0.25;
      const toothWidth = scaleRadius * 0.16;
      const toothGeom = new THREE.BoxGeometry(toothWidth, scaleThickness, toothLength);
      if (isStressSimulating) applyStressColors(toothGeom);
      geometriesToDispose.push(toothGeom);

      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeom, material);
        tooth.rotation.y = -angle;
        tooth.rotation.x = 0.1; // helical angle twist
        
        tooth.position.set(
          Math.sin(angle) * (scaleRadius + toothLength * 0.3),
          0,
          Math.cos(angle) * (scaleRadius + toothLength * 0.3)
        );
        
        tooth.castShadow = true;
        tooth.receiveShadow = true;
        workpieceGroup.add(tooth);
      }
    }

    scene.add(workpieceGroup);

    // 10. Animation loop
    let lastTime = 0;
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (workpieceGroup) {
        workpieceGroup.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // 11. Resize Handling
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
      material.dispose();
      geometriesToDispose.forEach((g) => g.dispose());
    };
  }, [materialType, thickness, length, width, shapeType, isStressSimulating]);

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] bg-slate-900/10 dark:bg-slate-950/20 gold:bg-black/40 border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
      {/* HUD Info Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none font-outfit select-none">
        <span className="text-orange-500 gold:text-[#d4af37] text-xs font-bold uppercase tracking-widest">
          3D SPEC INSPECTOR
        </span>
        <h4 className="text-white text-lg font-black mt-1">
          {shapeType === "Gear" && "Procedural Helical Gear"}
          {shapeType === "Flange" && "Mechanical Flange Joint"}
          {shapeType === "Valve" && "Flow Process Valve"}
        </h4>
        <p className="text-slate-400 text-xs mt-0.5">
          Material: {materialType} | Radius: {(length / 100).toFixed(1)} cm
        </p>
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none select-none flex flex-col items-end gap-1.5">
        <span className="px-2.5 py-1 rounded-full bg-orange-500/15 gold:bg-[#d4af37]/15 text-orange-500 gold:text-[#d4af37] text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 gold:border-[#d4af37]/20">
          WebGL Live
        </span>
        {isStressSimulating && (
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-500 text-[8px] font-bold tracking-widest uppercase border border-red-500/20 animate-pulse">
            FEA Stress Shader
          </span>
        )}
      </div>

      {/* Main Canvas Mount */}
      <div ref={mountRef} className="w-full h-full flex-grow" />

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10 select-none">
        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Drag to Orbit • Scroll to Zoom
        </span>
      </div>
    </div>
  );
}
