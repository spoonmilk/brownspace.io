"use client";

import Particles from "@/components/ui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Globe from "@/components/ui/globe";

export default function GlobeAndStars() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#808080");
  }, [theme]);

  return (
    <div className="relative top-[-20px] w-[300px] h-[300px]">
    {/* Set Particles to absolute positioning */}
    <Particles className="absolute inset-0 z-1" quantity={150} ease={80} color={color} refresh />
    
    {/* Set Globe to absolute positioning */}
    <Globe className="absolute inset-0 z-2" />
  </div>
  );
}