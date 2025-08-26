import React, { useEffect, useState } from "react";
import { ShieldCheck, MapPin, DollarSign, Users, Star, Clock } from "lucide-react";
import "./courts.css";

/* Человечные подписи */
const typeDisplayNames = { indoor: "Крытый", outdoor: "Открытый" };
const coverDisplayNames = { hard: "Хард", clay: "Грунт", grass: "Трава", carpet: "Ковер" };

/* Заглушка вместо "@/entities/Court". Поменяешь на Court.list() когда будет бэкенд. */
async function fetchCourtsStub() {
  return [
    {
      id: 1,
      name: "ТК Лужники",
      address: "Москва, ул. Лужники, 24с1",
      type: "indoor",
      cover: "hard",
      price_per_hour: 2500,
      image_url: "https://images.unsplash.com/photo-1554153819-259a8bde4b63?q=80&w=1200",
    },
    {
      id: 2,
      name: "Спорт Парк Сокол",
      address: "Москва, Ленинградский пр-т, 80",
      type: "outdoor",
      cover: "clay",
      price_per_hour: 1800,
      image_url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200",
    },
    {
      id: 3,
      name: "ТК Олимп",
      address: "Москва, ул. Олимпийский проспект, 16",
      type: "indoor",
      cover: "carpet",
      price_per_hour: 2200,
      image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200",
    },
  ];
}

export default function CourtsPage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Фон только на этой странице
  useEffect(() => {
    document.body.classList.add("courts-body");
    return () => document.body.classList.remove("courts-body");
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const all = await fetchCourtsStub(); // <- заменишь на Court.list()
      // Оставляем карточки с русскими названиями
      const russianCourts = all.filter((c) => /[А-Яа-яЁё]/.test(c.name || ""));
      setCourts(russianCourts);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="courts-page">
      <section className="courts-hero">
        <div className="courts-ring" />
        <div className="courts-ring2" />
        <h1 className="courts-title">Теннисные корты Москвы</h1>
        <p className="courts-lead">Лучшие площадки для игры в теннис</p>
      </section>

      <div className="courts-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CourtCardSkeleton key={i} />)
          : courts.map((court) => <CourtCard key={court.id} court={court} />)}
      </div>
    </div>
  );
}

function CourtCard({ court }) {
  return (
    <div className="court-card">
      <div className="court-image-wrap">
        <img
          className="court-image"
          src={court.image_url}
          alt={court.name}
          loading="lazy"
        />
        <div className="court-badge court-badge--rating">
          <Star className="icon i-fill" />
          <span>4.8</span>
        </div>
        <div className="court-badge court-badge--open">
          <Clock className="icon" />
          <span>Доступен</span>
        </div>
      </div>

      <div className="court-content">
        <h3 className="court-title">
          <ShieldCheck className="icon ok" />
          {court.name}
        </h3>

        <p className="court-address">
          <MapPin className="icon muted" />
          {court.address}
        </p>

        <div className="court-tags">
          <span className="tag tag--type">{typeDisplayNames[court.type] || "—"}</span>
          <span className="tag tag--cover">{coverDisplayNames[court.cover] || "—"}</span>
        </div>

        <div className="court-meta">
          <div className="court-price">
            <DollarSign className="icon muted" />
            <span className="val">{court.price_per_hour} ₽</span>
            <span className="unit">/ час</span>
          </div>
        </div>

        <button className="court-action">
          <Users className="icon" />
          Запросить бронь
        </button>
      </div>
    </div>
  );
}

function CourtCardSkeleton() {
  return (
    <div className="court-card">
      <div className="court-skel-image" />
      <div className="court-content">
        <div className="court-skel-line w75" />
        <div className="court-skel-line w100" />
        <div className="court-skel-chips">
          <div className="chip" />
          <div className="chip" />
        </div>
        <div className="court-skel-btn" />
      </div>
    </div>
  );
}
