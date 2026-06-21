# Telegram lead delivery — setup

Every "Request service" button (nav, hero, CTA) and the three pricing cards open a
form (phone required; name, email, description, up to 4 photos optional). On submit
the data is sent to **`/api/lead`** (a Vercel serverless function), which forwards it
to Telegram via the Bot API. The bot token lives only on the server.

It works the moment two environment variables are set. Until then the form shows a
friendly "please call us" message.

---

## 1. Create the bot (get `TELEGRAM_BOT_TOKEN`)

1. In Telegram, open **@BotFather**.
2. Send `/newbot`, follow the prompts (name + username).
3. BotFather replies with a token like `123456789:AAExample...`. That's `TELEGRAM_BOT_TOKEN`.

## 2. Choose where requests land (get `TELEGRAM_CHAT_ID`)

Pick one:

**A) Dedicated group (recommended — consolidated, can add your team later)**
1. Create a Telegram group, add your new bot to it.
2. In @BotFather send `/setprivacy` → select your bot → **Disable** (so the bot can read group messages).
3. Send any message in the group.
4. Open this URL in a browser (replace `<TOKEN>`):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. Find `"chat":{"id":-100...}`. That negative number is `TELEGRAM_CHAT_ID`.

**B) Your personal chat (simplest)**
1. Open your bot and press **Start** (send any message).
2. Open `https://api.telegram.org/bot<TOKEN>/getUpdates`.
3. Find `"chat":{"id":123456789}` — that positive number is `TELEGRAM_CHAT_ID`.

**C) Private channel**
1. Create a channel, add the bot as **admin**.
2. Post a message, then check `getUpdates` (or use the channel `@username`) to get the id (`-100...`).

## 3. Test locally

```bash
cp .env.example .env.local
# edit .env.local and paste both values
pnpm dev
```
Open http://localhost:3000, click any "Request service", submit — the message should
appear in your chosen Telegram chat.

## 4. Set them on Vercel (production)

Vercel → your Project → **Settings → Environment Variables**, add both for
**Production** (and Preview/Development if you want them there too):

| Name | Value |
|------|-------|
| `TELEGRAM_BOT_TOKEN` | `123456789:AAExample...` |
| `TELEGRAM_CHAT_ID`   | `-1001234567890` (or your personal id) |

Then **redeploy** (Deployments → ⋯ → Redeploy) so the new env vars are picked up.

---

## Notes
- The token is read only in `app/api/lead/route.ts` (server side) and is never sent
  to the browser. Don't prefix it with `NEXT_PUBLIC_`.
- Photos are downscaled in the browser (long edge ≤1280px, JPEG ~0.7) before upload,
  so a phone photo (~3-5 MB) becomes ~200-400 KB — well under Vercel's request limit.
- Basic spam protection: a hidden honeypot field. You can later add rate-limiting
  (e.g. Vercel KV / Upstash) if you get bot spam.
- To change the destination later, just edit `TELEGRAM_CHAT_ID` and redeploy.
