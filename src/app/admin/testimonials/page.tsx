"use client";

import { useEffect, useState } from "react";

type T = { id: string; name: string; role: string; text: string; rating: number; active: boolean };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5 });

  async function load() {
    const res = await fetch("/api/testimonials/all");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  async function add() {
    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", role: "", text: "", rating: 5 });
    load();
  }

  async function toggle(id: string, active: boolean) {
    await fetch(`/api/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main className="site-shell">
      <section className="frame white-panel section-block" style={{ marginTop: 28 }}>
        <h1>Admin · Testimonials</h1>
        <p>Editable testimonial data for homepage auto-carousel.</p>

        <div className="mini-card" style={{ padding: 16, marginTop: 14, display: "grid", gap: 8 }}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <input placeholder="Role" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
          <textarea placeholder="Feedback" value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} style={{ minHeight: 90, padding: 10, borderRadius: 10, border: "1px solid #d4cec1" }} />
          <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value || 5) }))} />
          <button className="btn solid" onClick={add}>Add Testimonial</button>
        </div>

        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          {items.map((it) => (
            <div key={it.id} className="mini-card" style={{ padding: 14 }}>
              <strong>{it.name}</strong> · <span>{it.role}</span> · <span>{"★".repeat(it.rating)}</span>
              <p style={{ margin: "8px 0" }}>{it.text}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost" onClick={() => toggle(it.id, it.active)}>{it.active ? "Disable" : "Enable"}</button>
                <button className="btn ghost" onClick={() => remove(it.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
