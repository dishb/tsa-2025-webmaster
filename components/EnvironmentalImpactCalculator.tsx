import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "./ui/slider";

interface ImpactData {
  carbonFootprint: number; // kg CO2
  waterUsage: number; // gallons
  wasteGenerated: number; // kg
  energyUsed: number; // kWh
}

interface MealChoice {
  name: string;
  traditional: ImpactData;
  sustainable: ImpactData;
  description: string;
}

interface OrderItem {
  menuItem: {
    id: number;
    name: string;
    carbonFootprint: number; // 1 (low) to 5 (high)
    tags: string[];
  };
  quantity: number;
}

interface EnvironmentalImpactCalculatorProps {
  order?: OrderItem[];
  isOrderMode?: boolean;
}

const mealChoices: MealChoice[] = [
  {
    name: "Mushroom Tonkotsu Ramen",
    traditional: {
      carbonFootprint: 3.2,
      waterUsage: 450,
      wasteGenerated: 0.8,
      energyUsed: 2.1,
    },
    sustainable: {
      carbonFootprint: 1.1,
      waterUsage: 180,
      wasteGenerated: 0.1,
      energyUsed: 0.8,
    },
    description:
      "Rich mushroom broth with sustainable mushrooms and local vegetables",
  },
  {
    name: "Miso Ramen",
    traditional: {
      carbonFootprint: 2.8,
      waterUsage: 380,
      wasteGenerated: 0.6,
      energyUsed: 1.9,
    },
    sustainable: {
      carbonFootprint: 0.9,
      waterUsage: 150,
      wasteGenerated: 0.08,
      energyUsed: 0.7,
    },
    description: "Traditional miso with organic tofu and seasonal vegetables",
  },
  {
    name: "Shoyu Ramen",
    traditional: {
      carbonFootprint: 2.5,
      waterUsage: 320,
      wasteGenerated: 0.5,
      energyUsed: 1.7,
    },
    sustainable: {
      carbonFootprint: 0.7,
      waterUsage: 120,
      wasteGenerated: 0.06,
      energyUsed: 0.6,
    },
    description: "Soy sauce broth with sustainable mushrooms and local greens",
  },
  {
    name: "Vegetarian Ramen",
    traditional: {
      carbonFootprint: 1.8,
      waterUsage: 280,
      wasteGenerated: 0.4,
      energyUsed: 1.4,
    },
    sustainable: {
      carbonFootprint: 0.4,
      waterUsage: 90,
      wasteGenerated: 0.03,
      energyUsed: 0.4,
    },
    description: "Plant-based broth with organic vegetables and mushrooms",
  },
];

const EnvironmentalImpactCalculator: React.FC<
  EnvironmentalImpactCalculatorProps
> = ({ order = [], isOrderMode = false }) => {
  const [selectedMeal, setSelectedMeal] = useState<MealChoice>(mealChoices[0]);
  const [mealsPerWeek, setMealsPerWeek] = useState(3);

  // Calculate impact based on order items if in order mode
  const calculateOrderImpact = (): ImpactData => {
    if (!order.length)
      return {
        carbonFootprint: 0,
        waterUsage: 0,
        wasteGenerated: 0,
        energyUsed: 0,
      };

    let totalCarbonFootprint = 0;
    let totalWaterUsage = 0;
    let totalWasteGenerated = 0;
    let totalEnergyUsed = 0;

    order.forEach(({ menuItem, quantity }) => {
      // Convert carbon footprint rating (1-5) to actual kg CO2
      const carbonPerItem = menuItem.carbonFootprint * 0.8; // 0.8 kg CO2 per rating point
      const waterPerItem = menuItem.carbonFootprint * 100; // 100 gallons per rating point
      const wastePerItem = menuItem.carbonFootprint * 0.15; // 0.15 kg waste per rating point
      const energyPerItem = menuItem.carbonFootprint * 0.4; // 0.4 kWh per rating point

      totalCarbonFootprint += carbonPerItem * quantity;
      totalWaterUsage += waterPerItem * quantity;
      totalWasteGenerated += wastePerItem * quantity;
      totalEnergyUsed += energyPerItem * quantity;
    });

    return {
      carbonFootprint: totalCarbonFootprint,
      waterUsage: totalWaterUsage,
      wasteGenerated: totalWasteGenerated,
      energyUsed: totalEnergyUsed,
    };
  };

  // Calculate sustainable impact (assuming 60% reduction for sustainable practices)
  const calculateSustainableOrderImpact = (): ImpactData => {
    const traditional = calculateOrderImpact();
    return {
      carbonFootprint: traditional.carbonFootprint * 0.4,
      waterUsage: traditional.waterUsage * 0.4,
      wasteGenerated: traditional.wasteGenerated * 0.2,
      energyUsed: traditional.energyUsed * 0.4,
    };
  };

  const calculateAnnualImpact = (impact: ImpactData) => ({
    carbonFootprint: impact.carbonFootprint * mealsPerWeek * 52,
    waterUsage: impact.waterUsage * mealsPerWeek * 52,
    wasteGenerated: impact.wasteGenerated * mealsPerWeek * 52,
    energyUsed: impact.energyUsed * mealsPerWeek * 52,
  });

  // Use order-based calculations if in order mode, otherwise use meal selection
  const traditionalImpact = isOrderMode
    ? calculateOrderImpact()
    : selectedMeal.traditional;
  const sustainableImpact = isOrderMode
    ? calculateSustainableOrderImpact()
    : selectedMeal.sustainable;

  const traditionalAnnual = calculateAnnualImpact(traditionalImpact);
  const sustainableAnnual = calculateAnnualImpact(sustainableImpact);

  const savings = {
    carbonFootprint:
      traditionalAnnual.carbonFootprint - sustainableAnnual.carbonFootprint,
    waterUsage: traditionalAnnual.waterUsage - sustainableAnnual.waterUsage,
    wasteGenerated:
      traditionalAnnual.wasteGenerated - sustainableAnnual.wasteGenerated,
    energyUsed: traditionalAnnual.energyUsed - sustainableAnnual.energyUsed,
  };

  const getImpactColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage < 30) return "text-green-600";
    if (percentage < 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSavingsColor = (savings: number) => {
    if (savings > 0) return "text-green-600";
    return "text-red-600";
  };

  // If in order mode and no items, show empty state
  if (isOrderMode && !order.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Environmental Impact
        </h3>
        <p className="text-gray-600">
          Add items to your order to see their environmental impact.
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-bianca-100 to-bianca-50 relative overflow-hidden">
      {/* Japanese decorative background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern
              id="seigaiha-impact"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,10 Q5,5 10,10 Q15,15 20,10"
                stroke="#B6C7A8"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M0,15 Q5,10 10,15 Q15,20 20,15"
                stroke="#B6C7A8"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#seigaiha-impact)" />
        </svg>
      </div>

      {/* Vertical kanji text decoration */}
      <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none opacity-10">
        <div className="writing-mode-vertical text-6xl font-serif text-shiso-600 transform -rotate-90 whitespace-nowrap">
          環境影響計算機
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-serif font-semibold text-shiso-900 mb-4"
          >
            {isOrderMode
              ? "Your Order's Environmental Impact"
              : "Environmental Impact Calculator"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-marshland-700 max-w-3xl mx-auto"
          >
            {isOrderMode
              ? "See the environmental impact of your current order and how sustainable choices make a difference."
              : "See how your meal choices impact the environment. Compare traditional vs. sustainable practices and discover the positive difference you can make."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meal Selection - Only show if not in order mode */}
          {!isOrderMode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif font-semibold text-shiso-800 mb-4">
                Choose Your Meal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mealChoices.map((meal) => (
                  <motion.button
                    key={meal.name}
                    onClick={() => setSelectedMeal(meal)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedMeal.name === meal.name
                        ? "border-shiso-500 bg-shiso-50 shadow-lg"
                        : "border-shiso-200 bg-white hover:border-shiso-300 hover:shadow-md"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-left">
                      <h4 className="font-semibold text-shiso-800 mb-2">
                        {meal.name}
                      </h4>
                      <p className="text-sm text-marshland-600">
                        {meal.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8">
                <label className="block text-lg font-semibold text-shiso-800 mb-3">
                  Meals per Week: {mealsPerWeek}
                </label>
                <Slider
                  value={[mealsPerWeek]}
                  max={7}
                  min={1}
                  step={1}
                  onValueChange={(value) => setMealsPerWeek(value[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-marshland-600 mt-2">
                  <span>1 meal</span>
                  <span>7 meals</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Order Summary - Only show if in order mode */}
          {isOrderMode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif font-semibold text-shiso-800 mb-4">
                Your Order Summary
              </h3>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-shiso-200">
                <div className="space-y-4">
                  {order.map(({ menuItem, quantity }) => (
                    <div
                      key={menuItem.id}
                      className="flex justify-between items-center py-2 border-b border-shiso-100 last:border-b-0"
                    >
                      <div>
                        <h4 className="font-semibold text-shiso-800">
                          {menuItem.name}
                        </h4>
                        <div className="flex gap-2 mt-1">
                          {menuItem.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-shiso-100 text-shiso-700 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-shiso-800">
                          Qty: {quantity}
                        </span>
                        <div className="text-sm text-marshland-600">
                          Impact: {menuItem.carbonFootprint}/5
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-shiso-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-shiso-800">
                      Total Items:
                    </span>
                    <span className="font-bold text-shiso-800">
                      {order.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-lg font-semibold text-shiso-800 mb-3">
                  If you ordered this weekly: {mealsPerWeek} times per week
                </label>
                <Slider
                  value={[mealsPerWeek]}
                  max={7}
                  min={1}
                  step={1}
                  onValueChange={(value) => setMealsPerWeek(value[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-marshland-600 mt-2">
                  <span>1 time</span>
                  <span>7 times</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Impact Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif font-semibold text-shiso-800 mb-4">
              Annual Impact Comparison
            </h3>

            {/* Carbon Footprint */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-shiso-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-shiso-800">
                  Carbon Footprint
                </h4>
                <span className="text-sm text-marshland-600">kg CO2/year</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Traditional
                  </span>
                  <span
                    className={`font-semibold ${getImpactColor(
                      traditionalAnnual.carbonFootprint,
                      200,
                    )}`}
                  >
                    {traditionalAnnual.carbonFootprint.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Sustainable
                  </span>
                  <span className="font-semibold text-green-600">
                    {sustainableAnnual.carbonFootprint.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-shiso-200">
                  <span className="text-sm font-semibold text-shiso-800">
                    You Save
                  </span>
                  <span
                    className={`font-bold text-lg ${getSavingsColor(
                      savings.carbonFootprint,
                    )}`}
                  >
                    {savings.carbonFootprint.toFixed(1)} kg CO2
                  </span>
                </div>
              </div>
            </div>

            {/* Water Usage */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-shiso-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-shiso-800">
                  Water Usage
                </h4>
                <span className="text-sm text-marshland-600">gallons/year</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Traditional
                  </span>
                  <span
                    className={`font-semibold ${getImpactColor(
                      traditionalAnnual.waterUsage,
                      20000,
                    )}`}
                  >
                    {traditionalAnnual.waterUsage.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Sustainable
                  </span>
                  <span className="font-semibold text-green-600">
                    {sustainableAnnual.waterUsage.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-shiso-200">
                  <span className="text-sm font-semibold text-shiso-800">
                    You Save
                  </span>
                  <span
                    className={`font-bold text-lg ${getSavingsColor(
                      savings.waterUsage,
                    )}`}
                  >
                    {savings.waterUsage.toLocaleString()} gallons
                  </span>
                </div>
              </div>
            </div>

            {/* Waste Generated */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-shiso-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-shiso-800">
                  Waste Generated
                </h4>
                <span className="text-sm text-marshland-600">kg/year</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Traditional
                  </span>
                  <span
                    className={`font-semibold ${getImpactColor(
                      traditionalAnnual.wasteGenerated,
                      50,
                    )}`}
                  >
                    {traditionalAnnual.wasteGenerated.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Sustainable
                  </span>
                  <span className="font-semibold text-green-600">
                    {sustainableAnnual.wasteGenerated.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-shiso-200">
                  <span className="text-sm font-semibold text-shiso-800">
                    You Save
                  </span>
                  <span
                    className={`font-bold text-lg ${getSavingsColor(
                      savings.wasteGenerated,
                    )}`}
                  >
                    {savings.wasteGenerated.toFixed(1)} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Energy Used */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-shiso-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-shiso-800">
                  Energy Used
                </h4>
                <span className="text-sm text-marshland-600">kWh/year</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Traditional
                  </span>
                  <span
                    className={`font-semibold ${getImpactColor(
                      traditionalAnnual.energyUsed,
                      150,
                    )}`}
                  >
                    {traditionalAnnual.energyUsed.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-marshland-600">
                    Sustainable
                  </span>
                  <span className="font-semibold text-green-600">
                    {sustainableAnnual.energyUsed.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-shiso-200">
                  <span className="text-sm font-semibold text-shiso-800">
                    You Save
                  </span>
                  <span
                    className={`font-bold text-lg ${getSavingsColor(
                      savings.energyUsed,
                    )}`}
                  >
                    {savings.energyUsed.toFixed(1)} kWh
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-shiso-500 to-shiso-600 rounded-2xl p-8 text-white text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>

          <h3 className="text-3xl font-serif font-bold mb-4">
            Your Impact Summary
          </h3>
          <p className="text-xl mb-6">
            {isOrderMode
              ? `By choosing sustainable options for your order ${mealsPerWeek} times per week, you're making a real difference:`
              : `By choosing sustainable ${selectedMeal.name} ${mealsPerWeek} times per week, you're making a real difference:`}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">
                {savings.carbonFootprint.toFixed(1)}
              </div>
              <div className="text-sm opacity-90">kg CO2 saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {savings.waterUsage.toLocaleString()}
              </div>
              <div className="text-sm opacity-90">gallons of water saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {savings.wasteGenerated.toFixed(1)}
              </div>
              <div className="text-sm opacity-90">kg waste diverted</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {savings.energyUsed.toFixed(1)}
              </div>
              <div className="text-sm opacity-90">kWh energy saved</div>
            </div>
          </div>
          <p className="text-lg mt-6 opacity-90">
            That&rsquo;s equivalent to planting{" "}
            {Math.round(savings.carbonFootprint / 0.5)} trees per year!
          </p>
        </motion.div>

        {/* Educational Note */}
        <div className="mt-8 text-marshland-600 flex gap-1">
          <p className="font-bold">*</p>
          <p className="text-sm">
            Impact calculations are based on industry averages and our
            sustainable practices. Actual savings may vary based on specific
            ingredients and preparation methods.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalImpactCalculator;
