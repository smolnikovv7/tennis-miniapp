// src/pages/PartnersPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Search, Filter, MapPin, Users, Trophy, Star } from "lucide-react";

const levelDisplay = {
  beginner: "Начинающий",
  intermediate: "Средний",
  advanced: "Продвинутый",
};

// Заглушка данных вместо "@/entities/User"
async function fetchUsersStub() {
  return [
    { id: 1, full_name: "Иван Смирнов", playing_level: "intermediate", favorite_area: "ЦАО", rating: 1250, photo_url: "" },
    { id: 2, full_name: "Анна Петрова", playing_level: "beginner",     favorite_area: "САО", rating: 1180, photo_url: "" },
    { id: 3, full_name: "Максим Орлов", playing_level: "advanced",      favorite_area: "ЮЗАО", rating: 1360, photo_url: "" },
  ];
}

// Локальный аналог createPageUrl
function createPageUrl(path) {
  return `/${path}`;
}

export default function PartnersPage() {
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [level, setLevel] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

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
    <div className="players-page" style={{ padding: 16 }}>
      {/* хедер */}
      <section className="players-hero" style={{ marginBottom: 16 }}>
        <h1 className="players-title" style={{ margin: 0 }}>Найти партнёра</h1>
        <p className="players-lead" style={{ marginTop: 8 }}>Выберите игрока по уровню и району</p>
      </section>

      {/* фильтры */}
      <div className="players-filter" style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div className="players-search" style={{ position: "relative", flex: 1 }}>
          <Search className="players-search-icon" style={{ position: "absolute", left: 8, top: 8 }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Поиск по имени или району…"
            className="players-input"
            style={{ width: "100%", padding: "8px 8px 8px 32px" }}
          />
        </div>

        <div className="players-select" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Filter className="players-select-icon" />
          <select
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="players-select-trigger"
            style={{ padding: "8px 12px" }}
          >
            <option value="all">Все уровни</option>
            <option value="beginner">Начинающий</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>
      </div>

      {/* статистика */}
      <div className="players-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        <Stat icon={<Users />} value="150+" label="Игроков" />
        <Stat icon={<MapPin />} value="25+" label="Кортов" />
        <Stat icon={<Trophy />} value="300+" label="Матчей" />
      </div>

      {/* список */}
      <div className="players-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <PlayerSkeleton key={i} />)
          : filtered.map((p) => <PlayerCard key={p.id} player={p} />)}
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="players-stat" style={{ padding: 12, border: "1px solid #eee", borderRadius: 12 }}>
      <div className="players-stat-icon" style={{ marginBottom: 8 }}>{icon}</div>
      <div className="players-stat-value" style={{ fontWeight: 700 }}>{value}</div>
      <div className="players-stat-label" style={{ color: "#666" }}>{label}</div>
    </div>
  );
}

function PlayerCard({ player }) {
  const badge =
    player.playing_level === "beginner"
      ? "Начинающий"
      : player.playing_level === "intermediate"
      ? "Средний"
      : "Продвинутый";

  return (
    <div className="players-card" style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <div className="players-avatar-wrap" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div
          className="players-avatar"
          style={{ width: 48, height: 48, borderRadius: "50%", background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Star />
        </div>
        <div>
          <h3 className="players-name" style={{ margin: 0 }}>{player.full_name}</h3>
          <p className="players-rating" style={{ margin: 0, color: "#666" }}>Рейтинг: {player.rating || 1200}</p>
        </div>
      </div>

      <div className="players-badge" style={{ marginBottom: 8, fontSize: 12, color: "#555" }}>{badge}</div>
      <p className="players-area" style={{ marginTop: 0, color: "#666" }}>{player.favorite_area || "Любой район"}</p>

      <Link to={createPageUrl(`Matches?opponent_id=${player.id}`)} className="players-full">
        <button className="players-action" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd" }}>
          <MessageCircle />
          Предложить матч
        </button>
      </Link>
    </div>
  );
}

function PlayerSkeleton() {
  return (
    <div className="players-card" style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <div className="players-skel-circle" style={{ width: 48, height: 48, borderRadius: "50%", background: "#eee", marginBottom: 8 }} />
      <div className="players-skel-line" style={{ width: "75%", height: 12, background: "#eee", borderRadius: 6, marginBottom: 6 }} />
      <div className="players-skel-line" style={{ width: "35%", height: 12, background: "#eee", borderRadius: 6, marginBottom: 12 }} />
      <div className="players-skel-pill" style={{ width: 90, height: 18, background: "#eee", borderRadius: 9, marginBottom: 12 }} />
      <div className="players-skel-btn" style={{ width: 160, height: 36, background: "#eee", borderRadius: 8 }} />
    </div>
  );
}
