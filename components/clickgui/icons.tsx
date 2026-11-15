import type { TabId } from "./data";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function TabIcon({ id }: { id: TabId }) {
  switch (id) {
    case "combat":
      return <svg viewBox="0 0 24 24" {...P}><path d="M14.5 17.5 3 6V3h3l11.5 11.5" /><path d="m13 19 6-6M16 16l4 4M19 21l2-2" /></svg>;
    case "movement":
      return <svg viewBox="0 0 24 24" {...P}><path d="M13 4v6l4 2M5 20l4-6 4 2 2 4M9 14l1-5-3 1-2 3" /><circle cx="14" cy="3.5" r="1.5" /></svg>;
    case "player":
      return <svg viewBox="0 0 24 24" {...P}><rect x="2" y="7" width="20" height="11" rx="5" /><path d="M7 11v3M5.5 12.5h3" /><circle cx="16" cy="11.5" r="0.6" fill="currentColor" /><circle cx="18" cy="13.5" r="0.6" fill="currentColor" /></svg>;
    case "esp":
      return <svg viewBox="0 0 24 24" {...P}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "world":
      return <svg viewBox="0 0 24 24" {...P}><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c2.6 2.6 3.8 6 3.8 9.5s-1.2 6.9-3.8 9.5c-2.6-2.6-3.8-6-3.8-9.5S9.4 5.1 12 2.5z" /></svg>;
    case "other":
      return <svg viewBox="0 0 24 24" {...P}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>;
    case "configs":
      return <svg viewBox="0 0 24 24" {...P}><path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.5a4.8 4.8 0 0 1-.5 9.5H7z" /></svg>;
    case "friends":
      return <svg viewBox="0 0 24 24" {...P}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14a6 6 0 0 1 3 6" /></svg>;
    case "themes":
      return <svg viewBox="0 0 24 24" {...P}><path d="M12 2.5a9.5 9.5 0 0 0 0 19c1.2 0 1.8-.8 1.8-1.8 0-1.2-1-1.6-1-2.7 0-1 .8-1.8 1.8-1.8h2.2a4.7 4.7 0 0 0 4.7-4.7c0-4.4-4.3-8-9.5-8z" /><circle cx="7.5" cy="11" r="1" fill="currentColor" /><circle cx="10.5" cy="7" r="1" fill="currentColor" /><circle cx="15" cy="7.5" r="1" fill="currentColor" /></svg>;
  }
}

export const ChevronDown = () => <svg viewBox="0 0 24 24" {...P}><path d="m7 10 5 5 5-5" /></svg>;
export const ChevronRight = () => <svg viewBox="0 0 24 24" {...P}><path d="m10 7 5 5-5 5" /></svg>;
export const SearchIcon = () => <svg viewBox="0 0 24 24" {...P}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
export const SunIcon = () => <svg viewBox="0 0 24 24" {...P}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
export const MoonIcon = () => <svg viewBox="0 0 24 24" {...P}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" /></svg>;
export const GearIcon = () => <svg viewBox="0 0 24 24" {...P}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>;
