"use client";
import React from "react";
import { motion } from "framer-motion";

interface CoinTossRevealProps {
  children: React.ReactNode;
  index?: number; // Deterministic index to map vectors and staggered delays
}

export default function CoinTossReveal({ children, index = 0 }: CoinTossRevealProps) {
  // Deterministically map index to one of 3 animation entry vectors:
  // 0: From Left (3D Flip-Y counter-clockwise)
  // 1: From Right (3D Flip-Y clockwise)
  // 2: From Bottom-Center (3D Flip-X forward)
  const vector = index % 3;

  // Stagger animation delays based on the index to create cascading reveals on view entry
  const delay = (index % 3) * 0.12;

  // Get initial state coordinates for the coin-toss
  const getInitialState = () => {
    switch (vector) {
      case 0:
        return {
          opacity: 0,
          x: -140,
          y: 40,
          scale: 0.65,
          rotateX: 10,
          rotateY: -120,
          rotateZ: -12,
          transformPerspective: 1000,
        };
      case 1:
        return {
          opacity: 0,
          x: 140,
          y: 40,
          scale: 0.65,
          rotateX: 10,
          rotateY: 120,
          rotateZ: 12,
          transformPerspective: 1000,
        };
      case 2:
      default:
        return {
          opacity: 0,
          x: 0,
          y: 150,
          scale: 0.65,
          rotateX: -100,
          rotateY: 0,
          rotateZ: 0,
          transformPerspective: 1000,
        };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring" as const,
        stiffness: 55,
        damping: 13,
        mass: 0.9,
        delay,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
