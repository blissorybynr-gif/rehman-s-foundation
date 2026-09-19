"use client";

import { useState } from "react";

// Rehman's Foundation AI Assistant, powered by Botpress.
// The bubble opens a panel that loads the shareable webchat in an iframe.

const CHAT_URL =
  "https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/07/11/09/20260711093337-GW4AFO3C.json";

export default function ChatSlot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="chatPanel" role="dialog" aria-label="Rehman's Foundation assistant">
          <div className="chatPanel__head">
            <span>Rehman&rsquo;s Foundation Assistant</span>
            <button
              className="chatPanel__close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <iframe
            src={CHAT_URL}
            title="Rehman's Foundation Assistant"
            className="chatPanel__frame"
            allow="microphone"
          />
        </div>
      )}

      <button
        className="chatSlot"
        aria-label={open ? "Close assistant" : "Ask the Rehman's Foundation assistant"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
