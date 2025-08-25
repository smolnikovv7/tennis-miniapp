import { Link, useLocation } from "react-router-dom"
import { createPageUrl } from "@/utils"
import { Home, Users, MapPin, Trophy, User as UserIcon } from "lucide-react"

const items = [
  { name: "Главная", icon: Home, page: "Home" },
  { name: "Игроки", icon: Users, page: "Players" },
  { name: "Корты", icon: MapPin, page: "Courts" },
  { name: "Матчи", icon: Trophy, page: "Matches" },
  { name: "Профиль", icon: UserIcon, page: "Profile" }
]

export default function BottomBar(){
  const { pathname } = useLocation()
  return (
    <div
      style={{ position:'fixed', left:0, right:0, bottom:'env(safe-area-inset-bottom,0px)', zIndex:2147483647 }}
      className="w-screen"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="relative rounded-3xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.08)] px-3 py-3">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-72 h-6 rounded-full bg-blue-600" />
          <nav className="grid grid-cols-5 gap-2">
            {items.map(({ name, icon:Icon, page }) => {
              const href = createPageUrl(page)
              const active = pathname === href
              return (
                <Link
                  key={name}
                  to={href}
                  className={[
                    "group flex items-center justify-center rounded-2xl transition-all select-none",
                    active
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg px-4 py-3"
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-3"
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={"w-6 h-6 " + (active ? "drop-shadow-sm" : "")} />
                    <span className={"hidden xs:inline text-[15px] font-semibold " + (active ? "text-white" : "")}>
                      {name}
                    </span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
