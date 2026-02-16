import { NextRequest, NextResponse } from "next/server";
import { db, newId } from "@/lib/store";

export async function GET() {
  return NextResponse.json(db.testimonials.filter((t) => t.active));
}

export async function POST(req: NextRequest) {
  const { name, role, text, rating = 5, active = true } = await req.json();
  if (!name || !role || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const item = {
    id: newId("t"),
    name,
    role,
    text,
    rating: Math.max(1, Math.min(5, Number(rating) || 5)),
    active: Boolean(active),
    createdAt: new Date().toISOString(),
  };
  db.testimonials.unshift(item);
  return NextResponse.json({ ok: true, item });
}
