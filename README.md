# WinBig

Watch-ads-earn-naira site. Single-file front end (`index.html`), Supabase backend.

## What's already wired up
- **Supabase project**: `ysztokoesjurgkeiooui` (URL + anon key already in `index.html`)
- **Tables**: `profiles`, `ad_views`, `withdrawals`, `app_settings`, `game_sessions` (RLS enabled)
- **Earn mechanic: Play a game for N minutes.** No ad network verifies this for a plain website, so it's enforced with our own server-side timing: `start_game_session()` records when a session begins, `complete_game_session()` (both Postgres functions, callable via `sb.rpc`) only pays out once real wall-clock time ≥ the target has passed. This is a heuristic, not proof of engagement — someone determined could still get around it — but it can't be beaten by simply calling the "claim" function instantly.
- Two earlier approaches were tried and abandoned for this site (Monetag popunder — kept hijacking every click; CPAGrip offer wall — worked, but you wanted custom play-based tasks instead of a preset offer catalog). Both the `monetag-postback` and `cpagrip-postback` Edge Functions are still deployed but unused — safe to delete later.
- **Front end**: auth (phone + password), Earn tab, Play tab (game + session timer), Dashboard, Withdraw request form.

## What you still need to do manually

### 1. Add a real game
Sign up as a publisher at **gamedistribution.com**, grab an embed link for a game from their catalog (legally licensed for third-party embedding — do NOT hotlink games from itch.io or CrazyGames directly, most don't allow that), and paste the URL into `GAME_EMBED_URL` in `index.html`.

### 2. Add the banner ad
In Monetag, create an **In-Page Push (Banner)** or **Vignette Banner** tag (ambient, no click required — unlike the popunder we removed). Paste the script tag into `GAME_BANNER_TAG` in `index.html`.

### 3. Paystack (withdrawals)
Not wired yet — withdrawal requests currently just land in the `withdrawals` table as `pending` for manual payout.

### 4. Tune the payout rate
`app_settings` controls the economics: `game_session_target_seconds` (how long they must play), `game_session_points` (reward per session), `game_session_daily_cap` (sessions/day per user), `naira_per_point`.

## Deploying
Drag `index.html` into Cloudflare Pages, or connect this repo for auto-deploy on push.
