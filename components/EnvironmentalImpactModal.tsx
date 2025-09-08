"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EnvironmentalImpactCalculator from "./EnvironmentalImpactCalculator";

interface EnvironmentalImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample order for the demo
const sampleOrder = [
  {
    menuItem: {
      id: 1,
      name: "Mushroom Tonkotsu Ramen",
      carbonFootprint: 2,
      tags: ["mushroom", "noodles", "broth"],
    },
    quantity: 1,
  },
  {
    menuItem: {
      id: 2,
      name: "Vegetarian Gyoza",
      carbonFootprint: 2,
      tags: ["vegetarian", "appetizer"],
    },
    quantity: 1,
  },
  {
    menuItem: {
      id: 3,
      name: "Green Tea",
      carbonFootprint: 1,
      tags: ["beverage", "organic"],
    },
    quantity: 1,
  },
];

export function EnvironmentalImpactModal({
  isOpen,
  onClose,
}: EnvironmentalImpactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-shiso-50 to-amber-50">
              <div>
                <h2 className="text-2xl font-bold text-shiso-900">
                  Environmental Impact Calculator
                </h2>
                <p className="text-shiso-700 mt-1">
                  See the environmental impact of your sample order
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <EnvironmentalImpactCalculator
                order={sampleOrder}
                isOrderMode={true}
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  This is a sample order. Create your own order to see
                  personalized impact.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-shiso-600 text-white rounded-lg hover:bg-shiso-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
