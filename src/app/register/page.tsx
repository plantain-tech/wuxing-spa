"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    const data = await res.json();
    setMsg(res.ok ? "Registered. Please login." : data.error || "Register failed");
  }

  return (
    <main className="site-shell">
      <section className="frame white-panel section-block auth-shell" style={{ marginTop: 28 }}>
        <h1>Create Account</h1>
        <div className="mini-card" style={{ padding: 20 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          <button className="btn solid" onClick={submit}>Create account</button>
          {msg && <p>{msg}</p>}
        </div>
      </section>
    </main>
  );
}
