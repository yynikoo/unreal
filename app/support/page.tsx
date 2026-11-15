import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Поддержка" };

export default function SupportPage() {
  return (
    <section className="stack lg" lang="ru">
      <h1>Поддержка</h1>
      <div className="card stack">
        <h2>Нужна помощь?</h2>
        <p className="muted">Посмотрите <Link href="/faq">ответы на частые вопросы</Link> или откройте <Link href="/ps">личный кабинет</Link>, чтобы проверить данные аккаунта.</p>
        <p className="small faint">Прямой канал поддержки пока не опубликован.</p>
      </div>
    </section>
  );
}
