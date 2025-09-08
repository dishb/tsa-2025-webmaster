import { motion } from "framer-motion";

// Enhanced Hero Section
export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Dark Header Section with Footer Theme */}
      <div className="bg-gradient-to-b from-shiso-900 via-shiso-800 to-shiso-900 relative overflow-hidden">
        {/* Animated Background Elements for Header */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Lanterns */}
          <motion.div
            className="absolute top-20 left-10 w-8 h-12 bg-amber-400/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-6 h-10 bg-amber-300/30 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-7 h-11 bg-amber-500/25 rounded-full"
            animate={{
              y: [0, -25, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <main className="container mx-auto px-4 py-12 relative z-10">
          <header className="text-center w-full clamp-[pt,18,24,sm,3xl] clamp-[pb,18,24,sm,3xl] relative">
            {/* Vertical Kanji background */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <span
                className="font-sawarabi-mincho text-[20vw] text-bianca-50 opacity-5 select-none"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  letterSpacing: "0.2em",
                }}
              >
                私たちについて
              </span>
            </div>

            <motion.h1
              className="text-6xl font-serif mb-2 text-bianca-50 relative z-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Us
            </motion.h1>
            <motion.p
              className="text-xl text-shiso-200 relative z-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Tradition meets innovation in every bowl
            </motion.p>
          </header>
        </main>
      </div>
    </section>
  );
};
