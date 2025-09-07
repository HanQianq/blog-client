import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function MainLayout() {
  return (
    <div className="app-wrapper">
      <TopBar></TopBar>
      <div className="max-w-1080px mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
