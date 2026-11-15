import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <section className="home-underwater" aria-labelledby="home-title" lang="ru">
      <Image src="/underwater-glass.png" alt="" fill priority sizes="100vw" className="home-underwater-image" />
      <div className="home-underwater-shade" aria-hidden="true" />
      <div className="home-underwater-content">
        <h1 id="home-title">Ломай границы.<br />Побеждай с <span>Unreal.</span></h1>
        <p>Нереальный игровой опыт для тех, кто привык побеждать.<br />Контроль, превосходство и скорость — с Unreal.</p>
        <div className="home-underwater-actions">
          <Link href="/purchase" className="home-button home-button-buy">Купить Клиент</Link>
          <Link href={user ? "/ps" : "/login"} className="home-button home-button-glass" lang="en">{user ? "My account" : "Log In"}</Link>
        </div>
      </div>
    </section>
  );
}
