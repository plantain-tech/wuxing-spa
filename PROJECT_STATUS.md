# Wuxing Spa — Project Status

Last updated: 2026-02-16 (America/New_York)
Project repo: https://github.com/plantain-tech/wuxing-spa
Live URL: https://wuxing-spa.plantain-tech.workers.dev

## Current Milestone
M3.5 — UX polish + dynamic testimonials (editable in admin)

## Completed
- Cloudflare deploy pipeline working (OpenNext + Workers)
- Homepage redesign (Warm Earth style)
- Sticky/floating nav + scroll transition behavior
- Hero typography/layout refinements
- Dynamic testimonial section (auto-rotating)
- Admin testimonial management
  - add / enable-disable / delete
- Basic auth pages + APIs
- Booking flow skeleton + gift card flow skeleton

## In Progress / Next Up
1. Persistent database (D1 or Supabase) instead of in-memory store
2. Real booking persistence + status updates in admin
3. Location-based matching logic (therapist/customer proximity)
4. Payment integration (booking fee + gift card checkout)

## Known Constraints
- Current runtime data store is in-memory; not durable across cold restarts.
- Testimonials/booking APIs are functional but not yet DB-backed.

## Quick Resume Commands
```bash
cd ~/projects/wuxing-spa
git pull
npm run dev
# or deploy
npm run deploy
```

## “Resume Prompt” for future sessions
Use this exact line:

> Continue Wuxing Spa from PROJECT_STATUS.md and latest main branch; prioritize persistent DB + location-based booking.
