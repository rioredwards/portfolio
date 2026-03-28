## [LRN-20260328-001] best_practice

**Logged**: 2026-03-28T15:30:00-07:00
**Priority**: medium
**Status**: resolved
**Area**: tests

### Summary

Use a direct Playwright probe to verify intercepted-route behavior when browser CLI output is ambiguous.

### Details

While debugging the RioBot standalone route, `agent-browser` was inconsistent about showing whether the homepage FAB click had triggered the intercepted modal route or the full standalone page. A short Playwright script immediately confirmed the actual behavior: the soft navigation changed the URL to `/riobot` but still rendered the modal variant, which hid the full-page chat options menu. That gave a clean root cause faster than continuing to infer from snapshots.

### Suggested Action

When debugging Next.js parallel routes or intercepted modal flows, use Playwright to assert both URL and rendered UI state together before changing component logic.

### Metadata

- Source: error
- Related Files: components/interview-bot/InterviewBot.tsx, app/@modal/(.)riobot/page.tsx, app/riobot/page.tsx
- Tags: nextjs, parallel-routes, intercepted-routes, playwright, riobot

---
