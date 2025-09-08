"use client";

import { motion } from "framer-motion";

export default function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <motion.div className="transform flex gap-4 z-2 pb-10 pt-6">
      {[...Array(totalSteps)].map((_, i) => (
        <motion.div key={i} className="relative">
          <div
            className="w-4 h-4 rounded-full border-2 relative"
            style={{
              backgroundColor:
                i <= currentStep ? "var(--color-shiso-600)" : "transparent",
              borderColor:
                i <= currentStep
                  ? "var(--color-shiso-600)"
                  : "var(--color-shiso-400)",
              boxShadow:
                i === currentStep ? "0 0 20px rgba(80, 177, 131, 0.5)" : "none",
            }}
          >
            {i === currentStep && (
              <motion.div className="absolute inset-0 rounded-full" />
            )}
          </div>
          {i < totalSteps - 1 && (
            <div
              className="absolute top-2 left-4 w-4 h-0.5"
              style={{
                backgroundColor:
                  i < currentStep
                    ? "var(--color-shiso-600)"
                    : "var(--color-shiso-400)",
                opacity: i < currentStep ? 1 : 0.3,
              }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
