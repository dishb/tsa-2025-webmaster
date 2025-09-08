import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

export default function Sources() {
  const imageSources: string[] = [
    // Image Sources
    "https://unsplash.com/photos/a-man-walking-across-a-lush-green-field-OKTEP9NxHJo",
    "https://images.unsplash.com/photo-1528164344705-47542687000d",
    "https://unsplash.com/photos/ramen-platter-on-tabletop-YRSRQpBfsj4",
    "https://unsplash.com/photos/white-van-on-road-during-daytime-qEdL-YYmQMI",
    "https://unsplash.com/photos/blue-and-white-road-sign-8X2siC3gSj4",
    "https://unsplash.com/photos/a-small-house-in-the-woods-with-a-fountain-uLL6fwPnItA",
    "https://unsplash.com/photos/a-couple-of-people-sitting-at-a-table-in-a-restaurant-XTwtjAYGaFI",
    "https://unsplash.com/photos/vegetable-salad-in-white-ceramic-bowl-iDlZaCORBO0",
    "https://hackaday.com/2019/07/02/ramen-lamp-has-us-feeling-hungry/",
  ]
  const textSources: string[] = [
    // Ramen & Japanese Cuisine
    "https://www.japan-guide.com/e/e2042.html",
    "https://www.japan.travel/en/guide/ramen-guide/",
    "https://www.japanesecooking101.com/",
    "https://www.japanesefoodguide.com/miso-production/",
    "https://www.japanesecooking101.com/homemade-ramen-noodles/",

    // Sustainability & Environmental Impact
    "https://ourworldindata.org/food-ghg-emissions",
    "https://waterfootprint.org/en/water-footprint/product-water-footprint/",
    "https://www.fao.org/food-loss-and-food-waste/en/",
    "https://www.restaurant.org/education-and-resources/resource-library/sustainability",
    "https://www.nature.com/articles/s41598-021-88010-3",
    "https://www.ams.usda.gov/services/local-regional",

    // Nutritional Information
    "https://fdc.nal.usda.gov/",
    "https://www.dietaryguidelines.gov/",
    "https://www.pcrm.org/good-nutrition",
    "https://www.japanesefoodguide.com/nutrition/",
    "https://www.fda.gov/food/food-allergensgluten-free-guidance-documents-regulatory-information",

    // Food Safety & Certifications
    "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements",
    "https://www.ams.usda.gov/grades-standards/organic-standards",
    "https://www.usgbc.org/leed",
    "https://www.dinegreen.com/",
    "https://www.jamesbeard.org/",
    "https://guide.michelin.com/en",

    // Japanese Culture & Heritage
    "https://www.jcccnc.org/",
    "https://www.japan-guide.com/e/e2096.html",
    "https://www.japanesefoodguide.com/seasonal-cuisine/",
    "https://www.japan-guide.com/e/e2005.html",
    "https://www.japanesecooking101.com/japanese-ingredients/",

    // Environmental Impact Calculations
    "https://www.epa.gov/sustainability/learn-about-sustainability",
    "https://www.ecoinvent.org/",
    "https://www.foodcarbon.co.uk/",
    "https://waterfootprint.org/en/water-footprint/",
    "https://www.fao.org/sustainable-development-goals/overview/en/",

    // Customer Reviews & Testimonials
    "https://www.yelp.com/developers/documentation/v3",
    "https://support.google.com/business/",
    "https://tripadvisor.mediaroom.com/us-restaurant-guidelines",
    "https://www.opentable.com/",

    // Additional Image Sources
    "https://unsplash.com/s/photos/restaurant",
    "https://unsplash.com/s/photos/japanese-food",
    "https://unsplash.com/s/photos/sustainable-farming",
    "https://unsplash.com/s/photos/kitchen-equipment",
    "https://unsplash.com/s/photos/japanese-culture",
  ];

  return (
    <>
      <Navbar invertTextColor={true} />
      <ScrollToTop />
      <main className="pt-20 px-8 pb-8 bg-bianca-100">
        <div className="prose">
          <h1>Sources</h1>
          <h2 className="mt-2">Text Sources</h2>
          <ul className="text-gray-800 marker:text-gray-800">
            {textSources.map((source, index) => (
              <li key={index}>
                <Link className="link" href={source} target="_blank">
                  {source}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-2">Image Sources</h2>
          <ul className="text-gray-800 marker:text-gray-800">
            {imageSources.map((source, index) => (
              <li key={index}>
                <Link className="link" href={source} target="_blank">
                  {source}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
