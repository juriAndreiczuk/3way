import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

interface NeonCompassStageProps {
  hovered: boolean;
  active: boolean;
  onComplete: () => void;
}

interface CompassApi {
  setHovered: (hovered: boolean) => void;
  activate: () => void;
}

function createLabelTexture(label: string, colour: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, 128, 128);
    context.fillStyle = colour;
    context.font = "700 60px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.shadowColor = colour;
    context.shadowBlur = 14;
    context.fillText(label, 64, 66);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createNeedleShape(
  tipY: number,
  halfWidth: number,
): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, tipY);
  shape.lineTo(halfWidth, 0);
  shape.lineTo(-halfWidth, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

export default function NeonCompassStage({
  hovered,
  active,
  onComplete,
}: NeonCompassStageProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<CompassApi | null>(null);
  const completionRef = useRef(onComplete);

  useEffect(() => {
    completionRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene.add(new THREE.AmbientLight(0xa797ff, 1.4));
    const violetLight = new THREE.PointLight(0x9b6cff, 10, 16);
    violetLight.position.set(-2.5, 2.5, 4);
    scene.add(violetLight);
    const cyanLight = new THREE.PointLight(0x20d9ff, 8, 14);
    cyanLight.position.set(2.8, -1.2, 3);
    scene.add(cyanLight);

    const root = new THREE.Group();
    root.rotation.x = -0.08;
    scene.add(root);

    const state = {
      alignment: 0,
      intensity: 0,
      needleAngle: -0.22,
    };

    const arcGroups: THREE.Group[] = [];
    const arcMaterials: THREE.MeshBasicMaterial[] = [];
    const arcDefinitions = [
      { radius: 1.66, width: 0.018, segments: [[0.12, 1.42], [1.82, 1.15], [3.35, 1.3], [5.05, 0.96]] },
      { radius: 1.38, width: 0.012, segments: [[0.38, 1.1], [1.72, 1.42], [3.48, 0.9], [4.67, 1.18]] },
      { radius: 1.08, width: 0.009, segments: [[0.08, 1.75], [2.18, 1.25], [3.77, 1.62]] },
    ] as const;

    arcDefinitions.forEach((definition, ringIndex) => {
      const ringGroup = new THREE.Group();
      ringGroup.position.z = -0.06 - ringIndex * 0.045;
      definition.segments.forEach(([start, length], segmentIndex) => {
        const material = new THREE.MeshBasicMaterial({
          color: segmentIndex === 0 && ringIndex === 0 ? 0x20d9ff : 0x9b6cff,
          transparent: true,
          opacity: 0.3 - ringIndex * 0.045,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const arc = new THREE.Mesh(
          new THREE.RingGeometry(
            definition.radius - definition.width,
            definition.radius + definition.width,
            64,
            1,
            start,
            length,
          ),
          material,
        );
        ringGroup.add(arc);
        arcMaterials.push(material);
      });
      ringGroup.rotation.z = ringIndex === 0 ? 0.23 : ringIndex === 1 ? -0.31 : 0.16;
      root.add(ringGroup);
      arcGroups.push(ringGroup);
    });

    const tickMaterial = new THREE.MeshBasicMaterial({
      color: 0xa987ff,
      transparent: true,
      opacity: 0.64,
    });
    const majorTickMaterial = new THREE.MeshBasicMaterial({
      color: 0xd9c9ff,
      transparent: true,
      opacity: 0.9,
    });
    const ticks = new THREE.Group();
    ticks.position.z = 0.02;
    for (let index = 0; index < 32; index += 1) {
      const major = index % 8 === 0;
      const angle = (index / 32) * Math.PI * 2;
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(major ? 0.026 : 0.012, major ? 0.18 : 0.09, 0.015),
        major ? majorTickMaterial : tickMaterial,
      );
      const radius = major ? 1.52 : 1.5;
      tick.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0);
      tick.rotation.z = -angle;
      ticks.add(tick);
    }
    root.add(ticks);

    const labelDefinitions = [
      { label: "N", x: 0, y: 1.86, colour: "#20d9ff" },
      { label: "E", x: 1.86, y: 0, colour: "#a98aff" },
      { label: "S", x: 0, y: -1.86, colour: "#a98aff" },
      { label: "W", x: -1.86, y: 0, colour: "#a98aff" },
    ];
    labelDefinitions.forEach(({ label, x, y, colour }) => {
      const material = new THREE.SpriteMaterial({
        map: createLabelTexture(label, colour),
        transparent: true,
        opacity: label === "N" ? 0.95 : 0.7,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, 0.12);
      sprite.scale.set(0.38, 0.38, 1);
      root.add(sprite);
    });

    const needle = new THREE.Group();
    needle.position.z = 0.2;
    const northNeedle = new THREE.Mesh(
      createNeedleShape(1.24, 0.14),
      new THREE.MeshBasicMaterial({
        color: 0x20d9ff,
        transparent: true,
        opacity: 0.9,
      }),
    );
    const southNeedle = new THREE.Mesh(
      createNeedleShape(-0.92, 0.11),
      new THREE.MeshBasicMaterial({
        color: 0x7954d8,
        transparent: true,
        opacity: 0.76,
      }),
    );
    northNeedle.position.z = 0.01;
    needle.add(northNeedle, southNeedle);
    root.add(needle);

    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0x20d9ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const pulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.97, 1, 72),
      pulseMaterial,
    );
    pulseRing.position.z = 0.16;
    pulseRing.scale.setScalar(0.3);
    root.add(pulseRing);

    let isActive = false;
    let elapsed = 0;
    let lastFrame = 0;
    let destroyed = false;

    const setHovered = (nextHovered: boolean) => {
      if (isActive) return;
      gsap.to(state, {
        alignment: nextHovered ? 1 : 0,
        intensity: nextHovered ? 1 : 0,
        needleAngle: nextHovered ? 0 : -0.22,
        duration: 1.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const activate = () => {
      if (isActive) return;
      isActive = true;
      gsap.killTweensOf(state);
      gsap.timeline({ onComplete: () => completionRef.current() })
        .to(state, {
          alignment: 1,
          intensity: 1.4,
          needleAngle: Math.PI * 2,
          duration: 1.05,
          ease: "power3.inOut",
        })
        .set(pulseMaterial, { opacity: 0.9 }, 0.72)
        .fromTo(
          pulseRing.scale,
          { x: 0.28, y: 0.28, z: 0.28 },
          { x: 1.72, y: 1.72, z: 1.72, duration: 0.62, ease: "power2.out" },
          0.72,
        )
        .to(pulseMaterial, { opacity: 0, duration: 0.32 }, 1.05)
        .to(root.scale, {
          x: 0.92,
          y: 0.92,
          z: 0.92,
          duration: 0.24,
          ease: "power2.in",
        }, 1.18);
    };

    apiRef.current = { setHovered, activate };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const renderFrame = (time: number) => {
      if (destroyed || time - lastFrame < 1000 / 30) return;
      const delta = Math.min((time - lastFrame) / 1000, 0.08);
      lastFrame = time;
      elapsed += delta;

      arcGroups.forEach((ring, index) => {
        const baseRotation = index === 0 ? 0.23 : index === 1 ? -0.31 : 0.16;
        const drift = elapsed * (0.035 + index * 0.012) * (index % 2 === 0 ? 1 : -1);
        ring.rotation.z = THREE.MathUtils.lerp(baseRotation + drift, 0, state.alignment);
      });
      needle.rotation.z = state.needleAngle + (isActive ? 0 : Math.sin(elapsed * 0.7) * 0.035 * (1 - state.alignment));
      arcMaterials.forEach((material, index) => {
        material.opacity = 0.28 - (index % 3) * 0.035 + state.intensity * 0.2;
      });
      tickMaterial.opacity = 0.55 + state.intensity * 0.2;
      majorTickMaterial.opacity = 0.82 + state.intensity * 0.14;
      violetLight.intensity = 10 + state.intensity * 5;
      cyanLight.intensity = 8 + state.intensity * 6;

      renderer.render(scene, camera);
    };

    const startRendering = () => renderer.setAnimationLoop(renderFrame);
    const stopRendering = () => renderer.setAnimationLoop(null);
    const handleVisibility = () => (document.hidden ? stopRendering() : startRendering());
    document.addEventListener("visibilitychange", handleVisibility);
    startRendering();

    return () => {
      destroyed = true;
      apiRef.current = null;
      stopRendering();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      gsap.killTweensOf(state);
      scene.traverse((object) => {
        if (object instanceof THREE.Sprite) {
          object.material.map?.dispose();
          object.material.dispose();
          return;
        }
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    apiRef.current?.setHovered(hovered);
  }, [hovered]);

  useEffect(() => {
    if (active) apiRef.current?.activate();
  }, [active]);

  return (
    <div ref={hostRef} className="neon-compass-stage" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
