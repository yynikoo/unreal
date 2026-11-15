// The client logo (Fonts.LOGO glyph from the mod, rendered to /public/logo.png).
// Drawn as a mask so it takes the current text color.
export default function Logo({ size = 22 }: { size?: number }) {
  return <span className="logo-mark" style={{ width: size, height: size }} aria-hidden />;
}
