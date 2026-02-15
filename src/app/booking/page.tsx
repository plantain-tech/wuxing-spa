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
  const [serviceId, setServiceId] = useState<string>(services[0].id);
  const [expertId, setExpertId] = useState<string>(experts[0].id);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string>(slots[0]);
  const [isMember, setIsMember] = useState(false);

  const service = services.find((s) => s.id === serviceId)!;
  const expert = experts.find((e) => e.id === expertId)!;
  const fee = isMember ? 0 : +(service.price * 0.2).toFixed(2);
  const total = +(service.price + fee).toFixed(2);

  const canNext = useMemo(() => {
    if (step === 1) return !!serviceId;
    if (step === 2) return !!expertId;
    if (step === 3) return !!date && !!time;
    return true;
  }, [step, serviceId, expertId, date, time]);

  return (
    <main className="container section booking-shell">
      <h1>Booking</h1>
      <div className="progress">{["Service", "Expert", "Date & Time", "Confirm"].map((s, i) => <span key={s} className={step === i + 1 ? "active" : ""}>{i + 1}. {s}</span>)}</div>

      <div className="booking-layout">
        <section className="card pad">
          {step === 1 && (
            <div>
              <h2>Select Service</h2>
              <div className="grid cards">
                {services.map((s) => (
                  <button key={s.id} className={`pick ${serviceId === s.id ? "on" : ""}`} onClick={() => setServiceId(s.id)}>
                    <strong>{s.name}</strong>
                    <span>{s.duration} min</span>
                    <span>${s.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Select Expert</h2>
              <div className="grid experts">
                {experts.map((e) => (
                  <button key={e.id} className={`pick ${expertId === e.id ? "on" : ""}`} onClick={() => setExpertId(e.id)}>
                    <strong>{e.name}</strong>
                    <span>{e.specialty}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Select Date & Time</h2>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <div className="grid cards">
                  {slots.map((s) => (
                    <button key={s} className={`pick ${time === s ? "on" : ""}`} onClick={() => setTime(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2>Confirmation</h2>
              <p>{service.name} with {expert.name} on {date} at {time}</p>
              <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
                <label><input type="radio" checked={!isMember} onChange={() => setIsMember(false)} /> Guest checkout (20% booking fee)</label>
                <label><input type="radio" checked={isMember} onChange={() => setIsMember(true)} /> Member checkout (no fee)</label>
              </div>
              <button className="btn" style={{ marginTop: 16 }}>Confirm Booking</button>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button className="ghost" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</button>
            <button className="btn" disabled={step === 4 || !canNext} onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</button>
          </div>
        </section>

        {step >= 2 && (
          <aside className="card pad summary">
            <h3>Booking Summary</h3>
            <p><strong>Service:</strong> {service.name}</p>
            <p><strong>Expert:</strong> {expert.name}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <hr />
            <p><strong>Service:</strong> ${service.price}</p>
            <p><strong>Fee:</strong> ${fee}</p>
            <p><strong>Total:</strong> ${total}</p>
          </aside>
        )}
      </div>
    </main>
  );
}
