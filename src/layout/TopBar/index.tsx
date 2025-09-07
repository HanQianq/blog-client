import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher";
export default function TopBar() {
  const navList = [
    { name: "首页", path: "/" },
    { name: "关于", path: "/about" },
  ];

  const navigate = useNavigate();
  const gotoRelatedPage = (path: string) => {
    navigate(path);
  };
  return (
    <div className="top-bar border-bottom flex-between h-60px px-4 w-full">
      <div className="flex items-center">
        <span className="font-bold">与君同的博客</span>
      </div>
      <div className="nav-wrapper">
        <ul className="flex">
          {navList.map((item) => (
            <li className="nav-item mx-4" key={item.name}>
              <span onClick={() => gotoRelatedPage(item.path)}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="control-btn">
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </div>
  );
}
