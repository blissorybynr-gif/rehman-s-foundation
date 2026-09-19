import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin" };

function when(ts) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return (
      <section className="section">
        <div className="shell">
          <h1>Not an admin account</h1>
          <p className="lede">
            This area is limited to foundation staff. If that should be you, ask
            another admin to set your role, then sign out and back in.
          </p>
          <Link href="/dashboard" className="btn btn--primary">
            Back to your dashboard
          </Link>
        </div>
      </section>
    );
  }

  const [donations, volunteers, messages, registrations] = await Promise.all([
    supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("volunteers").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("event_registrations").select("*").order("created_at", { ascending: false }).limit(100),
  ]);

  const rows = donations.data ?? [];
  const total = rows.reduce((s, d) => s + Number(d.amount), 0);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Admin</h1>
          <p className="lede">
            Everything submitted through the site. Read-only for now — editing
            comes with the next phase.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--4">
            <div className="card">
              <h3>PKR {total.toLocaleString()}</h3>
              <p>pledged across {rows.length} donations</p>
            </div>
            <div className="card">
              <h3>{volunteers.data?.length ?? 0}</h3>
              <p>volunteer applications</p>
            </div>
            <div className="card">
              <h3>{registrations.data?.length ?? 0}</h3>
              <p>event registrations</p>
            </div>
            <div className="card">
              <h3>{messages.data?.length ?? 0}</h3>
              <p>contact messages</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <h2>Donations</h2>
          <div className="tableWrap" style={{ marginTop: "1.5rem", background: "var(--white)" }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Donor</th>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.id}>
                    <td>{when(d.created_at)}</td>
                    <td>{d.donor_name || "Anonymous"}<br /><small>{d.donor_email}</small></td>
                    <td>{d.campaign_name}</td>
                    <td>PKR {Number(d.amount).toLocaleString()}</td>
                    <td><span className="pill">{d.status}</span></td>
                  </tr>
                ))}
                {!rows.length && (
                  <tr><td colSpan={5}>No donations recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2>Volunteer applications</h2>
          <div className="tableWrap" style={{ marginTop: "1.5rem" }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Cause</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {(volunteers.data ?? []).map((v) => (
                  <tr key={v.id}>
                    <td>{when(v.created_at)}</td>
                    <td>{v.full_name}</td>
                    <td>{v.email}<br /><small>{v.phone}</small></td>
                    <td>{v.cause}</td>
                    <td>{v.availability}</td>
                  </tr>
                ))}
                {!volunteers.data?.length && (
                  <tr><td colSpan={5}>No applications yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <h2>Messages</h2>
          <div className="grid grid--2" style={{ marginTop: "1.5rem" }}>
            {(messages.data ?? []).map((m) => (
              <article key={m.id} className="card">
                <h3>{m.subject || "No subject"}</h3>
                <p><strong>{m.name}</strong> · {m.email} · {when(m.created_at)}</p>
                <p>{m.body}</p>
              </article>
            ))}
            {!messages.data?.length && (
              <p className="lede">No messages yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
