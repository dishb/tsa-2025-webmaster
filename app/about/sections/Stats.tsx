import { motion } from "framer-motion";

import { SeigaihaPattern } from "../components/SeigaihaPattern";

export const StatsSection = () => {
  const stats = [
    { number: "100%", label: "植物性食材", sublabel: "Plant-Based Dishes" },
    { number: "0", label: "食品廃棄物", sublabel: "Food Waste" },
    { number: "50+", label: "地元サプライヤー", sublabel: "Local Suppliers" },
    { number: "10k+", label: "満足したお客様", sublabel: "Happy Customers" },
  ];

  return (
    <section className="clamp-[py,8,16] bg-gradient-to-b from-shiso-900 via-shiso-800 to-shiso-900 relative overflow-hidden">
      {/* Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <SeigaihaPattern />
      </div>
      {/* Washi paper texture */}
      <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-30 mix-blend-multiply pointer-events-none" />
      {/* Big vertical Japanese background letter */}
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none z-10"
        style={{ left: "50%", width: "50%" }}
      >
        <span
          className="font-sawarabi-mincho text-[18vw] text-shiso-400 opacity-20 select-none"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
            letterSpacing: "0.1em",
          }}
        >
          使命
        </span>
      </div>
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span
            className="font-sawarabi-mincho text-4xl text-shiso-200 mb-2 tracking-widest"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.2em",
            }}
          >
            統計
          </span>
          <span className="block w-1 h-10 bg-shiso-400 rounded-full mb-2" />
          <h2 className="text-6xl font-serif font-semibold text-bianca-50 mb-6 text-center">
            Our Impact
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: index * 0.2,
              }}
              viewport={{ once: false }}
            >
              {/* Ema plaque string */}
              <div className="h-8 flex items-end justify-center">
                <div className="w-1 h-8 bg-shiso-200 rounded-full" />
                <div className="w-2 h-2 bg-shiso-200 rounded-full -ml-1" />
              </div>
              {/* Ema plaque */}
              <div className="relative w-48 h-40 bg-[url('/images/about/ema-wood.png')] bg-cover bg-center rounded-b-3xl border-2 border-shiso-700 shadow-xl flex flex-col items-center justify-center px-4 py-6">
                {/* Number */}
                <div className="text-5xl font-sawarabi-mincho font-bold text-bianca-50 mb-1 drop-shadow-lg">
                  {stat.number}
                </div>
                {/* Japanese label */}
                <div className="font-sawarabi-mincho text-shiso-200 text-lg mb-1">
                  {stat.label}
                </div>
                {/* English sublabel */}
                <div className="text-shiso-100 text-sm">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
