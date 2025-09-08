import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";

import { SeigaihaPattern } from "../components/SeigaihaPattern";

import SustanabilityImage from "@/public/images/about/cards/sustainability.jpg";
import EnvironmentalAwakeningImage from "@/public/images/about/timeline/environmental-awakening.jpg";
import InnovationImage from "@/public/images/about/timeline/innovation.jpg";
import CircularEconomyImage from "@/public/images/about/timeline/circular-economy.jpg";
import IndustryLeaderImage from "@/public/images/about/timeline/industry-leader.jpg";
import CarbonNeutralImage from "@/public/images/about/timeline/carbon-neutral.jpg";

export const Timeline = () => {
  const timelineData = [
    {
      year: "2018",
      title: "伝統の継承",
      subtitle: "Traditional Roots",
      description:
        "Hiroshi begins his culinary journey mastering traditional ramen techniques, learning the art of plant-based broths and classic preparation methods passed down through generations.",
      image: SustanabilityImage,
      imageAlt: "Traditional ramen preparation",
      sustainabilityLevel: "Traditional",
      impact: "Reducing environmental impact",
    },
    {
      year: "2020",
      title: "意識の目覚め",
      subtitle: "Environmental Awakening",
      description:
        "After witnessing the environmental impact of traditional ramen production, Hiroshi begins researching sustainable alternatives and plant-based broth techniques.",
      image: EnvironmentalAwakeningImage,
      imageAlt: "Environmental research and development",
      sustainabilityLevel: "Transitioning",
      impact: "Reducing environmental impact",
    },
    {
      year: "2022",
      title: "革新の始まり",
      subtitle: "Innovation Begins",
      description:
        "Our flagship restaurant opens with a revolutionary approach: plant-based broths that rival traditional tonkotsu, zero-waste kitchen practices, and ethical ingredient sourcing.",
      image: InnovationImage,
      imageAlt: "First sustainable ramen restaurant",
      sustainabilityLevel: "Sustainable",
      impact: "Reducing environmental impact",
    },
    {
      year: "2023",
      title: "循環システム",
      subtitle: "Circular Systems",
      description:
        "Implementation of complete circular economy practices: food waste composting, renewable energy, water recycling, and partnerships with local organic farms.",
      image: CircularEconomyImage,
      imageAlt: "Circular economy implementation",
      sustainabilityLevel: "Circular",
      impact: "Reducing environmental impact",
    },
    {
      year: "2024",
      title: "業界の変革",
      subtitle: "Industry Transformation",
      description:
        "Recognition as a sustainability leader in the food industry. Launching educational programs to help other restaurants adopt sustainable practices.",
      image: IndustryLeaderImage,
      imageAlt: "Industry leadership and education",
      sustainabilityLevel: "Leading",
      impact: "Reducing environmental impact",
    },
    {
      year: "2025",
      title: "未来のビジョン",
      subtitle: "Future Vision",
      description:
        "Expanding our mission globally: carbon-neutral operations, regenerative agriculture partnerships, and developing sustainable food systems for the next generation.",
      image: CarbonNeutralImage,
      imageAlt: "Future sustainable food systems",
      sustainabilityLevel: "Regenerative",
      impact: "Reducing environmental impact",
    },
  ];

  return (
    <section className="clamp-[py,8,16] bg-bianca-50 relative overflow-hidden">
      {/* Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <SeigaihaPattern />
      </div>
      {/* Washi paper texture */}
      <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-40 mix-blend-multiply pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span
            className="font-sawarabi-mincho text-4xl text-shiso-400 mb-2 tracking-widest"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.2em",
            }}
          >
            進化の道
          </span>
          <span className="block w-1 h-10 bg-shiso-400 rounded-full mb-2" />
          <h2 className="text-6xl font-serif font-semibold text-shiso-900 mb-6 text-center">
            Our Evolution
          </h2>
          <p className="text-xl text-marshland-700 text-center max-w-3xl">
            From traditional ramen mastery to sustainable innovation - our
            journey toward environmental responsibility
          </p>
        </div>
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-shiso-400 to-marshland-400 transform -translate-x-1/2 z-0" />
          <div className="flex flex-col md:gap-0 gap-16">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center md:mb-24 z-10 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline node with pulse */}
                <div className="hidden md:block absolute left-1/2 top-1/2 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-8 h-8 bg-gradient-to-r from-shiso-400 to-marshland-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center" />
                </div>
                {/* Shikishi card */}
                <motion.div
                  className="w-full md:w-1/2 px-4 md:px-8 flex flex-col items-center md:items-stretch"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: 1.04,
                    rotate: index % 2 === 0 ? -2 : 2,
                  }}
                >
                  <div className="relative bg-bianca-50 border-2 border-shiso-200 rounded-2xl shadow-2xl pb-10 flex flex-col items-center md:items-start">
                    {/* Washi texture */}
                    <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-30 rounded-2xl pointer-events-none" />

                    {/* Timeline Image */}
                    <div className="relative w-full h-48 mb-6 rounded-t-xl overflow-hidden">
                      <ExportedImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover"
                        fill
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <div className="w-full h-full px-8">
                      {/* Animated year with bounce */}
                      <div className="flex items-center mb-4">
                        <span className="relative font-sawarabi-mincho font-extrabold text-5xl md:text-6xl text-shiso-900 drop-shadow-lg pr-4">
                          <span className="relative z-20">{item.year}</span>
                        </span>
                      </div>
                      <h2 className="font-sawarabi-mincho text-2xl font-bold text-shiso-900 mb-1">
                        {item.title}
                      </h2>
                      <h3 className="text-lg font-serif font-semibold text-shiso-700 mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-marshland-600 text-center md:text-left leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-shiso-500 to-marshland-500 text-white">
                          {item.sustainabilityLevel}
                        </span>
                        <span className="text-xs text-marshland-500">
                          {item.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TimelineSection = () => {
  return (
    <section className="bg-bianca-50 relative overflow-hidden">
      {/* Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <SeigaihaPattern />
      </div>
      {/* Big vertical Japanese background letter */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        <span
          className="font-sawarabi-mincho text-[18vw] text-marshland-900 opacity-20 select-none"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
            letterSpacing: "0.2em",
          }}
        >
          年表
        </span>
      </div>

      <div className="container mx-auto md:px-4 lg:px-8 relative z-20">
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-10"
          style={{ left: "50%", width: "50%" }}
        >
          <span
            className="font-sawarabi-mincho text-[18vw] text-marshland-900 opacity-20 select-none"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.2em",
            }}
          >
            使命
          </span>
        </div>
        <Timeline />
      </div>
    </section>
  );
};
