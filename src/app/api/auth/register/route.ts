import { NextRequest, NextResponse } from "next/server";
import { db, newId } from "@/lib/store";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (db.users.find((u) => u.email === email)) return NextResponse.json({ error: "Email exists" }, { status: 409 });
  const user = { id: newId("u"), name, email, password };
  db.users.push(user);
  return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
}
