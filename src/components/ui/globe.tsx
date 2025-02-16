"use client";

import { cn } from "@/lib/utils";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { useSpring } from "react-spring";

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
  markerColor: [150 / 255, 50 / 255, 200 / 255],
  glowColor: [0.7, 0.7, 0.7],
  markers: [
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
    { location: [40.7128, -74.006], size: 0.1 }, // New York City
    { location: [34.0522, -118.2437], size: 0.08 }, // Los Angeles
    { location: [30.2672, -97.7431], size: 0.06 }, // Austin, Texas
    { location: [37.7749, -122.4194], size: 0.07 }, // San Francisco
    { location: [25.7617, -80.1918], size: 0.07 }, // Miami, Florida
    { location: [43.6532, -79.3832], size: 0.07 }, // Toronto, Canada
    { location: [49.2827, -123.1207], size: 0.07 }, // Vancouver, Canada
    { location: [61.2181, -149.9003], size: 0.05 }, // Anchorage, Alaska
    { location: [-33.8688, 151.2093], size: 0.07 }, // Sydney
    { location: [40.4173, -82.9071], size: 0.05 }, // Ohio
    { location: [38.5976, -80.4549], size: 0.05 }, // West Virginia
    { location: [38.9072, -77.0369], size: 0.07 }, // Washington, D.C.
    { location: [42.3601, -71.0589], size: 0.06 }, // Boston, Massachusetts
    { location: [39.7392, -104.9903], size: 0.06 }, // Denver, Colorado
    { location: [47.6062, -122.3321], size: 0.06 }, // Seattle
    { location: [51.5074, -0.1278], size: 0.07 }, // London
    { location: [64.9631, -19.0208], size: 0.05 }, // Iceland
    { location: [41.8781, -87.6298], size: 0.07 }, // Chicago
    { location: [45.4215, -75.6972], size: 0.07 }, // Ottawa, Canada
    { location: [55.8642, -4.2518], size: 0.06 }, // Glasgow, Scotland
    { location: [32.7767, -96.797], size: 0.06 }, // Dallas, Texas
    { location: [48.1958, -114.3126], size: 0.05 }, // Kalispell, Montana
    { location: [41.8240, -71.4128], size: 0.05 }, // Providence, Rhode Island
    { location: [-37.8136, 144.9631], size: 0.15 }, // Melbourne, Australia
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
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    canvasRef.current!.style.cursor = value ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.0025;
      state.phi = phi + r.get();
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi, r]
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