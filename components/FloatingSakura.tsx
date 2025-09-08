"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Helper to pick a random top-to-bottom position
function getRandomTopToBottomPosition(width: number, height: number) {
  const start = { x: Math.random() * width, y: -40 };
  const end = { x: Math.random() * width, y: height + 40 };
  return { start, end };
}

const SakuraPetal = ({ delay = 0 }: { delay?: number }) => {
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const [positions, setPositions] = useState<{
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setPageDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pageDimensions.width && pageDimensions.height) {
      setPositions(
        getRandomTopToBottomPosition(
          pageDimensions.width,
          pageDimensions.height,
        ),
      );
    }
  }, [pageDimensions]);

  if (!positions) return null;

  return (
    <motion.div
      className="absolute w-3 h-3 pointer-events-none"
      style={{
        background: "linear-gradient(45deg, #ffb7c5, #ff9a9e)",
        borderRadius: "50% 0 50% 50%",
        transform: "rotate(45deg)",
      }}
      initial={{
        opacity: 0,
        x: positions.start.x,
        y: positions.start.y,
        rotate: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        x: positions.end.x,
        y: positions.end.y,
        rotate: 360,
      }}
      transition={{
        duration: 12 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const FloatingSakura = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <SakuraPetal key={i} delay={i * 0.7} />
    ))}
  </div>
);

export default FloatingSakura;
