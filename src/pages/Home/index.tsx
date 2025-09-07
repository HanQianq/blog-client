import { getArticleListApi } from "@/api/articleApi";
import { useEffect, useState } from "react";
import ArticleCard from "../Article/components/ArticleCard";
export default function Home() {
  const [articleList, setArticleList] = useState<ArticleItemType[]>([]);

  const getArticleList = async () => {
    const res = await getArticleListApi({
      pageNumber: 1,
      pageSize: 10,
      title: "",
    });
    setArticleList(res.result);
  };

  useEffect(() => {
    getArticleList();
  }, []);
  return (
    <div className="p-4">
      <ul>
        {articleList.map((article) => (
          <li key={article.id} className="mb-6">
            <ArticleCard article={article}></ArticleCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
