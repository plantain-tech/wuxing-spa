# Wuxing Spa — Tracking Plan

## 1) GitHub Milestone Structure
Create these milestones:
- M1 Foundation & Deploy
- M2 Brand + UX System
- M3 Core Flows (Booking/Gift/Auth)
- M4 Data Persistence & Admin Operations
- M5 Location Intelligence + Payments
- M6 Launch Hardening

## 2) Suggested GitHub Labels
- type:feature
- type:bug
- type:chore
- area:frontend
- area:backend
- area:deploy
- area:ux
- priority:p0
- priority:p1
- priority:p2

## 3) Initial Issue Backlog (copy into GitHub Issues)
1. Persist testimonials in D1 (replace in-memory store)
2. Persist bookings in D1
3. Admin can update booking status (confirm/cancel/completed)
4. Implement location model (customer + therapist coordinates)
5. Add nearest-therapist matching endpoint
6. Integrate Stripe for booking fee and gift cards
7. Add role-based auth guard for admin routes
8. Add audit log for admin edits
9. Add responsive QA pass (mobile/tablet)
10. Add lighthouse + accessibility pass

## 4) Weekly Review Rhythm
- Every Monday: review status, close done issues, pick top 3 for week.
- End of week: update PROJECT_STATUS.md + release notes.

## 5) Operating Rule
If chat context is long/noisy, treat PROJECT_STATUS.md as source of truth.
