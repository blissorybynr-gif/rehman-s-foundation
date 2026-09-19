import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaign, getCause } from "@/lib/content";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCampaign(params.slug);
  return { title: c ? c.name : "Campaign" };
}

export default function CampaignPage({ params }) {
  const campaign = getCampaign(params.slug);
  if (!campaign) notFound();

  const cause = getCause(campaign.cause);
  const siblings = campaigns
    .filter((c) => c.cause === campaign.cause && c.slug !== campaign.slug)
    .slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
            <Link href="/campaigns">Campaigns</Link>
            {cause ? ` · ${cause.name}` : ""}
          </p>
          <h1>{campaign.name}</h1>
          <p className="lede">{campaign.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid grid--2">
          <div>
            <h2>How it works</h2>
            <p>{campaign.detail}</p>
          </div>

          <aside
            style={{
              background: "var(--mist)",
              borderRadius: "var(--r-lg)",
              padding: "2rem",
              alignSelf: "start",
            }}
          >
            <h3>What it takes</h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--forest)",
                margin: "0 0 0.25rem",
              }}
            >
              {campaign.ask}
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              {campaign.recurring
                ? "A standing commitment — this one works best repeated."
                : "A one-off contribution."}
            </p>
            <div style={{ display: "grid", gap: "0.6rem", marginTop: "1.25rem" }}>
              <Link
                href={`/donate?campaign=${campaign.slug}`}
                className="btn btn--primary btn--block"
              >
                Support this campaign
              </Link>
              <Link href="/volunteer" className="btn btn--ghost btn--block">
                Give time instead
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section section--mist">
          <div className="shell">
            <h2>Also under {cause?.name}</h2>
            <div className="grid grid--3" style={{ marginTop: "2rem" }}>
              {siblings.map((c) => (
                <Link
                  key={c.slug}
                  href={`/campaigns/${c.slug}`}
                  className="card card--link"
                >
                  <h3>{c.name}</h3>
                  <p>{c.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
