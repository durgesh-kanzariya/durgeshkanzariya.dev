"use client";
import React from "react";
import { motion } from "framer-motion";

interface CoinTossRevealProps {
  children: React.ReactNode;
  index?: number; // Optional index to determine deterministic 3D toss vectors
}

// Container component that coordinates scroll triggers for all children in the same row
export function CoinTossContainer({ 
  children, 
  stagger = 0.12, 
  margin = "-60px" 
}: { 
  children: React.ReactNode; 
  stagger?: number; 
  margin?: string; 
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function CoinTossReveal({ children, index = 2 }: CoinTossRevealProps) {
  // Deterministically map index to one of 3 animation entry vectors:
  // 0: From Left (3D Flip-Y counter-clockwise)
  // 1: From Right (3D Flip-Y clockwise)
  // 2: From Bottom-Center (3D Flip-X forward)
  const vector = index % 3;

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

  const coinTossVariants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        type: "spring" as const,
        stiffness: 55,
        damping: 13,
        mass: 0.9,
      },
    },
  };

  return (
    <motion.div
      variants={coinTossVariants}
      style={{ transformStyle: "preserve-3d" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
