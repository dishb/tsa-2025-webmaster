"use client";

import { useState, forwardRef } from "react";
import { motion, useMotionValue, MotionValue } from "framer-motion";
import {
  Leaf,
  Award,
  Star,
  Trophy,
  Shield,
  Zap,
  Globe,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React from "react";
import Link from "next/link";

export interface AwardsProps {
  fadeBgOpacity?: number | MotionValue<number>;
}

export const Awards = forwardRef<HTMLDivElement, AwardsProps>(
  ({ fadeBgOpacity = 0 }, sectionRef) => {
    const awards = [
      {
        icon: Trophy,
        title: "James Beard Award Nomination",
        subtitle: "Outstanding Chef",
        category: "James Beard Foundation",
        year: "",
      },
      {
        icon: Star,
        title: "Michelin Bib Gourmand",
        subtitle: "Exceptional food at moderate prices",
        category: "Michelin Guide",
        year: "",
      },
      {
        icon: Heart,
        title: "Authentic Cuisine Award",
        subtitle: "Japanese Cultural Center",
        category: "Authenticity",
        year: "",
      },
      {
        icon: Zap,
        title: "Plant-Based Innovation Award",
        subtitle: "Recognized for plant-based excellence",
        category: "Plant-Based Association",
        year: "",
      },
      {
        icon: Shield,
        title: "Certified by Health Department",
        subtitle: "Perfect Score",
        category: "Health & Safety",
        year: "",
      },
    ];

    // Carousel state for mobile
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    function paginate(newDirection: number) {
      setDirection(newDirection);
      setIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return awards.length - 1;
        if (next >= awards.length) return 0;
        return next;
      });
    }

    // Swipe gesture support
    const swipeConfidenceThreshold = 10000;
    function swipePower(offset: number, velocity: number) {
      return Math.abs(offset) * velocity;
    }

    // Split awards for custom grid
    const bigAwards = awards.slice(0, 2);
    const smallAwards = awards.slice(2);

    const fallbackMotionValue = useMotionValue(0);
    let overlayOpacity: MotionValue<number>;
    if (typeof fadeBgOpacity === "number") {
      fallbackMotionValue.set(fadeBgOpacity);
      overlayOpacity = fallbackMotionValue;
    } else {
      overlayOpacity = fadeBgOpacity;
    }

    return (
      <section
        ref={sectionRef}
        id="awards"
        className="relative w-full h-screen overflow-hidden flex flex-col justify-center md:justify-between items-center pt-8 md:pt-24 pb-8 px-3 md:px-12 scroll-mt-6 md:scroll-mt-10 lg:scroll-mt-12 bg-gradient-to-b from-[#e2dec5] to-shiso-200"
      >
        {/* Fade overlay to solid shiso-200 when fully in view */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 bg-bianca-100 z-0 transition-opacity duration-700"
        />

        {/* Decorative large number - always behind, never overlaps */}
        <motion.span
          className="pointer-events-none z-0 block font-sans absolute left-1/2 -translate-x-1/2 bottom-6 lg:left-auto lg:right-0 lg:translate-x-0 lg:bottom-0 text-[6.5rem] md:text-[13rem] font-extrabold text-shiso-800 opacity-10"
          style={{ opacity: 0.1 }}
        >
          02
        </motion.span>

        {/* Japanese decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern
                id="seigaiha-awards"
                x="0"
                y="0"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,8 Q4,4 8,8 Q12,12 16,8"
                  stroke="#A3B18A"
                  strokeWidth="0.4"
                  fill="none"
                />
                <path
                  d="M0,12 Q4,8 8,12 Q12,16 16,12"
                  stroke="#A3B18A"
                  strokeWidth="0.4"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#seigaiha-awards)" />
          </svg>
        </div>

        {/* Vertical kanji text decoration */}
        <div className="absolute left-2 top-0 bottom-0 flex items-center pointer-events-none opacity-10">
          <div className="writing-mode-vertical text-5xl font-serif text-shiso-600 transform -rotate-90 whitespace-nowrap">
            受賞歴
          </div>
        </div>

        <div className="relative z-10 max-w-5xl w-full flex flex-col h-full min-h-0 flex-1">
          <div className="flex flex-col flex-1 justify-center">
            {/* Header Section */}
            <div className="text-center pt-4 md:pt-0 pb-2 md:pb-0 flex-shrink-0">
              <h2 className="font-sawarabi-mincho text-base md:text-lg lg:text-2xl text-shiso-900 mb-1 2xl:mb-2 tracking-widest leading-tight">
                栄誉と認証
              </h2>
              <h3 className="text-xl md:text-3xl lg:text-5xl font-serif font-semibold text-shiso-700 leading-tight">
                Awards & Recognition
              </h3>
              <p className="text-xs md:text-base lg:text-lg text-shiso-800 max-w-2xl p-2 2xl:p-5 mx-auto leading-relaxed">
                Celebrating our commitment to culinary excellence <br></br>and
                environmental responsibility
              </p>
            </div>

            {/* Carousel for mobile and md screens */}
            <div className="lg:hidden flex flex-col items-center justify-center w-full md:mt-8">
              <div className="relative w-[90vw] max-w-[340px] sm:w-[320px] md:w-[400px] mx-auto flex items-center justify-center min-h-[180px] h-[60vw] max-h-[340px]">
                {/* <AnimatePresence initial={false} custom={direction}> */}
                <motion.div
                  key={index}
                  className="h-full group relative"
                  custom={direction}
                  layout
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  aria-live="polite"
                >
                  <div className="bg-white rounded-2xl p-2 md:p-6 shadow-xl border border-shiso-200/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] h-full w-full">
                    {/* Award icon */}
                    <div className="mb-2 relative z-10">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-shiso-700 via-shiso-900 to-amber-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(awards[index].icon, {
                          className:
                            "w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white",
                        })}
                      </div>
                    </div>
                    {/* Award content */}
                    <div className="relative z-10 text-center">
                      <h3 className="font-serif text-sm sm:text-base md:text-lg font-semibold text-shiso-800 mb-1 leading-tight group-hover:text-shiso-900 transition-colors duration-300 line-clamp-2">
                        {awards[index].title}
                      </h3>
                      <p className="text-marshland-600 text-xs sm:text-sm leading-relaxed mb-1 line-clamp-2">
                        {awards[index].subtitle}
                      </p>
                      {/* Category badge */}
                      <div className="inline-block">
                        <span className="text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-br from-shiso-700 via-shiso-900 to-amber-400 text-white shadow-sm">
                          {awards[index].category}
                        </span>
                      </div>
                    </div>
                    {/* Decorative corner element */}
                    <div className="absolute bottom-1 right-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-shiso-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                {/* </AnimatePresence> */}
                {/* Navigation arrows */}
                <button
                  aria-label="Previous award"
                  className="absolute left-1 -bottom-8 bg-white/80 hover:bg-white rounded-full shadow p-0.5 z-10"
                  onClick={() => paginate(-1)}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-shiso-700" />
                </button>
                <button
                  aria-label="Next award"
                  className="absolute right-1 -bottom-8 bg-white/80 hover:bg-white rounded-full shadow p-0.5 z-10"
                  onClick={() => paginate(1)}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-shiso-700" />
                </button>
              </div>
              {/* Dots indicator */}
              <div className="flex justify-center mt-3 gap-0.5">
                {awards.map((_, i) => (
                  <button
                    key={i}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                      i === index ? "bg-shiso-700 scale-110" : "bg-shiso-300"
                    }`}
                    aria-label={`Go to award ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Custom grid for lg+ screens: 2x2 big, 1x3 small */}
            <div className="hidden lg:flex flex-col h-full max-w-5xl mx-auto w-full min-h-0">
              {/* First row of 2 big awards */}
              <div className="flex gap-3 items-stretch mb-1 justify-center flex-1 min-h-0">
                {bigAwards.slice(0, 2).map((award, index) => (
                  <div
                    key={index}
                    className="flex-1 min-h-0 max-w-lg group relative flex flex-col"
                  >
                    <div className="bg-white rounded-3xl p-4 shadow-2xl border border-shiso-200/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-center items-center flex-1 min-h-0">
                      <div className="mb-3 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-shiso-700 via-shiso-900 to-amber-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                          <award.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="relative z-10 text-center">
                        <h3 className="font-serif text-lg font-semibold text-shiso-800 mb-1 leading-tight group-hover:text-shiso-900 transition-colors duration-300 line-clamp-2">
                          {award.title}
                        </h3>
                        <p className="text-marshland-600 text-sm leading-relaxed mb-1 line-clamp-2">
                          {award.subtitle}
                        </p>
                        <div className="inline-block">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-br from-shiso-700 via-shiso-900 to-amber-400 text-white shadow-sm">
                            {award.category}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <svg
                          className="w-5 h-5 text-shiso-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Third row of 3 small awards */}
              <div className="flex gap-2 items-stretch justify-center flex-1 min-h-0">
                {smallAwards.map((award, index) => (
                  <div
                    key={index}
                    className="flex-1 min-h-0 max-w-xs group relative flex flex-col"
                  >
                    <div className="bg-white rounded-xl p-2 shadow-xl border border-shiso-200/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-center items-center flex-1 min-h-0">
                      <div className="mb-1 relative z-10">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-shiso-700 via-shiso-900 to-amber-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                          {React.createElement(award.icon, {
                            className: "w-4 h-4 text-white",
                          })}
                        </div>
                      </div>
                      <div className="relative z-10 text-center">
                        <h3 className="font-serif text-xs font-semibold text-shiso-800 mb-0.5 leading-tight group-hover:text-shiso-900 transition-colors duration-300 line-clamp-2">
                          {award.title}
                        </h3>
                        <p className="text-marshland-600 text-[0.7rem] leading-relaxed mb-0.5 line-clamp-2">
                          {award.subtitle}
                        </p>
                        <div className="inline-block">
                          <span className="text-[0.7rem] font-bold px-1 py-0.5 rounded-full bg-gradient-to-br from-shiso-700 via-shiso-900 to-amber-400 text-white shadow-sm">
                            {award.category}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-shiso-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="mt-2 md:mt-5 text-center flex-shrink-0 pb-2 sm:pb-0">
              <Link
                href="/kitchen"
                className="inline-flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl border border-shiso-200/50 font-semibold text-xs md:text-base text-shiso-800 hover:bg-shiso-50 transition-colors"
              >
                <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                <span>Tour our award-winning kitchen</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Awards.displayName = "Awards";
