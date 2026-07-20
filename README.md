# WinBig

Watch-ads-earn-naira site. Single-file front end (`index.html`), Supabase backend.

## What's already wired up
- **Supabase project**: `ysztokoesjurgkeiooui` (URL + anon key already in `index.html`)
- **Tables**: `profiles`, `ad_views`, `withdrawals`, `app_settings` (RLS enabled — see migration `winbig_init_schema`)
- **Ad format: Monetag Onclick (Popunder)**, zone `11353339`. Important: Monetag's self-serve website accounts don't offer a true rewarded-video format with server-verified completion — that only exists for their Telegram Mini App SDK. A regular popunder has no "ad finished" signal at all, so:
  - The tag in `<head>` fires a popunder on the *next click anywhere on the page* (this is how the ad format inherently works, not something we control)
  - Crediting is handled by the `credit_tap_ad()` Postgres function (see migration `winbig_tap_ad_credit_fn`), called via `sb.rpc("credit_tap_ad")` when the "Tap Ad & Earn" button is clicked
  - That function enforces cooldown + daily cap **server-side**, so spam-clicking is capped even without real ad-completion verification. This is weaker than a true rewarded-ads postback, but it's the honest ceiling of what this ad format supports.
- The unused `monetag-postback` Edge Function is still deployed from an earlier plan (real rewarded-video SDK) — harmless to leave, but not part of the current flow. Safe to delete later if you don't plan to also ship this as a Telegram Mini App.
- **Front end**: auth (phone + password), Earn tab with tap-ad button, alert-feed styled activity log, Tasks, Dashboard, Withdraw request form.

## What you still need to do manually

### 1. Paystack (withdrawals)
Not wired yet — withdrawal requests currently just land in the `withdrawals` table as `pending` for manual payout. Once you have a Paystack business account, we'll add a Transfers API call (as a Supabase Edge Function using the secret key, never client-side) to automate payouts.

### 2. Tune the payout rate
`app_settings` table controls economics — change `points_per_ad` / `naira_per_point` there once you have real revenue data from Monetag, rather than editing code.

### 3. Fraud watch
Since ad completion isn't verifiable for this format, keep an eye on `ad_views` for unnaturally fast/regular patterns per user once real traffic starts — that's the main signal something's being gamed.

## Deploying
Drag `index.html` into Cloudflare Pages, or connect this repo for auto-deploy on push.
