"use client";

import dynamic from "next/dynamic";
import { BookOpenIcon, SaladIcon, Leaf } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnvironmentalImpactModal } from "@/components/EnvironmentalImpactModal";

const RamenBowlAnimation = dynamic(
  () => import("./RamenBowlAnimation").then((mod) => mod.RamenBowlAnimation),
  { ssr: false },
);

// Animation variants for the container of the letters
const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: i * 0.2 },
  }),
};

// Animation variants for each letter
const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    x: -10,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEICModalOpen, setIsEICModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for the entire hero section based on vertical scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); // Reduced parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Spring animations for smoother movement
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-hidden w-full h-screen p-10 pt-18 pb-32 md:p-20 bg-cover bg-[40%_50%] bg-no-repeat bg-[url('/images/home/hero-background.png')]"
      >
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center size-full max-w-[100rem] mx-auto z-10"
          style={{ y: springY, opacity: springOpacity, scale: springScale }}
        >
          <motion.div
            className="relative w-full overflow-hidden flex-1 h-full"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <RamenBowlAnimation />
          </motion.div>
          <motion.div
            className="flex-1 w-full text-center md:text-right"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="clamp-[text,4xl,7.5rem] leading-none font-serif uppercase flex flex-col items-center md:items-end"
              variants={titleContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              <div>
                {"Hiroshi".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div>
                {"Ramen".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
            <motion.h3
              className="clamp-[text,lg,1.765rem] font-semibold font-serif"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-green-800">Vegetarian.</span>
              &nbsp;
              <span className="text-amber-800">Authentic.</span>
            </motion.h3>
            <motion.h3
              className="clamp-[text,base,1.4rem] font-serif leading-7 mt-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
              viewport={{ once: true }}
            >
              Slow-cooked broth. <br />
              House-made noodles. <br />
              Pure comfort.
            </motion.h3>
            <motion.div
              className="flex flex-col sm:flex-row justify-center md:justify-end gap-3 md:gap-5 mt-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="default"
                  asChild
                  className="w-full md:w-auto"
                >
                  <Link href="/menu">
                    View the Menu
                    <BookOpenIcon />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="default"
                  asChild
                  className="w-full md:w-auto"
                >
                  <Link href="/reservations">
                    Make a Reservation
                    <SaladIcon />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            {/* Calculate Impact button on a new line for large screens */}
            <motion.div
              className="mt-3 md:mt-6 w-full md:w-auto flex justify-center md:justify-end"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 w-full md:w-auto"
                onClick={() => setIsEICModalOpen(true)}
              >
                <Leaf className="mr-2" />
                Calculate Impact
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <EnvironmentalImpactModal
        isOpen={isEICModalOpen}
        onClose={() => setIsEICModalOpen(false)}
      />
    </>
  );
}
