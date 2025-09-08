import { useState } from "react";

import JapanMap from "@/components/JapanMap";
import { SeigaihaPattern } from "../components/SeigaihaPattern";

export const MapVisualization = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null,
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Ingredient sourcing data
  const sourcingData = {
    hokkaido: {
      name: "Hokkaido",
      ingredients: ["Seaweed", "Mushrooms", "Root Vegetables"],
      description:
        "Known for its pristine waters and rich soil, Hokkaido provides us with the finest seaweed varieties and wild mushrooms.",
      specialties: ["Kombu (Kelp)", "Maitake Mushrooms", "Burdock Root"],
    },
    aomori: {
      name: "Aomori",
      ingredients: ["Apples", "Garlic", "Rice"],
      description:
        "Famous for its crisp apples and fertile soil, Aomori contributes premium fruits and grains to our dishes.",
      specialties: ["Aomori Apples", "Black Garlic", "Koshihikari Rice"],
    },
    iwate: {
      name: "Iwate",
      ingredients: ["Rice", "Mushrooms", "Seaweed"],
      description:
        "Known for its pristine waters and sustainable farming practices.",
      specialties: [
        "Iwate Shiitake Mushrooms",
        "Fresh Sea Urchin",
        "Premium Rice Varieties",
      ],
    },
    miyagi: {
      name: "Miyagi",
      ingredients: ["Rice", "Oysters", "Seaweed"],
      description:
        "Blessed with rich coastal waters and fertile plains, Miyagi is a key source of our seafood and grains.",
      specialties: ["Matsushima Oysters", "Sendai Rice", "Wakame Seaweed"],
    },
    akita: {
      name: "Akita",
      ingredients: ["Rice", "Sake", "Mountain Vegetables"],
      description:
        "Known for its premium rice varieties and traditional sake brewing, Akita enhances our authentic flavors.",
      specialties: [
        "Akita Komachi Rice",
        "Premium Sake",
        "Sansai Wild Vegetables",
      ],
    },
    yamagata: {
      name: "Yamagata",
      ingredients: ["Cherries", "Rice", "Fruits"],
      description:
        "Famous for its sweet cherries and diverse fruit production, Yamagata adds natural sweetness to our menu.",
      specialties: ["Yamagata Cherries", "La France Pears", "Premium Rice"],
    },
    fukushima: {
      name: "Fukushima",
      ingredients: ["Peaches", "Rice", "Vegetables"],
      description:
        "Renowned for its juicy peaches and clean agricultural practices, Fukushima provides exceptional produce.",
      specialties: [
        "Fukushima Peaches",
        "Koshihikari Rice",
        "Organic Vegetables",
      ],
    },
    ibaraki: {
      name: "Ibaraki",
      ingredients: ["Sweet Potatoes", "Rice", "Vegetables"],
      description:
        "With its fertile soil and mild climate, Ibaraki produces some of Japan's finest sweet potatoes and vegetables.",
      specialties: [
        "Ibaraki Sweet Potatoes",
        "Fresh Vegetables",
        "Premium Rice",
      ],
    },
    tochigi: {
      name: "Tochigi",
      ingredients: ["Strawberries", "Rice", "Vegetables"],
      description:
        "Known for its sweet strawberries and agricultural innovation, Tochigi contributes fresh, flavorful ingredients.",
      specialties: ["Tochigi Strawberries", "Fresh Vegetables", "Premium Rice"],
    },
    gunma: {
      name: "Gunma",
      ingredients: ["Konnyaku", "Rice", "Vegetables"],
      description:
        "Famous for its konnyaku production and clean mountain water, Gunma provides unique traditional ingredients.",
      specialties: ["Gunma Konnyaku", "Mountain Vegetables", "Premium Rice"],
    },
    saitama: {
      name: "Saitama",
      ingredients: ["Rice", "Vegetables", "Fruits"],
      description:
        "With its proximity to Tokyo and fertile plains, Saitama provides fresh, high-quality produce.",
      specialties: ["Saitama Rice", "Fresh Vegetables", "Local Fruits"],
    },
    chiba: {
      name: "Chiba",
      ingredients: ["Peanuts", "Rice", "Vegetables"],
      description:
        "Known for its peanut production and diverse agriculture, Chiba contributes unique flavors to our dishes.",
      specialties: ["Chiba Peanuts", "Fresh Vegetables", "Premium Rice"],
    },
    tokyo: {
      name: "Tokyo",
      ingredients: ["Wasabi", "Fresh Fish", "Vegetables"],
      description:
        "While primarily urban, Tokyo's surrounding areas provide fresh wasabi and access to premium seafood.",
      specialties: ["Tokyo Wasabi", "Fresh Seafood", "Local Vegetables"],
    },
    kanagawa: {
      name: "Kanagawa",
      ingredients: ["Tea", "Rice", "Vegetables"],
      description:
        "Famous for its tea production and agricultural heritage, Kanagawa provides traditional Japanese ingredients.",
      specialties: ["Kanagawa Tea", "Premium Rice", "Fresh Vegetables"],
    },
    niigata: {
      name: "Niigata",
      ingredients: ["Rice", "Sake", "Seafood"],
      description:
        "Renowned for its premium rice and sake production, Niigata is essential for authentic Japanese cuisine.",
      specialties: ["Koshihikari Rice", "Premium Sake", "Fresh Seafood"],
    },
    toyama: {
      name: "Toyama",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its rich coastal waters and fertile plains, Toyama provides exceptional rice and fresh seafood.",
      specialties: ["Toyama Rice", "Fresh Seafood", "Mountain Vegetables"],
    },
    ishikawa: {
      name: "Ishikawa",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "Blessed with the Sea of Japan and fertile soil, Ishikawa provides premium ingredients for traditional dishes.",
      specialties: ["Ishikawa Rice", "Fresh Seafood", "Local Vegetables"],
    },
    fukui: {
      name: "Fukui",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its coastal location and agricultural heritage, Fukui contributes fresh seafood and quality rice.",
      specialties: ["Fukui Rice", "Fresh Seafood", "Local Produce"],
    },
    yamanashi: {
      name: "Yamanashi",
      ingredients: ["Grapes", "Peaches", "Vegetables"],
      description:
        "Famous for its grape and peach production, Yamanashi adds natural sweetness and freshness to our menu.",
      specialties: ["Yamanashi Grapes", "Peaches", "Fresh Vegetables"],
    },
    nagano: {
      name: "Nagano",
      ingredients: ["Apples", "Vegetables", "Rice"],
      description:
        "Known for its crisp apples and mountain vegetables, Nagano provides fresh, high-altitude produce.",
      specialties: ["Nagano Apples", "Mountain Vegetables", "Premium Rice"],
    },
    gifu: {
      name: "Gifu",
      ingredients: ["Rice", "Vegetables", "Seafood"],
      description:
        "With its diverse geography, Gifu provides quality rice and fresh mountain and river ingredients.",
      specialties: ["Gifu Rice", "Mountain Vegetables", "Fresh Seafood"],
    },
    shizuoka: {
      name: "Shizuoka",
      ingredients: ["Tea", "Rice", "Seafood"],
      description:
        "Famous for its tea production and coastal location, Shizuoka provides premium tea and fresh seafood.",
      specialties: ["Shizuoka Tea", "Premium Rice", "Fresh Seafood"],
    },
    aichi: {
      name: "Aichi",
      ingredients: ["Miso", "Rice", "Vegetables"],
      description:
        "Known for its traditional miso production and agricultural heritage, Aichi provides authentic Japanese flavors.",
      specialties: ["Aichi Miso", "Premium Rice", "Fresh Vegetables"],
    },
    mie: {
      name: "Mie",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its rich coastal waters and fertile plains, Mie provides fresh seafood and quality rice.",
      specialties: ["Mie Rice", "Fresh Seafood", "Local Vegetables"],
    },
    shiga: {
      name: "Shiga",
      ingredients: ["Rice", "Vegetables", "Seafood"],
      description:
        "Home to Lake Biwa, Shiga provides fresh lake fish and quality agricultural products.",
      specialties: ["Shiga Rice", "Lake Biwa Fish", "Fresh Vegetables"],
    },
    kyoto: {
      name: "Kyoto",
      ingredients: ["Tea", "Rice", "Vegetables"],
      description:
        "With its rich cultural heritage, Kyoto provides traditional tea and premium agricultural products.",
      specialties: ["Kyoto Tea", "Premium Rice", "Traditional Vegetables"],
    },
    osaka: {
      name: "Osaka",
      ingredients: ["Rice", "Vegetables", "Seafood"],
      description:
        "Known for its culinary culture, Osaka provides quality rice and fresh ingredients for traditional dishes.",
      specialties: ["Osaka Rice", "Fresh Seafood", "Local Vegetables"],
    },
    hyogo: {
      name: "Hyogo",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its diverse geography, Hyogo provides quality rice and fresh coastal and mountain ingredients.",
      specialties: ["Hyogo Rice", "Fresh Seafood", "Local Vegetables"],
    },
    nara: {
      name: "Nara",
      ingredients: ["Rice", "Vegetables", "Fruits"],
      description:
        "With its rich history and fertile soil, Nara provides traditional ingredients and quality produce.",
      specialties: ["Nara Rice", "Traditional Vegetables", "Local Fruits"],
    },
    wakayama: {
      name: "Wakayama",
      ingredients: ["Oranges", "Rice", "Seafood"],
      description:
        "Famous for its sweet oranges and coastal location, Wakayama provides fresh citrus and seafood.",
      specialties: ["Wakayama Oranges", "Premium Rice", "Fresh Seafood"],
    },
    tottori: {
      name: "Tottori",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its coastal location and agricultural heritage, Tottori provides fresh seafood and quality rice.",
      specialties: ["Tottori Rice", "Fresh Seafood", "Local Vegetables"],
    },
    shimane: {
      name: "Shimane",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "Blessed with the Sea of Japan and fertile soil, Shimane provides premium ingredients for traditional dishes.",
      specialties: ["Shimane Rice", "Fresh Seafood", "Local Vegetables"],
    },
    okayama: {
      name: "Okayama",
      ingredients: ["Peaches", "Rice", "Vegetables"],
      description:
        "Known for its sweet peaches and agricultural innovation, Okayama provides fresh, flavorful ingredients.",
      specialties: ["Okayama Peaches", "Premium Rice", "Fresh Vegetables"],
    },
    hiroshima: {
      name: "Hiroshima",
      ingredients: ["Oysters", "Rice", "Vegetables"],
      description:
        "Famous for its plump oysters and coastal location, Hiroshima provides exceptional seafood and quality rice.",
      specialties: ["Hiroshima Oysters", "Premium Rice", "Fresh Vegetables"],
    },
    yamaguchi: {
      name: "Yamaguchi",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its coastal location and agricultural heritage, Yamaguchi provides fresh seafood and quality rice.",
      specialties: ["Yamaguchi Rice", "Fresh Seafood", "Local Vegetables"],
    },
    tokushima: {
      name: "Tokushima",
      ingredients: ["Rice", "Vegetables", "Seafood"],
      description:
        "With its diverse geography, Tokushima provides quality rice and fresh mountain and coastal ingredients.",
      specialties: ["Tokushima Rice", "Local Vegetables", "Fresh Seafood"],
    },
    kagawa: {
      name: "Kagawa",
      ingredients: ["Rice", "Vegetables", "Seafood"],
      description:
        "Known for its udon culture and agricultural heritage, Kagawa provides quality rice and fresh ingredients.",
      specialties: ["Kagawa Rice", "Fresh Vegetables", "Local Seafood"],
    },
    ehime: {
      name: "Ehime",
      ingredients: ["Oranges", "Rice", "Seafood"],
      description:
        "Famous for its sweet oranges and coastal location, Ehime provides fresh citrus and seafood.",
      specialties: ["Ehime Oranges", "Premium Rice", "Fresh Seafood"],
    },
    kochi: {
      name: "Kochi",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its Pacific coast location and fertile soil, Kochi provides fresh seafood and quality rice.",
      specialties: ["Kochi Rice", "Fresh Seafood", "Local Vegetables"],
    },
    fukuoka: {
      name: "Fukuoka",
      ingredients: ["Strawberries", "Rice", "Seafood"],
      description:
        "Known for its sweet strawberries and coastal location, Fukuoka provides fresh fruits and seafood.",
      specialties: ["Fukuoka Strawberries", "Premium Rice", "Fresh Seafood"],
    },
    saga: {
      name: "Saga",
      ingredients: ["Rice", "Seafood", "Vegetables"],
      description:
        "With its coastal location and agricultural heritage, Saga provides fresh seafood and quality rice.",
      specialties: ["Saga Rice", "Fresh Seafood", "Local Vegetables"],
    },
    nagasaki: {
      name: "Nagasaki",
      ingredients: ["Oranges", "Rice", "Seafood"],
      description:
        "Famous for its sweet oranges and coastal location, Nagasaki provides fresh citrus and seafood.",
      specialties: ["Nagasaki Oranges", "Premium Rice", "Fresh Seafood"],
    },
    kumamoto: {
      name: "Kumamoto",
      ingredients: ["Rice", "Vegetables", "Seafood"],
      description:
        "With its fertile soil and coastal location, Kumamoto provides quality rice and fresh ingredients.",
      specialties: ["Kumamoto Rice", "Fresh Vegetables", "Local Seafood"],
    },
    oita: {
      name: "Oita",
      ingredients: ["Shiitake Mushrooms", "Rice", "Vegetables"],
      description:
        "Famous for its shiitake mushroom production and agricultural heritage, Oita provides traditional ingredients.",
      specialties: [
        "Oita Shiitake Mushrooms",
        "Premium Rice",
        "Fresh Vegetables",
      ],
    },
    miyazaki: {
      name: "Miyazaki",
      ingredients: ["Mangoes", "Rice", "Vegetables"],
      description:
        "Known for its tropical fruits and warm climate, Miyazaki provides unique flavors and quality rice.",
      specialties: ["Miyazaki Mangoes", "Premium Rice", "Fresh Vegetables"],
    },
    kagoshima: {
      name: "Kagoshima",
      ingredients: ["Sweet Potatoes", "Rice", "Vegetables"],
      description:
        "Famous for its sweet potatoes and warm climate, Kagoshima provides unique flavors and quality rice.",
      specialties: [
        "Kagoshima Sweet Potatoes",
        "Premium Rice",
        "Fresh Vegetables",
      ],
    },
    okinawa: {
      name: "Okinawa",
      ingredients: ["Pineapples", "Rice", "Vegetables"],
      description:
        "With its tropical climate and unique culture, Okinawa provides exotic fruits and traditional ingredients.",
      specialties: [
        "Okinawa Pineapples",
        "Premium Rice",
        "Tropical Vegetables",
      ],
    },
  };

  const handleMarkerClick = (region: string) => {
    setSelectedPrefecture(region);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel((prev) => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(3, prev * 1.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.5, prev * 0.8));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <section className="clamp-[py,8,16] bg-gradient-to-b from-shiso-900 via-shiso-800 to-shiso-900 relative overflow-hidden">
      {/* Japanese Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <SeigaihaPattern />
      </div>

      {/* Big vertical Japanese background letter */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        <span
          className="font-sawarabi-mincho text-[18vw] text-shiso-200 opacity-20 select-none"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
            letterSpacing: "0.2em",
          }}
        >
          地図
        </span>
      </div>

      {/* Washi paper texture */}
      <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-40 mix-blend-multiply pointer-events-none" />

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
            産地
          </span>
          <span className="block w-1 h-10 bg-shiso-400 rounded-full mb-2" />
          <h2 className="text-6xl font-serif font-semibold text-bianca-50 mb-6 text-center">
            Our Ingredient Sourcing
          </h2>
          <p className="text-xl text-shiso-200 max-w-3xl mx-auto text-center">
            Explore Japan&rsquo;s diverse regions and discover the origins of
            our authentic ingredients. Click on any marker to learn about local
            specialties and sourcing practices.
          </p>
        </div>

        <div className="relative w-full h-[600px] bg-gradient-to-br from-white to-green-50 rounded-2xl overflow-hidden border-4 border-marshland-700 shadow-2xl">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <button
              onClick={handleReset}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          {/* Zoom Level Display */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* Map Container */}
          <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: "center",
                transition: isDragging ? "none" : "transform 0.3s ease-out",
                filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
              }}
            >
              <JapanMap
                onMarkerClick={handleMarkerClick}
                className="max-w-none"
              />
            </div>
          </div>

          {/* Info Panel */}
          {selectedPrefecture &&
            sourcingData[selectedPrefecture as keyof typeof sourcingData] && (
              <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {
                        sourcingData[
                          selectedPrefecture as keyof typeof sourcingData
                        ].name
                      }
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {
                        sourcingData[
                          selectedPrefecture as keyof typeof sourcingData
                        ].description
                      }
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 mb-1">
                          Local Specialties
                        </h4>
                        <ul className="text-sm text-green-700">
                          {sourcingData[
                            selectedPrefecture as keyof typeof sourcingData
                          ].specialties.map((specialty, index) => (
                            <li key={index}>• {specialty}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-800 mb-1">
                          Key Ingredients
                        </h4>
                        <ul className="text-sm text-blue-700">
                          {sourcingData[
                            selectedPrefecture as keyof typeof sourcingData
                          ].ingredients.map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPrefecture(null)}
                    className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};
