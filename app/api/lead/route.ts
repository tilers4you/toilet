// Lead intake endpoint. Receives a request from the on-site form and delivers
// it to Telegram via the Bot API. Runs as a Vercel serverless function.
//
// Required environment variables (set them in Vercel → Project → Settings →
// Environment Variables, and in .env.local for local testing):
//   TELEGRAM_BOT_TOKEN  — token from @BotFather, e.g. 123456:AA...
//   TELEGRAM_CHAT_ID    — destination chat id (a group/channel id like -1001234567890,
//                          or your personal chat id). See TELEGRAM_LEADS_SETUP.md.
//
// The token is read on the server only and is never exposed to the browser.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Attachment = {
  url: string; // base64 data URL
  kind?: "photo" | "document"; // photo = inline; document = raw file (e.g. HEIC)
  name?: string;
};

type LeadBody = {
  phone?: string;
  name?: string;
  email?: string;
  description?: string;
  source?: string;
  photos?: Attachment[];
};

const TG = "https://api.telegram.org";

function esc(s: string): string {
  return s.replace(/[<&>]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

export async function POST(req: Request): Promise<Response> {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const phone = (body.phone || "").trim();
  if (phone.length < 5) {
    return Response.json({ ok: false, error: "phone_required" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    // Not wired up yet (no env vars). Make this obvious rather than silently failing.
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    "🚽 <b>New request — Denver Toilet Pros</b>",
    body.source ? `📍 <b>From:</b> ${esc(body.source)}` : "",
    `📞 <b>Phone:</b> ${esc(phone)}`,
    body.name ? `👤 <b>Name:</b> ${esc(body.name.trim())}` : "",
    body.email ? `✉️ <b>Email:</b> ${esc(body.email.trim())}` : "",
    body.description ? `📝 <b>Details:</b>\n${esc(body.description.trim())}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const r = await fetch(`${TG}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error("Telegram sendMessage failed:", detail);
      return Response.json({ ok: false, error: "telegram_error" }, { status: 502 });
    }

    // Optional attachments — sent one by one after the text. Decodable images
    // arrive as "photo" (inline preview); anything else (e.g. iPhone HEIC) is
    // sent as "document" so it still reaches Telegram.
    const photos = Array.isArray(body.photos) ? body.photos.slice(0, 4) : [];
    for (const att of photos) {
      const m = /^data:([^;]+);base64,(.+)$/.exec(att?.url || "");
      if (!m) continue;
      const mime = m[1];
      const buf = Buffer.from(m[2], "base64");
      if (buf.length === 0 || buf.length > 5_000_000) continue;
      const asDoc = att.kind === "document";
      const field = asDoc ? "document" : "photo";
      const filename = att.name || (asDoc ? "photo.heic" : "photo.jpg");
      const fd = new FormData();
      fd.append("chat_id", chatId);
      fd.append(field, new Blob([buf], { type: mime }), filename);
      const endpoint = asDoc ? "sendDocument" : "sendPhoto";
      await fetch(`${TG}/bot${token}/${endpoint}`, { method: "POST", body: fd }).catch(() => {});
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Lead delivery failed:", e);
    return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
