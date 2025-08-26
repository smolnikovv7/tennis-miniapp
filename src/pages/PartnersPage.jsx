// src/pages/PartnersPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Search, Filter, MapPin, Users, Trophy, Star } from "lucide-react";
import "./partners.css";

const levelDisplay = {
  beginner: "Начинающий",
  intermediate: "Средний",
  advanced: "Продвинутый",
};

async function fetchUsersStub() {
  return [
    { id: 1, full_name: "Иван Смирнов", playing_level: "intermediate", favorite_area: "ЦАО", rating: 1250, photo_url: "" },
    { id: 2, full_name: "Анна Петрова", playing_level: "beginner",     favorite_area: "САО",  rating: 1180, photo_url: "" },
    { id: 3, full_name: "Максим Орлов", playing_level: "advanced",      favorite_area: "ЮЗАО", rating: 1360, photo_url: "" },
  ];
}

function createPageUrl(path) {
  return `/${path}`;
}

export default function PartnersPage() {
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [level, setLevel] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // фон только на этой странице
  useEffect(() => {
    document.body.classList.add("players-body");
    return () => document.body.classList.remove("players-body");
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const all = await fetchUsersStub();
      setPlayers(all);
      setFiltered(all);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    let r = players;
    if (level !== "all") r = r.filter(p => p.playing_level === level);
    if (q) {
      const s = q.toLowerCase();
      r = r.filter(p =>
        p.full_name.toLowerCase().includes(s) ||
        (p.favorite_area && p.favorite_area.toLowerCase().includes(s))
      );
    }
    setFiltered(r);
  }, [players, level, q]);

  return (
    <div className="players-page">
      <section className="players-hero">
        <div className="players-ring" />
        <div className="players-ring2" />
        <h1 className="players-title">Найти партнёра</h1>
        <p className="players-lead">Выберите игрока по уровню и району</p>
      </section>

      <div className="players-filter neo-surface">
        <div className="players-filter-row">
          <div className="players-search">
            <Search className="players-search-icon" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Поиск по имени или району…"
              className="players-input"
            />
          </div>

          <div className="players-select">
            <Filter className="players-select-icon" />
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="players-select-trigger"
            >
              <option value="all">Все уровни</option>
              <option value="beginner">Начинающий</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </div>
        </div>
      </div>

      <div className="players-stats">
        <Stat icon={<Users />} value="150+" label="Игроков" />
        <Stat icon={<MapPin />} value="25+" label="Кортов" />
        <Stat icon={<Trophy />} value="300+" label="Матчей" />
      </div>

      <div className="players-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <PlayerSkeleton key={i} />)
          : filtered.map((p) => <PlayerCard key={p.id} player={p} />)}
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="players-stat neo-surface">
      <div className="players-stat-icon">{icon}</div>
      <div className="players-stat-value">{value}</div>
      <div className="players-stat-label">{label}</div>
    </div>
  );
}

function PlayerCard({ player }) {
  const badgeClass =
    player.playing_level === "beginner"
      ? "players-badge players-beginner"
      : player.playing_level === "intermediate"
      ? "players-badge players-intermediate"
      : "players-badge players-advanced";

  return (
    <div className="players-card neo-surface">
      <div className="players-card-body">
        <div className="players-avatar-wrap">
          <div className="players-avatar">
            {/* можно подставить <img src=... /> при наличии photo_url */}
          </div>
          <div className="players-star">
            <Star className="players-star-icon" />
          </div>
        </div>

        <h3 className="players-name">{player.full_name}</h3>
        <p className="players-rating">Рейтинг: {player.rating || 1200}</p>

        <div className={badgeClass}>
          {levelDisplay[player.playing_level] || "—"}
        </div>

        <p className="players-area">{player.favorite_area || "Любой район"}</p>

        <Link to={createPageUrl(`Matches?opponent_id=${player.id}`)} className="players-full">
          <button className="players-action">
            <MessageCircle className="players-action-icon" />
            Предложить матч
          </button>
        </Link>
      </div>
    </div>
  );
}

function PlayerSkeleton() {
  return (
    <div className="players-card neo-surface">
      <div className="players-card-body">
        <div className="players-skel-circle"></div>
        <div className="players-skel-line w75"></div>
        <div className="players-skel-line w35"></div>
        <div className="players-skel-pill"></div>
        <div className="players-skel-btn"></div>
      </div>
    </div>
  );
}
