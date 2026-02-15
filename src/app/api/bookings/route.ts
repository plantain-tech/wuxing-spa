import { NextRequest, NextResponse } from "next/server";
import { db, newId } from "@/lib/store";

export async function GET() {
  return NextResponse.json(db.bookings);
}

export async function POST(req: NextRequest) {
  const { service, expert, date, time, customerEmail } = await req.json();
  if (!service || !expert || !date || !time || !customerEmail) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const booking = { id: newId("b"), service, expert, date, time, customerEmail, status: "pending" as const };
  db.bookings.push(booking);
  return NextResponse.json({ ok: true, booking });
}
