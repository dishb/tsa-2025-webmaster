"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to scroll to top with multiple fallback methods
    const scrollToTop = () => {
      // Method 1: Try window.scrollTo with smooth behavior
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch {
        // Method 2: Fallback to instant scroll
        try {
          window.scrollTo(0, 0);
        } catch {
          // Method 3: Try scrolling the document element
          try {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          } catch {
            // Method 4: Try scrolling the body element
            try {
              document.body.scrollTo(0, 0);
            } catch {
              // Method 5: Last resort - try scrolling the html element
              try {
                document.documentElement.scrollTo(0, 0);
              } catch (error) {
                console.warn("Could not scroll to top:", error);
              }
            }
          }
        }
      }
    };

    // Small delay to ensure the page has rendered
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
