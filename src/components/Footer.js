import Link from "next/link";
import { org, causes } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <h4>{org.name}</h4>
            <p>
              The bridge between what is broken and what can be rebuilt — one
              life, one tree, one community at a time.
            </p>
            <p>{org.address}</p>
            <p>
              <a href={`mailto:${org.email}`}>{org.email}</a>
              <a href={`tel:${org.phone.replace(/\s/g, "")}`}>{org.phone}</a>
            </p>
          </div>

          <div>
            <h4>What we do</h4>
            {causes.map((c) => (
              <Link key={c.slug} href={`/campaigns#${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </div>

          <div>
            <h4>Get involved</h4>
            <Link href="/donate">Donate</Link>
            <Link href="/volunteer">Volunteer</Link>
            <Link href="/events">Weekly events</Link>
            <Link href="/contact">Contact us</Link>
            <Link href="/login">Sign in</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {org.name}. A registered non-profit.
          </span>
          <span>{org.handle}</span>
        </div>
      </div>
    </footer>
  );
}
