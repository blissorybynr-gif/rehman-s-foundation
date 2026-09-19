import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell">
        <div className="hero__rule" />
        <h1>That page does not exist</h1>
        <p className="lede">
          The link may be out of date. The campaigns and events pages are the
          two most likely places you were headed.
        </p>
        <div className="hero__ctas">
          <Link href="/campaigns" className="btn btn--primary">Campaigns</Link>
          <Link href="/" className="btn btn--ghost">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
