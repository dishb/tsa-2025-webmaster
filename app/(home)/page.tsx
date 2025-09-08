"use client";

import { useRef, useState, useEffect, FC } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  useMotionTemplate,
} from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import { Hero } from "./sections/Hero";
import { Mission } from "./sections/Mission";
import { Awards } from "./sections/Awards";
import { Sustainability } from "./sections/Sustainability";

const testimonials = [
  {
    name: "Sakura T.",
    avatar: "https://i.pravatar.cc/150?u=ramen1",
    rating: 5,
    comment:
      "The best vegetarian ramen I've ever had! The flavors are so deep and authentic. I love the attention to detail in every bowl.",
  },
  {
    name: "Kenji M.",
    avatar: "https://i.pravatar.cc/150?u=ramen2",
    rating: 5,
    comment:
      "A true taste of Japan, but with a modern, sustainable twist. The staff are so friendly and the atmosphere is beautiful.",
  },
  {
    name: "Alex W.",
    avatar: "https://i.pravatar.cc/150?u=ramen3",
    rating: 4,
    comment:
      "I never thought vegan ramen could be this good. The chef's tips on the menu are a great touch!",
  },
  {
    name: "Priya S.",
    avatar: "https://i.pravatar.cc/150?u=ramen4",
    rating: 5,
    comment:
      "Every visit is a delight. The seasonal specials keep me coming back. Highly recommend the truffle shiitake!",
  },
];

const TestimonialsCarousel: FC = () => {
  const numTestimonials = testimonials.length;
  const [state, setState] = useState<[number, number]>([0, 0]);
  const [index, direction] = state;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progress = useMotionValue(0);
  const nextIndex = (i: number) => (i + 1) % numTestimonials;
  const prevIndex = (i: number) => (i - 1 + numTestimonials) % numTestimonials;

  // Auto-advance every 6s
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    progress.set(0);
    const controls = animate(progress, 100, { duration: 6, ease: "linear" });
    timeoutRef.current = setTimeout(() => {
      setState(([i]) => [nextIndex(i), 1]);
    }, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      controls.stop();
    };
  }, [index, progress]);

  // Swipe/drag support
  const handleDragEnd = (_e: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) setState(([i]) => [nextIndex(i), 1]);
    else if (info.offset.x > 50) setState(([i]) => [prevIndex(i), -1]);
  };

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.7,
      rotateY: dir > 0 ? 60 : -60,
      filter: "blur(8px) grayscale(80%)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1.08,
      rotateY: 0,
      filter: "blur(0px) grayscale(0%)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.7,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.7,
      rotateY: dir < 0 ? 60 : -60,
      filter: "blur(8px) grayscale(80%)",
    }),
  };

  // Floating/parallax effect for the active card
  const [float, setFloat] = useState(0);
  useEffect(() => {
    let frame: number;
    let t = 0;
    function animate() {
      setFloat(Math.sin(t) * 8);
      t += 0.04;
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full h-[360px] flex items-center justify-center select-none">
        <motion.div
          key={index}
          className="absolute w-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring" as const,
            stiffness: 300,
            damping: 30,
            duration: 0.7,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          style={{
            y: float, // floating effect
            boxShadow: `0 8px 40px 0 rgba(80, 177, 131, 0.15), 0 1.5px 8px 0 rgba(255,183,197,0.10)`,
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ rotate: -2 }}
            animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.04, 0.98, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-xl border border-shiso-100 p-8 flex flex-col items-center text-center relative overflow-hidden mx-2"
          >
            <img
              src={testimonials[index].avatar}
              alt={testimonials[index].name}
              className="w-16 h-16 rounded-full border-2 border-shiso-200 mb-4 shadow"
              loading="lazy"
            />
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-5 h-5 ${
                    j < testimonials[index].rating
                      ? "text-amber-400 fill-current"
                      : "text-shiso-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-lg text-shiso-900 font-medium mb-2">
              {testimonials[index].name}
            </p>
            <p className="text-shiso-700 text-base italic">
              &ldquo;{testimonials[index].comment}&rdquo;
            </p>
            {/* Decorative sakura petal */}
            <svg
              className="absolute -top-4 -right-4 w-10 h-10 opacity-10"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 2C18 8 26 8 30 16C26 24 18 24 16 30C14 24 6 24 2 16C6 8 14 8 16 2Z"
                fill="#FFB7C5"
              />
            </svg>
          </motion.div>
        </motion.div>
        {/* Left arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-shiso-50/80 hover:bg-shiso-200 text-shiso-700 rounded-full p-2 shadow transition z-10"
          onClick={() => setState(([i]) => [prevIndex(i), -1])}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* Right arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-shiso-50/80 hover:bg-shiso-200 text-shiso-700 rounded-full p-2 shadow transition z-10"
          onClick={() => setState(([i]) => [nextIndex(i), 1])}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-shiso-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-shiso-500 to-amber-400"
            style={{ width: useMotionTemplate`${progress}%` }}
            aria-label="Testimonial progress bar"
          />
        </div>
      </div>
      {/* Progress dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              i === index
                ? "bg-shiso-500 border-shiso-500 scale-125"
                : "bg-shiso-200 border-shiso-300"
            }`}
            onClick={() => setState([i, i > index ? 1 : -1])}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const awardsSectionRef = useRef<HTMLDivElement>(null);
  const sustainabilitySectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });

  // total panels
  const sectionCount = 3;
  // percent we translate at v=1
  const maxOffset = 66.6667; // 2 panels × (100% ÷ 3)
  // how close (in scrollYProgress units) we have to be to snap
  const threshold = 0.02;

  // where in [0, 1] the ideal snap-points lie
  const snapPoints = Array.from(
    { length: sectionCount },
    (_, i) => i / (sectionCount - 1),
  );
  // create a single transform that either snaps or pans
  const x = useTransform(scrollYProgress, (v) => {
    // find nearest snap‐point
    let nearest = snapPoints[0];
    for (const p of snapPoints) {
      if (Math.abs(p - v) < Math.abs(nearest - v)) nearest = p;
    }
    // if we're within threshold of that point, snap
    if (Math.abs(v - nearest) < threshold) {
      return `-${(nearest * maxOffset).toFixed(4)}%`;
    }
    // otherwise pan continuously
    return `-${(v * maxOffset).toFixed(4)}%`;
  });

  // Awards fade overlay logic
  const { scrollYProgress: awardsScrollY } = useScroll({
    target: horizontalRef,
    offset: ["start end", "end start"],
  });
  const awardsFadeBgOpacity = useTransform(
    awardsScrollY,
    [0.48, 0.485],
    [0, 1],
  );

  // Awards fade overlay logic
  const { scrollYProgress: sustainabilityScrollY } = useScroll({
    target: horizontalRef,
    offset: ["start end", "end start"],
  });
  const sustainabilityFadeBgOpacity = useTransform(
    sustainabilityScrollY,
    [0.73, 0.735],
    [0, 1],
  );

  return (
    <>
      <ScrollToTop />
      <Navbar invertTextColor={true} />
      <main>
        <Hero />

        <div ref={horizontalRef} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex">
              <div className="flex h-screen w-screen flex-shrink-0 items-center justify-center">
                <Mission />
              </div>
              <div className="flex h-screen w-screen flex-shrink-0 items-center justify-center">
                <Awards
                  ref={awardsSectionRef}
                  fadeBgOpacity={awardsFadeBgOpacity}
                />
              </div>
              <div className="flex h-screen w-screen flex-shrink-0 items-center justify-center">
                <Sustainability
                  ref={sustainabilitySectionRef}
                  fadeBgOpacity={sustainabilityFadeBgOpacity}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Testimonials Carousel */}
        <section className="relative bg-bianca-100 py-20 overflow-hidden border-t border-shiso-100">
          {/* Big vertical Japanese background letter */}
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-10"
            style={{ right: "50%", width: "50%" }}
          >
            <span
              className="font-sawarabi-mincho text-[18vw] text-marshland-900 opacity-10 select-none"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "0.2em",
              }}
            >
              お客
            </span>
          </div>
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-10"
            style={{ left: "50%", width: "50%" }}
          >
            <span
              className="font-sawarabi-mincho text-[18vw] text-marshland-900 opacity-10 select-none"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "0.2em",
              }}
            >
              様の
            </span>
          </div>
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-serif font-extrabold text-center mb-14 bg-gradient-to-r from-shiso-700 via-shiso-900 to-amber-400 bg-clip-text text-transparent"
            >
              お客様の声{" "}
              <span className="block text-4xl md:text-5xl font-sans font-semibold text-gradient-to-r from-shiso-700 via-shiso-900 to-amber-400 ">
                What Our Guests Say
              </span>
            </motion.h2>
            <TestimonialsCarousel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
