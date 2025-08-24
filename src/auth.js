export async function verifyTelegramUser() {
  const initData = window.Telegram?.WebApp?.initData || '';
  if (!initData) return { ok:false, error:'NO_INITDATA' };

  let resp;
  try {
    resp = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData })
    });
  } catch (e) {
    return { ok:false, fetch_error: String(e) };
  }

  const text = await resp.text();         // читаем как текст
  let json = null;
  try { json = JSON.parse(text); } catch (_) {}

  return {
    ok: json?.ok ?? false,
    status: resp.status,
    json,
    text
  };
}
