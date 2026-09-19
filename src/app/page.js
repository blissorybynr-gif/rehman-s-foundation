import Link from "next/link";
import Image from "next/image";
import WeekStrip from "@/components/WeekStrip";
import { causes, impact, events, faqs, campaigns } from "@/lib/content";

export default function HomePage() {
  const featured = campaigns.filter((c) =>
    ["a-roof-a-reason", "adopt-a-grandparent", "one-tree-one-name", "ration-for-a-family"].includes(
      c.slug
    )
  );

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="shell hero__grid">
          <div>
            <div className="hero__rule" />
            <h1>Restoring what circumstance has taken away.</h1>
            <p className="lede">
              A home for the orphaned, dignity for the aging, breath for a
              suffering planet, and hope for those pushed to the margins of
              survival. We work where human compassion and environmental
              responsibility meet.
            </p>
            <div className="hero__ctas">
              <Link href="/donate" className="btn btn--primary">
                Donate now
              </Link>
              <Link href="/volunteer" className="btn btn--ghost">
                Volunteer with us
              </Link>
            </div>
          </div>

          <WeekStrip />
        </div>
      </section>

      {/* ---------------- causes ---------------- */}
      <section className="section">
        <div className="shell">
          <h2>Four kinds of vulnerability, one standard of care</h2>
          <p className="lede">
            A society&rsquo;s true measure lies in how it treats its most
            vulnerable members and the earth that sustains them all.
          </p>

          <div className="grid grid--2" style={{ marginTop: "2.5rem" }}>
            {causes.map((c) => (
              <article key={c.slug} className="cause">
                <h3>{c.name}</h3>
                <p className="cause__lead">{c.lead}</p>
                <p>{c.blurb}</p>
                <p style={{ marginTop: "1rem" }}>
                  <Link href={`/campaigns#${c.slug}`}>
                    See the campaigns
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- impact ---------------- */}
      <section className="section section--forest">
        <div className="shell">
          <h2>What that has added up to</h2>
          <p className="lede">
            Figures from our most recent quarterly report. Every line is
            reconciled against the spending we publish.
          </p>

          <div className="impact" style={{ marginTop: "2.5rem" }}>
            {impact.map((i) => (
              <div key={i.label} className="impact__cell">
                <div className="impact__figure">{i.figure}</div>
                <p className="impact__label">{i.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- featured campaigns ---------------- */}
      <section className="section">
        <div className="shell">
          <h2>Start with one commitment</h2>
          <p className="lede">
            These four are designed to be kept up month after month, which is
            what actually changes an outcome.
          </p>

          <div className="grid grid--4" style={{ marginTop: "2.5rem" }}>
            {featured.map((c) => (
              <Link
                key={c.slug}
                href={`/campaigns/${c.slug}`}
                className="card card--link"
              >
                <h3>{c.name}</h3>
                <p>{c.summary}</p>
                <div className="card__foot">
                  <span className="pill">{c.ask}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- events ---------------- */}
      <section className="section section--mist">
        <div className="shell">
          <h2>Our regular events</h2>
          <p className="lede">
            Four commitments that repeat, so there is always something to turn
            up to.
          </p>

          <div className="grid grid--4" style={{ marginTop: "2.5rem" }}>
            {events.map((e) => (
              <Link
                key={e.slug}
                href={`/events#${e.slug}`}
                className="card card--link"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <Image
                  src={e.image}
                  alt=""
                  width={520}
                  height={520}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <div style={{ padding: "1.25rem" }}>
                  <span className="event__when">{e.when}</span>
                  <h3>{e.name}</h3>
                  <p>{e.line}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="section">
        <div className="shell" style={{ maxWidth: "820px" }}>
          <h2>Questions people ask before giving</h2>
          <div style={{ marginTop: "2rem" }}>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- closing CTA ---------------- */}
      <section className="section section--forest">
        <div className="shell" style={{ textAlign: "center" }}>
          <h2 style={{ maxWidth: "20ch", marginInline: "auto" }}>
            One life, one tree, one community at a time.
          </h2>
          <p className="lede" style={{ marginInline: "auto" }}>
            Give money, give hours, or just come to a Friday and see what the
            week looks like.
          </p>
          <div
            className="hero__ctas"
            style={{ justifyContent: "center", marginTop: "2rem" }}
          >
            <Link href="/donate" className="btn btn--onDark">
              Donate
            </Link>
            <Link href="/volunteer" className="btn btn--leaf">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
