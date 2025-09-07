interface QueryType {
  title: string;
}

interface ArticleTagItem {
  id: string;
  name: string;
  alias: string;
  sort: number;
  color: string;
  description: string;
}

interface ArticleItemType {
  id: string;
  title: string;
  pinyin: string;
  category: {
    name: string;
    id: string;
    father: string;
  } | null;
  author: {
    name: string;
    id: string;
    avatar: string;
  };
  status: string;
  properties: string;
  visible: string;
  column: string | null;
  createTime: string;
  updateTime: string;
  readCount: number;
  cover: string | null;
  isTop: boolean;
  abstract: string | null;
  isDelete: boolean;
  tags: ArticleTagItem[];
}
