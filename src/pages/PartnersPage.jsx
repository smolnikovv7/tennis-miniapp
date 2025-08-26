import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User as UserModel } from "@/entities/User";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search, Filter, MapPin, Users, Trophy, Star } from "lucide-react";
import { createPageUrl } from "@/utils";
import "./players.css"; // <-- изолированные стили этой страницы

const levelDisplay = {
  beginner: "Начинающий",
  intermediate: "Средний",
  advanced: "Продвинутый",
};

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [level, setLevel] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const all = await UserModel.list();
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
      {/* шапка как на главной */}
      <section className="players-hero">
        <div className="players-ring" />
        <div className="players-ring2" />
        <h1 className="players-title">Найти партнёра</h1>
        <p className="players-lead">Выберите игрока по уровню и району</p>
      </section>

      {/* поисковая панель */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="players-filter neo-surface"
      >
        <div className="players-filter-row">
          <div className="players-search">
            <Search className="players-search-icon" />
            <Input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Поиск по имени или району…"
              className="players-input"
            />
          </div>

          <div className="players-select">
            <Filter className="players-select-icon" />
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="players-select-trigger">
                <SelectValue placeholder="Фильтр по уровню" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="beginner">Начинающий</SelectItem>
                <SelectItem value="intermediate">Средний</SelectItem>
                <SelectItem value="advanced">Продвинутый</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* статистика в стиле главной (опционально) */}
      <div className="players-stats">
        <div className="players-stat neo-surface">
          <Users className="players-stat-icon players-blue" />
          <div className="players-stat-value">150+</div>
          <div className="players-stat-label">Игроков</div>
        </div>
        <div className="players-stat neo-surface">
          <MapPin className="players-stat-icon players-green" />
          <div className="players-stat-value">25+</div>
          <div className="players-stat-label">Кортов</div>
        </div>
        <div className="players-stat neo-surface">
          <Trophy className="players-stat-icon players-orange" />
          <div className="players-stat-value">300+</div>
          <div className="players-stat-label">Матчей</div>
        </div>
      </div>

      {/* список игроков */}
      <div className="players-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <PlayerSkeleton key={i} />)
          : filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <PlayerCard player={p} />
              </motion.div>
            ))}
      </div>
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
    <Card className="players-card neo-surface">
      <CardContent className="players-card-body">
        <div className="players-avatar-wrap">
          <Avatar className="players-avatar">
            <AvatarImage
              src={
                player.photo_url ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${player.full_name}`
              }
              alt={player.full_name}
            />
            <AvatarFallback className="players-avatar-fallback">
              {player.full_name?.substring(0, 2) || "??"}
            </AvatarFallback>
          </Avatar>
          <div className="players-star">
            <Star className="players-star-icon" />
          </div>
        </div>

        <h3 className="players-name">{player.full_name}</h3>
        <p className="players-rating">Рейтинг: {player.rating || 1200}</p>

        <Badge className={badgeClass}>
          {levelDisplay[player.playing_level] || "—"}
        </Badge>

        <p className="players-area">{player.favorite_area || "Любой район"}</p>

        <Link to={createPageUrl(`Matches?opponent_id=${player.id}`)} className="players-full">
          <Button className="players-action">
            <MessageCircle className="players-action-icon" />
            Предложить матч
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function PlayerSkeleton() {
  return (
    <Card className="players-card neo-surface">
      <CardContent className="players-card-body">
        <div className="players-skel-circle" />
        <div className="players-skel-line w75" />
        <div className="players-skel-line w35" />
        <div className="players-skel-pill" />
        <div className="players-skel-btn" />
      </CardContent>
    </Card>
  );
}
