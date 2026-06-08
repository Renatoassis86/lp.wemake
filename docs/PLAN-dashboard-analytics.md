# PLAN: Dashboard Analytics & Real-Time API Integration (Phase 3)

## Overview
We need to connect the Next.js admin analytics dashboard to real metrics from Supabase, Google Analytics, and Meta Marketing APIs. Currently, the analytics dashboard uses simulated mock data.

## Tasks

- [x] Task 1: Refactor `components/GoogleAnalytics.tsx` and `components/MetaPixel.tsx` to read tracking IDs from environment variables, falling back to current values.
  - **Agent**: `frontend-specialist`
  - **Verify**: Inspect files, check env variables `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_FB_PIXEL_ID` exist.
- [x] Task 2: Modify `app/api/diagnostico/lead/route.ts` and `app/api/diagnostico/maturidade/route.ts` to read UTM cookies and save them to `observacoes` in Supabase.
  - **Agent**: `backend-specialist`
  - **Verify**: Post lead request with cookies, verify UTM parameters exist in database row.
- [x] Task 3: Create `app/api/metrics/route.ts` to aggregate real Supabase data and integrate with Meta Ads Spend / GA Sessions (with simulated fallbacks if API keys are missing).
  - **Agent**: `backend-specialist`
  - **Verify**: Curl endpoint `/api/metrics` and check JSON payload format.
- [x] Task 4: Modify `app/admin/analytics/page.tsx` to fetch data from `/api/metrics`, handle loading/errors, and display integration configuration status.
  - **Agent**: `frontend-specialist`
  - **Verify**: Open `/admin/analytics` in browser, verify data is dynamic and falls back gracefully.

## Done When
- [x] Analytics dashboard loads real data from Supabase for Lead counts, Daily conversions, and UTM campaign lists.
- [x] GA4/Meta metrics show live values if credentials are provided, or fall back to robust estimates if not, showing a fallback banner.
- [x] Diagnostic leads successfully capture UTM campaign details in Supabase database.
- [x] Code builds without errors (`npm run build`) and linting passes (`npm run lint`).

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-06-04
