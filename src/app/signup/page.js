"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });

    setBusy(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setSent(true);
    }
  }

  return (
    <div className="authWrap">
      <div className="authCard">
        <h1>Create an account</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          An account lets you keep a record of what you have given and which
          events you have joined.
        </p>

        {sent ? (
          <p className="notice notice--ok" style={{ marginTop: "1.5rem" }}>
            Check your inbox — confirm the email we sent to {email} and then sign in.
          </p>
        ) : (
          <form className="form" onSubmit={submit} style={{ marginTop: "1.5rem" }}>
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
              <small>At least six characters.</small>
            </div>

            {error && <p className="notice notice--bad">{error}</p>}

            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}

        <p style={{ marginTop: "1.25rem", fontSize: "0.9rem" }}>
          Already registered? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
