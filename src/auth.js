export async function verifyTelegramUser() {
  const initData = window.Telegram?.WebApp?.initData || '';
  if (!initData) return { ok:false, error:'NO_INITDATA' };
  const r = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ initData })
  });
  return r.json();
}
