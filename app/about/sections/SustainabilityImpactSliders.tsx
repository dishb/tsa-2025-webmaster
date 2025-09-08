import ReactCompareImage from "react-compare-image";

import { SeigaihaPattern } from "../components/SeigaihaPattern";

export const SustainabilityImpactSliders = () => {
  return (
    <section className="clamp-[py,8,16] bg-bianca-100 relative overflow-hidden">
      {/* Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <SeigaihaPattern />
      </div>
      {/* Washi paper texture */}
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
      <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-40 mix-blend-multiply pointer-events-none" />
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span
            className="font-sawarabi-mincho text-4xl text-shiso-400 mb-2 tracking-widest"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.2em",
            }}
          >
            影響
          </span>
          <span className="block w-1 h-10 bg-shiso-400 rounded-full mb-2" />
          <h2 className="text-6xl font-serif font-semibold text-shiso-900 mb-6 text-center">
            Our Impact: Before & After
          </h2>
          <p className="text-xl text-shiso-800 max-w-3xl mx-auto text-center">
            Explore Japan&rsquo;s diverse regions and discover the origins of
            our authentic ingredients. Click on any marker to learn about local
            specialties and sourcing practices.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:px-12 md:gap-24">
          {/* Packaging Slider with Shoji effect */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-shiso-900 text-center mb-4">
              Packaging: Plastic vs. Compostable
            </h3>
            <div className="rounded-2xl overflow-hidden border-3 border-shiso-700 shadow-2xl bg-[url('/images/about/washi.png')] bg-repeat">
              <ReactCompareImage
                leftImage="/images/about/image-comparision/1/before.png" // Before: Plastic packaging
                rightImage="/images/about/image-comparision/1/after.png" // After: Compostable packaging
                leftImageLabel="Before: Plastic"
                rightImageLabel="After: Compostable"
                sliderLineColor="var(--color-shiso-700)"
                sliderPositionPercentage={0.5}
              />
            </div>
          </div>
          {/* Kitchen Slider with Shoji effect */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-shiso-900 text-center mb-4">
              Kitchen: Old vs. Renovated
            </h3>
            <div className="rounded-2xl overflow-hidden border-3 border-shiso-700 shadow-2xl bg-[url('/images/about/washi.png')] bg-repeat">
              <ReactCompareImage
                leftImage="/images/about/image-comparision/2/before.png" // Before: Standard kitchen
                rightImage="/images/about/image-comparision/2/after.png" // After: Zero-waste kitchen
                leftImageLabel="Before: Standard"
                rightImageLabel="After: Zero-Waste"
                sliderLineColor="var(--color-shiso-700)"
                sliderPositionPercentage={0.5}
              />
            </div>
            {/* Big vertical Japanese background letter */}
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
          </div>
        </div>
      </div>
    </section>
  );
};
