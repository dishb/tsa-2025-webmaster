"use client";

import { useRef, useLayoutEffect, useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Kitchen() {
  const navbarRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("100vh");

  useLayoutEffect(() => {
    function updateHeight() {
      const nav = navbarRef.current;
      if (nav) {
        const navHeight = (nav as HTMLElement).offsetHeight;
        setIframeHeight(`calc(100vh - ${navHeight}px)`);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <ScrollToTop />
      <div ref={navbarRef}>
        <Navbar
          className="!static"
          currentPage="Kitchen"
          invertTextColor={true}
        />
      </div>
      <main className="w-full flex flex-col">
        <iframe
          seamless
          style={{ height: iframeHeight, overflow: "hidden" }}
          className="w-full overflow-hidden border-none"
          src="https://my.matterport.com/show/?m=wStbQsn2Tab&play=1&brand=0&mls=2&search=0&vr=0"
          allowFullScreen
        />
      </main>
      <Footer />
    </>
  );
}
