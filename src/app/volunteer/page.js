"use client";

import Script from "next/script";

export default function VolunteerPage() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Come once before you commit</h1>
          <p className="lede">
            Tell us roughly when you are free and which cause pulls at you. We
            will match you to something real rather than putting you on a list.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid grid--2">
          <div className="tallyCard">
            <iframe
              data-tally-src="https://tally.so/embed/1AjGQp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="1092"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="NGO Volunteer Form"
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
            <h3>What volunteering actually looks like</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Mondays and Thursdays are food — collecting, packing, distributing.
              Sundays are old age homes, mostly sitting and listening. Fridays are
              planning, which is where most people start. Clean-ups are one
              Saturday a month.
            </p>
            <h3 style={{ marginTop: "1.5rem" }}>No minimum</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Two hours a month is genuinely useful. We would rather have someone
              reliable once a month than enthusiastic once.
            </p>
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
