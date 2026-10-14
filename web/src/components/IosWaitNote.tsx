"use client";

import { FormEvent, useState } from "react";
import { IOS_WAITLIST_EMAIL } from "@/lib/siteLinks";

export function IosWaitNote() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;
    const subject = "Mahout on iPhone";
    const body = `Please tell me when Mahout is on the App Store.\n\n${address}`;
    window.location.href = `mailto:${IOS_WAITLIST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (!open) {
    return (
      <p className="ios-wait">
        <button type="button" onClick={() => setOpen(true)}>
          On iPhone
        </button>
      </p>
    );
  }

  return (
    <form className="ios-wait ios-wait--open" onSubmit={send}>
      <label className="ios-wait__label" htmlFor="ios-wait-email">
        Email for Eonex
      </label>
      <input
        id="ios-wait-email"
        className="ios-wait__input"
        type="email"
        name="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="Your email"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="ios-wait__send" type="submit">
        Send
      </button>
    </form>
  );
}
