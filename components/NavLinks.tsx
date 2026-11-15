"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions";

interface Props {
  user: { name: string; role: "user" | "admin" } | null;
}

export default function NavLinks({ user }: Props) {
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <Link href={href} aria-current={pathname === href ? "page" : undefined} className={`nav-link${pathname === href || pathname.startsWith(href + "/") ? " active" : ""}`}>
      {label}
    </Link>
  );

  return (
    <div className="nav-links">
      <div className="nav-primary">
        {link("/", "Главная")}
        {link("/purchase", "Продукты")}
        {link("/support", "Поддержка")}
        {link("/faq", "Частые вопросы")}
      </div>
      <div className="nav-account">
        {user?.role === "admin" && link("/panel", "Панель")}
        {user && (
          <form action={logoutAction}>
            <button type="submit" className="nav-link">Выйти</button>
          </form>
        )}
        <Link href={user ? "/ps" : "/login"} className="nav-account-button">Личный кабинет</Link>
      </div>
    </div>
  );
}
