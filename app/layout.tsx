import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import NavLinks from "@/components/NavLinks";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
// Poppins is the in-game menu font; used by the ClickGUI replica.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Unreal", template: "%s · Unreal" },
  description: "Unreal: a clean, fast Minecraft client.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060609",
};

// Applies a saved theme choice before first paint (no flash).
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="site-header container">
          <nav className="nav" aria-label="Main">
            <Link href="/" className="brand">
              <Logo />
              unreal
            </Link>
            <NavLinks user={user ? { name: user.name, role: user.role } : null} />
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} Unreal</footer>
      </body>
    </html>
  );
}
