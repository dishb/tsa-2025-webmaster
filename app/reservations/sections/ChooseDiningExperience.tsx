"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import JapaneseBorder from "../components/JapaneseBorder";
import { slideInVariants } from "../animationVariants";
import type { Location } from "../types";

export default function ChooseDiningExperience({
  locations,
  location,
  setLocation,
}: {
  locations: Location[];
  location: string;
  setLocation: (loc: string) => void;
}) {
  return (
    <motion.section
      key="step-0"
      variants={slideInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-4xl px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center mb-10"
      >
        <h1 className="text-5xl font-bold font-serif text-shiso-900 text-shadow-[2px_2px_4px_rgba(80,177,131,0.3)]">
          Choose Your Dining Experience
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {locations.map((loc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="cursor-pointer"
          >
            <JapaneseBorder>
              <div
                className="text-center p-6"
                onClick={() => setLocation(loc.name)}
                style={{
                  backgroundColor:
                    location === loc.name
                      ? "rgba(80, 177, 131, 0.1)"
                      : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={
                    location === loc.name ? { rotate: [0, 5, -5, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {loc.image}
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-shiso-900">
                  {loc.name}
                </h3>
                <p className="text-sm opacity-70 text-marshland-700">
                  {loc.description}
                </p>
                {location === loc.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4"
                  >
                    <CheckCircle className="w-8 h-8 mx-auto text-shiso-600" />
                  </motion.div>
                )}
              </div>
            </JapaneseBorder>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
