"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";

import RamenBowl from "@/public/images/home/ramen-bowl.png";

export function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Circular text animation - responsive for mobile
  const circularTextScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.1, 0.3, 0.7, 1],
  );

  const circularTextX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["-50%", "-25%", "0%", "0%"],
  );

  const circularTextY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["-100%", "-50%", "0%", "0%"],
  );

  const circularTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 1],
    [0, 0.5, 1, 1],
  );

  // Content fade-in animation
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 1],
    [0, 0.3, 0.8, 1],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 1],
    [50, 20, 5, 0],
  );

  // Spring animations for smoother movement
  const springCircularScale = useSpring(circularTextScale, {
    stiffness: 100,
    damping: 30,
  });
  const springCircularX = useSpring(circularTextX, {
    stiffness: 100,
    damping: 30,
  });
  const springCircularY = useSpring(circularTextY, {
    stiffness: 100,
    damping: 30,
  });
  const springCircularOpacity = useSpring(circularTextOpacity, {
    stiffness: 100,
    damping: 30,
  });
  const springContentOpacity = useSpring(contentOpacity, {
    stiffness: 100,
    damping: 30,
  });
  const springContentY = useSpring(contentY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#e2dec5] to-shiso-200 overflow-hidden flex items-center justify-center pt-24 pb-8 px-3 md:px-12"
    >
      {/* Decorative large number - hidden on mobile */}
      <motion.span
        className="absolute left-0 bottom-0 text-[6.5rem] md:text-[13rem] font-extrabold text-shiso-800 opacity-40 select-none z-100 block font-sans"
        style={{
          opacity: 0.2,
          y: springContentY,
        }}
      >
        01
      </motion.span>

      <div className="relative z-20 max-w-5xl w-full flex flex-col lg:flex-row items-center gap-6 md:gap-16 lg:gap-32">
        {/* Left: Text */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-10 sm:mt-8 lg:mt-0"
          style={{
            opacity: springContentOpacity,
            y: springContentY,
          }}
        >
          <h2 className="font-sawarabi-mincho text-base md:text-lg lg:text-2xl text-shiso-900 mb-1 md:mb-3 tracking-widest leading-tight">
            レストランについて
          </h2>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-semibold text-shiso-700 mb-3 md:mb-6 leading-tight">
            About the Restaurant
          </h3>
          <p className="text-sm md:text-lg lg:text-xl text-shiso-800 max-w-xl mb-4 md:mb-8 leading-relaxed">
            Experience the art of vegetarian ramen at Hiroshi Ramen, where
            tradition meets innovation. Our slow-cooked broths and house-made
            noodles create pure comfort in every bowl.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 rounded-full bg-shiso-600 hover:bg-shiso-700 text-white font-bold text-lg md:text-2xl shadow-lg transition-all duration-200"
          >
            Learn more
          </Link>
        </motion.div>

        {/* Right: Rotating Circular Text and Image */}
        <div className="flex-1 flex justify-center items-center relative min-h-[160px] md:min-h-[270px] order-1 lg:order-3 w-full">
          {/* Rotating circular text - responsive sizing */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-20"
            style={{
              scale: springCircularScale,
              x: springCircularX,
              y: springCircularY,
              opacity: springCircularOpacity,
              transformOrigin: "center center",
            }}
          >
            <svg
              width="364px"
              height="364px"
              viewBox="0 0 304 304"
              className="animate-spin-slow md:w-[530px] md:h-[530px] lg:w-[650px] lg:h-[650px]"
              style={{ position: "absolute" }}
            >
              <defs>
                <path
                  id="circlePath"
                  d="M152,152 m-112,0 a112,112 0 1,1 224,0 a112,112 0 1,1 -224,0"
                />
              </defs>
              <text
                fill="#A3B18A"
                fontSize="22"
                fontFamily="'Sawarabi Mincho', serif"
                letterSpacing="1"
                className="md:text-base lg:text-lg"
              >
                <textPath
                  xlinkHref="#circlePath"
                  startOffset="0%"
                  textLength="880"
                >
                  <tspan className="block sm:hidden">
                    Hiroshi Ramen • Vegetarian Art • Tradition & Innovation •
                  </tspan>
                  <tspan className="hidden sm:block">
                    Hiroshi Ramen • Vegetarian Ramen Art • Tradition &
                    Innovation • Sustainable Dining • Authentic Flavors • Pure
                    Comfort •
                  </tspan>
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Image in the center - responsive sizing */}
          <motion.div
            className="relative z-30 rounded-2xl w-[200px] h-[200px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] flex items-center justify-center"
            style={{
              opacity: springContentOpacity,
              y: springContentY,
              scale: useTransform(
                scrollYProgress,
                [0.3, 0.6, 1],
                [0.8, 0.95, 1],
              ),
            }}
          >
            <ExportedImage
              src={RamenBowl}
              alt="Sustainable Ramen Bowl"
              className="rounded-xl w-full h-full object-cover"
              width={416}
              height={416}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
