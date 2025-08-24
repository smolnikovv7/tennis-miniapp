import DebugVerify from './components/DebugVerify.jsx';

export default function App() {
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
        onClick={() => alert('Тут будет поиск партнёра')}
      >
        Найти партнёра
      </button>
    </div>
  );
}
