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
    { id: 1, full_name: "Валерий Мартишев", playing_level: "intermediate", favorite_area: "ЦАО", rating: 1250, photo_url: "data:image/jpeg;base64,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" },
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
