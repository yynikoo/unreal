import type { Metadata, Viewport } from "next";
import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Unreal", template: "%s · Unreal" },
  description: "Unreal: account, plans and access.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e7eaf0" },
    { media: "(prefers-color-scheme: dark)", color: "#262a31" },
  ],
};

// Applies a saved theme choice before first paint (no flash).
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="site-header container">
          <nav className="nav" aria-label="Main">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden />
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
