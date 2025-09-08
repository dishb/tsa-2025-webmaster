"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Leaf,
  Star,
  X,
  CalendarDays,
  Utensils,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CircleAlert,
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo, ReactNode } from "react";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import EnvironmentalImpactCalculator from "@/components/EnvironmentalImpactCalculator";
import ScrollToTop from "@/components/ScrollToTop";

type Ingredient = {
  name: string;
  origin: string;
  chefTip?: string; // Chef's note or tip for this ingredient
};

type Allergen = "gluten" | "soy" | "nuts" | "sesame";

type CustomerComment = {
  user: string;
  avatar: string;
  comment: string;
  rating: number;
};

type OrderItem = {
  menuItem: MenuItem;
  quantity: number;
};

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: { dineIn: number; takeOut: number };
  image: ReactNode;
  category: "Ramen" | "Sides" | "Drinks" | "Desserts";
  tags: (
    | "Vegan"
    | "Vegetarian"
    | "Gluten-Free"
    | "Keto"
    | "Spicy"
    | "Nut-Free"
    | "Custom"
  )[];
  ingredients: Ingredient[];
  allergens: Allergen[];
  rating: number;
  reviews: number;
  carbonFootprint: number; // 1 (low) to 5 (high)
  nutritionalFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  pairings: string[];
  customerComments: CustomerComment[];
};

type SeasonalSpecial = {
  date: string;
  name: string;
  description: string;
  available: boolean;
};

type BuildYourOwnOptionsBases = {
  name: string;
  price: number;
  description?: string;
};

type BuildYourOwnOptionsNoodles = {
  name: string;
  price: number;
  description?: string;
};

type BuildYourOwnOptionsToppings = {
  name: string;
  price: number;
  description?: string;
};

type BuildYourOwnOptionsAddOns = {
  name: string;
  price: number;
  description?: string;
};

type BuildYourOwnOptions = {
  bases: BuildYourOwnOptionsBases[];
  noodles: BuildYourOwnOptionsNoodles[];
  toppings: BuildYourOwnOptionsToppings[];
  addOns: BuildYourOwnOptionsAddOns[];
};

type CustomRamen = {
  base: string;
  noodles: string;
  toppings: string[];
  addOns: string[];
};

export default function HiroshiRamenMenu() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [diningMode, setDiningMode] = useState<"dineIn" | "takeOut">("dineIn");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showBuildRamen, setShowBuildRamen] = useState(false);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [customRamen, setCustomRamen] = useState<CustomRamen>({
    base: "",
    noodles: "",
    toppings: [] as string[],
    addOns: [] as string[],
  });
  const [showCart, setShowCart] = useState(false);
  const [activeCartTab, setActiveCartTab] = useState<"order" | "impact">(
    "order",
  );

  const filterOptions = [
    "Vegan",
    "Vegetarian",
    "Gluten-Free",
    "Spicy",
    "Keto",
    "Nut-Free",
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Shio Ramen",
      description:
        "Light, salt-based broth, showcasing the pure essence of our slow-simmered vegetable stock.",
      price: { dineIn: 13, takeOut: 11 },
      image: (
        <Image
          src="/images/menu/1.png"
          alt="Mushroom Tonkotsu Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian"],
      ingredients: [
        {
          name: "Vegetable Broth",
          origin: "Miyagi Prefecture Farms",
          chefTip:
            "Our broth is simmered for 12 hours to extract deep umami from local vegetables.",
        },
        {
          name: "Noodles",
          origin: "Hokkaido Wheat, House-Made",
          chefTip:
            "We use high-gluten Hokkaido wheat for a springy, authentic texture.",
        },
        {
          name: "Bamboo Shoots",
          origin: "Kyoto Forest Reserve",
          chefTip: "Marinated in a light soy for extra flavor and crunch.",
        },
        { name: "Nori", origin: "Ariake Sea Harvest" },
      ],
      allergens: ["gluten", "soy"],
      rating: 4.7,
      reviews: 298,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 450,
        protein: 18,
        carbs: 60,
        fat: 15,
      },
      pairings: ["Edamame", "Green Tea"],
      customerComments: [
        {
          user: "RamenLover",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
          comment: "So light and refreshing! A classic for a reason.",
          rating: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Vegan Spicy Miso",
      description:
        "A robust and fiery miso broth balanced with sesame and chili, creating a deeply satisfying warmth.",
      price: { dineIn: 15, takeOut: 13 },
      image: (
        <Image
          src="/images/menu/2.png"
          alt="Gluten-Free Curry Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegan", "Spicy"],
      ingredients: [
        {
          name: "Spicy Miso Tare",
          origin: "Aged 3 Months In-House",
          chefTip:
            "Aging the miso deepens its flavor and adds complexity to the broth.",
        },
        {
          name: "Crispy Tofu",
          origin: "Organic Soy from Kyushu",
          chefTip:
            "Tofu is double-fried for a crispy outside and creamy inside.",
        },
        { name: "Corn", origin: "Hokkaido Sweet Corn" },
        { name: "Bean Sprouts", origin: "Local Hydroponic Farm" },
      ],
      allergens: ["soy", "sesame"],
      rating: 4.8,
      reviews: 350,
      carbonFootprint: 3,
      nutritionalFacts: {
        calories: 550,
        protein: 25,
        carbs: 65,
        fat: 20,
      },
      pairings: ["Vegan Gyoza", "Ginger Ale"],
      customerComments: [
        {
          user: "SpicyFan",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
          comment: "The perfect amount of spice!",
          rating: 5,
        },
      ],
    },
    {
      id: 3,
      name: "Truffle Shoyu Ramen",
      description:
        "An elegant soy-based broth elevated with luxurious black truffle, a modern interpretation of a classic.",
      price: { dineIn: 16, takeOut: 14 },
      image: (
        <Image
          src="/images/menu/3.png"
          alt="Spicy Kimchi Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian"],
      ingredients: [
        {
          name: "Shoyu Tare",
          origin: "Brewed in Chiba Prefecture",
          chefTip:
            "Our shoyu is naturally brewed for 2 years for a mellow, rich taste.",
        },
        {
          name: "Marinated Mushrooms",
          origin: "Foraged from Nagano Forests",
          chefTip:
            "Mushrooms are marinated in truffle oil for an earthy aroma.",
        },
        {
          name: "Soft-Boiled Egg",
          origin: "Pasture-Raised, Local Farm",
          chefTip: "Eggs are cooked to a perfect jammy yolk.",
        },
        { name: "Truffle Oil", origin: "Imported from Alba, Italy" },
      ],
      allergens: ["gluten", "soy"],
      rating: 4.9,
      reviews: 410,
      carbonFootprint: 3,
      nutritionalFacts: {
        calories: 600,
        protein: 22,
        carbs: 70,
        fat: 25,
      },
      pairings: ["Agedashi Tofu", "Sake"],
      customerComments: [
        {
          user: "Foodie",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
          comment: "The truffle is a game-changer!",
          rating: 5,
        },
      ],
    },
    {
      id: 4,
      name: "Keto-Friendly Ramen",
      description:
        "Guilt-free indulgence featuring low-carb Shirataki noodles in a savory broth with fresh toppings.",
      price: { dineIn: 15, takeOut: 13 },
      image: (
        <Image
          src="/images/menu/4.png"
          alt="Keto Avocado Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian", "Keto"],
      ingredients: [
        { name: "Shirataki Noodles", origin: "Traditional Japanese Konjac" },
        { name: "Avocado", origin: "Sustainably Sourced" },
        { name: "Grilled Halloumi", origin: "Local Artisan Cheesemaker" },
        { name: "Spinach", origin: "Fresh from our Garden" },
      ],
      allergens: [],
      rating: 4.6,
      reviews: 180,
      carbonFootprint: 4,
      nutritionalFacts: {
        calories: 400,
        protein: 20,
        carbs: 10,
        fat: 30,
      },
      pairings: ["Seaweed Salad", "Iced Tea"],
      customerComments: [
        {
          user: "KetoKing",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
          comment: "Finally, a ramen I can eat on my diet!",
          rating: 5,
        },
      ],
    },
    {
      id: 5,
      name: "Vegan Gyoza",
      description:
        "Crispy on the outside, juicy on the inside. Pan-fried vegetable dumplings served with our house-made dipping sauce.",
      price: { dineIn: 8, takeOut: 7 },
      image: (
        <Image
          src="/images/menu/5.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Sides",
      tags: ["Vegan"],
      ingredients: [
        { name: "Cabbage", origin: "Local Organic Farm" },
        { name: "Shiitake Mushrooms", origin: "Cultivated In-House" },
        { name: "Gyoza Wrappers", origin: "House-Made Daily" },
      ],
      allergens: ["gluten", "soy"],
      rating: 4.7,
      reviews: 210,
      carbonFootprint: 1,
      nutritionalFacts: {
        calories: 250,
        protein: 10,
        carbs: 30,
        fat: 10,
      },
      pairings: ["Any Ramen", "Ramune Soda"],
      customerComments: [],
    },
    // New Vegan Items
    {
      id: 6,
      name: "Mushroom Tonkotsu Ramen",
      description:
        "Rich, creamy broth made from slow-simmered mushrooms and vegetables, mimicking the depth of traditional tonkotsu.",
      price: { dineIn: 14, takeOut: 12 },
      image: (
        <Image
          src="/images/menu/6.png"
          alt="Mushroom Tonkotsu Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegan", "Nut-Free"],
      ingredients: [
        { name: "Mushroom Broth", origin: "Mixed Wild Mushrooms" },
        { name: "Rice Noodles", origin: "Gluten-Free Alternative" },
        { name: "Enoki Mushrooms", origin: "Local Cultivation" },
        { name: "Bok Choy", origin: "Organic Farm" },
      ],
      allergens: ["soy"],
      rating: 4.5,
      reviews: 156,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 480,
        protein: 16,
        carbs: 55,
        fat: 18,
      },
      pairings: ["Vegan Tempura", "Jasmine Tea"],
      customerComments: [
        {
          user: "VeganChef",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h",
          comment: "Incredible depth of flavor!",
          rating: 5,
        },
      ],
    },
    {
      id: 7,
      name: "Vegan Tempura Vegetables",
      description:
        "Light and crispy tempura-battered seasonal vegetables served with a tangy dipping sauce.",
      price: { dineIn: 9, takeOut: 8 },
      image: (
        <Image
          src="/images/menu/7.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Sides",
      tags: ["Vegan", "Nut-Free"],
      ingredients: [
        { name: "Seasonal Vegetables", origin: "Local Farm Selection" },
        { name: "Rice Flour", origin: "Gluten-Free Breading" },
        { name: "Sparkling Water", origin: "For Light Batter" },
      ],
      allergens: [],
      rating: 4.3,
      reviews: 89,
      carbonFootprint: 1,
      nutritionalFacts: {
        calories: 180,
        protein: 4,
        carbs: 25,
        fat: 8,
      },
      pairings: ["Any Ramen", "Green Tea"],
      customerComments: [],
    },
    // New Gluten-Free Items
    {
      id: 8,
      name: "Gluten-Free Curry Ramen",
      description:
        "Aromatic Japanese curry broth with rice noodles, featuring tender vegetables and a hint of coconut milk.",
      price: { dineIn: 14, takeOut: 12 },
      image: (
        <Image
          src="/images/menu/8.png"
          alt="Gluten-Free Curry Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian", "Gluten-Free", "Spicy"],
      ingredients: [
        { name: "Curry Broth", origin: "House-Made Spice Blend" },
        { name: "Rice Noodles", origin: "Gluten-Free" },
        { name: "Sweet Potato", origin: "Local Farm" },
        { name: "Coconut Milk", origin: "Organic" },
      ],
      allergens: ["soy"],
      rating: 4.4,
      reviews: 134,
      carbonFootprint: 3,
      nutritionalFacts: {
        calories: 520,
        protein: 14,
        carbs: 58,
        fat: 22,
      },
      pairings: ["Gluten-Free Gyoza", "Coconut Water"],
      customerComments: [
        {
          user: "GlutenFreeFoodie",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704i",
          comment: "Finally, a curry ramen I can eat!",
          rating: 4,
        },
      ],
    },
    {
      id: 9,
      name: "Gluten-Free Edamame",
      description:
        "Fresh soybeans steamed to perfection and sprinkled with sea salt, a perfect protein-rich snack.",
      price: { dineIn: 6, takeOut: 5 },
      image: (
        <Image
          src="/images/menu/9.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Sides",
      tags: ["Vegan", "Gluten-Free", "Nut-Free"],
      ingredients: [
        { name: "Edamame", origin: "Local Organic Farm" },
        { name: "Sea Salt", origin: "Maldon Sea Salt" },
      ],
      allergens: ["soy"],
      rating: 4.2,
      reviews: 67,
      carbonFootprint: 1,
      nutritionalFacts: {
        calories: 120,
        protein: 12,
        carbs: 8,
        fat: 5,
      },
      pairings: ["Any Ramen", "Green Tea"],
      customerComments: [],
    },
    // New Spicy Items
    {
      id: 10,
      name: "Volcano Ramen",
      description:
        "Our spiciest ramen featuring ghost peppers and habaneros in a fiery broth that will test your limits.",
      price: { dineIn: 16, takeOut: 14 },
      image: (
        <Image
          src="/images/menu/10.png"
          alt="Gluten-Free Curry Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian", "Spicy"],
      ingredients: [
        { name: "Ghost Pepper Broth", origin: "House-Made" },
        { name: "Habanero Oil", origin: "Infused In-House" },
        { name: "Crispy Tofu", origin: "Organic" },
        { name: "Scallions", origin: "Local Farm" },
      ],
      allergens: ["gluten", "soy"],
      rating: 4.1,
      reviews: 78,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 480,
        protein: 18,
        carbs: 52,
        fat: 20,
      },
      pairings: ["Milk Tea", "Ice Cream"],
      customerComments: [
        {
          user: "SpiceMaster",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704j",
          comment: "This is the real deal! 🔥",
          rating: 5,
        },
      ],
    },
    {
      id: 11,
      name: "Spicy Kimchi Ramen",
      description:
        "Korean-inspired ramen with house-fermented kimchi and gochujang, creating a tangy and spicy experience.",
      price: { dineIn: 15, takeOut: 13 },
      image: (
        <Image
          src="/images/menu/11.png"
          alt="Spicy Kimchi Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegan", "Spicy", "Gluten-Free"],
      ingredients: [
        { name: "Kimchi Broth", origin: "House-Fermented" },
        { name: "Rice Noodles", origin: "Gluten-Free" },
        { name: "Napa Cabbage", origin: "Local Farm" },
        { name: "Gochujang", origin: "Traditional Korean" },
      ],
      allergens: ["soy"],
      rating: 4.6,
      reviews: 145,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 460,
        protein: 16,
        carbs: 54,
        fat: 18,
      },
      pairings: ["Kimchi Pancake", "Makgeolli"],
      customerComments: [
        {
          user: "KoreanFoodLover",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704k",
          comment: "Perfect fusion of Korean and Japanese flavors!",
          rating: 5,
        },
      ],
    },
    // New Keto Items
    {
      id: 12,
      name: "Keto Avocado Ramen",
      description:
        "Creamy avocado-based broth with zucchini noodles and high-fat toppings for the perfect keto meal.",
      price: { dineIn: 17, takeOut: 15 },
      image: (
        <Image
          src="/images/menu/12.png"
          alt="Keto Avocado Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian", "Keto", "Gluten-Free"],
      ingredients: [
        { name: "Avocado Broth", origin: "Fresh Avocados" },
        { name: "Zucchini Noodles", origin: "Spiralized Fresh" },
        { name: "Macadamia Nuts", origin: "Hawaiian Grown" },
        { name: "Coconut Oil", origin: "Organic" },
      ],
      allergens: ["nuts"],
      rating: 4.3,
      reviews: 92,
      carbonFootprint: 4,
      nutritionalFacts: {
        calories: 380,
        protein: 12,
        carbs: 8,
        fat: 35,
      },
      pairings: ["Keto Fat Bombs", "Bulletproof Coffee"],
      customerComments: [
        {
          user: "KetoQueen",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704l",
          comment: "Finally, a keto ramen that's actually good!",
          rating: 4,
        },
      ],
    },
    {
      id: 13,
      name: "Keto Fat Bombs",
      description:
        "Rich, creamy fat bombs made with coconut oil, cocoa, and erythritol for the perfect keto dessert.",
      price: { dineIn: 7, takeOut: 6 },
      image: (
        <Image
          src="/images/menu/13.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Desserts",
      tags: ["Vegan", "Keto", "Gluten-Free"],
      ingredients: [
        { name: "Coconut Oil", origin: "Organic" },
        { name: "Cocoa Powder", origin: "Fair Trade" },
        { name: "Erythritol", origin: "Natural Sweetener" },
        { name: "Vanilla Extract", origin: "Pure Madagascar" },
      ],
      allergens: [],
      rating: 4.0,
      reviews: 45,
      carbonFootprint: 3,
      nutritionalFacts: {
        calories: 280,
        protein: 2,
        carbs: 3,
        fat: 28,
      },
      pairings: ["Keto Ramen", "Bulletproof Coffee"],
      customerComments: [],
    },
    // New Nut-Free Items
    {
      id: 14,
      name: "Nut-Free Pad Thai Ramen",
      description:
        "Thai-inspired ramen with tamarind, lime, and peanuts replaced with sunflower seeds for nut-free diners.",
      price: { dineIn: 15, takeOut: 13 },
      image: (
        <Image
          src="/images/menu/14.png"
          alt="Mushroom Tonkotsu Ramen"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Ramen",
      tags: ["Vegetarian", "Nut-Free"],
      ingredients: [
        { name: "Tamarind Broth", origin: "Traditional Thai" },
        { name: "Rice Noodles", origin: "Gluten-Free" },
        { name: "Sunflower Seeds", origin: "Nut-Free Alternative" },
        { name: "Bean Sprouts", origin: "Local Farm" },
      ],
      allergens: ["soy"],
      rating: 4.4,
      reviews: 112,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 490,
        protein: 16,
        carbs: 56,
        fat: 19,
      },
      pairings: ["Spring Rolls", "Thai Iced Tea"],
      customerComments: [
        {
          user: "NutFreeFoodie",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704m",
          comment: "So glad I can enjoy this safely!",
          rating: 5,
        },
      ],
    },
    {
      id: 15,
      name: "Nut-Free Chocolate Mochi",
      description:
        "Soft, chewy mochi filled with rich chocolate ganache, made without any nuts for safe enjoyment.",
      price: { dineIn: 8, takeOut: 7 },
      image: (
        <Image
          src="/images/menu/15.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Desserts",
      tags: ["Vegetarian", "Nut-Free"],
      ingredients: [
        { name: "Mochi Rice", origin: "Traditional Japanese" },
        { name: "Dark Chocolate", origin: "Fair Trade" },
        { name: "Coconut Milk", origin: "Organic" },
        { name: "Vanilla Bean", origin: "Madagascar" },
      ],
      allergens: ["gluten"],
      rating: 4.5,
      reviews: 78,
      carbonFootprint: 3,
      nutritionalFacts: {
        calories: 220,
        protein: 3,
        carbs: 35,
        fat: 8,
      },
      pairings: ["Any Ramen", "Green Tea"],
      customerComments: [],
    },
    // New Drinks
    {
      id: 16,
      name: "Matcha Latte",
      description:
        "Smooth, creamy matcha latte made with ceremonial-grade green tea and oat milk.",
      price: { dineIn: 6, takeOut: 5 },
      image: (
        <Image
          src="/images/menu/16.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Drinks",
      tags: ["Vegan", "Gluten-Free", "Nut-Free"],
      ingredients: [
        { name: "Ceremonial Matcha", origin: "Uji, Japan" },
        { name: "Oat Milk", origin: "Organic" },
        { name: "Agave Syrup", origin: "Natural Sweetener" },
      ],
      allergens: [],
      rating: 4.7,
      reviews: 234,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 140,
        protein: 4,
        carbs: 18,
        fat: 6,
      },
      pairings: ["Any Dessert", "Breakfast Items"],
      customerComments: [
        {
          user: "MatchaLover",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704n",
          comment: "The best matcha latte I've ever had!",
          rating: 5,
        },
      ],
    },
    {
      id: 17,
      name: "Yuzu Lemonade",
      description:
        "Refreshing Japanese yuzu citrus lemonade with a hint of honey and mint.",
      price: { dineIn: 5, takeOut: 4 },
      image: (
        <Image
          src="/images/menu/17.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Drinks",
      tags: ["Vegan", "Gluten-Free", "Nut-Free"],
      ingredients: [
        { name: "Yuzu Juice", origin: "Japanese Citrus" },
        { name: "Local Honey", origin: "Bee Farm" },
        { name: "Fresh Mint", origin: "Our Garden" },
        { name: "Sparkling Water", origin: "Filtered" },
      ],
      allergens: [],
      rating: 4.3,
      reviews: 156,
      carbonFootprint: 1,
      nutritionalFacts: {
        calories: 90,
        protein: 0,
        carbs: 22,
        fat: 0,
      },
      pairings: ["Spicy Ramen", "Summer Dishes"],
      customerComments: [
        {
          user: "CitrusFan",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704o",
          comment: "So refreshing and unique!",
          rating: 4,
        },
      ],
    },
    // New Desserts
    {
      id: 18,
      name: "Mochi Ice Cream Trio",
      description:
        "Three flavors of mochi ice cream: matcha, strawberry, and vanilla, served with fresh berries.",
      price: { dineIn: 9, takeOut: 8 },
      image: (
        <Image
          src="/images/menu/18.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Desserts",
      tags: ["Vegetarian", "Gluten-Free"],
      ingredients: [
        { name: "Mochi Wrappers", origin: "House-Made" },
        { name: "Matcha Ice Cream", origin: "Artisan Made" },
        { name: "Strawberry Ice Cream", origin: "Local Berries" },
        { name: "Vanilla Ice Cream", origin: "Madagascar Vanilla" },
      ],
      allergens: ["soy"],
      rating: 4.6,
      reviews: 189,
      carbonFootprint: 3,
      nutritionalFacts: {
        calories: 280,
        protein: 4,
        carbs: 42,
        fat: 10,
      },
      pairings: ["Any Ramen", "Green Tea"],
      customerComments: [
        {
          user: "DessertQueen",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704p",
          comment: "The perfect ending to any meal!",
          rating: 5,
        },
      ],
    },
    {
      id: 19,
      name: "Vegan Tiramisu",
      description:
        "Classic tiramisu reimagined with cashew cream, coffee-soaked ladyfingers, and cocoa powder.",
      price: { dineIn: 10, takeOut: 9 },
      image: (
        <Image
          src="/images/menu/19.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Desserts",
      tags: ["Vegan", "Gluten-Free"],
      ingredients: [
        { name: "Cashew Cream", origin: "Organic Cashews" },
        { name: "Coffee", origin: "Local Roaster" },
        { name: "Cocoa Powder", origin: "Fair Trade" },
        { name: "Maple Syrup", origin: "Natural Sweetener" },
      ],
      allergens: ["nuts"],
      rating: 4.4,
      reviews: 134,
      carbonFootprint: 4,
      nutritionalFacts: {
        calories: 320,
        protein: 6,
        carbs: 28,
        fat: 22,
      },
      pairings: ["Espresso", "Any Dessert"],
      customerComments: [
        {
          user: "VeganBaker",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704q",
          comment: "Can't believe this is vegan!",
          rating: 5,
        },
      ],
    },
    // Additional Sides
    {
      id: 20,
      name: "Seaweed Salad",
      description:
        "Fresh wakame seaweed salad with sesame oil, rice vinegar, and a hint of chili for a refreshing side.",
      price: { dineIn: 7, takeOut: 6 },
      image: (
        <Image
          src="/images/menu/20.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Sides",
      tags: ["Vegan", "Gluten-Free", "Nut-Free"],
      ingredients: [
        { name: "Wakame Seaweed", origin: "Japanese Waters" },
        { name: "Sesame Oil", origin: "Toasted Sesame" },
        { name: "Rice Vinegar", origin: "Traditional" },
        { name: "Chili Flakes", origin: "Dried Red Peppers" },
      ],
      allergens: ["sesame"],
      rating: 4.2,
      reviews: 89,
      carbonFootprint: 1,
      nutritionalFacts: {
        calories: 80,
        protein: 2,
        carbs: 6,
        fat: 5,
      },
      pairings: ["Any Ramen", "Green Tea"],
      customerComments: [],
    },
    {
      id: 21,
      name: "Agedashi Tofu",
      description:
        "Silky tofu lightly fried and served in a savory dashi broth with grated daikon and green onions.",
      price: { dineIn: 8, takeOut: 7 },
      image: (
        <Image
          src="/images/menu/21.png"
          alt="Vegan Tempura Vegetables"
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loader={({ src }) => src}
        />
      ),
      category: "Sides",
      tags: ["Vegetarian", "Gluten-Free"],
      ingredients: [
        { name: "Silken Tofu", origin: "Local Tofu Maker" },
        { name: "Dashi Broth", origin: "House-Made" },
        { name: "Daikon Radish", origin: "Local Farm" },
        { name: "Green Onions", origin: "Our Garden" },
      ],
      allergens: ["soy"],
      rating: 4.5,
      reviews: 167,
      carbonFootprint: 2,
      nutritionalFacts: {
        calories: 160,
        protein: 12,
        carbs: 8,
        fat: 10,
      },
      pairings: ["Any Ramen", "Sake"],
      customerComments: [
        {
          user: "TofuLover",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704r",
          comment: "Perfect texture and flavor!",
          rating: 5,
        },
      ],
    },
  ];
  const seasonalSpecials: SeasonalSpecial[] = [
    {
      date: "2025-07-01",
      name: "Summer Cold Ramen",
      description: "Chilled noodles, citrus broth, tempura flakes",
      available: true,
    },
    {
      date: "2025-10-01",
      name: "Pumpkin Spice Ramen",
      description: "Pumpkin broth, sage oil, roasted squash",
      available: false,
    },
  ];

  const filteredItems = useMemo(() => {
    if (selectedFilters.length === 0) return menuItems;
    return menuItems.filter((item) =>
      selectedFilters.every((f) =>
        item.tags.includes(f as MenuItem["tags"][number]),
      ),
    );
  }, [selectedFilters, menuItems]);

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const buildYourOwnOptions: BuildYourOwnOptions = {
    bases: [
      { name: "Shoyu (Soy)", price: 0, description: "Rich soy-based broth" },
      { name: "Miso", price: 1, description: "Savory fermented soybean broth" },
      {
        name: "Spicy Miso",
        price: 2,
        description: "Fiery miso with chili oil",
      },
      { name: "Curry", price: 2, description: "Aromatic Japanese curry broth" },
      {
        name: "Mushroom Tonkotsu",
        price: 3,
        description: "Creamy mushroom-based broth",
      },
      { name: "Shio (Light Salt)", price: 8 },
    ],
    noodles: [
      {
        name: "Traditional Wheat",
        price: 0,
        description: "Classic ramen noodles",
      },
      {
        name: "Rice Noodles",
        price: 0,
        description: "Gluten-free alternative",
      },
      { name: "Shirataki", price: 1, description: "Low-carb konjac noodles" },
      { name: "Udon", price: 1, description: "Thick, chewy wheat noodles" },
      {
        name: "Zucchini Noodles",
        price: 2,
        description: "Fresh spiralized zucchini",
      },
    ],
    toppings: [
      { name: "Scallions", price: 0, description: "Fresh green onions" },
      { name: "Bamboo Shoots", price: 1, description: "Crisp, fresh bamboo" },
      {
        name: "Enoki Mushrooms",
        price: 1,
        description: "Delicate forest mushrooms",
      },
      {
        name: "Nori (Seaweed)",
        price: 1,
        description: "Toasted seaweed sheets",
      },
      { name: "Corn", price: 1, description: "Sweet Hokkaido corn" },
      { name: "Bean Sprouts", price: 1, description: "Fresh, crunchy sprouts" },
      { name: "Bok Choy", price: 1, description: "Tender Chinese cabbage" },
      {
        name: "Shiitake Mushrooms",
        price: 2,
        description: "Umami-rich, hearty texture",
      },
      { name: "Crispy Tofu", price: 2, description: "Golden-fried tofu cubes" },
      {
        name: "Soft-Boiled Egg",
        price: 2,
        description: "Perfectly cooked egg",
      },
    ],
    addOns: [
      { name: "Chili Oil", price: 1, description: "Spicy chili-infused oil" },
      { name: "Sesame Oil", price: 1, description: "Toasted sesame oil" },
      { name: "Miso Paste", price: 1, description: "Extra miso for richness" },
      { name: "Fresh Ginger", price: 1, description: "Grated fresh ginger" },
      { name: "Garlic Chips", price: 1, description: "Crispy fried garlic" },
      {
        name: "Extra Broth",
        price: 2,
        description: "Additional broth on the side",
      },
      {
        name: "Extra Noodles",
        price: 3,
        description: "Double portion of noodles",
      },
      {
        name: "Truffle Oil",
        price: 4,
        description: "Luxurious black truffle oil",
      },
    ],
  };

  const calculateCustomPrice = () => {
    let price = 0;
    if (customRamen.base) {
      price +=
        buildYourOwnOptions.bases.find((b) => b.name === customRamen.base)
          ?.price || 0;
    }
    if (customRamen.noodles) {
      price +=
        buildYourOwnOptions.noodles.find((n) => n.name === customRamen.noodles)
          ?.price || 0;
    }
    price += customRamen.toppings.length * 1; // Assuming toppings are $1 each
    price += customRamen.addOns.length * 2; // Assuming add-ons are $2 each
    return price;
  };

  const resetCustomRamen = () => {
    setCustomRamen({
      base: "",
      noodles: "",
      toppings: [],
      addOns: [],
    });
  };

  const addToCustomRamen = (category: "toppings" | "addOns", item: string) => {
    if (category === "toppings") {
      if (customRamen.toppings.length < 5) {
        if (!customRamen.toppings.includes(item)) {
          setCustomRamen({
            ...customRamen,
            toppings: [...customRamen.toppings, item],
          });
        }
      } else {
        toast.error("You can only add up to 5 toppings.", {
          icon: <CircleAlert color="var(--color-red-700)" />,
        });
      }
    } else if (category === "addOns" && customRamen.addOns.length < 3) {
      if (customRamen.addOns.length < 3) {
        if (!customRamen.addOns.includes(item)) {
          setCustomRamen({
            ...customRamen,
            addOns: [...customRamen.addOns, item],
          });
        }
      } else {
        toast.error("You can only add up to 3 add-ons.", {
          icon: <CircleAlert color="var(--color-red-700)" />,
        });
      }
    }
  };

  const removeFromCustomRamen = (
    category: "toppings" | "addOns",
    item: string,
  ) => {
    setCustomRamen({
      ...customRamen,
      [category]: customRamen[category].filter((i: string) => i !== item),
    });
  };

  const handleBuildRamenSubmit = () => {
    if (customRamen.base && customRamen.noodles) {
      const customRamenItem: MenuItem = {
        id: Date.now(), // Use timestamp for a unique ID
        name: "Custom Built Ramen",
        description: `Broth: ${customRamen.base}, Noodles: ${
          customRamen.noodles
        }, Toppings: ${customRamen.toppings.join(
          ", ",
        )}, Add-ons: ${customRamen.addOns.join(", ")}`,
        price: {
          dineIn: calculateCustomPrice(),
          takeOut: calculateCustomPrice(),
        },
        image: (
          <Image
            src="/images/menu/1.png"
            alt="Custom Ramen"
            width={200}
            height={200}
            className="w-full h-full object-cover"
            loader={({ src }) => src}
          />
        ),
        category: "Ramen",
        tags: ["Vegetarian", "Custom"],
        ingredients: [
          { name: customRamen.base, origin: "Custom" },
          { name: customRamen.noodles, origin: "Custom" },
          ...customRamen.toppings.map((t) => ({ name: t, origin: "Custom" })),
          ...customRamen.addOns.map((a) => ({ name: a, origin: "Custom" })),
        ],
        allergens: [], // Could be calculated based on ingredients
        rating: 0,
        reviews: 0,
        carbonFootprint: 3, // Average
        nutritionalFacts: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        }, // Needs calculation
        pairings: [],
        customerComments: [],
      };
      handleAddToOrder(customRamenItem);
      resetCustomRamen();
      setShowBuildRamen(false);
    }
  };

  const handleAddToOrder = (dish: MenuItem) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find(
        (item) => item.menuItem.id === dish.id,
      );
      if (existingItem) {
        return currentOrder.map((item) =>
          item.menuItem.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentOrder, { menuItem: dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: number, newQuantity: number) => {
    setOrder((currentOrder) => {
      if (newQuantity <= 0) {
        return currentOrder.filter((item) => item.menuItem.id !== dishId);
      }
      return currentOrder.map((item) =>
        item.menuItem.id === dishId ? { ...item, quantity: newQuantity } : item,
      );
    });
  };

  const orderTotal = useMemo(() => {
    return order
      .reduce((total, orderItem) => {
        const price = orderItem.menuItem.price[diningMode];
        return total + price * orderItem.quantity;
      }, 0)
      .toFixed(2);
  }, [order, diningMode]);

  const totalItems = useMemo(() => {
    return order.reduce((total, orderItem) => total + orderItem.quantity, 0);
  }, [order]);

  return (
    <>
      <ScrollToTop />
      <div className="bg-bianca-50 font-sans relative overflow-hidden">
        <Navbar currentPage="Menu" />

        {/* Dark Header Section with Footer Theme */}
        <div className="bg-gradient-to-b from-shiso-900 via-shiso-800 to-shiso-900 relative overflow-hidden">
          {/* Animated Background Elements for Header */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Lanterns */}
            <motion.div
              className="absolute top-20 left-10 w-8 h-12 bg-amber-400/20 rounded-full"
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
              className="absolute top-40 right-20 w-6 h-10 bg-amber-300/30 rounded-full"
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

          <main className="container mx-auto px-4 py-12 relative z-10">
            <header className="text-center w-full clamp-[pt,18,24,sm,3xl] clamp-[pb,18,24,sm,3xl] relative">
              {/* Vertical Kanji background */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                <span
                  className="font-sawarabi-mincho text-[20vw] text-bianca-50 opacity-5 select-none"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    letterSpacing: "0.2em",
                  }}
                >
                  菜食拉麺
                </span>
              </div>

              <motion.h1
                className="text-6xl font-serif mb-2 text-bianca-50 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our Menu
              </motion.h1>
              <motion.p
                className="text-xl text-shiso-200 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                A celebration of plant-based Japanese cuisine
              </motion.p>
            </header>
          </main>
        </div>

        {/* Rest of the page with original light theme */}
        <div className="bg-bianca-50">
          {/* Decorative backgrounds */}
          <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
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
                    d="M0,10 Q5,5 10,10 Q15,15 20,10"
                    stroke="#B6C7A8"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <path
                    d="M0,15 Q5,10 10,15 Q15,20 20,15"
                    stroke="#B6C7A8"
                    strokeWidth="0.5"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#seigaiha)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-[url('/images/about/washi.png')] bg-repeat opacity-30 mix-blend-multiply pointer-events-none z-0" />

          <div className="bg-bianca-100 shadow-lg sticky top-16 z-40 border-b-2 border-shiso-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 bg-shiso-100 p-1 rounded-full mb-4 md:mb-0 border border-shiso-200">
                <button
                  onClick={() => setDiningMode("dineIn")}
                  className={`px-4 py-2 rounded-full font-medium transition-all text-sm flex items-center space-x-2 ${
                    diningMode === "dineIn"
                      ? "bg-white text-shiso-800 shadow-md"
                      : "text-shiso-700 hover:bg-white/50"
                  }`}
                >
                  <Utensils size={16} />
                  <span>Dine-In</span>
                </button>
                <button
                  onClick={() => setDiningMode("takeOut")}
                  className={`px-4 py-2 rounded-full font-medium transition-all text-sm flex items-center space-x-2 ${
                    diningMode === "takeOut"
                      ? "bg-white text-shiso-800 shadow-md"
                      : "text-shiso-700 hover:bg-white/50"
                  }`}
                >
                  <ShoppingBag size={16} />
                  <span>Carry-Out</span>
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleFilter(option)}
                    className={`px-3 py-1.5 rounded-full border-2 transition-all text-sm font-semibold flex items-center space-x-2 ${
                      selectedFilters.includes(option)
                        ? "bg-shiso-500 text-white border-shiso-600 shadow-md"
                        : "bg-white text-shiso-800 border-shiso-200 hover:border-shiso-300 hover:shadow-sm"
                    }`}
                  >
                    <span className="text-lg">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              {/* Build Your Own Ramen Section */}
              <motion.div className="mb-12 bg-gradient-to-r from-shiso-50 to-shiso-100 rounded-2xl p-8 border-2 border-shiso-200 relative overflow-hidden">
                {/* Decorative elements */}

                <div className="text-center mb-6 relative z-10">
                  <h2 className="text-3xl font-serif text-shiso-800 mb-2">
                    Build Your Own Ramen
                  </h2>
                  <p className="text-shiso-700">
                    Create your perfect bowl with our customizable ramen builder
                  </p>
                </div>
                <div className="flex justify-center relative z-10">
                  <button
                    onClick={() => setShowBuildRamen(true)}
                    className="bg-shiso-600 hover:bg-shiso-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>Start Building</span>
                  </button>
                </div>
              </motion.div>

              {/* Environmental Impact Banner */}
              <motion.div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 relative overflow-hidden">
                {/* Decorative leaf pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50,10 Q70,30 50,50 Q30,70 50,90 Q70,70 50,50 Q30,30 50,10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="text-center relative z-10">
                  <div className="flex justify-center mb-4">
                    <Leaf className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-serif text-green-800 mb-3">
                    Calculate Your Environmental Impact
                  </h2>
                  <p className="text-green-700 text-lg mb-6 max-w-2xl mx-auto">
                    Create your order and see its real-world environmental
                    impact! Discover how sustainable choices make a difference
                    in carbon footprint, water usage, waste generation, and
                    energy consumption.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="bg-white px-6 py-3 rounded-full border-2 border-green-300">
                      <span className="text-green-800 font-semibold">
                        Add items to your cart
                      </span>
                    </div>
                    <div className="text-green-600 text-2xl">→</div>
                    <div className="bg-white px-6 py-3 rounded-full border-2 border-green-300">
                      <span className="text-green-800 font-semibold">
                        View impact analysis
                      </span>
                    </div>
                    <div className="text-green-600 text-2xl">→</div>
                    <div className="bg-white px-6 py-3 rounded-full border-2 border-green-300">
                      <span className="text-green-800 font-semibold">
                        See your savings
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredItems.map((item, i) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      diningMode={diningMode}
                      onClick={() => setSelectedDish(item)}
                      onAddToCart={() => handleAddToOrder(item)}
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
          <SeasonalSpecialsSection specials={seasonalSpecials} />
          <AnimatePresence>
            {selectedDish && (
              <DishDetailModal
                dish={selectedDish}
                diningMode={diningMode}
                onClose={() => setSelectedDish(null)}
                onAddToCart={() => {
                  handleAddToOrder(selectedDish);
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showBuildRamen && (
              <BuildRamenModal
                onClose={() => setShowBuildRamen(false)}
                buildYourOwnOptions={buildYourOwnOptions}
                customRamen={customRamen}
                setCustomRamen={setCustomRamen}
                calculateCustomPrice={calculateCustomPrice}
                addToCustomRamen={addToCustomRamen}
                removeFromCustomRamen={removeFromCustomRamen}
                handleBuildRamenSubmit={handleBuildRamenSubmit}
                resetCustomRamen={resetCustomRamen}
              />
            )}
          </AnimatePresence>
          <OrderCart
            order={order}
            orderTotal={orderTotal}
            totalItems={totalItems}
            diningMode={diningMode}
            handleUpdateQuantity={handleUpdateQuantity}
            showCart={showCart}
            setShowCart={setShowCart}
            activeCartTab={activeCartTab}
            setActiveCartTab={setActiveCartTab}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

const OrderCart = ({
  order,
  orderTotal,
  totalItems,
  diningMode,
  handleUpdateQuantity,
  showCart,
  setShowCart,
  activeCartTab,
  setActiveCartTab,
}: {
  order: OrderItem[];
  orderTotal: string;
  totalItems: number;
  diningMode: "dineIn" | "takeOut";
  handleUpdateQuantity: (dishId: number, newQuantity: number) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  activeCartTab: "order" | "impact";
  setActiveCartTab: (tab: "order" | "impact") => void;
}) => {
  if (totalItems === 0 && !showCart) return null;

  // Convert order items to the format expected by EnvironmentalImpactCalculator
  const orderForCalculator = order.map(({ menuItem, quantity }) => ({
    menuItem: {
      id: menuItem.id,
      name: menuItem.name,
      carbonFootprint: menuItem.carbonFootprint,
      tags: menuItem.tags,
    },
    quantity,
  }));

  return (
    <Drawer open={showCart} onOpenChange={setShowCart}>
      <DrawerTrigger asChild>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-shiso-600 hover:bg-shiso-700 h-16 w-16 relative"
          >
            <ShoppingBag size={28} />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {totalItems}
            </div>
          </Button>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent title="" className="bg-bianca-50">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle className="text-3xl font-serif text-shiso-900">
              Your Order
            </DrawerTitle>
            <DrawerDescription>
              Review and manage items in your cart.
            </DrawerDescription>
          </DrawerHeader>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 px-4">
            <button
              onClick={() => setActiveCartTab("order")}
              className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${
                activeCartTab === "order"
                  ? "border-shiso-500 text-shiso-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Order Items ({totalItems})
            </button>
            <button
              onClick={() => setActiveCartTab("impact")}
              className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                activeCartTab === "impact"
                  ? "border-shiso-500 text-shiso-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Leaf size={16} />
              Environmental Impact
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeCartTab === "order" && (
              <div className="h-[60vh] overflow-y-auto p-4">
                {order.length > 0 ? (
                  <div className="space-y-4">
                    {order.map(({ menuItem, quantity }) => (
                      <div
                        key={menuItem.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-shiso-100"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            {menuItem.image}
                          </div>
                          <div>
                            <h4 className="font-semibold text-shiso-800">
                              {menuItem.name}
                            </h4>
                            <p className="text-sm text-marshland-600">
                              ${menuItem.price[diningMode]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              handleUpdateQuantity(menuItem.id, quantity - 1)
                            }
                            className="w-8 h-8"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold text-shiso-800">
                            {quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              handleUpdateQuantity(menuItem.id, quantity + 1)
                            }
                            className="w-8 h-8"
                          >
                            <Plus size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-8 h-8 text-red-500 hover:text-red-700"
                            onClick={() => handleUpdateQuantity(menuItem.id, 0)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-marshland-600 text-center py-8">
                    Your cart is empty.
                  </p>
                )}
              </div>
            )}

            {activeCartTab === "impact" && (
              <div className="h-[60vh] overflow-y-auto">
                <EnvironmentalImpactCalculator
                  order={orderForCalculator}
                  isOrderMode={true}
                />
              </div>
            )}
          </div>

          <DrawerFooter className="border-t border-gray-200 pt-4">
            {activeCartTab === "order" && (
              <>
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span className="text-shiso-900">Total:</span>
                  <span className="text-shiso-700">${orderTotal}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-shiso-500 hover:bg-shiso-600"
                >
                  Place Order
                </Button>
              </>
            )}
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                {activeCartTab === "order" ? "Continue Shopping" : "Close"}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MenuItemCard = ({
  item,
  diningMode,
  onClick,
  index,
  onAddToCart,
}: {
  item: MenuItem;
  diningMode: "dineIn" | "takeOut";
  onClick: () => void;
  index: number;
  onAddToCart: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-shiso-100"
    >
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div className="w-full h-full group-hover:scale-110 transition-transform duration-500">
          {item.image}
        </div>
        <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap justify-end gap-2 p-3">
          {item.category === "Ramen" && (
            <span className="text-xs bg-shiso-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
              Ramen
            </span>
          )}
          {item.category === "Sides" && (
            <span className="text-xs bg-aka-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
              Side
            </span>
          )}
          {item.category === "Desserts" && (
            <span className="text-xs bg-amber-700 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
              Dessert
            </span>
          )}
          {item.category === "Drinks" && (
            <span className="text-xs bg-rose-400 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
              Drink
            </span>
          )}
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-black/70 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-bold text-lg">View Details</span>
        </div>
      </div>
      <div className="p-5 bg-gradient-to-b from-white to-shiso-50/30">
        <h3 className="text-xl font-bold text-shiso-900 mb-1">{item.name}</h3>
        <p className="text-sm text-marshland-700 h-16 leading-relaxed">
          {item.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-semibold text-shiso-700">
            ${item.price[diningMode]}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-marshland-600">
              <Star size={16} className="mr-1 text-amber-500" />
              {item.rating} ({item.reviews})
            </div>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-shiso-200 hover:border-shiso-300 hover:bg-shiso-50"
              onClick={onAddToCart}
            >
              <ShoppingBag size={18} className="text-shiso-600" />
            </Button>
          </div>
        </div>
        {/* Environmental Impact Indicator */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Leaf size={14} className="text-green-600" />
            <span className="text-xs text-green-700 font-medium">Impact:</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Leaf
                key={i}
                size={12}
                className={`${
                  i < item.carbonFootprint ? "text-green-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">
              {
                ["Very Low", "Low", "Medium", "High", "Very High"][
                  item.carbonFootprint - 1
                ]
              }
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DishDetailModal = ({
  dish,
  diningMode,
  onClose,
  onAddToCart,
}: {
  dish: MenuItem;
  diningMode: "dineIn" | "takeOut";
  onClose: () => void;
  onAddToCart: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("info");
  const tabs = ["info", "nutrition", "reviews"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-bianca-50 rounded-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/3 bg-bianca-100 p-8 flex flex-col justify-between">
          <div>
            <div className="h-48 flex items-center justify-center mb-4">
              {dish.image}
            </div>
            <h2 className="text-4xl font-serif text-shiso-900 mb-2">
              {dish.name}
            </h2>
            <p className="text-marshland-700 mb-4">{dish.description}</p>
            <div className="flex items-center text-lg text-marshland-800">
              <Star size={20} className="mr-2 text-amber-500" />
              <span>
                {dish.rating} ({dish.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-5xl font-bold text-shiso-700">
              ${dish.price[diningMode]}
            </span>
            <button
              onClick={onAddToCart}
              className="w-full mt-4 bg-shiso-500 text-white font-bold py-3 rounded-xl hover:bg-shiso-600 transition-all"
            >
              Add to Order
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-8 overflow-y-auto">
          <div className="flex justify-between items-start">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-shiso-500 text-shiso-700"
                      : "text-gray-500 hover:text-shiso-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "info" && <InfoTab dish={dish} />}
                {activeTab === "nutrition" && <NutritionTab dish={dish} />}
                {activeTab === "reviews" && <ReviewsTab dish={dish} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoTab = ({ dish }: { dish: MenuItem }) => (
  <div>
    <h3 className="text-xl font-bold text-shiso-800 mb-4">Ingredients</h3>
    <div className="grid grid-cols-2 gap-4 mb-8">
      {dish.ingredients.map((ing) => (
        <div
          key={ing.name}
          className="bg-white p-3 rounded-lg shadow-sm flex items-start gap-2"
        >
          <div>
            <p className="font-semibold text-shiso-900 flex items-center gap-1">
              {ing.name}
              {ing.chefTip && (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="ml-1 text-shiso-500 hover:text-shiso-700 focus:outline-none"
                      aria-label="Chef's tip"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 8v4m0 4h.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="center">
                    <span className="font-semibold text-shiso-800">
                      Chef&rsquo;s Tip:
                    </span>{" "}
                    {ing.chefTip}
                  </PopoverContent>
                </Popover>
              )}
            </p>
            <p className="text-xs text-marshland-600">{ing.origin}</p>
          </div>
        </div>
      ))}
    </div>
    <h3 className="text-xl font-bold text-shiso-800 mb-4">
      Suggested Pairings
    </h3>
    <div className="flex space-x-4">
      {dish.pairings.map((pairing) => (
        <div
          key={pairing}
          className="bg-shiso-100 text-shiso-800 px-4 py-2 rounded-lg font-semibold"
        >
          {pairing}
        </div>
      ))}
    </div>
  </div>
);

const NutritionTab = ({ dish }: { dish: MenuItem }) => (
  <div>
    <h3 className="text-xl font-bold text-shiso-800 mb-4">Carbon Footprint</h3>
    <CarbonFootprintMeter level={dish.carbonFootprint} />
    <h3 className="text-xl font-bold text-shiso-800 mt-8 mb-4">
      Nutritional Facts
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <NutritionalFact
        label="Calories"
        value={dish.nutritionalFacts.calories}
      />
      <NutritionalFact
        label="Protein"
        value={`${dish.nutritionalFacts.protein}g`}
      />
      <NutritionalFact
        label="Carbs"
        value={`${dish.nutritionalFacts.carbs}g`}
      />
      <NutritionalFact label="Fat" value={`${dish.nutritionalFacts.fat}g`} />
    </div>
  </div>
);

const ReviewsTab = ({ dish }: { dish: MenuItem }) => (
  <div>
    <h3 className="text-xl font-bold text-shiso-800 mb-4">Customer Comments</h3>
    <div className="space-y-6">
      {dish.customerComments.length > 0 ? (
        dish.customerComments.map((review) => (
          <CustomerReview key={review.user} review={review} />
        ))
      ) : (
        <p className="text-marshland-600">No comments yet!</p>
      )}
    </div>
  </div>
);
const CarbonFootprintMeter = ({ level }: { level: number }) => (
  <div className="flex items-center space-x-2">
    {[...Array(5)].map((_, i) => (
      <Leaf
        key={i}
        size={32}
        className={`transition-colors ${
          i < level ? "text-shiso-500" : "text-gray-300"
        }`}
      />
    ))}
    <span className="font-semibold text-shiso-700">
      {["Very Low", "Low", "Medium", "High", "Very High"][level - 1]}
    </span>
  </div>
);

const NutritionalFact = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <p className="text-2xl font-bold text-shiso-700">{value}</p>
    <p className="text-sm text-marshland-600">{label}</p>
  </div>
);

const CustomerReview = ({ review }: { review: CustomerComment }) => (
  <div className="flex space-x-4">
    <img
      src={review.avatar}
      alt={review.user}
      className="w-12 h-12 rounded-full"
    />
    <div>
      <div className="flex items-center space-x-2">
        <p className="font-bold text-shiso-900">{review.user}</p>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < review.rating ? "text-amber-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-marshland-700">{review.comment}</p>
    </div>
  </div>
);

const SeasonalSpecialsSection = ({
  specials,
}: {
  specials: SeasonalSpecial[];
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    return days;
  }, [currentMonth, currentYear]);

  const getSpecialForDay = (day: Date) => {
    return specials.find((s) => {
      const specialDate = new Date(s.date);
      return specialDate.toDateString() === day.toDateString();
    });
  };

  return (
    <section className="bg-bianca-100 py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern
              id="seigaiha-specials"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,10 Q5,5 10,10 Q15,15 20,10"
                stroke="#B6C7A8"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M0,15 Q5,10 10,15 Q15,20 20,15"
                stroke="#B6C7A8"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#seigaiha-specials)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-serif text-center text-shiso-900 mb-12"
        >
          Seasonal Specials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-shiso-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-shiso-800">
                {today.toLocaleString("default", { month: "long" })}{" "}
                {currentYear}
              </h3>
            </div>
            <div className="grid grid-cols-7 gap-3 text-center text-base font-semibold text-marshland-600 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3">
              {calendarDays.map((day, i) => (
                <CalendarDay
                  key={i}
                  day={day}
                  special={day ? getSpecialForDay(day) : undefined}
                  today={today}
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {specials
              .filter((s) => new Date(s.date) >= today)
              .map((special) => (
                <SeasonalSpecialCard
                  key={special.name}
                  special={special}
                  today={today}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SeasonalSpecialCard = ({
  special,
  today,
}: {
  special: SeasonalSpecial;
  today: Date;
}) => {
  // Get appropriate image based on special name
  const getSpecialImage = (name: string) => {
    switch (name) {
      case "Summer Cold Ramen":
        return "/images/menu/20.png"; // Cold ramen image
      case "Pumpkin Spice Ramen":
        return "/images/menu/21.png"; // Pumpkin ramen image
      default:
        return "/images/menu/1.png"; // Default ramen image
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-shiso-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex items-start gap-4">
        {/* Content Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-shiso-800">
              {special.name}
            </h3>
            {new Date(special.date).toDateString() === today.toDateString() && (
              <span className="bg-shiso-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                TODAY
              </span>
            )}
          </div>
          <p className="text-marshland-700 mb-4 leading-relaxed">
            {special.description}
          </p>
          <div className="text-sm font-semibold text-shiso-700 flex items-center">
            <CalendarDays size={16} className="mr-2" />
            Available from{" "}
            {new Date(special.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Small Image Section */}
        <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={getSpecialImage(special.name)}
            alt={special.name}
            className="w-full h-full object-cover"
            fill
            loader={({ src }) => src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {/* Availability Badge */}
          <div className="absolute top-2 right-2">
            {special.available ? (
              <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded text-center">
                ✓
              </span>
            ) : (
              <span className="bg-gray-500 text-white px-2 py-1 text-xs font-bold rounded text-center">
                ⏳
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CalendarDay = ({
  day,
  special,
  today,
}: {
  day: Date | null;
  special: SeasonalSpecial | undefined;
  today: Date;
}) => {
  if (!day) {
    return <div className="w-12 h-12"></div>;
  }

  const isToday = day.toDateString() === today.toDateString();
  const hasSpecial = special && special.available;

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-all ${
        isToday
          ? "bg-shiso-500 text-white"
          : hasSpecial
            ? "bg-shiso-200 text-shiso-800"
            : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {day.getDate()}
    </div>
  );
};

const BuildRamenModal = ({
  onClose,
  buildYourOwnOptions,
  customRamen,
  setCustomRamen,
  calculateCustomPrice,
  addToCustomRamen,
  removeFromCustomRamen,
  handleBuildRamenSubmit,
  resetCustomRamen,
}: {
  onClose: () => void;
  buildYourOwnOptions: BuildYourOwnOptions;
  customRamen: {
    base: string;
    noodles: string;
    toppings: string[];
    addOns: string[];
  };
  setCustomRamen: (ramen: CustomRamen) => void;
  calculateCustomPrice: () => number;
  addToCustomRamen: (category: "toppings" | "addOns", item: string) => void;
  removeFromCustomRamen: (
    category: "toppings" | "addOns",
    item: string,
  ) => void;
  handleBuildRamenSubmit: () => void;
  resetCustomRamen: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-bianca-50 rounded-2xl max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-shiso-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-serif">Build Your Own Ramen</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-shiso-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Customization Options */}
            <div className="space-y-6">
              {/* Base Selection */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-shiso-800 mb-4">
                  Choose Your Base
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {buildYourOwnOptions.bases.map(
                    (base: BuildYourOwnOptionsBases) => (
                      <button
                        key={base.name}
                        onClick={() =>
                          setCustomRamen({ ...customRamen, base: base.name })
                        }
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          customRamen.base === base.name
                            ? "border-shiso-500 bg-shiso-50"
                            : "border-gray-200 hover:border-shiso-300"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-shiso-800">
                              {base.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {base.description}
                            </p>
                          </div>
                          <span className="text-shiso-600 font-bold">
                            +${base.price}
                          </span>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Noodle Selection */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-shiso-800 mb-4">
                  Choose Your Noodles
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {buildYourOwnOptions.noodles.map(
                    (noodle: BuildYourOwnOptionsNoodles) => (
                      <button
                        key={noodle.name}
                        onClick={() =>
                          setCustomRamen({
                            ...customRamen,
                            noodles: noodle.name,
                          })
                        }
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          customRamen.noodles === noodle.name
                            ? "border-shiso-500 bg-shiso-50"
                            : "border-gray-200 hover:border-shiso-300"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-shiso-800">
                              {noodle.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {noodle.description}
                            </p>
                          </div>
                          <span className="text-shiso-600 font-bold">
                            +${noodle.price}
                          </span>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Toppings Selection */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-shiso-800 mb-4">
                  Add Toppings
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {buildYourOwnOptions.toppings.map(
                    (topping: BuildYourOwnOptionsToppings) => (
                      <button
                        key={topping.name}
                        onClick={() =>
                          addToCustomRamen("toppings", topping.name)
                        }
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          customRamen.toppings.includes(topping.name)
                            ? "border-shiso-500 bg-shiso-50"
                            : "border-gray-200 hover:border-shiso-300"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-shiso-800">
                              {topping.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {topping.description}
                            </p>
                          </div>
                          <span className="text-shiso-600 font-bold">
                            +${topping.price}
                          </span>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Add-ons Selection */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-shiso-800 mb-4">
                  Add Extras
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {buildYourOwnOptions.addOns.map(
                    (addOn: BuildYourOwnOptionsAddOns) => (
                      <button
                        key={addOn.name}
                        onClick={() => addToCustomRamen("addOns", addOn.name)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          customRamen.addOns.includes(addOn.name)
                            ? "border-shiso-500 bg-shiso-50"
                            : "border-gray-200 hover:border-shiso-300"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-shiso-800">
                              {addOn.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {addOn.description}
                            </p>
                          </div>
                          <span className="text-shiso-600 font-bold">
                            +${addOn.price}
                          </span>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Your Ramen Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
                <h3 className="text-2xl font-bold text-shiso-800 mb-4">
                  Your Custom Ramen
                </h3>

                {/* Base */}
                {customRamen.base && (
                  <div className="mb-4 p-3 bg-shiso-50 rounded-lg">
                    <h4 className="font-semibold text-shiso-800">Base</h4>
                    <p className="text-sm text-gray-600">{customRamen.base}</p>
                  </div>
                )}

                {/* Noodles */}
                {customRamen.noodles && (
                  <div className="mb-4 p-3 bg-shiso-50 rounded-lg">
                    <h4 className="font-semibold text-shiso-800">Noodles</h4>
                    <p className="text-sm text-gray-600">
                      {customRamen.noodles}
                    </p>
                  </div>
                )}

                {/* Toppings */}
                {customRamen.toppings.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-shiso-800 mb-2">
                      Toppings
                    </h4>
                    <div className="space-y-2">
                      {customRamen.toppings.map((topping) => (
                        <div
                          key={topping}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm">{topping}</span>
                          <button
                            onClick={() =>
                              removeFromCustomRamen("toppings", topping)
                            }
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {customRamen.addOns.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-shiso-800 mb-2">
                      Add-ons
                    </h4>
                    <div className="space-y-2">
                      {customRamen.addOns.map((addOn) => (
                        <div
                          key={addOn}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm">{addOn}</span>
                          <button
                            onClick={() =>
                              removeFromCustomRamen("addOns", addOn)
                            }
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total Price */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-shiso-800">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-shiso-600">
                      ${calculateCustomPrice()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleBuildRamenSubmit}
                      disabled={!customRamen.base || !customRamen.noodles}
                      className="w-full bg-shiso-600 hover:bg-shiso-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Add to Order
                    </button>
                    <button
                      onClick={resetCustomRamen}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
