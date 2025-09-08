"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
// import ExportedImage from "next-image-export-optimizer";
import React, { useEffect, useRef, useState } from "react";
import { sawarabiMincho } from "@/app/styles/fonts";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Navbar({
  currentPage,
  invertTextColor = false,
  ...props
}: {
  currentPage?: "About" | "Menu" | "Kitchen" | "Reservations" | "Contact";
  invertTextColor?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  const navRef = useRef<HTMLElement>(null);
  const [atTopOfPage, setAtTopOfPage] = useState(true);

  const LINKS = [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Menu",
      href: "/menu",
    },
    {
      name: "Kitchen",
      href: "/kitchen",
    },
    {
      name: "Reservations",
      href: "/reservations",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const changeNavBackgroundOnScroll = () => {
      if (navRef.current === null) return;

      const bgColor = "bg-shiso-900/75";

      setAtTopOfPage(window.scrollY === 0);

      if (window.scrollY > 0) {
        navRef.current.classList.remove("backdrop-blur-[2px]");
        navRef.current.classList.add("backdrop-blur-md", bgColor);
      } else {
        navRef.current.classList.remove("backdrop-blur-md", bgColor);
        navRef.current.classList.add("backdrop-blur-[2px]");
      }
    };

    changeNavBackgroundOnScroll();

    window.addEventListener("scroll", changeNavBackgroundOnScroll);

    return () =>
      window.removeEventListener("scroll", changeNavBackgroundOnScroll);
  }, [navRef, currentPage]);

  return (
    <header
      {...props}
      ref={navRef}
      className={`fixed top-0 z-50 flex w-full px-[6%] py-4 text-sm backdrop-blur-[2px] transition-all duration-500 md:flex md:flex-nowrap md:items-center md:justify-between ${props.className}`}
    >
      <div className="flex w-full items-center justify-between md:w-auto md:gap-2">
        <Link
          className={`text-2_5xl font-extrabold text-bianca-700 hover:text-bianca-600 text-nowrap tracking-wider ${sawarabiMincho.className}`}
          href="/"
          style={{
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          Hiroshi Ramen
        </Link>
        <Drawer direction="right">
          <DrawerTrigger className="md:hidden">
            <MenuIcon className="size-5 shrink-0 text-bianca-700 hover:text-bianca-600" />
          </DrawerTrigger>
          <DrawerContent title="" className="bg-bianca-100">
            <DrawerHeader>
              <DrawerDescription className="flex flex-col gap-5 pt-3 font-medium text-neutral-800 dark:text-neutral-200">
                <div className="flex flex-col gap-5 pt-1 pl-12 text-xl font-medium text-center">
                  {LINKS.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      className={`${
                        currentPage === name
                          ? "text-shiso-600"
                          : "text-neutral-800"
                      } hover:text-shiso-300 transition-colors duration-300 ${sawarabiMincho.className}`}
                      style={{
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            {/* Big vertical Japanese background letter */}
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none z-10"
              style={{ left: "25%", width: "50%" }}
            >
              <span
                className="font-sawarabi-mincho text-[50vw] text-black opacity-20 select-none"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  letterSpacing: "0.1em",
                }}
              >
                使命
              </span>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <nav
        className="hidden grow basis-full items-center justify-end gap-8 overflow-hidden ps-5 text-right font-semibold md:flex 2xl:text-base"
        aria-label="Navigation Links"
      >
        {LINKS.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`${
              currentPage === name
                ? `${atTopOfPage && invertTextColor ? "text-bianca-900" : "text-bianca-700"} underline underline-offset-4`
                : `${atTopOfPage && invertTextColor ? "text-neutral-800" : "text-neutral-200"}`
            } ${atTopOfPage && invertTextColor ? "hover:text-bianca-700" : "hover:text-bianca-500"} transition-all duration-300 relative group ${sawarabiMincho.className}`}
            style={{
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            {name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
