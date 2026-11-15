"use client";

import { useEffect, useState } from "react";

// Mock of the in-game DynamicIsland HUD element, cycling through example events.
const EVENTS = [
  { t: "Aura enabled", s: "Combat", r: "ON" },
  { t: "Target: Steve", s: "18.5 HP · 3.1 m", r: "92%" },
  { t: "Totem popped", s: "AutoTotem swapped a new one", r: "×4" },
  { t: "PvP mode", s: "Don't log out", r: "28s" },
  { t: "Config loaded", s: "Sharp PvP", r: "✓" },
];

export default function Island() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % EVENTS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const e = EVENTS[i]!;
  return (
    <div className="island-stage" aria-live="off">
      <div className="island island-swap" key={i}>
        <span className="ico">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
          </svg>
        </span>
        <span>
          <div className="t">{e.t}</div>
          <div className="s">{e.s}</div>
        </span>
        <span className="r">{e.r}</span>
      </div>
    </div>
  );
}
