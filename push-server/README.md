# CurRoute Push Reminder Server

A tiny Cloudflare Worker that sends the "log today's spending" reminder as a
real push notification at the time you set — even if CurRoute is closed or
your phone is locked. It only ever stores a push subscription, a reminder
time, and a UTC offset; it never sees your expense data.

## One-time setup

You need a free Cloudflare account (no credit card required for this).

```bash
cd push-server
npm install

# Log in to Cloudflare (opens a browser window)
npx wrangler login

# Create the KV namespace used to store subscriptions
npx wrangler kv namespace create SUBSCRIPTIONS
```

The last command prints an `id`. Copy it into `wrangler.toml`, replacing
`REPLACE_WITH_KV_NAMESPACE_ID`.

Set the VAPID keys as secrets (the public key below matches the one already
hardcoded in `../index.html` — don't regenerate unless you also update that
file):

```bash
npx wrangler secret put VAPID_PUBLIC_KEY
# paste: BKu9EbwR-RIv6jMi15jWGtvzmy083xOAionsWcHoAyKE_rbe1jTlSl4QruZ01M8DyCczzIP89oba2HtNFm-bAxk

npx wrangler secret put VAPID_PRIVATE_KEY
# paste: 9xvycjLX3vJaCQckVN7aqKAC4vW54vSPHxCQeOd8v7I

npx wrangler secret put VAPID_SUBJECT
# paste: mailto:your-email@example.com
```

## Deploy

```bash
npx wrangler deploy
```

Wrangler prints a URL like `https://curroute-push.<your-subdomain>.workers.dev`.

Copy that URL into `../index.html`, replacing the placeholder:

```js
const PUSH_SERVER_URL = 'https://curroute-push.YOUR-SUBDOMAIN.workers.dev';
```

Commit and redeploy the app (e.g. GitHub Pages). Turn the reminder toggle
off and back on once so the app registers a fresh push subscription against
the new server.

## How it works

- `POST /subscribe` — the app calls this when you enable the reminder or
  change the time. Stores `{ subscription, reminderTime, tzOffsetMinutes }`
  in Workers KV, keyed by a hash of the push subscription's endpoint.
- `POST /logged` — the app calls this right after you log an expense for
  today, so the reminder is skipped that day.
- `POST /unsubscribe` — called when you turn the reminder off.
- A Cron Trigger runs the `scheduled` handler every minute, checks every
  stored subscription's local time against its reminder time, and sends a
  push via the `web-push` library (VAPID-signed) if it matches and hasn't
  already fired today.

## Known limitations

- The reminder time's timezone offset is captured whenever you toggle the
  reminder or change the time — if you travel across timezones without
  reopening those settings, the reminder may fire at the old local time
  until you do.
- If Apple/browser rotates your push subscription in the background, this
  app doesn't currently detect and re-register it automatically
  (`pushsubscriptionchange`) — if reminders silently stop after a long time,
  toggling the reminder off and on again re-subscribes.
