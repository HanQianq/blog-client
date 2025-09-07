import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function MainLayout() {
  return (
    <div className="app-wrapper">
      <TopBar></TopBar>
      <Outlet />
    </div>
  );
}
