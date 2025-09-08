"use client";

import { Tab, TabGroup, TabPanels, TabPanel, TabList } from "@headlessui/react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import React from "react";

import FadeInSection from "@/components/FadeInSection";

export function ImgSection({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  headline,
  description,
  image,
  imageAlt = "image",
  direction = "left",
  id = "",
  url = "#",
}: {
  title: string;
  headline: string;
  description: string | React.JSX.Element;
  image: string | StaticImageData;
  imageAlt?: string;
  direction?: "left" | "right";
  id?: string;
  url?: string;
}) {
  const textSection = (
    <div className="flex flex-col justify-center" id={id}>
      <Link
        href={url}
        className="pb-3 pt-2 text-3.5xl font-bold text-racing-green-900 hover:text-racing-green-800"
      >
        {headline}
      </Link>

      {typeof description === "string" ? (
        <p className="prose max-w-none text-pretty text-racing-green-950">
          {description}
        </p>
      ) : (
        <div className="prose max-w-none text-pretty text-racing-green-950">
          {description}
        </div>
      )}
    </div>
  );

  const imageSection = (
    <FadeInSection className="self-center">
      <div className="flex justify-center">
        <ExportedImage
          className={`my-auto h-72 w-full overflow-hidden rounded-xl border-4 border-racing-green-600 object-cover transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105`}
          src={image}
          alt={imageAlt}
          priority
        />
      </div>
    </FadeInSection>
  );

  return (
    <div id={id}>
      <div className="mx-[8%] my-4 grid gap-8 sm:hidden">
        {textSection}
        {imageSection}
      </div>
      <div
        className={`hidden grid-cols-2 sm:grid ${
          direction === "left" ? "gap-8" : "gap-8 xl:gap-10 2xl:gap-12"
        } mx-[8%] my-4`}
      >
        {direction === "left" ? textSection : imageSection}
        {direction === "left" ? imageSection : textSection}
      </div>
    </div>
  );
}

export function TabImgSection({
  title,
  headline,
  description,
  images,
  imageAlts,
  direction = "left",
  id = "",
  url = "#",
}: {
  title: string;
  headline: string;
  description: string;
  images: string[] | StaticImageData[];
  imageAlts: string[];
  direction?: "left" | "right";
  id?: string;
  url?: string;
}) {
  const textSection = (
    <div className="flex flex-col justify-center" id={id}>
      <Link href={url} className="font-bold uppercase text-racing-green-700">
        {title}
      </Link>
      <h3 className="pb-3 pt-2 text-3.5xl font-bold text-neutral-900">
        {headline}
      </h3>
      <p className="prose max-w-none text-pretty text-neutral-900">
        {description}
      </p>
    </div>
  );

  const imageSection = (
    <div className="my-auto transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
      <FadeInSection>
        <TabGroup>
          <TabPanels>
            {images.map((image, index) => (
              <TabPanel key={index}>
                <ExportedImage
                  key={index}
                  className={`my-auto h-72 overflow-hidden rounded-t-xl border-4 border-racing-green-600 object-cover transition-opacity duration-700 ease-in`}
                  src={image}
                  alt={imageAlts[index]}
                  priority
                />
              </TabPanel>
            ))}
          </TabPanels>
          <TabList className="flex w-full justify-evenly overflow-hidden rounded-lg text-neutral-800 hover:text-neutral-900">
            {imageAlts.map((imageAlt, index) => (
              <Tab
                className={`z-3 grow border-b-4 border-racing-green-500/75 bg-gradient-to-t from-racing-green-400/30 to-racing-green-400/0 py-2 font-semibold uppercase text-racing-green-800 ui-selected:border-racing-green-700 hover:border-racing-green-500 hover:text-racing-green-900 focus:outline-none`}
                key={index}
              >
                {imageAlt}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </FadeInSection>
    </div>
  );

  return (
    <div id={id}>
      <div className="mx-[8%] my-4 grid gap-8 sm:hidden">
        {textSection}
        {imageSection}
      </div>
      <div className="mx-[8%] my-4 hidden grid-cols-2 gap-8 sm:grid">
        {direction === "left" ? textSection : imageSection}
        {direction === "right" ? imageSection : textSection}
      </div>
    </div>
  );
}

export function NoImgSection({
  title,
  headline,
  description,
  id = "",
  url = "#",
}: {
  title: string;
  headline: string;
  description: string | React.JSX.Element;
  id?: string;
  url?: string;
}) {
  return (
    <div
      className="mx-auto flex flex-col justify-center ~sm/2xl:~px-6/80"
      id={id}
    >
      <Link href={url} className="font-bold uppercase text-racing-green-700">
        {title}
      </Link>
      <h3 className="pb-3 pt-2 text-3.5xl font-bold text-black">{headline}</h3>
      {typeof description === "string" ? (
        <p className="prose max-w-none text-neutral-900">{description}</p>
      ) : (
        <div className="prose mx-auto max-w-none text-neutral-900">
          {description}
        </div>
      )}
    </div>
  );
}
