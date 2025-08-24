const crypto = require('crypto');

function check(initData, botToken, maxAgeSec = 3600) {
  if (!initData || !botToken) return { ok:false, error:'NO_DATA_OR_TOKEN' };
  const url = new URLSearchParams(initData);
  const hash = url.get('hash');
  if (!hash) return { ok:false, error:'NO_HASH' };
  url.delete('hash');

  const pairs = [];
  for (const [k,v] of url.entries()) pairs.push(`${k}=${v}`);
  pairs.sort();
  const dataCheckString = pairs.join('\n');

  const secretKey = crypto.createHmac('sha256','WebAppData').update(botToken).digest();
  const calcHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  if (calcHash !== hash) return { ok:false, error:'BAD_HASH' };

  const authDate = Number(url.get('auth_date')) || 0;
  if (!authDate || (Date.now()/1000|0) - authDate > maxAgeSec) return { ok:false, error:'EXPIRED' };

  let user=null; try { user = JSON.parse(url.get('user')||'{}'); } catch {}
  return { ok:true, user };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
  const { initData } = req.body || {};
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const result = check(initData, botToken);
  res.status(result.ok ? 200 : 401).json(result);
};
