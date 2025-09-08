import ExportedImage from "next-image-export-optimizer";

import { SeigaihaPattern } from "../components/SeigaihaPattern";

import SustainabilityImage from "@/public/images/about/cards/sustainability.jpg";
import InnovationImage from "@/public/images/about/cards/innovation.webp";
import TraditionImage from "@/public/images/about/cards/tradition.jpg";

export const MissionSection = () => {
  const cards = [
    {
      title: "持続",
      subtitle: "Sustainability",
      description:
        "Zero waste, ethical sourcing, and environmental responsibility.",
      image: SustainabilityImage,
      imageAlt: "Sustainable farming practices",
    },
    {
      title: "革新",
      subtitle: "Innovation",
      description: "Pushing culinary boundaries with plant-based excellence.",
      image: InnovationImage,
      imageAlt: "Innovative ramen preparation",
    },
    {
      title: "伝統",
      subtitle: "Tradition",
      description:
        "Honoring Japanese culinary heritage with modern techniques.",
      image: TraditionImage,
      imageAlt: "Traditional ramen craftsmanship",
    },
  ];

  return (
    <section className="clamp-[py,8,16] bg-bianca-100 relative overflow-hidden">
      {/* Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <SeigaihaPattern />
      </div>
      {/* Washi paper texture */}
      <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-40 mix-blend-multiply pointer-events-none" />
      {/* Big vertical Japanese background letter */}
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none z-10"
        style={{ right: "50%", width: "50%" }}
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
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex flex-col items-center w-full">
            <span
              className="font-sawarabi-mincho text-4xl text-shiso-400 mb-2 tracking-widest"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "0.2em",
              }}
            >
              使命
            </span>
            <span className="block w-1 h-10 bg-shiso-400 rounded-full mb-2" />
            <h2 className="text-center    text-6xl font-serif font-semibold text-shiso-900 mb-6">
              Our Mission
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center"
            >
              {/* Kakejiku scroll style */}
              <div className="flex flex-col items-center w-full">
                {/* Top scroll bar */}
                <div className="w-16 h-3 bg-marshland-700 rounded-t-xl shadow" />
                {/* Main scroll body */}
                <div className="relative w-full bg-bianca-50 border-2 border-shiso-300 rounded-2xl shadow-xl pb-10 flex flex-col items-center h-[520px] justify-between">
                  {/* Washi texture */}
                  <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-30 rounded-2xl pointer-events-none" />

                  {/* Mission Image */}
                  <div className="relative w-full h-48 mb-4 rounded-t-xl overflow-hidden">
                    <ExportedImage
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Vertical Japanese heading */}
                  <span className="font-sawarabi-mincho text-3xl text-shiso-700 tracking-widest z-10">
                    {card.title}
                  </span>
                  <div className="text-center px-[5%]">
                    {/* English subtitle */}
                    <h3 className="text-lg font-serif font-semibold text-shiso-900 mb-4 z-10">
                      {card.subtitle}
                    </h3>
                    <p className="text-marshland-700 mb-4 z-10 text-center">
                      {card.description}
                    </p>
                    {/* Details */}
                    {index === 0 && (
                      <div className="text-marshland-600 text-sm space-y-2 z-10">
                        <p>• Zero-waste kitchen practices</p>
                        <p>• 100% organic ingredients</p>
                        <p>• Carbon-neutral operations</p>
                        <p>• Local farmer partnerships</p>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="text-marshland-600 text-sm space-y-2 z-10">
                        <p>• 48-hour slow-cooking process</p>
                        <p>• Plant-based umami extraction</p>
                        <p>• House-made sustainable noodles</p>
                        <p>• Revolutionary broth techniques</p>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="text-marshland-600 text-sm space-y-2 z-10">
                        <p>• Centuries-old ramen techniques</p>
                        <p>• Japanese culinary heritage</p>
                        <p>• Authentic flavor profiles</p>
                        <p>• Respect for traditional methods</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Bottom scroll bar */}
                <div className="w-16 h-3 bg-marshland-700 rounded-b-xl shadow" />
              </div>
            </div>
          ))}
        </div>
        {/* Big vertical Japanese background letter */}
      </div>
    </section>
  );
};
