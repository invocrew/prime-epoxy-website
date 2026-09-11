"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Camera, Lock, Ruler, Unlock, X } from "lucide-react";
import {
  CONTRACTOR_AUTH_KEY,
  CONTRACTOR_PIN,
  CURES,
  DIAMOND_TOOLING,
  FLAKE_BLENDS,
  GARAGE_FOOTPRINTS,
  MOHS,
  MVB_RATE,
  PREP,
  PRESETS,
  SPACE_ORDER,
  SPACES,
  SYSTEM_LAYERS,
  SYSTEMS,
  cadSafe,
  calculatePortal,
  clientQuoteText,
  jobSheetText,
  supplierPoText,
  toDisplayArea,
  toSqFt,
  type AreaMode,
  type CureId,
  type DiscountMode,
  type KitExtraKey,
  type Mohs,
  type PortalInputs,
  type PrepId,
  type Sheen,
  type SpaceId,
  type SystemId,
  type TabId,
  type Unit,
} from "@/lib/contractor-portal";

const fieldClass =
  "w-full rounded-2xl border border-[#262c3e] bg-[#181c26] px-5 py-4 text-2xl font-bold text-white outline-none focus:border-[#00f0ff] focus:shadow-[0_0_0_3px_rgba(0,240,255,0.25)]";

function nativeMeasureHref() {
  if (typeof navigator === "undefined") {
    return "apple-measure://";
  }
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "apple-measure://";
  }
  if (/Android/i.test(ua)) {
    return "intent:#Intent;action=android.media.action.STILL_IMAGE_CAMERA;end";
  }
  return "apple-measure://";
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  }
}

function Toggle({
  checked,
  onChange,
  accent = "cyan",
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  accent?: "cyan" | "orange" | "blue" | "emerald";
}) {
  const on = {
    cyan: "bg-[#00f0ff] border-cyan-300",
    orange: "bg-orange-500 border-orange-400",
    blue: "bg-[#007aff] border-blue-400",
    emerald: "bg-emerald-500 border-emerald-400",
  }[accent];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-11 w-[4.5rem] shrink-0 rounded-full border transition ${
        checked ? on : "border-[#262c3e] bg-[#0d1017]"
      }`}
    >
      <span
        className={`absolute top-1 h-8 w-8 rounded-full bg-white shadow transition ${
          checked ? "left-9" : "left-1"
        }`}
      />
    </button>
  );
}

export default function ContractorPortalPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [toast, setToast] = useState("");
  const [tab, setTab] = useState<TabId>("specs");
  const [unit, setUnit] = useState<Unit>("sqft");
  const [areaMode, setAreaMode] = useState<AreaMode>("total");
  const [lengthFt, setLengthFt] = useState(20);
  const [widthFt, setWidthFt] = useState(20);
  const [measureOpen, setMeasureOpen] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const cameraRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const [cure, setCure] = useState<CureId>("standard");
  const [area, setArea] = useState(400);
  const [system, setSystem] = useState<SystemId>("flake");
  const [space, setSpace] = useState<SpaceId>("garage");
  const [rate, setRate] = useState(6.5);
  const [stemLf, setStemLf] = useState(0);
  const [prep, setPrep] = useState<PrepId>("good");
  const [mvb, setMvb] = useState(false);
  const [coatingRemoval, setCoatingRemoval] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [antiSlip, setAntiSlip] = useState(false);
  const [sheen, setSheen] = useState<Sheen>("Satin");
  const [mohs, setMohs] = useState<Mohs>("medium");
  const [crew, setCrew] = useState(2);
  const [days, setDays] = useState(1.5);
  const [dayRate, setDayRate] = useState(450);
  const [travel, setTravel] = useState(0);
  const [discountMode, setDiscountMode] = useState<DiscountMode>("amount");
  const [discountValue, setDiscountValue] = useState(0);
  const [flakeBlend, setFlakeBlend] = useState("Domino");
  const [metallicBase, setMetallicBase] = useState("Charcoal / Black");
  const [metallicAccent, setMetallicAccent] = useState("Pearl / Silver");
  const [quartzBlend, setQuartzBlend] = useState("");
  const [epoxyExtra, setEpoxyExtra] = useState(0);
  const [flakeExtra, setFlakeExtra] = useState(0);
  const [flowExtra, setFlowExtra] = useState(0);
  const [polyExtra, setPolyExtra] = useState(0);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(CONTRACTOR_AUTH_KEY) === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    if (cameraOn && cameraRef.current && streamRef.current) {
      cameraRef.current.srcObject = streamRef.current;
      void cameraRef.current.play().catch(() => {
        setCameraError("Camera preview could not start. Use the photo scanner instead.");
      });
    }
  }, [cameraOn]);

  useEffect(() => {
    if (!measureOpen) {
      stopCamera();
    }
  }, [measureOpen]);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  }

  const input: PortalInputs = {
    unit,
    area,
    system,
    rate,
    stemLf,
    prep,
    mvb,
    coatingRemoval,
    buffer,
    antiSlip,
    sheen,
    mohs,
    crew,
    days,
    dayRate,
    travel,
    cure,
    discountMode,
    discountValue,
    flakeBlend,
    metallicBase,
    metallicAccent,
    quartzBlend,
    epoxyExtra,
    flakeExtra,
    flowExtra,
    polyExtra,
    space,
  };

  const est = calculatePortal(input);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function unlock(event: FormEvent) {
    event.preventDefault();
    if (pin.trim() === CONTRACTOR_PIN) {
      sessionStorage.setItem(CONTRACTOR_AUTH_KEY, "true");
      setAuthed(true);
      setPin("");
      setPinError(false);
      return;
    }
    setPinError(true);
  }

  function lock() {
    sessionStorage.removeItem(CONTRACTOR_AUTH_KEY);
    setAuthed(false);
    setPin("");
  }

  function switchUnit(next: Unit) {
    if (next === unit) {
      return;
    }
    setUnit(next);
    if (areaMode === "dimensions") {
      setArea(toDisplayArea(lengthFt * widthFt, next));
      return;
    }
    const sqFt = toSqFt(area, unit);
    setArea(toDisplayArea(sqFt, next));
  }

  function selectSystem(id: SystemId) {
    setSystem(id);
    setRate(SYSTEMS[id].rate);
    setEpoxyExtra(0);
    setFlakeExtra(0);
    setFlowExtra(0);
    setPolyExtra(0);
  }

  function bumpKit(key: KitExtraKey, delta: number) {
    if (key === "epoxyExtra") {
      setEpoxyExtra((value) => value + delta);
    } else if (key === "flakeExtra") {
      setFlakeExtra((value) => value + delta);
    } else if (key === "flowExtra") {
      setFlowExtra((value) => value + delta);
    } else {
      setPolyExtra((value) => value + delta);
    }
  }

  function applyDimensions(nextLength: number, nextWidth: number) {
    const safeLength = Math.max(0, nextLength);
    const safeWidth = Math.max(0, nextWidth);
    setLengthFt(safeLength);
    setWidthFt(safeWidth);
    setArea(toDisplayArea(safeLength * safeWidth, unit));
  }

  function applyFootprint(length: number, width: number) {
    setAreaMode("dimensions");
    applyDimensions(length, width);
    setMeasureOpen(false);
    flash(`Loaded ${length}' × ${width}' (${length * width} sq ft)`);
  }

  async function startBrowserCamera() {
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("This browser cannot open a live camera. Use the photo scanner instead.");
      scanInputRef.current?.click();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOn(true);
    } catch {
      setCameraError(
        "Camera permission was denied. Enable camera access, or use the photo scanner / native Measure app.",
      );
      scanInputRef.current?.click();
    }
  }

  function launchNativeMeasure() {
    window.location.href = nativeMeasureHref();
  }

  function applyPreset(sqft: number) {
    const pair =
      sqft === 250 ? [25, 10] : sqft === 500 ? [25, 20] : [20, 20];
    applyDimensions(pair[0], pair[1]);
    if (areaMode === "total") {
      setArea(toDisplayArea(sqft, unit));
    }
  }

  function switchAreaMode(next: AreaMode) {
    setAreaMode(next);
    if (next === "dimensions") {
      const sqFt = toSqFt(area, unit);
      if (lengthFt > 0 && widthFt > 0) {
        applyDimensions(lengthFt, widthFt);
      } else if (sqFt > 0) {
        applyDimensions(Math.round((sqFt / 20) * 10) / 10, 20);
      }
    }
  }

  async function exportCopy(kind: "quote" | "job" | "po") {
    const text =
      kind === "quote"
        ? clientQuoteText(input, est)
        : kind === "job"
          ? jobSheetText(input, est)
          : supplierPoText(input, est);
    const ok = await copyText(text);
    flash(
      ok
        ? kind === "quote"
          ? "Client quote copied"
          : kind === "job"
            ? "Job sheet copied"
            : "Supplier PO copied"
        : "Copy failed — select and copy manually",
    );
  }

  if (!ready || !authed) {
    return (
      <div className="fixed inset-0 z-[200] grid place-items-center bg-[#0b0d11] px-4">
        <form
          onSubmit={unlock}
          className="w-full max-w-md rounded-3xl border border-[#262c3e] bg-[#14171f] p-8 shadow-2xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
            Restricted
          </p>
          <h1 className="mt-2 text-3xl font-black text-white">
            Prime Contractor Portal - Enter Access PIN
          </h1>
          <label className="mt-8 block text-lg font-bold text-slate-200" htmlFor="portal-pin">
            4-digit access PIN
          </label>
          <input
            id="portal-pin"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            value={pin}
            onChange={(event) => {
              setPin(event.target.value.replace(/\D/g, "").slice(0, 4));
              setPinError(false);
            }}
            className={`${fieldClass} mt-3 tracking-[0.4em]`}
          />
          {pinError ? (
            <p className="mt-3 text-base font-bold text-red-400">Incorrect PIN</p>
          ) : null}
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00f0ff] py-4 text-xl font-black text-[#0b0d11]"
          >
            <Unlock className="h-6 w-6" />
            Unlock Estimator
          </button>
        </form>
      </div>
    );
  }

  const selectedPreset = PRESETS.find(
    (preset) => Math.abs(toSqFt(area, unit) - preset.sqft) < 0.6,
  );

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#0b0d11] pb-36 text-[#e5e7eb]">
      <header className="sticky top-0 z-30 border-b border-[#262c3e] bg-[#0e1017]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00f0ff]">
              CAD Engine v4.0 · Montreal, QC
            </p>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              Prime Contractor Portal
            </h1>
          </div>
          <button
            type="button"
            onClick={lock}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#262c3e] bg-[#14171f] px-4 py-3 text-lg font-bold text-slate-200"
          >
            <Lock className="h-5 w-5" />
            Lock
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2">
        <section className="overflow-hidden rounded-3xl border border-[#262c3e] bg-[#14171f]">
          <div className="grid grid-cols-3 border-b border-[#262c3e] bg-[#0d1017]">
            {(
              [
                ["specs", "Job & Specs"],
                ["prep", "Prep"],
                ["labor", "Labor"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`py-4 text-base font-black ${
                  tab === id
                    ? "border-b-2 border-[#00f0ff] text-white"
                    : "text-slate-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            {tab === "specs" ? (
              <>
                <div className="flex flex-col gap-3 rounded-2xl border border-[#262c3e] bg-[#181c26] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-lg font-black uppercase tracking-wide">Measurement</p>
                  <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#0d1017] p-1">
                    <button
                      type="button"
                      onClick={() => switchUnit("sqft")}
                      className={`rounded-xl px-4 py-3 text-lg font-black ${
                        unit === "sqft"
                          ? "bg-[#00f0ff] text-[#0b0d11]"
                          : "text-slate-400"
                      }`}
                    >
                      Square Feet
                    </button>
                    <button
                      type="button"
                      onClick={() => switchUnit("sqm")}
                      className={`rounded-xl px-4 py-3 text-lg font-black ${
                        unit === "sqm"
                          ? "bg-[#00f0ff] text-[#0b0d11]"
                          : "text-slate-400"
                      }`}
                    >
                      Square Meters
                    </button>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-lg font-black uppercase">Project Space</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {SPACE_ORDER.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSpace(id)}
                        className={`min-h-12 rounded-xl border px-4 py-3 text-base font-black ${
                          space === id
                            ? "border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff]"
                            : "border-[#262c3e] text-slate-300"
                        }`}
                      >
                        {SPACES[id].label}
                      </button>
                    ))}
                  </div>
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-lg font-black uppercase" htmlFor="portal-area">
                      Surface Area
                    </label>
                    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#0d1017] p-1">
                      <button
                        type="button"
                        onClick={() => switchAreaMode("total")}
                        className={`rounded-xl px-3 py-2 text-sm font-black ${
                          areaMode === "total"
                            ? "bg-[#00f0ff] text-[#0b0d11]"
                            : "text-slate-400"
                        }`}
                      >
                        Total Area
                      </button>
                      <button
                        type="button"
                        onClick={() => switchAreaMode("dimensions")}
                        className={`rounded-xl px-3 py-2 text-sm font-black ${
                          areaMode === "dimensions"
                            ? "bg-[#00f0ff] text-[#0b0d11]"
                            : "text-slate-400"
                        }`}
                      >
                        Dimensions (L × W)
                      </button>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-[#00f0ff]">
                      {unit === "sqft"
                        ? `≈ ${est.sqM.toFixed(1)} m²`
                        : `≈ ${Math.round(est.sqFt)} sq ft`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setMeasureOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-3 py-2 text-sm font-black text-[#00f0ff]"
                    >
                      <Camera className="h-4 w-4" />
                      Quick AR / Camera Measure
                    </button>
                  </div>
                  {areaMode === "dimensions" ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-base font-black">
                          <Ruler className="h-4 w-4 text-[#00f0ff]" />
                          Length (ft)
                        </span>
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          value={lengthFt}
                          onChange={(event) =>
                            applyDimensions(Number(event.target.value) || 0, widthFt)
                          }
                          className={fieldClass}
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-base font-black">
                          <Ruler className="h-4 w-4 text-[#00f0ff]" />
                          Width (ft)
                        </span>
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          value={widthFt}
                          onChange={(event) =>
                            applyDimensions(lengthFt, Number(event.target.value) || 0)
                          }
                          className={fieldClass}
                        />
                      </label>
                      <p className="text-lg font-black text-white sm:col-span-2">
                        Auto area: {Math.round(lengthFt * widthFt)} sq ft
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        id="portal-area"
                        type="number"
                        min={1}
                        step={unit === "sqm" ? 0.1 : 1}
                        value={area}
                        onChange={(event) => setArea(Number(event.target.value) || 0)}
                        className={fieldClass}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-5 grid place-items-center text-lg font-bold text-slate-400">
                        {unit === "sqft" ? "sq ft" : "m²"}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {PRESETS.map((preset) => {
                      const active = selectedPreset?.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applyPreset(preset.sqft)}
                          className={`rounded-2xl border px-2 py-4 text-center ${
                            active
                              ? "border-[#007aff] bg-[#1d2538] text-white"
                              : "border-[#262c3e] bg-[#181c26] text-slate-300"
                          }`}
                        >
                          <span className="block text-base font-black">{preset.label}</span>
                          <span className="block text-sm font-bold text-slate-400">
                            {preset.sqft} sq ft
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-lg font-black uppercase">Base System</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {(Object.keys(SYSTEMS) as SystemId[]).map((id) => {
                      const item = SYSTEMS[id];
                      const active = system === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => selectSystem(id)}
                          className={`rounded-2xl border p-4 text-left ${
                            active
                              ? "border-[#00f0ff] bg-[#1d2538]"
                              : "border-[#262c3e] bg-[#181c26]"
                          }`}
                        >
                          <span className="text-xs font-black uppercase tracking-wide text-[#00f0ff]">
                            {item.tag}
                          </span>
                          <p className="mt-2 text-xl font-black text-white">{item.shortName}</p>
                          <p className="text-sm font-bold text-slate-400">{item.desc}</p>
                          <p className="mt-3 text-2xl font-black text-emerald-400">
                            ${item.rate.toFixed(2)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 rounded-2xl border border-[#262c3e] bg-[#0d1017] p-4">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#00f0ff]">
                      What Materials We Use
                    </p>
                    <p className="mt-1 text-xl font-black text-white">
                      {SYSTEMS[system].shortName} system stack
                    </p>
                    <ol className="mt-4 space-y-3">
                      {SYSTEM_LAYERS[system].map((layer) => (
                        <li
                          key={layer.step}
                          className="flex gap-3 rounded-2xl border border-[#262c3e] bg-[#181c26] p-3"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#00f0ff] text-base font-black text-[#0b0d11]">
                            {layer.step}
                          </span>
                          <span>
                            <span className="block text-xs font-black uppercase tracking-wide text-[#00f0ff]">
                              {layer.title}
                            </span>
                            <span className="block text-base font-bold text-white">
                              {layer.detail}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-lg font-black uppercase" htmlFor="portal-stem">
                      Stem Wall ($18/lf)
                    </label>
                    <input
                      id="portal-stem"
                      type="number"
                      min={0}
                      value={stemLf}
                      onChange={(event) => setStemLf(Number(event.target.value) || 0)}
                      className={`${fieldClass} mt-2`}
                    />
                    <div className="mt-2 flex gap-2">
                      {[0, 30, 60].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setStemLf(value)}
                          className="rounded-xl border border-[#262c3e] px-4 py-2 text-lg font-bold"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-lg font-black uppercase" htmlFor="portal-rate">
                      Pricing Rate
                    </label>
                    <input
                      id="portal-rate"
                      type="number"
                      min={0}
                      step={0.25}
                      value={rate}
                      onChange={(event) => setRate(Number(event.target.value) || 0)}
                      className={`${fieldClass} mt-2`}
                    />
                    <button
                      type="button"
                      onClick={() => setRate(SYSTEMS[system].rate)}
                      className="mt-2 text-base font-bold text-[#00f0ff]"
                    >
                      Reset ${SYSTEMS[system].rate.toFixed(2)}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#262c3e] bg-[#181c26] p-4">
                  <p className="text-lg font-black uppercase">Client Discount</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-[#0d1017] p-1">
                    <button
                      type="button"
                      onClick={() => setDiscountMode("amount")}
                      className={`min-h-12 rounded-xl px-4 py-3 text-lg font-black ${
                        discountMode === "amount"
                          ? "bg-[#00f0ff] text-[#0b0d11]"
                          : "text-slate-400"
                      }`}
                    >
                      $ Off
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountMode("percent")}
                      className={`min-h-12 rounded-xl px-4 py-3 text-lg font-black ${
                        discountMode === "percent"
                          ? "bg-[#00f0ff] text-[#0b0d11]"
                          : "text-slate-400"
                      }`}
                    >
                      % Off
                    </button>
                  </div>
                  <label className="mt-3 block">
                    <span className="sr-only">Discount amount</span>
                    <input
                      type="number"
                      min={0}
                      step={discountMode === "percent" ? 1 : 25}
                      value={discountValue}
                      onChange={(event) => setDiscountValue(Number(event.target.value) || 0)}
                      className={fieldClass}
                    />
                  </label>
                  {est.discountAmount > 0 ? (
                    <p className="mt-2 text-lg font-bold text-amber-300">
                      −{cadSafe(est.discountAmount, 0)} off {cadSafe(est.grossPrice, 0)}
                    </p>
                  ) : (
                    <p className="mt-2 text-base font-bold text-slate-400">
                      No discount applied
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-[#262c3e] bg-[#181c26] p-4">
                  <p className="text-lg font-black uppercase">Style & Color (On-Site Notes)</p>
                  {system === "flake" ? (
                    <>
                      <label className="mt-3 block text-base font-black" htmlFor="flake-blend">
                        Flake Blend / Color
                      </label>
                      <input
                        id="flake-blend"
                        value={flakeBlend}
                        onChange={(event) => setFlakeBlend(event.target.value)}
                        className={`${fieldClass} mt-2`}
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {FLAKE_BLENDS.map((blend) => (
                          <button
                            key={blend}
                            type="button"
                            onClick={() => setFlakeBlend(blend)}
                            className={`min-h-12 rounded-xl border px-4 py-3 text-base font-black ${
                              flakeBlend === blend
                                ? "border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff]"
                                : "border-[#262c3e] text-slate-300"
                            }`}
                          >
                            {blend}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : null}
                  {system === "metallic" ? (
                    <div className="mt-3 grid gap-4">
                      <label className="block">
                        <span className="text-base font-black">Primary Base Color</span>
                        <input
                          value={metallicBase}
                          onChange={(event) => setMetallicBase(event.target.value)}
                          placeholder="Charcoal / Black"
                          className={`${fieldClass} mt-2`}
                        />
                      </label>
                      <label className="block">
                        <span className="text-base font-black">Accent Vein Color</span>
                        <input
                          value={metallicAccent}
                          onChange={(event) => setMetallicAccent(event.target.value)}
                          placeholder="Pearl / Silver / Copper"
                          className={`${fieldClass} mt-2`}
                        />
                      </label>
                    </div>
                  ) : null}
                  {system === "quartz" ? (
                    <label className="mt-3 block">
                      <span className="text-base font-black">Quartz Blend Code</span>
                      <input
                        value={quartzBlend}
                        onChange={(event) => setQuartzBlend(event.target.value)}
                        placeholder="e.g. QZ-104 Grey Mix"
                        className={`${fieldClass} mt-2`}
                      />
                    </label>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-[#262c3e] bg-[#181c26] p-4">
                  <p className="text-lg font-black uppercase">Topcoat & Grip</p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold">Anti-Slip Texture</p>
                      <p className="text-sm font-semibold text-slate-400">
                        Micronized polymer grit in the clear coat
                      </p>
                    </div>
                    <Toggle checked={antiSlip} onChange={setAntiSlip} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {(["High Gloss", "Satin", "Matte"] as Sheen[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSheen(option)}
                        className={`rounded-xl border px-2 py-3 text-base font-black ${
                          sheen === option
                            ? "border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff]"
                            : "border-[#262c3e] text-slate-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-[#262c3e] pt-4">
                    <p className="text-lg font-black">Polyaspartic Cure</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {(Object.keys(CURES) as CureId[]).map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setCure(id)}
                          className={`rounded-xl border px-3 py-3 text-left ${
                            cure === id
                              ? "border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]"
                              : "border-[#262c3e] text-slate-300"
                          }`}
                        >
                          <span className="block text-base font-black">{CURES[id].label}</span>
                          <span className="block text-sm font-bold text-slate-400">
                            {CURES[id].detail}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {tab === "prep" ? (
              <>
                <div>
                  <p className="mb-3 text-lg font-black uppercase">Concrete Hardness</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(Object.keys(MOHS) as Mohs[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMohs(id)}
                        className={`min-h-28 rounded-2xl border p-4 text-left ${
                          mohs === id
                            ? "border-[#00f0ff] bg-[#00f0ff]/10"
                            : "border-[#262c3e] bg-[#181c26]"
                        }`}
                      >
                        <p className="text-xl font-black">{MOHS[id].name}</p>
                        <p className="mt-1 text-sm font-bold text-slate-400">
                          {MOHS[id].tooling}
                        </p>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 rounded-2xl border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-4 py-3 text-base font-bold text-[#00f0ff]">
                    Auto tooling: {MOHS[mohs].tooling}
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-lg font-black uppercase">Crack Repair</p>
                  <div className="space-y-3">
                    {(Object.keys(PREP) as PrepId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPrep(id)}
                        className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left ${
                          prep === id
                            ? "border-[#007aff] bg-[#007aff]/10"
                            : "border-[#262c3e] bg-[#181c26]"
                        }`}
                      >
                        <span>
                          <span className="block text-xl font-black">{PREP[id].name}</span>
                          <span className="block text-sm font-bold text-slate-400">
                            {PREP[id].detail}
                          </span>
                        </span>
                        <span className="text-xl font-black text-amber-300">
                          +{cadSafe(PREP[id].fee, 0)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-5 rounded-2xl border border-[#262c3e] bg-[#181c26] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xl font-black">Moisture Barrier</p>
                      <p className="text-base font-bold text-slate-400">
                        +${MVB_RATE.toFixed(2)} / sq ft
                      </p>
                    </div>
                    <Toggle checked={mvb} onChange={setMvb} accent="blue" />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-[#262c3e] pt-5">
                    <div>
                      <p className="text-xl font-black">Coating Removal</p>
                      <p className="text-base font-bold text-slate-400">+$1.75 / sq ft</p>
                    </div>
                    <Toggle
                      checked={coatingRemoval}
                      onChange={setCoatingRemoval}
                      accent="orange"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-[#262c3e] pt-5">
                    <div>
                      <p className="text-xl font-black">+10% Material Buffer</p>
                      <p className="text-base font-bold text-slate-400">Whole-kit rounding</p>
                    </div>
                    <Toggle checked={buffer} onChange={setBuffer} accent="emerald" />
                  </div>
                </div>
              </>
            ) : null}

            {tab === "labor" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-lg font-black uppercase">Installers (Techs)</span>
                  <input
                    type="number"
                    min={1}
                    value={crew}
                    onChange={(event) => setCrew(Number(event.target.value) || 0)}
                    className={`${fieldClass} mt-2`}
                  />
                  <div className="mt-2 flex gap-2">
                    {[1, 2, 3].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setCrew(value)}
                        className={`rounded-xl border px-4 py-2 text-lg font-bold ${
                          crew === value
                            ? "border-[#00f0ff] text-[#00f0ff]"
                            : "border-[#262c3e]"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="block">
                  <span className="text-lg font-black uppercase">Timeline (Days)</span>
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={days}
                    onChange={(event) => setDays(Number(event.target.value) || 0)}
                    className={`${fieldClass} mt-2`}
                  />
                  <div className="mt-2 flex gap-2">
                    {[1, 1.5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDays(value)}
                        className={`rounded-xl border px-4 py-2 text-lg font-bold ${
                          days === value
                            ? "border-[#00f0ff] text-[#00f0ff]"
                            : "border-[#262c3e]"
                        }`}
                      >
                        {value === 1 ? "1 day" : "1.5 days"}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="block">
                  <span className="text-lg font-black uppercase">Daily Rate / Tech</span>
                  <input
                    type="number"
                    min={100}
                    step={25}
                    value={dayRate}
                    onChange={(event) => setDayRate(Number(event.target.value) || 0)}
                    className={`${fieldClass} mt-2`}
                  />
                </label>
                <label className="block">
                  <span className="text-lg font-black uppercase">Travel / Overhead</span>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={travel}
                    onChange={(event) => setTravel(Number(event.target.value) || 0)}
                    className={`${fieldClass} mt-2`}
                  />
                </label>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:col-span-2">
                  <p className="text-lg font-black text-emerald-300">
                    {crew} techs × {days} days × {cadSafe(dayRate, 0)} = {cadSafe(est.labor, 0)}
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-400">
                    {est.manHours} man-hours scheduled
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-5">
          <div className="rounded-3xl border border-[#262c3e] bg-[#14171f] p-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
              Total Client Estimate
            </p>
            <p className="mt-2 font-mono text-5xl font-black tracking-tight text-white">
              {cadSafe(est.clientPrice, 0)}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-400">
              {Math.round(est.sqFt)} sq ft × {cadSafe(est.effectiveRate, 0)} / sq ft
            </p>
            {est.discountAmount > 0 ? (
              <p className="mt-1 text-lg font-black text-amber-300">
                Was {cadSafe(est.grossPrice, 0)} · discount −{cadSafe(est.discountAmount, 0)}
              </p>
            ) : null}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#262c3e] bg-[#181c26] p-4">
                <p className="text-sm font-black uppercase text-slate-400">Materials</p>
                <p className="mt-1 text-2xl font-black text-amber-300">{cadSafe(est.materials, 0)}</p>
              </div>
              <div className="rounded-2xl border border-[#262c3e] bg-[#181c26] p-4">
                <p className="text-sm font-black uppercase text-slate-400">Labor</p>
                <p className="mt-1 text-2xl font-black text-cyan-300">{cadSafe(est.labor, 0)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-emerald-500/60 bg-gradient-to-br from-emerald-950/40 to-[#121c1a] p-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-400">
              Contractor Net Take-Home
            </p>
            <p
              className={`mt-2 font-mono text-5xl font-black ${
                est.profit >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {cadSafe(est.profit, 0)}
            </p>
            <p className="mt-3 text-2xl font-black text-emerald-200">
              Margin {Number.isFinite(est.margin) ? est.margin.toFixed(1) : "0.0"}%
            </p>
            <p className="mt-2 text-base font-bold text-slate-300">
              {cadSafe(est.clientPrice, 0)} − {cadSafe(est.materials, 0)} − {cadSafe(est.labor, 0)}
            </p>
          </div>

          <div className="rounded-3xl border border-[#262c3e] bg-[#14171f] p-6">
            <p className="text-lg font-black uppercase">Material Pick-List (Whole Kits)</p>
            <ul className="mt-4 space-y-3 text-lg font-bold">
              {est.pickList.map((line) => (
                <li key={line.id} className="rounded-2xl bg-[#181c26] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span>{line.label}</span>
                    {line.extraKey ? (
                      <span className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease ${line.label}`}
                          onClick={() => bumpKit(line.extraKey as KitExtraKey, -1)}
                          disabled={line.qty <= 0}
                          className="grid h-12 w-12 place-items-center rounded-xl border border-[#262c3e] text-2xl font-black disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-10 text-center text-2xl font-black">{line.qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${line.label}`}
                          onClick={() => bumpKit(line.extraKey as KitExtraKey, 1)}
                          className="grid h-12 w-12 place-items-center rounded-xl border border-[#00f0ff]/40 text-2xl font-black text-[#00f0ff]"
                        >
                          +
                        </button>
                      </span>
                    ) : (
                      <span className="font-mono text-xl">
                        ${Number.isFinite(DIAMOND_TOOLING) ? DIAMOND_TOOLING.toFixed(2) : "75.00"}
                      </span>
                    )}
                  </div>
                  {line.subtitle ? (
                    <p className="mt-1 text-sm font-bold text-[#00f0ff]">{line.subtitle}</p>
                  ) : null}
                  {line.extraKey ? (
                    <p className="mt-2 text-right font-mono text-xl">{cadSafe(line.cost, 0)}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-[#262c3e] bg-[#0d1017]/95 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => exportCopy("quote")}
            className="rounded-2xl border border-cyan-500/40 bg-[#181c26] py-4 text-lg font-black text-cyan-300"
          >
            Copy Client Quote
          </button>
          <button
            type="button"
            onClick={() => exportCopy("job")}
            className="rounded-2xl bg-[#007aff] py-4 text-lg font-black text-white"
          >
            Copy Job Sheet
          </button>
          <button
            type="button"
            onClick={() => exportCopy("po")}
            className="rounded-2xl border border-amber-500/40 bg-[#181c26] py-4 text-lg font-black text-amber-300"
          >
            Copy Supplier PO
          </button>
        </div>
      </div>

      {toast ? (
        <div className="fixed right-5 bottom-28 z-50 rounded-2xl border border-[#262c3e] bg-[#14171f] px-5 py-3 text-lg font-bold text-white shadow-2xl">
          {toast}
        </div>
      ) : null}

      {measureOpen ? (
        <div className="fixed inset-0 z-[220] grid place-items-end bg-black/75 p-0 sm:place-items-center sm:px-4">
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-[#262c3e] bg-[#14171f] p-5 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#00f0ff]">
                  Field Measure
                </p>
                <h2 className="mt-1 text-2xl font-black text-white">
                  Quick AR / Camera Measure
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setMeasureOpen(false);
                }}
                className="grid h-12 w-12 place-items-center rounded-xl border border-[#262c3e]"
                aria-label="Close measure helper"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Option A · Native phone app
              </p>
              <button
                type="button"
                onClick={launchNativeMeasure}
                className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#00f0ff] px-4 py-4 text-lg font-black text-[#0b0d11]"
              >
                Launch Native Phone Measure App
              </button>
              <p className="text-sm font-bold text-slate-400">
                iPhone opens Measure. Pixel / Android opens the rear camera so you can capture
                wall-to-wall dimensions.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Option B · In-browser camera scanner
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => void startBrowserCamera()}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-4 py-4 text-lg font-black text-[#00f0ff]"
                >
                  <Camera className="h-5 w-5" />
                  Live Camera
                </button>
                <button
                  type="button"
                  onClick={() => scanInputRef.current?.click()}
                  className="flex min-h-14 items-center justify-center rounded-2xl border border-[#262c3e] px-4 py-4 text-lg font-black"
                >
                  Photo Scanner
                </button>
              </div>
              <input
                ref={scanInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={() => {
                  setAreaMode("dimensions");
                  flash("Photo captured. Enter length and width from the shot.");
                }}
              />
              {cameraOn ? (
                <video
                  ref={cameraRef}
                  className="mt-1 h-48 w-full rounded-2xl bg-black object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              ) : null}
              {cameraError ? (
                <p className="text-base font-bold text-amber-300">{cameraError}</p>
              ) : null}
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Option C · Quick dimension helper
              </p>
              <div className="grid grid-cols-2 gap-2">
                {GARAGE_FOOTPRINTS.map((print) => (
                  <button
                    key={print.id}
                    type="button"
                    onClick={() => applyFootprint(print.length, print.width)}
                    className="min-h-20 rounded-2xl border border-[#262c3e] bg-[#181c26] px-3 py-3 text-left"
                  >
                    <span className="block text-base font-black text-white">{print.label}</span>
                    <span className="block text-sm font-bold text-[#00f0ff]">
                      {print.length}&apos; × {print.width}&apos;
                    </span>
                    <span className="block text-sm font-bold text-slate-400">
                      {print.sqft} sq ft
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
