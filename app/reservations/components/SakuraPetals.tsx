import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Dimensions = {
  width: number;
  height: number;
};

const SakuraPetals = ({ delay = 0 }: { delay?: number }) => {
  const [pageDimensions, setPageWidth] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setPageWidth({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        y: -100,
        x: Math.random() * pageDimensions.width,
        rotate: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: pageDimensions.height + 100,
        x: Math.random() * pageDimensions.width,
        rotate: 360,
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default SakuraPetals;
