const crypto = require('node:crypto');

// Универсальный парсер тела (Vercel может не всегда прокинуть req.body)
async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8') || '{}';
  try { return JSON.parse(raw); } catch {
    return { __raw: raw };
  }
}

function verifyTelegramInitData(initData, botToken) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return { ok:false, reason:'NO_HASH' };

    params.delete('hash');
    const dataCheckString = Array.from(params.entries())
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const computedHash = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    const valid = computedHash === hash;
    // user приходит как JSON-строка в параметре 'user'
    let user = null;
    const userStr = params.get('user');
    if (userStr) { try { user = JSON.parse(userStr); } catch {} }

    return { ok: valid, user, debug: { hasUser: !!userStr } };
  } catch (e) {
    return { ok:false, reason:'VERIFY_EXCEPTION', error:String(e) };
  }
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
    }

    const body = await readJsonBody(req);
    const initData = String(body?.initData || '');
    if (!initData) {
      return res.status(400).json({ ok:false, error:'NO_INITDATA' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    if (!botToken) {
      // Не падаем, а говорим явно, что токена нет
      return res.status(500).json({ ok:false, error:'NO_BOT_TOKEN' });
    }

    const result = verifyTelegramInitData(initData, botToken);

    // Возвращаем всегда JSON
    return res.status(200).json({
      ok: result.ok,
      user: result.user || null,
      reason: result.ok ? null : (result.reason || 'BAD_HASH')
    });

  } catch (e) {
    console.error('verify api error:', e);
    return res.status(500).json({ ok:false, error:'SERVER_ERROR', details:String(e) });
  }
};
