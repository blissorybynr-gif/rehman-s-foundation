import Link from "next/link";
import { causes, campaigns, campaignsByCause } from "@/lib/content";

export const metadata = { title: "Campaigns" };

export default function CampaignsPage() {
  const crossCutting = campaignsByCause("all");

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Campaigns you can actually follow</h1>
          <p className="lede">
            Every campaign names what it costs and what it delivers. Pick the
            one that matches what you can commit to, not the one that sounds
            largest.
          </p>
        </div>
      </section>

      {causes.map((cause, i) => (
        <section
          key={cause.slug}
          id={cause.slug}
          className={i % 2 ? "section section--mist" : "section"}
          style={{ scrollMarginTop: "90px" }}
        >
          <div className="shell">
            <h2>{cause.name}</h2>
            <p className="lede">{cause.blurb}</p>

            <div className="grid grid--3" style={{ marginTop: "2.25rem" }}>
              {campaignsByCause(cause.slug).map((c) => (
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
      ))}

      <section className="section section--forest">
        <div className="shell">
          <h2>Across all four causes</h2>
          <p className="lede">
            Two programmes that are not tied to a single cause — they rotate
            through everything we run.
          </p>
          <div className="grid grid--2" style={{ marginTop: "2.25rem" }}>
            {crossCutting.map((c) => (
              <article
                key={c.slug}
                className="card"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                }}
              >
                <h3>{c.name}</h3>
                <p style={{ color: "#bcd8cf" }}>{c.summary}</p>
                <div className="card__foot">
                  <Link href={`/campaigns/${c.slug}`} className="btn btn--onDark">
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
