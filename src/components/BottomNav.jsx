import { Link, useLocation } from "react-router-dom";
import { Home, Users, MapPin, Trophy, User as UserIcon } from "lucide-react";

const items = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/partners", label: "Игроки", icon: Users },
  { to: "/courts", label: "Корты", icon: MapPin },
  { to: "/matches", label: "Матчи", icon: Trophy },
  { to: "/profile", label: "Профиль", icon: UserIcon },
];

export default function BottomNav(){
  const { pathname } = useLocation();
  return (
    <div className="bottom-wrap">
      <div className="bottom-nav">
        <div className="bottom-grid">
          {items.map(({to,label,icon:Icon})=>{
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link key={to} to={to} className={`tab ${active ? "tab-active" : ""}`}>
                <Icon className="tab-icon" />
                <span className="tab-label">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
