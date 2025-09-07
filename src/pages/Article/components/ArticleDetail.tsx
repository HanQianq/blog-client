import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

// 目录项类型
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 组件 props
interface ArticleDetailProps {
  content: string;
}

// 自定义 code 组件类型，解决 TS 报错
interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ content }) => {
  const [activeId, setActiveId] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string>("");

  // 生成目录（只取 h2~h4）
  const toc: TocItem[] = useMemo(() => {
    const reg = /^(#{2,4})\s+(.*)$/gm;
    const items: TocItem[] = [];
    let match;
    while ((match = reg.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, "-");
      items.push({ id, text, level });
    }
    return items;
  }, [content]);

  // 监听滚动，高亮目录
  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3, h4");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [content]);

  // 平滑滚动
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 复制代码
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="flex gap-6">
      {/* 主体内容 */}
      <article className="flex-1 prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            rehypeAutolinkHeadings,
            [rehypeHighlight, { detect: true }],
          ]}
          components={{
            // 图片懒加载
            img: ({ ...props }) => (
              <img {...props} loading="lazy" className="max-w-full rounded" />
            ),
            // 自定义 code 组件
            code: ({
              inline,
              className,
              children,
              ...props
            }: CodeComponentProps) => {
              const codeString = String(children).replace(/\n$/, "");
              return !inline ? (
                <div className="relative group">
                  <pre
                    className={`language-${className?.replace(
                      "language-",
                      ""
                    )} p-4 rounded bg-gray-100 overflow-auto`}
                  >
                    <code className={className}>{children}</code>
                  </pre>
                  <button
                    className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(codeString)}
                  >
                    {copiedCode === codeString ? "已复制" : "复制"}
                  </button>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* 右侧目录 */}
      <aside className="hidden lg:block w-64 sticky top-20 h-fit border-l pl-4 text-sm">
        <h3 className="font-bold mb-2">目录</h3>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li
              key={item.id}
              className={`ml-${(item.level - 2) * 4} ${
                activeId === item.id
                  ? "text-[var(--primary-text)] font-bold"
                  : "text-gray-600 hover:text-[var(--primary-text)]"
              }`}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="w-full text-left truncate"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default ArticleDetail;
