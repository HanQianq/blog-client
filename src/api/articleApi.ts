import request from "@/services/request";

export const getArticleListApi = (params: PageType & QueryType) =>
  request.post<ResultPageType<ArticleItemType>>("/article/list", params);
