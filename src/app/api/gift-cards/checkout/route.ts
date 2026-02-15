import { NextRequest, NextResponse } from "next/server";
import { db, newId } from "@/lib/store";

function code() {
  return `WX-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  const { email, amounts } = await req.json();
  if (!email || !Array.isArray(amounts) || amounts.length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const total = amounts.reduce((a: number, b: number) => a + Number(b || 0), 0);
  const order = {
    id: newId("g"),
    email,
    total,
    codes: amounts.map(() => code()),
    createdAt: new Date().toISOString(),
  };
  db.giftOrders.push(order);
  return NextResponse.json({ ok: true, order });
}
