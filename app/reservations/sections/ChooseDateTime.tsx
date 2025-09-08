"use client";

import { useMemo, useState } from "react";
import { addDays, eachDayOfInterval, format, startOfToday } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JapaneseBorder from "../components/JapaneseBorder";
import { motion } from "framer-motion";

const tomorrow = addDays(startOfToday(), 1);
const maxDate = addDays(startOfToday(), 60);

function getSlotsForDate(d: Date) {
  const slots: string[] = [];
  const push = (h: number, m: number) =>
    slots.push(format(new Date(0, 0, 0, h, m), "h:mm a")); // 12-hour format

  const addRange = (h1: number, h2: number) => {
    for (let h = h1; h <= h2; h++) {
      [0, 30].forEach((m) => {
        if (h === h2 && m === 30) return;
        push(h, m);
      });
    }
  };

  const day = d.getDay();
  if (day === 0 || day === 6) {
    // weekend 11–22
    addRange(11, 22);
  } else {
    // weekday split ranges
    addRange(11, 14); // 11:00–14:30
    addRange(17, 22); // 17:00–21:30
  }
  return slots;
}

export default function ChooseDateTime({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate: Date | undefined;
  setSelectedDate: (d: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
}) {
  /* ---------- build disabled rules ---------- */
  const soldOutDates = useMemo(() => {
    const all = eachDayOfInterval({ start: tomorrow, end: maxDate });
    return all.sort(() => 0.5 - Math.random()).slice(0, 10);
  }, []);

  const [open, setOpen] = useState(false);

  /* ---------- derive available slots ---------- */
  const slots = selectedDate ? getSlotsForDate(selectedDate) : [];

  return (
    <motion.section
      key="step-1"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-full max-w-xl px-6 text-center"
    >
      <motion.h2
        className="text-5xl font-bold font-serif text-shiso-900 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Select a Date &amp; Time
      </motion.h2>

      <motion.p
        className="text-xl mb-10 opacity-80 text-marshland-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.4 }}
      >
        Select a date and time for your reservation. <br />
        Please note that some dates may be sold out or unavailable. We only
        offer reservations for dates up to 60 days in advance.
      </motion.p>

      <JapaneseBorder>
        <div className="flex flex-col gap-8 items-center">
          <div className="relative flex gap-2">
            <Input
              id="date"
              value={selectedDate ? format(selectedDate, "PPP") : undefined}
              placeholder="Select a Date"
              className="bg-background pr-10 py-5 border-2 border-shiso-600/30"
              onChange={(e) => {
                const date = new Date(e.target.value);
                if (date && !isNaN(date.getTime())) {
                  setSelectedDate(date);
                } else {
                  setSelectedDate(undefined);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker"
                  variant="ghost"
                  className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                >
                  <CalendarIcon className="size-3.5" />
                  <span className="sr-only">Select date</span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-months"
                  selected={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setSelectedTime("");
                  }}
                  disabled={[
                    { before: tomorrow },
                    { after: maxDate },
                    // { dates: soldOutDates },
                  ]}
                  modifiers={{ soldout: soldOutDates }}
                  modifiersClassNames={{ soldout: "text-aka-600 line-through" }}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Select
            disabled={!selectedDate}
            onValueChange={setSelectedTime}
            value={selectedTime}
          >
            <SelectTrigger className="bg-background w-50 px-4 py-5 rounded-lg border-2 border-shiso-600/30 text-center">
              <SelectValue
                placeholder={
                  selectedDate ? "Select a Time" : "Choose a Date First"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Times</SelectLabel>
                {slots.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* confirmation banner */}
          {selectedDate && selectedTime && (
            <div className="flex items-center gap-2 mt-2 text-shiso-800">
              <CheckCircle className="w-5 h-5" />
              {format(selectedDate, "PPP")} at {selectedTime}
            </div>
          )}
        </div>
      </JapaneseBorder>
    </motion.section>
  );
}
