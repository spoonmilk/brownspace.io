"use client";

import { cn } from "@/lib/utils";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";

const GLOBE_CONFIG: COBEOptions = {
  width: 700,
  height: 700,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.41,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 32000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.7, 0, 0],
  glowColor: [0.7, 0.7, 0.7],
  markers: [
    { location: [41.824, -71.4128], size: 0.15 },
  ],
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rCurrent = useRef(0);
  const rTarget = useRef(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    canvasRef.current!.style.cursor = value !== null ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rTarget.current = delta / 200;
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.03;
      rCurrent.current += (rTarget.current - rCurrent.current) * 0.15;
      state.phi = phi + rCurrent.current;
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1/1] w-[100%] max-w-[300px] max-h-[300px]", // Updated styles
        className
      )}
    >
      <canvas
        className={cn(
          "h-full w-full opacity-0 transition-opacity duration-500"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
