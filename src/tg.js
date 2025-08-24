export const tg = window.Telegram ? window.Telegram.WebApp : null;

export function applyTheme() {
  if (!tg?.themeParams) return;
  const tp = tg.themeParams;
  const set = (k,v)=>document.documentElement.style.setProperty(k,v);
  set('--bg', tp.bg_color || '#ffffff');
  set('--text', tp.text_color || '#111111');
  set('--button', tp.button_color || '#2481cc');
  set('--button-text', tp.button_text_color || '#ffffff');
}
