import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function MainLayout() {
  return (
    <div className="container w-full h-full">
      <TopBar></TopBar>
      <Outlet />
    </div>
  );
}
