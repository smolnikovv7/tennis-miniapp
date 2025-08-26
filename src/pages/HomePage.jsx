import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Users, Trophy, Zap } from 'lucide-react';

export default function HomePage() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Доброе утро!' : h < 18 ? 'Добрый день!' : 'Добрый вечер!';

  return (
    <div>
      <section className="hero">
        <div className="ring"></div>
        <div className="ring2"></div>

        <p className="text-center text-[#6b7280] text-[20px] font-semibold">{greet}</p>

        <h1 className="hero-title text-center mt-2 mb-2">
          <span className="block text-[40px] sm:text-[48px] font-extrabold leading-tight">
            <span className="brand">Теннисный</span>
          </span>
          <span className="block text-[40px] sm:text-[48px] font-extrabold text-slate-900 leading-tight">Клуб Москвы</span>
        </h1>

        <p className="text-center text-slate-600 text-[20px] leading-8 px-4">
          Найдите партнеров, бронируйте корты и развивайтесь в теннисе вместе с лучшим сообществом игроков Москвы
        </p>

        <div className="big-plus">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      </section>

      <div className="px-4 pb-6">
        <div className="neo-surface hint mb-3">
          <div className="flex items-center gap-2 justify-center">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>С кем хотите сыграть? Найдите партнера или забронируйте корт</span>
          </div>
        </div>

        <Link to="/partners">
          <Button size="lg" className="btn-hero w-full">
            Найти партнера
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>

        <Link to="/courts">
          <button className="btn-secondary w-full mt-3">
            <span className="inline-flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Найти корт
            </span>
          </button>
        </Link>

        <div className="grid grid-cols-3 gap-3 mt-7">
          <div className="neo-surface stat-card">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="stat-number">150+</div>
            <div className="stat-caption">Игроков</div>
          </div>
          <div className="neo-surface stat-card">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="stat-number">25+</div>
            <div className="stat-caption">Кортов</div>
          </div>
          <div className="neo-surface stat-card">
            <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="stat-number">300+</div>
            <div className="stat-caption">Матчей</div>
          </div>
        </div>

        {/* ── НОВЫЙ БЛОК ───────────────────────────────────────── */}
        <section className="features mt-8">
          <h2 className="features-title">Что вас ждёт в клубе</h2>

          <div className="features-list">
            <div className="feature-card">
              <div className="icon-pill icon-blue">
                <Users className="w-6 h-6" />
              </div>
              <div className="feature-text">
                <div className="feature-title">Умный поиск</div>
                <div className="feature-subtitle">Находите партнёров по уровню игры и расписанию</div>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-pill icon-green">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="feature-text">
                <div className="feature-title">Лучшие корты</div>
                <div className="feature-subtitle">Бронируйте корты в топовых клубах Москвы</div>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-pill icon-orange">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="feature-text">
                <div className="feature-title">Рейтинг игроков</div>
                <div className="feature-subtitle">Отслеживайте прогресс и соревнуйтесь</div>
              </div>
            </div>
          </div>
        </section>
        {/* ─────────────────────────────────────────────────────── */}
      </div>
    </div>
  );
}
