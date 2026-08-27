"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BookingPrefill = {
  sqft?: number;
  system?: string;
  city?: string;
  projectType?: string;
  estimateLow?: number;
  estimateHigh?: number;
  notes?: string;
};

type LeadContextValue = {
  bookingOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
  setCity: (city: string) => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openBooking = useCallback((next?: BookingPrefill) => {
    setPrefill((current) => ({ ...current, ...next }));
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const setCity = useCallback((city: string) => {
    setPrefill((current) => ({ ...current, city }));
  }, []);

  const value = useMemo(
    () => ({ bookingOpen, prefill, openBooking, closeBooking, setCity }),
    [bookingOpen, prefill, openBooking, closeBooking, setCity],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) {
    throw new Error("useLead must be used within LeadProvider");
  }
  return ctx;
}
