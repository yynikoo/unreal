import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card hero">
      <p className="eyebrow">404</p>
      <h1 style={{ marginTop: 10 }}>Page not found</h1>
      <p className="muted">That page doesn&apos;t exist.</p>
      <div className="row" style={{ justifyContent: "center", marginTop: 24 }}>
        <Link href="/" className="btn primary">Go home</Link>
      </div>
    </section>
  );
}
