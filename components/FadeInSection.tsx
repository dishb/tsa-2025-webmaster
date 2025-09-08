"use client";

import React, { useEffect, useRef, useState } from "react";

export default function FadeInSection(
  props: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>,
) {
  const [isVisible, setVisible] = useState<boolean | null>(null);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!isVisible || entry.isIntersecting)
          setVisible(entry.isIntersecting);
      });
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    const currentRef = domRef.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [domRef, isVisible]);

  return (
    <div
      {...props}
      className={`fade-in-section ${
        isVisible || isVisible === null ? "is-visible" : ""
      } ${props.className}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
