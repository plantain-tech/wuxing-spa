import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const idx = db.testimonials.findIndex((t) => t.id === id);
  if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.testimonials[idx] = { ...db.testimonials[idx], ...body, id };
  return NextResponse.json({ ok: true, item: db.testimonials[idx] });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = db.testimonials.findIndex((t) => t.id === id);
  if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [removed] = db.testimonials.splice(idx, 1);
  return NextResponse.json({ ok: true, removed });
}
