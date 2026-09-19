"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EventRegisterButton({ slug, name }) {
  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let live = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!live) return;
      setUser(data.user ?? null);
      if (data.user) {
        const { data: rows } = await supabase
          .from("event_registrations")
          .select("id")
          .eq("event_slug", slug)
          .eq("user_id", data.user.id);
        if (live) setJoined(Boolean(rows?.length));
      }
    });
    return () => {
      live = false;
    };
  }, [supabase, slug]);

  async function join() {
    if (!user) {
      router.push(`/login?next=/events`);
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("event_registrations").insert({
      user_id: user.id,
      event_slug: slug,
      event_name: name,
    });
    setBusy(false);
    if (!error) setJoined(true);
  }

  if (joined) {
    return (
      <span className="btn btn--ghost" aria-live="polite">
        You are signed up
      </span>
    );
  }

  return (
    <button onClick={join} disabled={busy} className="btn btn--leaf">
      {busy ? "Signing you up…" : "Join this event"}
    </button>
  );
}
