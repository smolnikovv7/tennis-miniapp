export default async function handler(req, res) {
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString('utf8');

    res.status(200).json({
      ok: true,
      note: "esm debug echo",
      env_has_token: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      method: req.method,
      raw
    });
  } catch (e) {
    res.status(500).json({ ok:false, error:String(e) });
  }
}
