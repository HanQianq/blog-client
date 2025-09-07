import { useTheme } from "@/store/useTheme";

export default function ThemeSwitcher() {
  const { color, mode, setColor, toggleMode } = useTheme();

  return (
    <div className="flex gap-2 items-center">
      {/* 主题色切换 */}
      {["blue", "purple", "orange"].map((c) => (
        <button
          key={c}
          className={`px-4 py-2 rounded ${
            color === c ? "bg-primary text-white" : "bg-gray-200 text-black"
          }`}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => setColor(c as any)}
        >
          {c}
        </button>
      ))}

      {/* 明暗模式切换 */}
      <button className="px-4 py-2 rounded bg-gray-300" onClick={toggleMode}>
        {mode === "light" ? "切换暗色" : "切换亮色"}
      </button>
    </div>
  );
}
