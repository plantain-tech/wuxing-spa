"use client";

import { useMemo, useState } from "react";

const tiers = [50, 100, 150, 200, 300];

export default function GiftCardsPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [custom, setCustom] = useState(0);
  const total = useMemo(() => selected.reduce((a, b) => a + b, 0) + (custom || 0), [selected, custom]);

  return (
    <main className="site-shell">
      <section className="frame white-panel section-block" style={{ marginTop: 28 }}>
        <h1>Gift Cards</h1>
        <p>Elegant, printable gift cards for any treatment package.</p>
        <div className="cards-3" style={{ marginTop: 14 }}>
          {tiers.map((t) => (
            <button key={t} className={`pick ${selected.includes(t) ? "on" : ""}`} onClick={() => setSelected((p) => p.includes(t) ? p.filter(x => x !== t) : [...p, t])}>
              <strong>${t}</strong>
              <span>Wuxing Signature Gift</span>
            </button>
          ))}
        </div>
        <div className="mini-card" style={{ marginTop: 16, maxWidth: 320, padding: 16 }}>
          <label>Custom amount</label>
          <input type="number" min={0} placeholder="0" value={custom || ""} onChange={(e) => setCustom(Number(e.target.value || 0))} />
        </div>
      </section>
      <div className="frame floating-bar">
        <span>Total <strong>${total}</strong></span>
        <button className="btn solid" disabled={total <= 0}>Checkout</button>
      </div>
    </main>
  );
}
