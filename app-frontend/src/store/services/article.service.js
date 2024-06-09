import articleInstance from "../axios/ArticleInstance";

const getArticles = async () =>
  await articleInstance.get("/top-headlines?sources=bbc-news");

const getArticleBySlug = async (query) =>
  await articleInstance.get(`/top-headlines/?${query}`);

const ArticleService = {
  getArticles,
  getArticleBySlug,
};
export default ArticleService;
