export type Table = {
  id: number;
  x: number;
  y: number;
  seats: number;
  booked: boolean;
  type: "tatami" | "counter" | "garden" | "traditional";
};

export type Location = {
  name: string;
  description: string;
  icon: string;
  image: string;
};

export type EventDetails = {
  eventType: string;
  guestCount: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
};

export type CateringDetails = {
  eventType: string;
  guestCount: string;
  venue: string;
  date: string;
  time: string;
  dietaryRestrictions: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
};
