import { MapPin } from "lucide-react";
import { GOOGLE_MAPS_URL } from "@/lib/site";

export function GoogleMapsLink({ label }: { label: string }) {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition hover:bg-cyan/20"
    >
      <MapPin className="h-4 w-4" />
      {label}
    </a>
  );
}
