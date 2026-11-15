import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Частые вопросы" };

export default function FaqPage() {
  return (
    <section className="stack lg" lang="ru">
      <h1>Частые вопросы</h1>
      <div className="card stack">
        <h2>Можно ли сейчас купить клиент?</h2>
        <p className="muted">Покупки пока недоступны. Планы можно посмотреть на <Link href="/purchase">странице продуктов</Link>.</p>
      </div>
      <div className="card stack">
        <h2>Как открыть личный кабинет?</h2>
        <p className="muted"><Link href="/login">Войдите</Link> в аккаунт или <Link href="/register">зарегистрируйтесь</Link>, если у вас его ещё нет.</p>
      </div>
    </section>
  );
}
