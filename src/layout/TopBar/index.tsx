import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher";
import SearchBtn from "./components/SearchBtn";
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
    <div className="top-bar border-bottom flex-between h-60px px-4 w-full fixed top-0 z-10">
      <div className="flex items-center">
        <span className="font-bold">与君同的博客</span>
      </div>
      <div className="nav-wrapper">
        <ul className="flex">
          {navList.map((item) => (
            <li
              className={`nav-item text-hovers mx-4 ${
                location.pathname === item.path ? "text-primary" : ""
              }`}
              key={item.name}
            >
              <span onClick={() => gotoRelatedPage(item.path)}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="control-btn text-xl flex gap-2">
        <SearchBtn></SearchBtn>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </div>
  );
}
