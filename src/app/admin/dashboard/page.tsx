async function getBookings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/bookings`, { cache: "no-store" }).catch(() => null);
  if (!res?.ok) return [];
  return res.json();
}

export default async function AdminDashboard() {
  const bookings: Array<{ id: string; service: string; expert: string; date: string; time: string; customerEmail: string; status: string }> = await getBookings();

  return (
    <main className="container section" style={{ paddingTop: 110 }}>
      <h1>Admin Dashboard</h1>
      <p>Bookings CRUD (phase-3 baseline)</p>

      <div className="card pad" style={{ marginTop: 16, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">ID</th><th align="left">Service</th><th align="left">Expert</th><th align="left">Date</th><th align="left">Time</th><th align="left">Customer</th><th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={7}>No bookings yet.</td></tr>
            ) : bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td><td>{b.service}</td><td>{b.expert}</td><td>{b.date}</td><td>{b.time}</td><td>{b.customerEmail}</td><td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
