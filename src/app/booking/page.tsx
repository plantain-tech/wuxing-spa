"use client";

import { useMemo, useState } from "react";

const services = [
  { id: "reflexology", name: "Reflexology", duration: 60, price: 79 },
  { id: "acupressure", name: "Acupressure", duration: 60, price: 89 },
  { id: "chair", name: "Chair Acupressure", duration: 30, price: 49 },
  { id: "detox", name: "Detox", duration: 75, price: 109 },
];
const experts = [
  { id: "lin", name: "Master Lin", specialty: "Deep pressure" },
  { id: "may", name: "May", specialty: "Reflexology" },
  { id: "chen", name: "Chen", specialty: "Neck & shoulder" },
];
const slots = ["10:00", "11:00", "13:00", "14:30", "16:00", "18:30"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(services[0].id);
  const [expertId, setExpertId] = useState(experts[0].id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(slots[0]);
  const [isMember, setIsMember] = useState(false);

  const service = services.find((s) => s.id === serviceId)!;
  const expert = experts.find((e) => e.id === expertId)!;
  const fee = isMember ? 0 : +(service.price * 0.2).toFixed(2);
  const total = +(service.price + fee).toFixed(2);
  const canNext = useMemo(() => (step === 3 ? !!date && !!time : true), [step, date, time]);

  return (
    <main className="site-shell">
      <section className="frame white-panel section-block" style={{ marginTop: 28 }}>
        <h1>Booking Experience</h1>
        <div className="progress">{["Service", "Expert", "Date & Time", "Confirm"].map((s, i) => <span key={s} className={step === i + 1 ? "active" : ""}>{i + 1}. {s}</span>)}</div>
        <div className="booking-layout">
          <section className="mini-card" style={{ padding: 20 }}>
            {step === 1 && <GridSelect items={services.map(s => ({ id: s.id, line1: s.name, line2: `${s.duration} min · $${s.price}` }))} value={serviceId} onChange={setServiceId} />}
            {step === 2 && <GridSelect items={experts.map(e => ({ id: e.id, line1: e.name, line2: e.specialty }))} value={expertId} onChange={setExpertId} />}
            {step === 3 && (
              <div style={{ display: "grid", gap: 14 }}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <GridSelect items={slots.map(s => ({ id: s, line1: s, line2: "Available" }))} value={time} onChange={setTime} />
              </div>
            )}
            {step === 4 && (
              <div style={{ display: "grid", gap: 12 }}>
                <p>{service.name} · {expert.name} · {date} {time}</p>
                <label><input type="radio" checked={!isMember} onChange={() => setIsMember(false)} /> Guest (20% fee)</label>
                <label><input type="radio" checked={isMember} onChange={() => setIsMember(true)} /> Member (no fee)</label>
                <button className="btn solid">Confirm Booking</button>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn ghost" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</button>
              <button className="btn solid" disabled={step === 4 || !canNext} onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</button>
            </div>
          </section>
          {step >= 2 && (
            <aside className="mini-card summary">
              <h3>Summary</h3>
              <p>Service: {service.name}</p>
              <p>Expert: {expert.name}</p>
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <hr />
              <p>Service: ${service.price}</p>
              <p>Fee: ${fee}</p>
              <p><strong>Total: ${total}</strong></p>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}

function GridSelect({ items, value, onChange }: { items: Array<{ id: string; line1: string; line2: string }>; value: string; onChange: (id: string) => void }) {
  return (
    <div className="cards-3">
      {items.map((it) => (
        <button key={it.id} className={`pick ${value === it.id ? "on" : ""}`} onClick={() => onChange(it.id)}>
          <strong>{it.line1}</strong>
          <span>{it.line2}</span>
        </button>
      ))}
    </div>
  );
}
