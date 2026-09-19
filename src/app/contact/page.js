"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { org } from "@/lib/content";

export default function ContactPage() {
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
  const [state, setState] = useState({ status: "idle", msg: "" });

  function set(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setState({ status: "busy", msg: "" });
    const { error } = await supabase.from("messages").insert(form);
    if (error) {
      setState({ status: "error", msg: error.message });
      return;
    }
    setState({ status: "done", msg: "Message sent. We reply within two working days." });
    setForm({ name: "", email: "", subject: "", body: "" });
  }

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__rule" />
          <h1>Get in touch</h1>
          <p className="lede">
            Questions about where donations go, requests for a report, partnership
            offers, or a family that needs help — all of it comes here.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid grid--2">
          <form className="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" required value={form.name} onChange={set("name")} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={set("email")} />
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" value={form.subject} onChange={set("subject")} />
            </div>
            <div className="field">
              <label htmlFor="body">Message</label>
              <textarea id="body" required value={form.body} onChange={set("body")} />
            </div>

            {state.status === "error" && <p className="notice notice--bad">{state.msg}</p>}
            {state.status === "done" && <p className="notice notice--ok">{state.msg}</p>}

            <button type="submit" className="btn btn--primary" disabled={state.status === "busy"}>
              {state.status === "busy" ? "Sending…" : "Send message"}
            </button>
          </form>

          <aside style={{ background: "var(--mist)", borderRadius: "var(--r-lg)", padding: "2rem", alignSelf: "start" }}>
            <h3>Reach us directly</h3>
            <p style={{ margin: "0 0 0.4rem" }}>
              <a href={`mailto:${org.email}`}>{org.email}</a>
            </p>
            <p style={{ margin: "0 0 0.4rem" }}>
              <a href={`mailto:${org.altEmail}`}>{org.altEmail}</a>
            </p>
            <p style={{ margin: "0 0 0.4rem" }}>{org.phone}</p>
            <p style={{ color: "var(--muted)" }}>{org.address}</p>

            <h3 style={{ marginTop: "1.5rem" }}>Office hours</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              Monday to Friday, 10am to 6pm. Fridays get busy after 4pm because
              that is when volunteers meet.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
