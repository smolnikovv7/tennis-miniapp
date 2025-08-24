import { verifyTelegramUser } from './auth.js';
import DebugVerify from './components/DebugVerify.jsx';

export default function App() {
  async function handleTest() {
    try {
      const res = await verifyTelegramUser();
      // Покажем результат в alert, чтобы точно увидеть вывод
      (window.Telegram?.WebApp?.showAlert || alert)(JSON.stringify(res, null, 2));
    } catch (e) {
      (window.Telegram?.WebApp?.showAlert || alert)('ERR: ' + String(e));
    }
  }

  return (
    <div className="page">
      <h1>Теннисный Клуб Москвы</h1>
      <p>Поиск партнёров и бронь кортов внутри Telegram.</p>

      {/* Временная панель для проверки initData */}
      <DebugVerify />

      <button
        style={{
          width:'100%', marginTop:24, padding:'14px 16px',
          borderRadius:12, border:'none', fontSize:16,
          background:'#2481cc', color:'#fff'
        }}
        onClick={handleTest}
      >
        Найти партнёра v2
      </button>
    </div>
  );
}
