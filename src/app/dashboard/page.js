import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Your dashboard" };

function money(n) {
  return `PKR ${Number(n).toLocaleString()}`;
}

function when(ts) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/dashboard");

  const [{ data: profile }, { data: donations }, { data: registrations }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("donations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("event_registrations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

  const total = (donations ?? []).reduce((s, d) => s + Number(d.amount), 0);
  const monthly = (donations ?? []).filter((d) => d.frequency === "monthly");
  const isAdmin = profile?.role === "admin";

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>{profile?.full_name || "Welcome back"}</h1>
          <p className="lede">
            Everything you have pledged and joined, in one place.
          </p>
          {isAdmin && (
            <Link href="/admin" className="btn btn--ghost">
              Open the admin view
            </Link>
          )}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--3">
            <div className="card">
              <h3>{money(total)}</h3>
              <p>pledged in total</p>
            </div>
            <div className="card">
              <h3>{monthly.length}</h3>
              <p>standing monthly commitments</p>
            </div>
            <div className="card">
              <h3>{registrations?.length ?? 0}</h3>
              <p>events you have joined</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <h2>Your donations</h2>

          {donations?.length ? (
            <div className="tableWrap" style={{ marginTop: "1.5rem", background: "var(--white)" }}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Campaign</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.id}>
                      <td>{when(d.created_at)}</td>
                      <td>{d.campaign_name}</td>
                      <td>{money(d.amount)}</td>
                      <td>{d.frequency}</td>
                      <td>
                        <span className="pill">{d.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card" style={{ marginTop: "1.5rem" }}>
              <h3>Nothing here yet</h3>
              <p>
                Pick a campaign and give once. It will show up on this page with
                a status you can follow.
              </p>
              <div className="card__foot">
                <Link href="/campaigns" className="btn btn--primary">
                  Browse campaigns
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2>Events you have joined</h2>

          {registrations?.length ? (
            <div className="grid grid--3" style={{ marginTop: "1.5rem" }}>
              {registrations.map((r) => (
                <article key={r.id} className="card">
                  <h3>{r.event_name}</h3>
                  <p>Joined {when(r.created_at)}</p>
                  <div className="card__foot">
                    <Link href="/events" className="btn btn--ghost">
                      Event details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card" style={{ marginTop: "1.5rem" }}>
              <h3>No events joined</h3>
              <p>
                Volunteer Friday is the easiest one to start with — it is
                planning, not heavy lifting.
              </p>
              <div className="card__foot">
                <Link href="/events" className="btn btn--leaf">
                  See the four events
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
