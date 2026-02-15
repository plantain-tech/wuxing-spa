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
    <main className="container section" style={{ paddingTop: 110, maxWidth: 500 }}>
      <h1>Register</h1>
      <div className="card pad" style={{ display: "grid", gap: 10 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn" onClick={submit}>Create account</button>
        {msg && <p>{msg}</p>}
      </div>
    </main>
  );
}
