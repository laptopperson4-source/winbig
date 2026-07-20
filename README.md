# WinBig

Watch-ads-earn-naira site. Single-file front end (`index.html`), Supabase backend.

## What's already wired up
- **Supabase project**: `ysztokoesjurgkeiooui` (URL + anon key already in `index.html`)
- **Tables**: `profiles`, `ad_views`, `withdrawals`, `app_settings` (RLS enabled — see migration `winbig_init_schema`)
- **Edge Function**: `monetag-postback` — deployed, receives Monetag's server-to-server postback and credits points. This is deliberately the *only* way points get credited (never trust the client) so ad views can't be faked from devtools.
- **Front end**: auth (phone + password), Earn tab with watch-ad button, alert-feed styled activity log, Tasks, Dashboard, Withdraw request form.

## What you still need to do manually

### 1. Add your Monetag zone ID
In `index.html`, replace:
```js
const MONETAG_ZONE_ID = "REPLACE_WITH_YOUR_MONETAG_ZONE_ID";
```
with your real zone ID from the Monetag dashboard, and add Monetag's SDK script tag to `<head>` (they give you an exact `<script>` snippet per zone — paste it in).

### 2. Set the postback secret
The Edge Function checks a shared secret so random people can't hit the postback URL and credit themselves free points. Set it in **Supabase Dashboard → Edge Functions → monetag-postback → Secrets**:
```
MONETAG_POSTBACK_SECRET=<pick a long random string>
```
Then in your **Monetag dashboard**, set the postback URL to:
```
https://ysztokoesjurgkeiooui.supabase.co/functions/v1/monetag-postback?user_id={ymid}&request_id={click_id}&secret=<the same string>
```
(Exact placeholder syntax for user id / click id depends on Monetag's postback macro names — check their rewarded-ads postback docs and match them up.)

### 3. Paystack (withdrawals)
Not wired yet — withdrawal requests currently just land in the `withdrawals` table as `pending` for manual payout. Once you have a Paystack business account, we'll add a Transfers API call (as a Supabase Edge Function using the secret key, never client-side) to automate payouts.

### 4. Tune the payout rate
`app_settings` table controls economics — change `points_per_ad` / `naira_per_point` there once you have real eCPM data from Monetag, rather than editing code.

## Deploying
Drag `index.html` into Cloudflare Pages, or connect this repo for auto-deploy on push.
