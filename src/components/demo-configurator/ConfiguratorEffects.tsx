import { useEffect, useRef } from "react";
import { Application, Graphics } from "pixi.js";

interface Particle {
  graphic: Graphics;
  life: number;
  duration: number;
  offset: number;
  lift: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

interface EffectsApi {
  burst: (colour: number, processing: boolean) => void;
}

export default function ConfiguratorEffects({
  pulseKey,
  colour,
  processing,
}: {
  pulseKey: number;
  colour: number;
  processing: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<EffectsApi | null>(null);
  const colourRef = useRef(colour);
  const processingRef = useRef(processing);

  useEffect(() => {
    colourRef.current = colour;
  }, [colour]);

  useEffect(() => {
    processingRef.current = processing;
  }, [processing]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let disposed = false;
    let app: Application | null = null;
    let handleVisibility: (() => void) | null = null;

    const initialise = async () => {
      const instance = new Application();
      await instance.init({
        canvas,
        resizeTo: host,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio, 1.25),
        preference: "webgl",
        powerPreference: "high-performance",
      });
      if (disposed) {
        instance.destroy();
        return;
      }

      app = instance;
      instance.ticker.maxFPS = 30;
      const particles: Particle[] = [];

      const burst = (burstColour: number, isProcessing: boolean) => {
        const amount = isProcessing ? 44 : 24;
        const width = instance.screen.width;
        const height = instance.screen.height;
        for (let index = 0; index < amount; index += 1) {
          const radius = index % 5 === 0 ? 2.4 : 1.2 + (index % 3) * 0.35;
          const graphic = new Graphics().circle(0, 0, radius).fill({
            color: burstColour,
            alpha: 0.82,
          });
          instance.stage.addChild(graphic);
          particles.push({
            graphic,
            life: 0,
            duration: 1.35 + (index % 7) * 0.08,
            offset: index / amount,
            lift: 36 + (index % 6) * 14,
            startX: isProcessing
              ? width * 0.5
              : width * (0.58 + (index % 5) * 0.035),
            startY: isProcessing ? height * 0.75 : height * 0.72,
            targetX: isProcessing ? width * 0.5 : width * 0.16,
            targetY: isProcessing ? height * 0.38 : height * 0.2,
          });
        }
      };

      apiRef.current = { burst };
      let processingTimer = 0;
      instance.ticker.add((ticker) => {
        const delta = Math.min(ticker.deltaMS / 1000, 0.08);
        processingTimer += delta;
        if (processingRef.current && processingTimer > 0.65) {
          processingTimer = 0;
          burst(colourRef.current, true);
        }

        for (let index = particles.length - 1; index >= 0; index -= 1) {
          const particle = particles[index];
          particle.life += delta;
          const progress = Math.min(particle.life / particle.duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const wave =
            Math.sin((progress + particle.offset) * Math.PI * 2) * 18;
          particle.graphic.position.set(
            particle.startX +
              (particle.targetX - particle.startX) * eased +
              wave,
            particle.startY +
              (particle.targetY - particle.startY) * eased -
              Math.sin(progress * Math.PI) * particle.lift,
          );
          particle.graphic.alpha = Math.sin(progress * Math.PI) * 0.88;
          particle.graphic.scale.set(0.7 + Math.sin(progress * Math.PI) * 0.8);

          if (progress >= 1) {
            instance.stage.removeChild(particle.graphic);
            particle.graphic.destroy();
            particles.splice(index, 1);
          }
        }
      });

      handleVisibility = () =>
        document.hidden ? instance.stop() : instance.start();
      document.addEventListener("visibilitychange", handleVisibility);
    };

    void initialise();

    return () => {
      disposed = true;
      apiRef.current = null;
      if (handleVisibility) {
        document.removeEventListener("visibilitychange", handleVisibility);
      }
      app?.stop();
      app?.destroy();
      app = null;
    };
  }, []);

  useEffect(() => {
    if (pulseKey > 0) apiRef.current?.burst(colour, false);
  }, [pulseKey, colour]);

  return (
    <div ref={hostRef} className="configurator-effects" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
