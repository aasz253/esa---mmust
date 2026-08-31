"use client";
import { useEffect, useState } from "react";

function diff(target: number) {
  const d = target - Date.now();
  if (d <= 0) return null;
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    mins: Math.floor((d % 3600000) / 60000),
    secs: Math.floor((d % 60000) / 1000),
  };
}

export function Countdown({ target }: { target: string | Date }) {
  const t = new Date(target).getTime();
  const [state, setState] = useState(() => diff(t));

  useEffect(() => {
    const id = setInterval(() => setState(diff(t)), 1000);
    return () => clearInterval(id);
  }, [t]);

  if (!state)
    return (
      <span className="rounded-full bg-[#e2edff] px-4 py-1.5 text-sm font-semibold text-[#4d6a92]">
        Event has passed
      </span>
    );

  return (
    <div className="flex gap-4">
      {[
        { v: state.days, l: "Days" },
        { v: state.hours, l: "Hrs" },
        { v: state.mins, l: "Min" },
        { v: state.secs, l: "Sec" },
      ].map((x) => (
        <div
          key={x.l}
          className="glass flex min-w-16 flex-col items-center rounded-2xl px-4 py-3"
        >
          <span className="font-display text-2xl font-bold text-[#0a55c7]">
            {String(x.v).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#5b7394]">
            {x.l}
          </span>
        </div>
      ))}
    </div>
  );
}
