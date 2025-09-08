"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronRight,
  CheckCircle,
  Calendar,
  Users,
  Utensils,
  Cake,
  Heart,
  GraduationCap,
  Gem,
  Briefcase,
  PartyPopper,
  Church,
  TreePine,
} from "lucide-react";
import React from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

import ChooseDateTime from "./sections/ChooseDateTime";
import ChooseDiningExperience from "./sections/ChooseDiningExperience";
import SakuraPetals from "./components/SakuraPetals";
import JapaneseBorder from "./components/JapaneseBorder";
import StepIndicator from "./components/StepIndicator";
import { slideInVariants } from "./animationVariants";
import type { Location, Table, EventDetails, CateringDetails } from "./types";

// --- Helper for demo: fake booked dates ---
const fullyBookedDates = [
  new Date(new Date().setDate(new Date().getDate() + 2)).toDateString(),
  new Date(new Date().setDate(new Date().getDate() + 5)).toDateString(),
];

// --- Waitlist Modal ---
function WaitlistModal({
  open,
  onClose,
  date,
  time,
}: {
  open: boolean;
  onClose: () => void;
  date?: string;
  time?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full relative">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          &times;
        </button>
        {submitted ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 text-shiso-700">
              You&rsquo;re on the Waitlist!
            </h3>
            <p className="mb-4">
              We&rsquo;ll notify you if a spot opens up for {date} at {time}.
            </p>
            <button
              className="bg-shiso-600 text-white px-6 py-2 rounded-lg mt-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-2 text-shiso-700">
              Join the Waitlist
            </h3>
            <p className="mb-4">
              This time is fully booked. Enter your info and we&rsquo;ll notify
              you if a spot opens up.
            </p>
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-shiso-600 text-white px-6 py-2 rounded-lg w-full"
              onClick={() => setSubmitted(true)}
              disabled={!name || !email}
            >
              Join Waitlist
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// // --- Dietary Info Box ---
// function DietaryInfoBox() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="my-6">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="text-shiso-700 underline font-semibold mb-2"
//       >
//         {open ? "Hide" : "Show"} Dietary Accommodations
//       </button>
//       {open && (
//         <div className="bg-shiso-50 border-l-4 border-shiso-400 p-4 rounded-xl mt-2 text-left text-shiso-900">
//           <h4 className="font-bold mb-1">Dietary Accommodations</h4>
//           <ul className="list-disc ml-5 text-sm">
//             <li>All ramen is vegetarian; vegan options available</li>
//             <li>Gluten-free noodles available on request</li>
//             <li>We accommodate nut-free, soy-free, and other allergies</li>
//             <li>
//               Let us know about any dietary needs in the special requests below
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// // --- Cancellation Policy Box ---
// function CancellationPolicyBox() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="my-6">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="text-shiso-700 underline font-semibold mb-2"
//       >
//         {open ? "Hide" : "Show"} Cancellation Policy
//       </button>
//       {open && (
//         <div className="bg-aka-50 border-l-4 border-aka-400 p-4 rounded-xl mt-2 text-left text-aka-900">
//           <h4 className="font-bold mb-1">Cancellation Policy</h4>
//           <ul className="list-disc ml-5 text-sm">
//             <li>
//               Cancel up to 24 hours before your reservation for a full refund
//             </li>
//             <li>Late cancellations or no-shows may incur a fee</li>
//             <li>Contact us for emergencies or changes</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// --- Reservation Type Selection Component ---
function ChooseReservationType({
  reservationType,
  setReservationType,
}: {
  reservationType: string;
  setReservationType: (type: string) => void;
}) {
  const reservationTypes = [
    { id: "regular", name: " Reservation", icon: Calendar },
    { id: "special-event", name: "Special Event", icon: Users },
    { id: "catering", name: "Catering", icon: Utensils },
  ];
  return (
    <motion.section className="w-full max-w-3xl px-6 text-center">
      <h1 className="text-4xl font-bold mb-8">Choose Reservation Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reservationTypes.map((type) => (
          <div
            key={type.id}
            className={`cursor-pointer border-2 rounded-xl p-8 transition-all ${
              reservationType === type.id
                ? "border-shiso-500 bg-shiso-50"
                : "border-gray-200"
            }`}
            onClick={() => {
              setReservationType(type.id);
              console.log("Selected reservation type:", type.id);
            }}
          >
            <div className="text-4xl mb-4">
              {React.createElement(type.icon, {
                className: "w-12 h-12 mx-auto text-shiso-600",
              })}
            </div>
            <h2 className="text-xl font-semibold">{type.name}</h2>
            {reservationType === type.id && (
              <CheckCircle className="mx-auto mt-4 text-shiso-500" />
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// // --- Special Event Form ---
// function SpecialEventForm({
//   details,
//   setDetails,
// }: {
//   details: any;
//   setDetails: (d: any) => void;
// }) {
//   return (
//     <motion.section className="w-full max-w-lg px-6 text-center">
//       <h2 className="text-3xl font-bold mb-6">Special Event Details</h2>
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Event Type (e.g. Birthday)"
//         value={details.eventType}
//         onChange={(e) => setDetails({ ...details, eventType: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Guest Count"
//         value={details.guestCount}
//         onChange={(e) => setDetails({ ...details, guestCount: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Preferred Date"
//         value={details.date}
//         onChange={(e) => setDetails({ ...details, date: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Contact Email"
//         value={details.email}
//         onChange={(e) => setDetails({ ...details, email: e.target.value })}
//       />
//       <textarea
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Special Requests"
//         value={details.specialRequests}
//         onChange={(e) =>
//           setDetails({ ...details, specialRequests: e.target.value })
//         }
//       />
//     </motion.section>
//   );
// }

// --- Special Event Flow Components ---
function SpecialEventDetails({
  eventDetails,
  setEventDetails,
}: {
  eventDetails: EventDetails;
  setEventDetails: (d: EventDetails) => void;
}) {
  const eventTypes = [
    { id: "birthday", name: "Birthday", icon: Cake },
    { id: "anniversary", name: "Anniversary", icon: Heart },
    { id: "graduation", name: "Graduation", icon: GraduationCap },
    { id: "engagement", name: "Engagement", icon: Gem },
    { id: "corporate", name: "Corporate Event", icon: Briefcase },
    { id: "other", name: "Other", icon: PartyPopper },
  ];

  return (
    <motion.section className="w-full max-w-4xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        What Type of Event?
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        Let us know what you&rsquo;re celebrating so we can make it special
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {eventTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer"
          >
            <JapaneseBorder>
              <div
                className="text-center p-6"
                onClick={() =>
                  setEventDetails({ ...eventDetails, eventType: type.id })
                }
                style={{
                  backgroundColor:
                    eventDetails.eventType === type.id
                      ? "rgba(80, 177, 131, 0.1)"
                      : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="text-4xl mb-4">
                  {React.createElement(type.icon, {
                    className: "w-12 h-12 mx-auto text-shiso-600",
                  })}
                </div>
                <h3 className="text-lg font-semibold text-shiso-900">
                  {type.name}
                </h3>
                {eventDetails.eventType === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4"
                  >
                    <CheckCircle className="w-6 h-6 mx-auto text-shiso-600" />
                  </motion.div>
                )}
              </div>
            </JapaneseBorder>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function SpecialEventGuestCount({
  eventDetails,
  setEventDetails,
}: {
  eventDetails: EventDetails;
  setEventDetails: (d: EventDetails) => void;
}) {
  const guestOptions = [
    { count: "2-4", description: "Intimate gathering" },
    { count: "5-8", description: "Small group" },
    { count: "9-12", description: "Medium party" },
    { count: "13-20", description: "Large celebration" },
    { count: "20+", description: "Big event" },
  ];

  return (
    <motion.section className="w-full max-w-4xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        How Many Guests?
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        This helps us prepare the perfect space and menu for your celebration
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guestOptions.map((option, index) => (
          <motion.div
            key={option.count}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer"
          >
            <JapaneseBorder>
              <div
                className="text-center p-8"
                onClick={() =>
                  setEventDetails({ ...eventDetails, guestCount: option.count })
                }
                style={{
                  backgroundColor:
                    eventDetails.guestCount === option.count
                      ? "rgba(80, 177, 131, 0.1)"
                      : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="text-3xl font-bold text-shiso-700 mb-2">
                  {option.count}
                </div>
                <p className="text-sm text-marshland-600">
                  {option.description}
                </p>
                {eventDetails.guestCount === option.count && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4"
                  >
                    <CheckCircle className="w-6 h-6 mx-auto text-shiso-600" />
                  </motion.div>
                )}
              </div>
            </JapaneseBorder>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function SpecialEventContact({
  eventDetails,
  setEventDetails,
}: {
  eventDetails: EventDetails;
  setEventDetails: (d: EventDetails) => void;
}) {
  return (
    <motion.section className="w-full max-w-2xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        Contact Information
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        We&rsquo;ll reach out to discuss the details of your special event
      </p>

      <JapaneseBorder>
        <div className="space-y-6 p-8">
          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter your full name"
              value={eventDetails.name}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter your email"
              value={eventDetails.email}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter your phone number"
              value={eventDetails.phone}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Special Requests
            </label>
            <textarea
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Any special requests, dietary restrictions, or details about your event..."
              rows={4}
              value={eventDetails.specialRequests}
              onChange={(e) =>
                setEventDetails({
                  ...eventDetails,
                  specialRequests: e.target.value,
                })
              }
            />
          </div>
        </div>
      </JapaneseBorder>
    </motion.section>
  );
}

function SpecialEventConfirmation({
  eventDetails,
}: {
  eventDetails: EventDetails;
}) {
  const eventTypeNames: { [key: string]: string } = {
    birthday: "Birthday",
    anniversary: "Anniversary",
    graduation: "Graduation",
    engagement: "Engagement",
    corporate: "Corporate Event",
    other: "Special Event",
  };

  return (
    <motion.section className="w-full max-w-2xl px-6 text-center">
      <JapaneseBorder>
        <motion.div
          className="text-6xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          🎉
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-6 font-serif text-shiso-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Event Request Submitted!
        </motion.h2>

        <motion.div
          className="text-left space-y-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-shiso-50 rounded-lg p-4">
            <h3 className="font-semibold text-shiso-900 mb-2">
              Event Details:
            </h3>
            <p>
              <strong>Type:</strong>{" "}
              {eventTypeNames[eventDetails.eventType] || "Special Event"}
            </p>
            <p>
              <strong>Guests:</strong> {eventDetails.guestCount}
            </p>
          </div>

          <div className="bg-shiso-50 rounded-lg p-4">
            <h3 className="font-semibold text-shiso-900 mb-2">
              Contact Information:
            </h3>
            <p>
              <strong>Name:</strong> {eventDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {eventDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {eventDetails.phone}
            </p>
          </div>
        </motion.div>

        <motion.p
          className="text-sm opacity-70 font-serif text-marshland-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          We&apos;ll contact you within 24 hours to discuss the details and make
          your event truly special!
        </motion.p>
      </JapaneseBorder>
    </motion.section>
  );
}

// // --- Catering Form ---
// function CateringForm({
//   details,
//   setDetails,
// }: {
//   details: any;
//   setDetails: (d: any) => void;
// }) {
//   return (
//     <motion.section className="w-full max-w-lg px-6 text-center">
//       <h2 className="text-3xl font-bold mb-6">Catering Details</h2>
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Event Type"
//         value={details.eventType}
//         onChange={(e) => setDetails({ ...details, eventType: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Guest Count"
//         value={details.guestCount}
//         onChange={(e) => setDetails({ ...details, guestCount: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Venue"
//         value={details.venue}
//         onChange={(e) => setDetails({ ...details, venue: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Preferred Date"
//         value={details.date}
//         onChange={(e) => setDetails({ ...details, date: e.target.value })}
//       />
//       <input
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Contact Email"
//         value={details.email}
//         onChange={(e) => setDetails({ ...details, email: e.target.value })}
//       />
//       <textarea
//         className="w-full mb-4 p-3 border rounded"
//         placeholder="Dietary Restrictions / Requests"
//         value={details.dietaryRestrictions}
//         onChange={(e) =>
//           setDetails({ ...details, dietaryRestrictions: e.target.value })
//         }
//       />
//     </motion.section>
//   );
// }

// --- Catering Flow Components ---
function CateringEventDetails({
  cateringDetails,
  setCateringDetails,
}: {
  cateringDetails: CateringDetails;
  setCateringDetails: (d: CateringDetails) => void;
}) {
  const cateringEventTypes = [
    {
      id: "corporate",
      name: "Corporate Event",
      icon: Briefcase,
      description: "Business meetings, conferences, team events",
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: Church,
      description: "Wedding receptions and ceremonies",
    },
    {
      id: "birthday",
      name: "Birthday Party",
      icon: Cake,
      description: "Birthday celebrations",
    },
    {
      id: "anniversary",
      name: "Anniversary",
      icon: Heart,
      description: "Anniversary celebrations",
    },
    {
      id: "graduation",
      name: "Graduation",
      icon: GraduationCap,
      description: "Graduation parties",
    },
    {
      id: "holiday",
      name: "Holiday Party",
      icon: TreePine,
      description: "Holiday celebrations",
    },
    {
      id: "other",
      name: "Other",
      icon: PartyPopper,
      description: "Other special occasions",
    },
  ];

  return (
    <motion.section className="w-full max-w-4xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        What Type of Event?
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        Let us know what you&rsquo;re planning so we can create the perfect
        catering package
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cateringEventTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer"
          >
            <JapaneseBorder>
              <div
                className="text-center p-6"
                onClick={() =>
                  setCateringDetails({ ...cateringDetails, eventType: type.id })
                }
                style={{
                  backgroundColor:
                    cateringDetails.eventType === type.id
                      ? "rgba(80, 177, 131, 0.1)"
                      : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="text-4xl mb-4">
                  {React.createElement(type.icon, {
                    className: "w-12 h-12 mx-auto text-shiso-600",
                  })}
                </div>
                <h3 className="text-lg font-semibold text-shiso-900 mb-2">
                  {type.name}
                </h3>
                <p className="text-sm text-marshland-600">{type.description}</p>
                {cateringDetails.eventType === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4"
                  >
                    <CheckCircle className="w-6 h-6 mx-auto text-shiso-600" />
                  </motion.div>
                )}
              </div>
            </JapaneseBorder>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function CateringGuestCount({
  cateringDetails,
  setCateringDetails,
}: {
  cateringDetails: CateringDetails;
  setCateringDetails: (d: CateringDetails) => void;
}) {
  const guestOptions = [
    {
      count: "10-25",
      description: "Small gathering",
      price: "Starting at $15/person",
    },
    {
      count: "26-50",
      description: "Medium event",
      price: "Starting at $12/person",
    },
    {
      count: "51-100",
      description: "Large celebration",
      price: "Starting at $10/person",
    },
    { count: "100+", description: "Big event", price: "Custom pricing" },
  ];

  return (
    <motion.section className="w-full max-w-4xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        How Many Guests?
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        This helps us create the perfect menu and pricing for your event
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guestOptions.map((option, index) => (
          <motion.div
            key={option.count}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer"
          >
            <JapaneseBorder>
              <div
                className="text-center p-8"
                onClick={() =>
                  setCateringDetails({
                    ...cateringDetails,
                    guestCount: option.count,
                  })
                }
                style={{
                  backgroundColor:
                    cateringDetails.guestCount === option.count
                      ? "rgba(80, 177, 131, 0.1)"
                      : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="text-3xl font-bold text-shiso-700 mb-2">
                  {option.count}
                </div>
                <p className="text-sm text-marshland-600 mb-2">
                  {option.description}
                </p>
                <p className="text-xs text-shiso-600 font-semibold">
                  {option.price}
                </p>
                {cateringDetails.guestCount === option.count && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4"
                  >
                    <CheckCircle className="w-6 h-6 mx-auto text-shiso-600" />
                  </motion.div>
                )}
              </div>
            </JapaneseBorder>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function CateringVenueDate({
  cateringDetails,
  setCateringDetails,
}: {
  cateringDetails: CateringDetails;
  setCateringDetails: (d: CateringDetails) => void;
}) {
  return (
    <motion.section className="w-full max-w-2xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        Event Details
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        Tell us about your venue and when you&rsquo;d like us to cater
      </p>

      <JapaneseBorder>
        <div className="space-y-6 p-8">
          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Venue/Location
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter venue name or address"
              value={cateringDetails.venue}
              onChange={(e) =>
                setCateringDetails({
                  ...cateringDetails,
                  venue: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Event Date
            </label>
            <input
              type="date"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              value={cateringDetails.date}
              onChange={(e) =>
                setCateringDetails({ ...cateringDetails, date: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Event Time
            </label>
            <select
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              value={cateringDetails.time}
              onChange={(e) =>
                setCateringDetails({ ...cateringDetails, time: e.target.value })
              }
            >
              <option value="">Select a time</option>
              <option value="breakfast">Breakfast (7:00 AM - 10:00 AM)</option>
              <option value="lunch">Lunch (11:00 AM - 2:00 PM)</option>
              <option value="dinner">Dinner (5:00 PM - 9:00 PM)</option>
              <option value="custom">Custom time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Budget Range (per person)
            </label>
            <select
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              value={cateringDetails.budget}
              onChange={(e) =>
                setCateringDetails({
                  ...cateringDetails,
                  budget: e.target.value,
                })
              }
            >
              <option value="">Select budget range</option>
              <option value="10-15">$10 - $15 per person</option>
              <option value="15-25">$15 - $25 per person</option>
              <option value="25-40">$25 - $40 per person</option>
              <option value="40+">$40+ per person</option>
              <option value="custom">Custom budget</option>
            </select>
          </div>
        </div>
      </JapaneseBorder>
    </motion.section>
  );
}

function CateringContact({
  cateringDetails,
  setCateringDetails,
}: {
  cateringDetails: CateringDetails;
  setCateringDetails: (d: CateringDetails) => void;
}) {
  return (
    <motion.section className="w-full max-w-2xl px-6 text-center">
      <h2 className="text-4xl font-bold font-serif text-shiso-900 mb-8">
        Contact Information
      </h2>
      <p className="text-xl mb-12 opacity-80 text-marshland-700">
        We&rsquo;ll reach out to discuss your catering needs and create a custom
        proposal
      </p>

      <JapaneseBorder>
        <div className="space-y-6 p-8">
          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter your full name"
              value={cateringDetails.name}
              onChange={(e) =>
                setCateringDetails({ ...cateringDetails, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter your email"
              value={cateringDetails.email}
              onChange={(e) =>
                setCateringDetails({
                  ...cateringDetails,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Enter your phone number"
              value={cateringDetails.phone}
              onChange={(e) =>
                setCateringDetails({
                  ...cateringDetails,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-shiso-900 mb-2 text-left">
              Dietary Restrictions & Special Requests
            </label>
            <textarea
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-shiso-300 focus:outline-none focus:ring-2 focus:ring-shiso-400 transition-all duration-300 font-serif"
              placeholder="Any dietary restrictions, allergies, special menu requests, or other details..."
              rows={4}
              value={cateringDetails.dietaryRestrictions}
              onChange={(e) =>
                setCateringDetails({
                  ...cateringDetails,
                  dietaryRestrictions: e.target.value,
                })
              }
            />
          </div>
        </div>
      </JapaneseBorder>
    </motion.section>
  );
}

function CateringConfirmation({
  cateringDetails,
}: {
  cateringDetails: CateringDetails;
}) {
  const eventTypeNames: { [key: string]: string } = {
    corporate: "Corporate Event",
    wedding: "Wedding",
    birthday: "Birthday Party",
    anniversary: "Anniversary",
    graduation: "Graduation",
    holiday: "Holiday Party",
    other: "Special Event",
  };

  const timeLabels: { [key: string]: string } = {
    breakfast: "Breakfast (7:00 AM - 10:00 AM)",
    lunch: "Lunch (11:00 AM - 2:00 PM)",
    dinner: "Dinner (5:00 PM - 9:00 PM)",
    custom: "Custom time",
  };

  return (
    <motion.section className="w-full max-w-2xl px-6 text-center">
      <JapaneseBorder>
        <motion.div
          className="text-6xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          🍜
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-6 font-serif text-shiso-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Catering Request Submitted!
        </motion.h2>

        <motion.div
          className="text-left space-y-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-shiso-50 rounded-lg p-4">
            <h3 className="font-semibold text-shiso-900 mb-2">
              Event Details:
            </h3>
            <p>
              <strong>Type:</strong>{" "}
              {eventTypeNames[cateringDetails.eventType] || "Special Event"}
            </p>
            <p>
              <strong>Guests:</strong> {cateringDetails.guestCount}
            </p>
            <p>
              <strong>Date:</strong> {cateringDetails.date}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {timeLabels[cateringDetails.time] || cateringDetails.time}
            </p>
            <p>
              <strong>Budget:</strong> {cateringDetails.budget}
            </p>
          </div>

          <div className="bg-shiso-50 rounded-lg p-4">
            <h3 className="font-semibold text-shiso-900 mb-2">Venue:</h3>
            <p>{cateringDetails.venue}</p>
          </div>

          <div className="bg-shiso-50 rounded-lg p-4">
            <h3 className="font-semibold text-shiso-900 mb-2">
              Contact Information:
            </h3>
            <p>
              <strong>Name:</strong> {cateringDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {cateringDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {cateringDetails.phone}
            </p>
          </div>
        </motion.div>

        <motion.p
          className="text-sm opacity-70 font-serif text-marshland-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          We&apos;ll contact you within 24 hours with a custom catering proposal
          and menu options!
        </motion.p>
      </JapaneseBorder>
    </motion.section>
  );
}

export default function Reservations() {
  const [step, setStep] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [table, setTable] = useState<number | null>(null);
  // eslint-disable-next-line
  const [details, setDetails] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sakuraCount] = useState(20);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [reservationType, setReservationType] = useState("");
  const [specialEventDetails, setSpecialEventDetails] = useState<EventDetails>({
    eventType: "",
    guestCount: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [cateringDetails, setCateringDetails] = useState<CateringDetails>({
    eventType: "",
    guestCount: "",
    venue: "",
    date: "",
    time: "",
    dietaryRestrictions: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
  });

  const locations: Location[] = [
    {
      name: "Garden Terrace",
      description: "Peaceful outdoor dining with bamboo views",
      icon: "🎋",
      image: "🎍",
    },
    {
      name: "Traditional Tatami",
      description: "Authentic Japanese floor seating",
      icon: "🏮",
      image: "🪟",
    },
    {
      name: "Chef's Counter",
      description: "Watch our ramen masters at work",
      icon: "👨‍🍳",
      image: "🍜",
    },
  ];

  const tables: Table[] = [
    { id: 1, x: 20, y: 40, seats: 2, booked: false, type: "counter" },
    { id: 2, x: 120, y: 60, seats: 4, booked: true, type: "traditional" },
    { id: 3, x: 220, y: 40, seats: 2, booked: false, type: "tatami" },
    { id: 4, x: 320, y: 80, seats: 6, booked: false, type: "garden" },
    { id: 5, x: 80, y: 120, seats: 4, booked: false, type: "traditional" },
    { id: 6, x: 180, y: 140, seats: 2, booked: false, type: "counter" },
  ];

  const nextStep = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStep((s) => Math.min(s + 1, 5));
    setIsLoading(false);
  };

  const prevStep = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setStep((s) => Math.max(s - 1, 0));
    setIsLoading(false);
  };

  const progressVariants: Variants = {
    initial: { width: "0%" },
    animate: { width: `${((step + 1) / 5) * 100}%` },
  };

  const getTableIcon = (type: string) => {
    switch (type) {
      case "tatami":
        return "🏮";
      case "counter":
        return "👨‍🍳";
      case "garden":
        return "🎋";
      case "traditional":
        return "🍜";
      default:
        return "🍜";
    }
  };

  const getTableColor = (tableItem: Table) => {
    if (tableItem.booked) return "var(--color-aka-200)";
    if (table === tableItem.id) return "var(--color-shiso-500)";

    switch (tableItem.type) {
      case "tatami":
        return "var(--color-bianca-300)";
      case "counter":
        return "var(--color-shiso-200)";
      case "garden":
        return "var(--color-shiso-100)";
      case "traditional":
        return "var(--color-bianca-400)";
      default:
        return "var(--color-bianca-300)";
    }
  };

  // const isNameValid = details.name.trim().length > 1;
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email);

  // Calculate total steps based on reservation type
  const getTotalSteps = () => {
    switch (reservationType) {
      case "regular":
        return 5;
      case "special-event":
        return 4;
      case "catering":
        return 5;
      default:
        return 1;
    }
  };

  return (
    <>
      <ScrollToTop />
      <Navbar
        className="!sticky"
        currentPage="Reservations"
        invertTextColor={true}
      />

      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 80%, var(--color-shiso-100) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, var(--color-bianca-200) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, var(--color-shiso-50) 0%, transparent 50%),
                        linear-gradient(135deg, var(--color-bianca-50) 0%, var(--color-bianca-100) 100%)`,
          }}
        />

        {[...Array(sakuraCount)].map((_, i) => (
          <SakuraPetals key={i} delay={i * 0.5} />
        ))}
      </div>

      <motion.div
        className="fixed top-0 left-0 h-2 z-50"
        style={{
          background:
            "linear-gradient(90deg, var(--color-shiso-600), var(--color-shiso-500), var(--color-shiso-400))",
          boxShadow: "0 2px 10px rgba(80, 177, 131, 0.3)",
        }}
        variants={progressVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <main className="relative flex flex-col justify-center min-h-screen w-full o/verflow-hidden z-10 pb-10">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <StepIndicator totalSteps={getTotalSteps()} currentStep={step} />
          <AnimatePresence mode="wait">
            {step === 0 && (
              <ChooseReservationType
                reservationType={reservationType}
                setReservationType={setReservationType}
              />
            )}
            {/* Regular Reservation Flow */}
            {reservationType === "regular" && step > 0 && (
              <>
                {step === 1 && (
                  <ChooseDiningExperience
                    location={location}
                    locations={locations}
                    setLocation={setLocation}
                  />
                )}
                {step === 2 && (
                  <ChooseDateTime
                    selectedDate={date}
                    setSelectedDate={(d) => {
                      setDate(d);
                      // If fully booked, open waitlist modal
                      if (d && fullyBookedDates.includes(d.toDateString()))
                        setWaitlistOpen(true);
                    }}
                    selectedTime={time}
                    setSelectedTime={setTime}
                  />
                )}
                {step === 3 && (
                  <motion.section
                    key="step-3"
                    variants={slideInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-6xl px-6 text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center mb-8"
                    >
                      <h2
                        className="text-5xl font-bold font-serif text-shiso-900"
                        style={{
                          textShadow: "2px 2px 4px rgba(80, 177, 131, 0.3)",
                        }}
                      >
                        Choose Your Table
                      </h2>
                    </motion.div>

                    <motion.p
                      className="text-xl mb-12 opacity-80 text-marshland-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: 0.4 }}
                    >
                      Select your preferred seating arrangement for the perfect
                      ramen experience
                    </motion.p>

                    <JapaneseBorder className="p-8">
                      <div className="relative">
                        <svg viewBox="0 0 500 300" className="w-full h-80">
                          {/* Japanese-style floor pattern */}
                          <defs>
                            <pattern
                              id="tatamiPattern"
                              x="0"
                              y="0"
                              width="40"
                              height="40"
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                width="40"
                                height="40"
                                fill="var(--color-bianca-200)"
                                stroke="var(--color-shiso-600)"
                                strokeWidth="1"
                              />
                              <line
                                x1="20"
                                y1="0"
                                x2="20"
                                y2="40"
                                stroke="var(--color-shiso-600)"
                                strokeWidth="1"
                              />
                              <line
                                x1="0"
                                y1="20"
                                x2="40"
                                y2="20"
                                stroke="var(--color-shiso-600)"
                                strokeWidth="1"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="500"
                            height="300"
                            fill="url(#tatamiPattern)"
                            opacity="0.3"
                          />

                          {/* Tables with enhanced Japanese styling */}
                          {tables.map((t, index) => (
                            <motion.g
                              key={t.id}
                              onClick={() => !t.booked && setTable(t.id)}
                              className={`cursor-pointer ${
                                t.booked ? "cursor-not-allowed" : ""
                              }`}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.5 + index * 0.1,
                                type: "spring",
                                stiffness: 200,
                              }}
                              whileHover={
                                !t.booked
                                  ? {
                                      scale: 1.1,
                                      filter:
                                        "drop-shadow(0 10px 20px rgba(80, 177, 131, 0.3))",
                                    }
                                  : {}
                              }
                              whileTap={!t.booked ? { scale: 0.95 } : {}}
                            >
                              {/* Table base with Japanese design */}
                              <rect
                                x={t.x}
                                y={t.y}
                                width="80"
                                height="50"
                                rx="12"
                                fill={getTableColor(t)}
                                stroke={
                                  table === t.id
                                    ? "var(--color-shiso-600)"
                                    : "var(--color-shiso-400)"
                                }
                                strokeWidth="3"
                                style={{
                                  filter:
                                    table === t.id
                                      ? "drop-shadow(0 0 20px rgba(80, 177, 131, 0.5))"
                                      : "none",
                                }}
                              />

                              {/* Traditional Japanese border pattern */}
                              <rect
                                x={t.x + 5}
                                y={t.y + 5}
                                width="70"
                                height="40"
                                rx="8"
                                fill="none"
                                stroke="var(--color-shiso-600)"
                                strokeWidth="1"
                                opacity="0.5"
                              />

                              {/* Table type icon */}
                              <text
                                x={t.x + 20}
                                y={t.y + 20}
                                fontSize="16"
                                style={{ userSelect: "none" }}
                              >
                                {getTableIcon(t.type)}
                              </text>

                              {/* Table number with Japanese styling */}
                              <text
                                x={t.x + 60}
                                y={t.y + 25}
                                textAnchor="middle"
                                fill={
                                  table === t.id
                                    ? "white"
                                    : "var(--color-shiso-900)"
                                }
                                fontSize="14"
                                className="select-none font-serif"
                                fontWeight="bold"
                              >
                                #{t.id}
                              </text>

                              {/* Seats info */}
                              <text
                                x={t.x + 40}
                                y={t.y + 40}
                                textAnchor="middle"
                                fill={
                                  table === t.id
                                    ? "white"
                                    : "var(--color-marshland-700)"
                                }
                                fontSize="10"
                                style={{ userSelect: "none" }}
                              >
                                {t.seats} seats
                              </text>

                              {/* Booked indicator */}
                              {t.booked && (
                                <motion.text
                                  x={t.x + 40}
                                  y={t.y - 15}
                                  textAnchor="middle"
                                  fill="var(--color-aka-600)"
                                  fontSize="10"
                                  fontWeight="bold"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.8 + index * 0.1 }}
                                  className="font-serif"
                                >
                                  RESERVED
                                </motion.text>
                              )}

                              {/* Selection indicator with Japanese design */}
                              {table === t.id && (
                                <motion.g
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                >
                                  <circle
                                    cx={t.x + 70}
                                    cy={t.y + 15}
                                    r="12"
                                    fill="var(--color-shiso-600)"
                                  />
                                  <text
                                    x={t.x + 70}
                                    y={t.y + 20}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="12"
                                    style={{ userSelect: "none" }}
                                  >
                                    ✓
                                  </text>
                                </motion.g>
                              )}
                            </motion.g>
                          ))}

                          {/* Enhanced legend with Japanese styling */}
                          <g transform="translate(20, 260)">
                            <rect
                              x="0"
                              y="0"
                              width="460"
                              height="30"
                              fill="rgba(255, 255, 255, 0.9)"
                              rx="5"
                            />
                            <text
                              x="10"
                              y="15"
                              fontSize="12"
                              fill="var(--color-shiso-900)"
                              fontWeight="bold"
                            >
                              Legend:
                            </text>
                            <text
                              x="80"
                              y="15"
                              fontSize="10"
                              fill="var(--color-marshland-700)"
                            >
                              🏮 Tatami 👨‍🍳 Counter 🎋 Garden 🍜 Traditional
                            </text>
                          </g>
                        </svg>
                      </div>

                      {table && (
                        <motion.div
                          className="mt-8 p-6 rounded-lg"
                          style={{ backgroundColor: "rgba(80, 177, 131, 0.1)" }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-center">
                            <CheckCircle
                              className="w-6 h-6 mr-3"
                              style={{ color: "var(--color-shiso-600)" }}
                            />
                            <span className="font-serif text-shiso-800">
                              Table #{table} selected - Perfect for{" "}
                              {tables.find((t) => t.id === table)?.seats} guests
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </JapaneseBorder>
                  </motion.section>
                )}
                {step === 4 && (
                  <motion.section
                    key="step-4"
                    variants={slideInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-md px-6 text-center"
                  >
                    <JapaneseBorder>
                      <motion.div
                        className="text-8xl mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        🍜
                      </motion.div>

                      <motion.h2
                        className="text-3xl font-bold mb-6 font-serif text-shiso-900"
                        style={{
                          textShadow: "2px 2px 4px rgba(80, 177, 131, 0.3)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        Reservation Confirmed!
                      </motion.h2>

                      <motion.p
                        className="mb-4 text-lg font-serif text-shiso-900"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        Thank you, {details.name}! We&rsquo;ve reserved your
                        table at {location} on {date?.getDate()} at {time}.
                      </motion.p>

                      <motion.p
                        className="text-sm opacity-70 font-serif text-marshland-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        We look forward to serving you our authentic vegetarian
                        ramen experience.
                      </motion.p>
                    </JapaneseBorder>
                  </motion.section>
                )}
              </>
            )}
            {/* Special Event Flow */}
            {reservationType === "special-event" && step === 1 && (
              <SpecialEventDetails
                eventDetails={specialEventDetails}
                setEventDetails={setSpecialEventDetails}
              />
            )}
            {reservationType === "special-event" && step === 2 && (
              <SpecialEventGuestCount
                eventDetails={specialEventDetails}
                setEventDetails={setSpecialEventDetails}
              />
            )}
            {reservationType === "special-event" && step === 3 && (
              <SpecialEventContact
                eventDetails={specialEventDetails}
                setEventDetails={setSpecialEventDetails}
              />
            )}
            {reservationType === "special-event" && step === 4 && (
              <SpecialEventConfirmation eventDetails={specialEventDetails} />
            )}
            {/* Catering Flow */}
            {reservationType === "catering" && step === 1 && (
              <CateringEventDetails
                cateringDetails={cateringDetails}
                setCateringDetails={setCateringDetails}
              />
            )}
            {reservationType === "catering" && step === 2 && (
              <CateringGuestCount
                cateringDetails={cateringDetails}
                setCateringDetails={setCateringDetails}
              />
            )}
            {reservationType === "catering" && step === 3 && (
              <CateringVenueDate
                cateringDetails={cateringDetails}
                setCateringDetails={setCateringDetails}
              />
            )}
            {reservationType === "catering" && step === 4 && (
              <CateringContact
                cateringDetails={cateringDetails}
                setCateringDetails={setCateringDetails}
              />
            )}
            {reservationType === "catering" && step === 5 && (
              <CateringConfirmation cateringDetails={cateringDetails} />
            )}
          </AnimatePresence>
        </div>

        {step < 4 && (
          <div className="sticky bottom-[2%] mt-8 mb-8 flex items-center justify-center space-x-4 z-50">
            {/* Back Button */}
            {step > 0 && (
              <motion.button
                onClick={prevStep}
                disabled={isLoading}
                className="rounded-full p-6 shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-bianca-400), var(--color-bianca-500))",
                  color: "var(--color-marshland-900)",
                  boxShadow: "0 15px 35px rgba(203, 161, 116, 0.4)",
                  border: "3px solid var(--color-bianca-600)",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 25px 50px rgba(203, 161, 116, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-8 h-8 border-3 border-marshland-900 border-t-transparent rounded-full"
                  />
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </motion.button>
            )}

            {/* Next Button */}
            <motion.button
              onClick={nextStep}
              disabled={
                isLoading ||
                (step === 0 && !reservationType) ||
                (reservationType === "regular" && step === 1 && !location) ||
                (reservationType === "regular" && step === 2 && !date) ||
                (reservationType === "regular" && step === 3 && !table) ||
                (reservationType === "regular" && step === 4 && !time) ||
                (reservationType === "regular" &&
                  step === 5 &&
                  (!details.name || !details.email)) ||
                (reservationType === "special-event" &&
                  step === 1 &&
                  !specialEventDetails.eventType) ||
                (reservationType === "special-event" &&
                  step === 2 &&
                  !specialEventDetails.guestCount) ||
                (reservationType === "special-event" &&
                  step === 3 &&
                  (!specialEventDetails.name || !specialEventDetails.email)) ||
                (reservationType === "catering" &&
                  step === 1 &&
                  !cateringDetails.eventType) ||
                (reservationType === "catering" &&
                  step === 2 &&
                  !cateringDetails.guestCount) ||
                (reservationType === "catering" &&
                  step === 3 &&
                  !cateringDetails.venue) ||
                (reservationType === "catering" &&
                  step === 4 &&
                  (!cateringDetails.name || !cateringDetails.email))
              }
              className="rounded-full p-6 shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-shiso-600), var(--color-shiso-500))",
                color: "white",
                boxShadow: "0 15px 35px rgba(80, 177, 131, 0.4)",
                border: "3px solid var(--color-shiso-700)",
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 25px 50px rgba(80, 177, 131, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                />
              ) : (
                <ChevronRight className="w-8 h-8" />
              )}
            </motion.button>
          </div>
        )}
      </main>
      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        date={date?.toLocaleDateString()}
        time={time}
      />

      {/* Live Availability Calendar (always visible in date step) */}
      {step === 1 && (
        <div className="w-full max-w-2xl mx-auto mt-8 mb-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-shiso-800">
              Live Availability
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-marshland-600 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {(() => {
                const today = new Date();
                const days = [];
                const firstDay = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  1,
                );
                const lastDay = new Date(
                  today.getFullYear(),
                  today.getMonth() + 1,
                  0,
                );
                for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
                for (let i = 1; i <= lastDay.getDate(); i++) {
                  const d = new Date(today.getFullYear(), today.getMonth(), i);
                  days.push(d);
                }
                return days.map((d, i) => {
                  if (!d) return <div key={i} className="h-10" />;
                  const isBooked = fullyBookedDates.includes(d.toDateString());
                  return (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center rounded-lg font-bold cursor-pointer transition-all ${
                        isBooked
                          ? "bg-aka-200 text-aka-700 line-through"
                          : "bg-shiso-100 text-shiso-800 hover:bg-shiso-200"
                      }`}
                    >
                      {d.getDate()}
                    </div>
                  );
                });
              })()}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 bg-shiso-200 inline-block rounded mr-1" />
                Available
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 bg-aka-200 inline-block rounded mr-1" />
                Fully Booked
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
