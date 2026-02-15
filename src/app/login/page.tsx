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
    <main className="container section" style={{ paddingTop: 110, maxWidth: 500 }}>
      <h1>Login</h1>
      <div className="card pad" style={{ display: "grid", gap: 10 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn" onClick={submit}>Sign in</button>
        <a href="/register">No account? Register</a>
        {msg && <p>{msg}</p>}
      </div>
    </main>
  );
}
