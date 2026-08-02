"use client";

import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  distanceThreshold?: number;
  maxTranslate?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  [key: string]: any;
}

export default function MagneticButton({
  children,
  className = "",
  distanceThreshold = 60,
  maxTranslate = 15,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>({ distanceThreshold, maxTranslate });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
