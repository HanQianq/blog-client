import { formatDate } from "@/utils/tool";
import React from "react";

interface ArticleCardProps {
  article: ArticleItemType;
  onClick?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div
      className="flex h-48 rounded-2xl overflow-hidden border border-border border-solid"
      onClick={() => onClick?.(article.id)}
    >
      {article.cover && (
        <img
          src={article.cover}
          alt={article.title}
          className="h-full w-60 object-cover"
        />
      )}

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center text-sm gap-6 text-muted">
          <span className="rounded">
            {`${article.category?.father}·${article.category?.name}`}
          </span>
          <span>{formatDate(article.createTime)}</span>
          <span>{article.author.name}</span>
        </div>

        {/* 标题 */}
        <h2 className="text-lg font-bold line-clamp-2">{article.title}</h2>

        {/* 摘要 */}
        <p className="text-sm text-muted line-clamp-3 flex-1 h-0">
          {article.abstract}
        </p>

        {/* 作者 + 标签 */}
        <div className="flex flex-wrap items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--tag-text)]"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
