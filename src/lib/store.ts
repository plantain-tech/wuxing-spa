export type User = { id: string; name: string; email: string; password: string };
export type Booking = {
  id: string;
  service: string;
  expert: string;
  date: string;
  time: string;
  customerEmail: string;
  status: "pending" | "confirmed" | "cancelled";
};

export type GiftCardOrder = {
  id: string;
  email: string;
  total: number;
  codes: string[];
  createdAt: string;
};

type DB = { users: User[]; bookings: Booking[]; giftOrders: GiftCardOrder[] };

const g = globalThis as unknown as { __wuxingDB?: DB };

if (!g.__wuxingDB) {
  g.__wuxingDB = {
    users: [{ id: "u1", name: "Wayne", email: "demo@wuxingspa.com", password: "demo1234" }],
    bookings: [],
    giftOrders: [],
  };
}

export const db = g.__wuxingDB;
export const newId = (p: string) => `${p}_${Math.random().toString(36).slice(2, 10)}`;
