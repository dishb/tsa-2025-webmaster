"use client";

import { WrappedCountUp } from "@/components/WrappedCountUp";
import { forwardRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";

export interface SustainabilityProps {
  fadeBgOpacity?: number | MotionValue<number>;
}
export const Sustainability = forwardRef<HTMLDivElement, SustainabilityProps>(
  ({ fadeBgOpacity = 0 }, sectionRef) => {
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
        className="relative w-full h-screen flex flex-col justify-center items-center bg-bianca-100 text-bianca-50 overflow-hidden pt-24 pb-8 px-3 md:px-12"
      >
        {/* Fade overlay to solid bg-bianca-100 when not in view */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-shiso-900 via-shiso-800 to-shiso-900 z-10 transition-opacity duration-700"
        />

        {/* Decorative large number - bottom right, behind content */}
        <span className="pointer-events-none z-10 block font-sans absolute right-0 bottom-0 text-[6.5rem] md:text-[13rem] font-extrabold text-shiso-200 opacity-10 select-none">
          03
        </span>
        {/* Vertical kanji text decoration */}
        <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none opacity-10 z-10">
          <div className="writing-mode-vertical text-5xl font-serif text-shiso-200 transform -rotate-90 whitespace-nowrap">
            持続可能性
          </div>
        </div>
        <div className="relative z-10 max-w-4xl w-full h-full flex items-center justify-center px-4 md:px-8 py-8 md:py-12">
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          >
            <h2 className="font-sawarabi-mincho clamp-[text,base,3xl] text-bianca-50 mb-2 md:mb-4 tracking-widest leading-tight text-center">
              持続可能性
            </h2>
            <h3 className="clamp-[text,2xl,5xl] font-serif font-semibold text-shiso-100 mb-3 md:mb-6 leading-tight text-center">
              Sustainability at Hiroshi Ramen
            </h3>
            <p className="clamp-[text,base,xl] text-shiso-200 max-w-2xl mx-auto text-center">
              At Hiroshi Ramen, sustainability is woven into every bowl. From
              eco-friendly packaging and zero-waste kitchen practices to
              sourcing local, organic ingredients, we honor both tradition and
              the planet. Our commitment is to nourish our guests and the
              earth—one delicious, mindful meal at a time.
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-5 w-full items-center justify-center">
              {/* Stat 1 */}
              <div className="flex-1 flex flex-col text-center items-center bg-shiso-800/80 rounded-2xl shadow-xl border border-shiso-200/30 p-4 md:p-8 max-w-xs w-full min-h-[140px] md:min-h-[240px] h-10 sm:h-full">
                <span className="text-shiso-200 font-sawarabi-mincho text-lg md:text-xl mb-2 tracking-widest">
                  食品ロス削減
                </span>
                <span className="text-bianca-50 font-bold text-lg md:text-2xl mb-1">
                  Meals Saved from Waste
                </span>
                <WrappedCountUp
                  start={0}
                  end={3912}
                  suffix=" meals"
                  enableScrollSpy={true}
                >
                  {({ countUpRef }) => (
                    <span
                      className="clamp-[text,3xl,4xl] font-extrabold text-shiso-100"
                      ref={countUpRef}
                    />
                  )}
                </WrappedCountUp>
              </div>
              {/* Stat 2 */}
              <div className="flex-1 flex flex-col text-center items-center bg-shiso-800/80 rounded-2xl shadow-xl border border-shiso-200/30 p-4 md:p-8 max-w-xs w-full min-h-[140px] md:min-h-[240px] h-10 sm:h-full">
                <span className="text-shiso-200 font-sawarabi-mincho text-lg md:text-xl mb-2 tracking-widest">
                  プラスチック削減
                </span>
                <span className="text-bianca-50 font-bold text-lg md:text-2xl mb-1">
                  Plastic Eliminated
                </span>
                <WrappedCountUp
                  start={0}
                  end={22000}
                  suffix="+ utensils"
                  enableScrollSpy={true}
                >
                  {({ countUpRef }) => (
                    <span
                      className="clamp-[text,3xl,4xl] font-extrabold text-shiso-100"
                      ref={countUpRef}
                    />
                  )}
                </WrappedCountUp>
              </div>
              {/* Stat 3 */}
              <div className="flex-1 flex flex-col text-center items-center bg-shiso-800/80 rounded-2xl shadow-xl border border-shiso-200/30 p-4 md:p-8 max-w-xs w-full min-h-[140px] md:min-h-[240px] h-10 sm:h-full">
                <span className="text-shiso-200 font-sawarabi-mincho text-lg md:text-xl mb-2 tracking-widest">
                  カーボンオフセット
                </span>
                <span className="text-bianca-50 font-bold text-lg md:text-2xl mb-1">
                  Carbon Footprint Offset
                </span>
                <WrappedCountUp
                  start={0}
                  end={4.1}
                  decimals={1}
                  suffix=" tons"
                  enableScrollSpy={true}
                >
                  {({ countUpRef }) => (
                    <span
                      className="clamp-[text,3xl,4xl] font-extrabold text-shiso-100"
                      ref={countUpRef}
                    />
                  )}
                </WrappedCountUp>
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: useTransform(overlayOpacity, (v) => 1 - v) }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          >
            <h2 className="font-sawarabi-mincho clamp-[text,base,3xl] text-shiso-800 mb-2 md:mb-4 tracking-widest leading-tight text-center">
              持続可能性
            </h2>
            <h3 className="clamp-[text,2xl,5xl] font-serif font-semibold text-shiso-900 mb-3 md:mb-6 leading-tight text-center">
              Sustainability at Hiroshi Ramen
            </h3>
            <p className="clamp-[text,base,xl] text-marshland-700 max-w-2xl mx-auto leading-relaxed text-center">
              At Hiroshi Ramen, sustainability is woven into every bowl. From
              eco-friendly packaging and zero-waste kitchen practices to
              sourcing local, organic ingredients, we honor both tradition and
              the planet. Our commitment is to nourish our guests and the
              earth—one delicious, mindful meal at a time.
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-5 w-full items-center justify-center">
              {/* Stat 1 */}
              <div className="flex-1 flex flex-col text-center items-center bg-white rounded-2xl shadow-xl border border-shiso-200/50 p-4 md:p-8 max-w-xs w-full min-h-[140px] md:min-h-[240px] h-full">
                <span className="text-shiso-700 font-sawarabi-mincho text-lg md:text-xl mb-2 tracking-widest">
                  食品ロス削減
                </span>
                <span className="text-shiso-900 font-bold clamp-[text,base,3xl] mb-1">
                  Meals Saved from Waste
                </span>
                <WrappedCountUp
                  start={0}
                  end={3912}
                  suffix=" meals"
                  enableScrollSpy={true}
                >
                  {({ countUpRef }) => (
                    <span
                      className="clamp-[text,3xl,4xl] font-extrabold text-shiso-700"
                      ref={countUpRef}
                    />
                  )}
                </WrappedCountUp>
              </div>
              {/* Stat 2 */}
              <div className="flex-1 flex flex-col text-center items-center bg-white rounded-2xl shadow-xl border border-shiso-200/50 p-4 md:p-8 max-w-xs w-full min-h-[140px] md:min-h-[240px] h-10 sm:h-full">
                <span className="text-shiso-700 font-sawarabi-mincho text-lg md:text-xl mb-2 tracking-widest">
                  プラスチック削減
                </span>
                <span className="text-shiso-900 font-bold text-lg md:text-2xl mb-1">
                  Plastic Eliminated
                </span>
                <WrappedCountUp
                  start={0}
                  end={22000}
                  suffix="+ utensils"
                  enableScrollSpy={true}
                >
                  {({ countUpRef }) => (
                    <span
                      className="clamp-[text,3xl,4xl] font-extrabold text-shiso-700"
                      ref={countUpRef}
                    />
                  )}
                </WrappedCountUp>
              </div>
              {/* Stat 3 */}
              <div className="flex-1 flex flex-col text-center items-center bg-white rounded-2xl shadow-xl border border-shiso-200/50 p-4 md:p-8 max-w-xs w-full min-h-[140px] md:min-h-[240px] h-10 sm:h-full">
                <span className="text-shiso-700 font-sawarabi-mincho text-lg md:text-xl mb-2 tracking-widest">
                  カーボンオフセット
                </span>
                <span className="text-shiso-900 font-bold text-lg md:text-2xl mb-1">
                  Carbon Footprint Offset
                </span>
                <WrappedCountUp
                  start={0}
                  end={4.1}
                  decimals={1}
                  suffix=" tons"
                  enableScrollSpy={true}
                >
                  {({ countUpRef }) => (
                    <span
                      className="clamp-[text,3xl,4xl] font-extrabold text-shiso-700"
                      ref={countUpRef}
                    />
                  )}
                </WrappedCountUp>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  },
);

Sustainability.displayName = "Sustainability";
