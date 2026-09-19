import Link from "next/link";
import { mission, vision, values, founders, org } from "@/lib/content";

export const metadata = { title: "About" };

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Why {org.name} exists</h1>
          <p className="lede">{mission}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid grid--2">
          <div>
            <h2>Our vision</h2>
            <p>{vision}</p>
          </div>
          <div
            style={{
              background: "var(--mist)",
              borderRadius: "var(--r-lg)",
              padding: "2rem",
              alignSelf: "start",
            }}
          >
            <h3>How we hold ourselves accountable</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Donations are tagged to the campaign they were given to. Spending
              is published quarterly, line by line, including what we spent on
              running the foundation itself. Where a program underperformed, the
              report says so.
            </p>
            <Link href="/contact" className="btn btn--ghost">
              Request a report
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <h2>What we hold to</h2>
          <p className="lede">
            Seven commitments that decide how a program gets designed and who it
            answers to.
          </p>
          <div style={{ marginTop: "2.5rem" }}>
            {values.map((v) => (
              <div key={v.title} className="value">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2>The people who started it</h2>
          <div className="grid grid--3" style={{ marginTop: "2.5rem" }}>
            {founders.map((f) => (
              <article key={f.name} className="card">
                <div className="founder__avatar" aria-hidden="true">
                  {initials(f.name)}
                </div>
                <h3>{f.name}</h3>
                <div className="founder__role">{f.role}</div>
                <p>{f.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
