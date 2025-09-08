"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Star, Leaf, Heart } from "lucide-react";
import {
  SiInstagram,
  SiYelp,
  SiX,
  SiFacebook,
} from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-shiso-900 via-shiso-800 to-shiso-900 text-bianca-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Seigaiha Wave Pattern */}
        <div className="hidden lg:block absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="seigaiha"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10 Q5 5 10 10 Q15 15 20 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path
                  d="M0 10 Q5 15 10 10 Q15 5 20 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#seigaiha)" />
          </svg>
        </div>

        {/* Floating Lanterns */}
        <motion.div
          className="absolute top-10 left-10 w-8 h-12 bg-amber-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-6 h-10 bg-amber-300/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-7 h-11 bg-amber-500/25 rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">
          {/* Brand Section - Spans 4 columns */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-shiso-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍜</span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-bianca-50">
                    Hiroshi Ramen
                  </h3>
                  <p className="text-shiso-200 text-sm">伝統と革新の調和</p>
                  <p className="text-shiso-100 text-xs">
                    Harmony of Tradition & Innovation
                  </p>
                </div>
              </div>

              <p className="text-shiso-100 leading-relaxed mb-6">
                Experience the art of vegetarian ramen, where every bowl tells a
                story of sustainable sourcing, traditional techniques, and
                modern innovation. Each ingredient is carefully selected to
                honor both Japanese tradition and environmental consciousness.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: <SiInstagram />, label: "Instagram", href: "#" },
                  { icon: <SiFacebook />, label: "Facebook", href: "#" },
                  { icon: <SiX />, label: "Twitter", href: "#" },
                  { icon: <SiYelp />, label: "Yelp", href: "#" },
                ].map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={social.href}
                      className="w-12 h-12 bg-shiso-700/50 hover:bg-shiso-600 rounded-full flex items-center justify-center text-xl transition-all duration-300 border border-shiso-600/30 hover:border-shiso-500"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation & Contact - Side by side on sm/md, stacked on xs */}
          <div className="lg:col-span-6 w-full">
            <div className="flex flex-row w-full gap-8">
              {/* Navigation Links */}
              <div className="w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  <h4 className="text-xl font-serif font-semibold mb-6 text-bianca-50 border-b border-shiso-600 pb-2">
                    Navigation
                    <span className="block text-sm font-normal text-shiso-300">
                      ナビゲーション
                    </span>
                  </h4>
                  <nav className="space-y-3">
                    {[
                      { href: "/", label: "Home", japanese: "ホーム" },
                      {
                        href: "/about",
                        label: "About Us",
                        japanese: "私たちについて",
                      },
                      { href: "/menu", label: "Menu", japanese: "メニュー" },
                      {
                        href: "/reservations",
                        label: "Reservations",
                        japanese: "予約",
                      },
                      {
                        href: "/contact",
                        label: "Contact",
                        japanese: "お問い合わせ",
                      },
                    ].map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center space-x-3 text-shiso-100 hover:text-bianca-50 transition-all duration-300"
                        >
                          <div className="w-1 h-1 bg-shiso-500 rounded-full group-hover:bg-bianca-50 transition-colors duration-300" />
                          <div>
                            <div className="font-medium">{link.label}</div>
                            <div className="text-xs text-shiso-400 group-hover:text-shiso-300 transition-colors duration-300">
                              {link.japanese}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              </div>
              {/* Contact Information */}
              <div className="w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h4 className="text-xl font-serif font-semibold mb-6 text-bianca-50 border-b border-shiso-600 pb-2">
                    Contact
                    <span className="block text-sm font-normal text-shiso-300">
                      お問い合わせ
                    </span>
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-shiso-400 mt-0.5 flex-shrink-0" />
                      <address className="not-italic">
                        <div className="text-shiso-100 font-medium">
                          123 Serenity Lane
                        </div>
                        <div className="text-shiso-300 text-sm">
                          Kyoto, Japan 604-8001
                        </div>
                      </address>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-shiso-400 flex-shrink-0" />
                      <a className="link-light" href="tel:+1234567890">
                        (123) 456-7890
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-shiso-400 flex-shrink-0" />
                      <a
                        className="link-light"
                        href="mailto:hello@hiroshiramen.com"
                      >
                        hello@hiroshiramen.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Hours & Awards - Spans 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-xl font-serif font-semibold mb-6 text-bianca-50 border-b border-shiso-600 pb-2">
                Hours
                <span className="block text-sm font-normal text-shiso-300">
                  営業時間
                </span>
              </h4>

              <div className="space-y-4">
                <div className="bg-shiso-800/30 rounded-lg p-4 border border-shiso-700/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-shiso-400" />
                    <span className="text-shiso-200 font-medium text-sm">
                      Dine-In
                    </span>
                  </div>
                  <div className="text-shiso-100 text-sm">
                    Mon-Fri: 11am-3pm, 5pm-10pm
                    <br />
                    Sat-Sun: 11am-10pm
                  </div>
                </div>

                <div className="bg-shiso-800/30 rounded-lg p-4 border border-shiso-700/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="w-4 h-4 text-shiso-400" />
                    <span className="text-shiso-200 font-medium text-sm">
                      Takeout
                    </span>
                  </div>
                  <div className="text-shiso-100 text-sm">Daily: 11am-9pm</div>
                </div>
              </div>

              {/* Award Badge */}
              <motion.div
                className="mt-6 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg p-4 border border-amber-500/50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-900 fill-current" />
                  </div>
                  <div>
                    <div className="text-amber-100 font-semibold text-sm">
                      Best Ramen 2024
                    </div>
                    <div className="text-amber-200 text-xs">
                      Global Ramen Awards
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="border-t border-shiso-700/50 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-shiso-300 text-sm">
              <span>© 2025 Hiroshi Ramen. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-shiso-400" />
                <span>Made with love in Pleasanton, CA</span>
              </div>
            </div>

            <div className="flex space-x-6 text-sm">
              {[
                { href: "/about-the-website", label: "About the Website" },
                { href: "/sources", label: "Sources" },
                {
                  href: "/AVTSA-Webmaster-Forms.pdf",
                  label: "Webmaster Forms",
                },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-shiso-300 hover:text-bianca-50 transition-colors duration-300 underline underline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Zen Garden Element */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center space-x-8">
            <div className="w-16 h-1 bg-shiso-600 rounded-full" />
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-shiso-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            <div className="w-16 h-1 bg-shiso-600 rounded-full" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
