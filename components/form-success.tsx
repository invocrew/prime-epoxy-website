import { CheckCircle2 } from "lucide-react";

export function FormSuccess({ message }: { message: string }) {
  return (
    <p
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-300"
    >
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}
