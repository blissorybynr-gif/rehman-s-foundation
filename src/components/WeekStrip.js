import Link from "next/link";
import { events, weekDays } from "@/lib/content";

const activeDays = new Set(events.flatMap((e) => e.days));

export default function WeekStrip() {
  return (
    <aside className="week">
      <p className="week__title">Where we are this week</p>
      <p className="week__sub">
        Four fixed commitments. Turn up to any one of them.
      </p>

      <div className="week__days" aria-hidden="true">
        {weekDays.map((d) => (
          <span key={d} className="week__day" data-on={activeDays.has(d)}>
            {d}
          </span>
        ))}
      </div>

      <ul className="week__list">
        {events.map((e) => (
          <li key={e.slug}>
            <span className="week__when">
              {e.days.length ? e.days.join(" · ") : "Eid"}
            </span>
            <span className="week__what">
              <Link href={`/events#${e.slug}`}>{e.name}</Link>
              <small>{e.line}</small>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
