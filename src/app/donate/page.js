"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { campaigns, getCampaign } from "@/lib/content";

function DonateForm() {
  const params = useSearchParams();
  const campaignSlug = params.get("campaign");
  const selected = campaignSlug ? getCampaign(campaignSlug) : null;

  // Forward the chosen campaign as a query param on the Tally embed too,
  // in case a hidden field named "campaign" is added in Tally later.
  const tallySrc = `https://tally.so/embed/GxMXpO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1${
    campaignSlug ? `&campaign=${encodeURIComponent(campaignSlug)}` : ""
  }`;

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Give to something specific</h1>
          <p className="lede">
            {selected
              ? `You're giving to ${selected.name}. Change the campaign inside the form if you'd rather support something else.`
              : "Choose the campaign rather than a general pool, so the money is tagged and appears in the quarterly report under that line."}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid grid--2">
          <div className="tallyCard">
            <iframe
              data-tally-src={tallySrc}
              loading="lazy"
              width="100%"
              height="1092"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Rehman's Foundation Donation Form"
            />
          </div>

          <aside
            style={{
              background: "var(--mist)",
              borderRadius: "var(--r-lg)",
              padding: "2rem",
              alignSelf: "start",
            }}
          >
            <h3>Where it goes</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Your donation is tagged to the campaign you choose and nothing
              else. Administrative costs are capped and reported separately,
              so a gift to a campaign is not quietly redirected.
            </p>

            <h3 style={{ marginTop: "1.5rem" }}>Popular campaigns</h3>
            <ul style={{ paddingLeft: "1.1rem", color: "var(--muted)", fontSize: "0.9rem" }}>
              {campaigns.slice(0, 4).map((c) => (
                <li key={c.slug} style={{ marginBottom: "0.4rem" }}>
                  <Link href={`/campaigns/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>

            <h3 style={{ marginTop: "1.5rem" }}>Would rather give time?</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Most programs need hours more than money. Volunteer Friday is the
              easiest way in.
            </p>
            <Link href="/volunteer" className="btn btn--ghost">
              Volunteer instead
            </Link>
          </aside>
        </div>
      </section>

      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          } else {
            document
              .querySelectorAll("iframe[data-tally-src]:not([src])")
              .forEach((el) => {
                el.src = el.dataset.tallySrc;
              });
          }
        }}
      />
    </>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<section className="section shell">Loading…</section>}>
      <DonateForm />
    </Suspense>
  );
}
