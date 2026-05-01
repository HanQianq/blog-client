import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleDetailProps {
  content: string;
}

interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string>("");
  const articleRef = useRef<HTMLDivElement>(null);

  // 从渲染后的 DOM 中提取目录
  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;
    const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (!headings.length) return;
    const items: TocItem[] = [];
    headings.forEach((h) => {
      const id = h.id;
      if (id) {
        items.push({
          id,
          text: h.textContent || "",
          level: parseInt(h.tagName.slice(1), 10),
        });
      }
    });
    setToc(items);
  }, [content]);

  // 滚动高亮
  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;
    const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-60px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc, content]);

  // 点击跳转
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
    <div className="flex gap-8">
      {/* 主体内容 */}
      <article className="flex-1 min-w-0 article-content" ref={articleRef}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            rehypeAutolinkHeadings,
            [rehypeHighlight, { detect: true }],
          ]}
          components={{
            img: ({ ...props }) => (
              <img {...props} loading="lazy" className="max-w-full rounded" />
            ),
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
                      "",
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
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-20 p-0 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="text-sm font-semibold mb-3 text-text">目录</div>
          {toc.length === 0 ? (
            <p className="text-xs text-muted">暂无目录</p>
          ) : (
            <ul className="relative border-l border-border pl-3 space-y-1">
              {toc.map((item) => {
                const indent = item.level >= 3 ? (item.level - 2) * 3 : 0;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.id)}
                      className={`block w-full text-left py-0.5 rounded-r transition-colors truncate relative ${
                        item.level === 1
                          ? "font-bold text-base"
                          : item.level === 2
                            ? "font-medium"
                            : item.level >= 3
                              ? "text-xs"
                              : ""
                      } ${
                        activeId === item.id
                          ? "text-primary font-semibold"
                          : "text-muted hover:text-text"
                      }`}
                      style={{ paddingLeft: `${indent * 4}px` }}
                    >
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ArticleDetail;
