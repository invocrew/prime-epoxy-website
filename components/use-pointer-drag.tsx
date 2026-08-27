"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";

export function usePointerDrag(initial = 50) {
  const [value, setValue] = useState(initial);
  const trackRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(95, Math.max(5, next)));
  }, []);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      update(event.clientX);
    },
    [update],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        return;
      }
      update(event.clientX);
    },
    [update],
  );

  return {
    value,
    trackRef,
    bind: {
      onPointerDown,
      onPointerMove,
    },
  };
}
