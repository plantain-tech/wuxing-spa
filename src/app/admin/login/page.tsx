export default function AdminLoginPage() {
  return (
    <main style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}>
      <h1>Admin Login</h1>
      <form style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input placeholder="Admin email" type="email" style={{ padding: 10 }} />
        <input placeholder="Password" type="password" style={{ padding: 10 }} />
        <button type="button" style={{ padding: 10 }}>Sign in</button>
      </form>
    </main>
  );
}
