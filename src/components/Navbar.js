"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { navLinks, org } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => setOpen(false), [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="nav">
      <div className="shell nav__inner">
        <Link href="/" className="nav__brand">
          <Image src="/logo.jpg" alt="" width={44} height={44} priority />
          <span className="nav__brandText">
            {org.name}
            <span>{org.tagline}</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={pathname.startsWith(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          {user ? (
            <>
              <Link href="/dashboard" className="btn btn--ghost">
                Dashboard
              </Link>
              <button onClick={signOut} className="btn btn--ghost">
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn--ghost">
              Sign in
            </Link>
          )}
          <Link href="/donate" className="btn btn--primary">
            Donate
          </Link>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="shell">
          <nav className="nav__mobile" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link href="/donate">Donate</Link>
            {user && <Link href="/dashboard">Dashboard</Link>}
          </nav>
        </div>
      )}
    </header>
  );
}
