import {
  LOAD_ARTICLES_FAILURE,
  LOAD_ARTICLES_REQUEST,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLE_BY_SLUG_FAILURE,
  LOAD_ARTICLE_BY_SLUG_REQUEST,
  LOAD_ARTICLE_BY_SLUG_SUCCESS,
} from "../action-types/ArticleActionTypes";

export const loadArticlesRequest = () => ({
  type: LOAD_ARTICLES_REQUEST,
});

export const loadArticlesSucess = (data) => ({
  type: LOAD_ARTICLES_SUCCESS,
  payload: data,
});

export const loadArticlesFail = (error) => ({
  type: LOAD_ARTICLES_FAILURE,
  payload: error,
});

export const loadArticleBySlugRequest = (query) => ({
  type: LOAD_ARTICLE_BY_SLUG_REQUEST,
  payload: query,
});

export const loadArticleBySlugSucess = (data) => ({
  type: LOAD_ARTICLE_BY_SLUG_SUCCESS,
  payload: data,
});

export const loadArticleBySlugFail = (error) => ({
  type: LOAD_ARTICLE_BY_SLUG_FAILURE,
  payload: error,
});
