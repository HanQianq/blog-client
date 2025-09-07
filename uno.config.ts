import { defineConfig, presetUno, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // 核心原子类
    presetAttributify(), // 支持属性模式，如 <div bg="red-500"/>
  ],
  theme: {
    colors: {
      primary: "#1e90ff",
      secondary: "#ff6347",
    },
  },
  shortcuts: {
    // 元素居中
    "center-flex": "flex justify-center items-center",
    // 字体样式
    "title-lg": "text-3xl font-bold",
    "title-md": "text-2xl font-semibold",
    "text-muted": "text-gray-500",

    // 按钮样式
    "btn-primary": "px-4 py-2 bg-primary text-white rounded hover:bg-blue-600",
    "btn-secondary":
      "px-4 py-2 bg-secondary text-white rounded hover:bg-red-600",
  },
  rules: [
    // 额外自定义规则（可选）: 例如固定宽高
    ["w-100px", { width: "100px" }],
    ["h-50px", { height: "50px" }],
  ],
});
