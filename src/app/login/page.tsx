"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@wuxingspa.com");
  const [password, setPassword] = useState("demo1234");
  const [msg, setMsg] = useState("");

  async function submit() {
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    setMsg(res.ok ? `Welcome ${data.user.name}` : data.error || "Login failed");
  }

  return (
    <main className="site-shell">
      <section className="frame white-panel section-block auth-shell" style={{ marginTop: 28 }}>
        <h1>Welcome Back</h1>
        <div className="mini-card" style={{ padding: 20 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          <button className="btn solid" onClick={submit}>Sign in</button>
          <a href="/register">No account? Register</a>
          {msg && <p>{msg}</p>}
        </div>
      </section>
    </main>
  );
}
