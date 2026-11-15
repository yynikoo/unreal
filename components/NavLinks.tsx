"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions";
import ThemeToggle from "./ThemeToggle";

interface Props {
  user: { name: string; role: "user" | "admin" } | null;
}

export default function NavLinks({ user }: Props) {
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <Link href={href} className={`nav-link${pathname === href || pathname.startsWith(href + "/") ? " active" : ""}`}>
      {label}
    </Link>
  );

  return (
    <div className="nav-links">
      {link("/", "Home")}
      {link("/purchase", "Pricing")}
      {user ? (
        <>
          {link("/ps", "Account")}
          {user.role === "admin" && link("/panel", "Panel")}
          <form action={logoutAction}>
            <button type="submit" className="nav-link">Sign out</button>
          </form>
        </>
      ) : (
        <>
          {link("/login", "Sign in")}
          {link("/register", "Register")}
        </>
      )}
      <ThemeToggle />
    </div>
  );
}
