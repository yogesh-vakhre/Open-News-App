import {
  LOAD_ARTICLES_FAILURE,
  LOAD_ARTICLES_REQUEST,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLE_BY_SLUG_FAILURE,
  LOAD_ARTICLE_BY_SLUG_REQUEST,
  LOAD_ARTICLE_BY_SLUG_SUCCESS,
} from "../action-types/ArticleActionTypes";

const initialState = {
  total: 0,
  article: {},
  articles: [],
  error: "",
  loader: false,
  success: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES_REQUEST:
      return { ...state, loader: true };
    case LOAD_ARTICLE_BY_SLUG_REQUEST:
      return { ...state, slug: action.payload, loader: true };

    case LOAD_ARTICLES_SUCCESS:
      return {
        ...state,
        total: action.payload.totalResults,
        articles: action.payload.articles,
        success: true,
        loader: false,
      };

    case LOAD_ARTICLE_BY_SLUG_SUCCESS:
      return {
        ...state,
        article: action.payload.article,
        success: true,
        loader: false,
      };

    case LOAD_ARTICLES_FAILURE:
    case LOAD_ARTICLE_BY_SLUG_FAILURE:
      return {
        ...state,
        error: action.payload,
        success: false,
        loader: true,
      };
    default:
      return { ...state };
  }
};

export default articleReducer;
