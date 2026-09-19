import Image from "next/image";
import Link from "next/link";
import { events, weekDays } from "@/lib/content";
import EventRegisterButton from "@/components/EventRegisterButton";

export const metadata = { title: "Events" };

const activeDays = new Set(events.flatMap((e) => e.days));

export default function EventsPage() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Four things that happen every week</h1>
          <p className="lede">
            You do not need to sign up for a year. Come to one, see what it is,
            decide after.
          </p>

          <div
            className="week__days"
            style={{ maxWidth: "440px", marginTop: "2rem" }}
            aria-hidden="true"
          >
            {weekDays.map((d) => (
              <span key={d} className="week__day" data-on={activeDays.has(d)}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          {events.map((e, i) => (
            <article
              key={e.slug}
              id={e.slug}
              className={`event ${i % 2 ? "event--flip" : ""}`}
              style={{ scrollMarginTop: "90px" }}
            >
              <div className="event__media">
                <Image
                  src={e.image}
                  alt={`${e.name} campaign brochure`}
                  width={1024}
                  height={1024}
                />
              </div>
              <div>
                <span className="event__when">{e.when}</span>
                <h2>{e.name}</h2>
                <p style={{ fontWeight: 600, color: "var(--forest)" }}>
                  {e.line}
                </p>
                <p>{e.body}</p>
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <EventRegisterButton slug={e.slug} name={e.name} />
                  <Link href="/donate" className="btn btn--ghost">
                    Fund it instead
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
