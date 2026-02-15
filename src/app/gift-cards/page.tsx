"use client";

import { useMemo, useState } from "react";

const tiers = [50, 100, 150, 200, 300];

export default function GiftCardsPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [custom, setCustom] = useState(0);

  const total = useMemo(() => {
    const sum = selected.reduce((a, b) => a + b, 0);
    return custom > 0 ? sum + custom : sum;
  }, [selected, custom]);

  const toggle = (v: number) => {
    setSelected((prev) => (prev.includes(v) ? prev.filter((n) => n !== v) : [...prev, v]));
  };

  return (
    <main className="container section">
      <h1>Gift Cards</h1>
      <p>Choose one or more cards. Add a custom amount if you want.</p>

      <div className="grid cards" style={{ marginTop: 16 }}>
        {tiers.map((t) => (
          <button key={t} className={`pick ${selected.includes(t) ? "on" : ""}`} onClick={() => toggle(t)}>
            <strong>${t}</strong>
            <span>Wuxing Gift Card</span>
          </button>
        ))}
      </div>

      <div className="card pad" style={{ marginTop: 18, maxWidth: 360 }}>
        <label>Custom amount</label>
        <input type="number" min={0} placeholder="0" value={custom || ""} onChange={(e) => setCustom(Number(e.target.value || 0))} />
      </div>

      <div className="floating-bar">
        <span>Total: <strong>${total}</strong></span>
        <button className="btn" disabled={total <= 0}>Checkout</button>
      </div>
    </main>
  );
}
