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

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  active: boolean;
  createdAt: string;
};

type DB = {
  users: User[];
  bookings: Booking[];
  giftOrders: GiftCardOrder[];
  testimonials: Testimonial[];
};

const g = globalThis as unknown as { __wuxingDB?: DB };

if (!g.__wuxingDB) {
  g.__wuxingDB = {
    users: [{ id: "u1", name: "Wayne", email: "demo@wuxingspa.com", password: "demo1234" }],
    bookings: [],
    giftOrders: [],
    testimonials: [
      {
        id: "t1",
        name: "Sophia L.",
        role: "Downtown Client",
        text: "Booking was incredibly smooth. The therapist arrived on time, and the acupressure session felt professional and deeply restorative.",
        rating: 5,
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "t2",
        name: "Daniel W.",
        role: "Gift Card Buyer",
        text: "I purchased a gift card for my parents in minutes. Clean flow, clear pricing, and they loved the treatment quality.",
        rating: 5,
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "t3",
        name: "Emily Z.",
        role: "Weekly Member",
        text: "The platform makes it easy to find nearby therapists and reserve fast. This is exactly the Uber-like spa booking experience I wanted.",
        rating: 5,
        active: true,
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

export const db = g.__wuxingDB;
export const newId = (p: string) => `${p}_${Math.random().toString(36).slice(2, 10)}`;
