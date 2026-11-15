export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 3.5v9a7 7 0 0 0 14 0v-9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="12" cy="12.5" r="2.2" fill="currentColor" />
    </svg>
  );
}
