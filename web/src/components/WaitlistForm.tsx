"use client";

import { useState } from "react";

const BUILDING = ["Founder", "Student", "Fitness", "Career", "Focus"];
const PLATFORMS = ["iOS", "Android", "Both"];

const inputStyle = {
  width: "100%" as const,
  minHeight: 54,
  padding: "14px 16px",
  borderRadius: "var(--mahout_radius_button)",
  border: "1px solid var(--mahout_outline_soft)",
  background: "rgba(255,255,255,0.05)",
  fontSize: "var(--text_body)",
  color: "var(--mahout_text_primary)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

export function WaitlistForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          primaryGoal: building || undefined,
          platformPreference: platform || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--mahout_space_16)",
      }}
    >
      <div>
        <label
          htmlFor="email"
          style={{
            display: "block",
            fontSize: "var(--text_caption)",
            fontWeight: 600,
            color: "var(--mahout_text_primary)",
            marginBottom: "var(--mahout_space_8)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Email <span style={{ color: "var(--mahout_text_tertiary)" }}>*</span>
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={loading}
          style={inputStyle}
        />
      </div>

      <div>
        <label
          htmlFor="building"
          style={{
            display: "block",
            fontSize: "var(--text_caption)",
            fontWeight: 600,
            color: "var(--mahout_text_primary)",
            marginBottom: "var(--mahout_space_8)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          What are you building right now?
        </label>

        <select
          id="building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          disabled={loading}
          style={inputStyle}
        >
          <option value="">Select…</option>
          {BUILDING.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="platform"
          style={{
            display: "block",
            fontSize: "var(--text_caption)",
            fontWeight: 600,
            color: "var(--mahout_text_primary)",
            marginBottom: "var(--mahout_space_8)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          iOS or Android?
        </label>

        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          disabled={loading}
          style={inputStyle}
        >
          <option value="">Select…</option>
          {PLATFORMS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p
          style={{
            color: "#f87171",
            fontSize: "var(--text_caption)",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          minHeight: "var(--mahout_btn_height)",
          padding: "14px 18px",
          borderRadius: "var(--mahout_radius_button)",
          background: "var(--mahout_accent)",
          color: "var(--mahout_on_accent)",
          fontWeight: 600,
          fontSize: "var(--text_body)",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.72 : 1,
          boxShadow: "var(--shadow_m), 0 0 24px var(--mahout_premium_accent_2)",
        }}
      >
        {loading ? "Joining…" : "Join the waitlist"}
      </button>
    </form>
  );
}
