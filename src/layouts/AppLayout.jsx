import { Outlet } from "react-router-dom";
import BottomNav from "@/components/BottomNav.jsx";

export default function AppLayout(){
  return (
    <div className="app-shell">
      <div className="app-card">
        <div className="safe-scroll">
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
