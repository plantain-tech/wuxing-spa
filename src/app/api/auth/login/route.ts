import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = db.users.find((u) => u.email === email && u.password === password);
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const res = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
  res.cookies.set("wuxing_user", JSON.stringify({ id: user.id, name: user.name, email: user.email }), { httpOnly: false, path: "/" });
  return res;
}
