import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { tg, applyTheme } from "./tg";

function Home() {
  const nav = useNavigate();
  useEffect(() => {
    tg?.ready(); tg?.expand(); applyTheme();
    tg?.MainButton.setText("Найти партнёра");
    tg?.MainButton.show();
    const onClick = () => nav("/players");
    tg?.MainButton.onClick(onClick);
    return () => { tg?.MainButton.offClick(onClick); tg?.MainButton.hide(); };
  }, [nav]);
  return (
    <div className="page">
      <h1>Теннисный клуб Москвы</h1>
      <p>Поиск партнёров и бронь кортов внутри Telegram.</p>
    </div>
  );
}

function useBackButton() {
  useEffect(() => {
    tg?.BackButton.show();
    const back = () => window.history.back();
    tg?.BackButton.onClick(back);
    return () => { tg?.BackButton.offClick(back); tg?.BackButton.hide(); };
  }, []);
}

function Players(){ useBackButton(); return <div className="page"><h2>Игроки</h2></div>; }
function Courts(){ useBackButton(); return <div className="page"><h2>Корты</h2></div>; }
function Matches(){ useBackButton(); return <div className="page"><h2>Матчи</h2></div>; }
function Profile(){ useBackButton(); return <div className="page"><h2>Профиль</h2></div>; }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/players" element={<Players/>}/>
        <Route path="/courts" element={<Courts/>}/>
        <Route path="/matches" element={<Matches/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}
