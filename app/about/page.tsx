"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Hero } from "./sections/Hero";
import { StatsSection } from "./sections/Stats";
import { MissionSection } from "./sections/Mission";
import { TimelineSection } from "./sections/Timeline";
import { MapVisualization } from "./sections/MapVisualization";
import { SustainabilityImpactSliders } from "./sections/SustainabilityImpactSliders";

export default function About() {
  return (
    <>
      <ScrollToTop />
      <Navbar currentPage="About" />

      <main className="relative">
        <section>
          <Hero />
        </section>

        <section>
          <MissionSection />
        </section>

        <section>
          <StatsSection />
        </section>

        <section>
          <SustainabilityImpactSliders />
        </section>
        <section>
          <MapVisualization />
        </section>

        <section>
          <TimelineSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
