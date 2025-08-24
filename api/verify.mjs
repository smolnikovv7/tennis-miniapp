import crypto from "crypto";

export const config = { runtime: "nodejs20.x" }; // важно

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8") || "{}";
  try { return JSON.parse(raw); } catch { return { __raw: raw }; }
}

function verifyTelegramInitData(initData, botToken) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    if (!hash) return { ok:false, reason:"NO_HASH" };

    params.delete("hash");
    const dataCheckString = Array.from(params.entries())
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("\n");

    const secretKey = crypto.createHash("sha256").update(botToken).digest();
    const computed = crypto.createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    let user = null;
    const userStr = params.get("user");
    if (userStr) { try { user = JSON.parse(userStr); } catch {} }

    return { ok: computed === hash, user };
  } catch (e) {
    return { ok:false, reason:"VERIFY_EXCEPTION", error:String(e) };
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok:false, error:"METHOD_NOT_ALLOWED" });
    }

    const body = await readJsonBody(req);
    const initData = String(body?.initData || "");
    if (!initData) return res.status(400).json({ ok:false, error:"NO_INITDATA" });

    const token = process.env.TELEGRAM_BOT_TOKEN || "";
    if (!token) return res.status(500).json({ ok:false, error:"NO_BOT_TOKEN" });

    const r = verifyTelegramInitData(initData, token);
    return res.status(200).json({
      ok: r.ok,
      user: r.user || null,
      reason: r.ok ? null : (r.reason || "BAD_HASH")
    });
  } catch (e) {
    return res.status(500).json({ ok:false, error:"SERVER_ERROR", details:String(e) });
  }
}
