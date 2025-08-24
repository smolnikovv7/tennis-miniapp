module.exports = async (req, res) => {
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString('utf8');

    return res.status(200).json({
      ok: true,
      note: "debug echo",
      env_has_token: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      method: req.method,
      raw
    });
  } catch (e) {
    return res.status(500).json({ ok:false, error:String(e) });
  }
};
