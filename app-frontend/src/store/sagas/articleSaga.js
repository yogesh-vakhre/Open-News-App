import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  loadArticleBySlugFail,
  loadArticleBySlugSucess,
  loadArticlesFail,
  loadArticlesSucess,
} from "../actions/ArticleActions";
import {
  LOAD_ARTICLES_REQUEST,
  LOAD_ARTICLE_BY_SLUG_REQUEST,
} from "../action-types/ArticleActionTypes";
import ArticleService from "../services/article.service";
import { getError } from "../../utils/getError";
import { toast } from "react-toastify";

function* onLoadArticlesRequestAsync() {
  try {
    const response = yield call(ArticleService.getArticles);
    console.log("Call_Saga_Get_Article", response);
    if (response?.data?.status === 200) {
      yield put(loadArticlesSucess(response?.data?.data));
    } else {
      console.log("Call_Saga11111111");
      yield put(loadArticlesFail("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(loadArticlesFail(getError(error)));
    toast.error(getError(error));
  }
}

function* onLoadArticleBySlugRequestAsync({ payload }) {
  try {
    const response = yield call(ArticleService.getArticleBySlug, payload);
    console.log("Call_Saga_Get_Article_BY_Slug", payload);
    if (response?.data?.status === 200) {
      yield put(loadArticlesSucess(response?.data?.data));
    } else {
      yield put(
        loadArticleBySlugFail("Something Went Wrong, Please Try Again!")
      );
    }
  } catch (error) {
    yield put(loadArticlesFail(getError(error)));
    toast.error(getError(error));
  }
}

export function* onLoadArticles() {
  yield takeLatest(LOAD_ARTICLES_REQUEST, onLoadArticlesRequestAsync);
}

export function* onLoadArticleBySlug() {
  yield takeLatest(
    LOAD_ARTICLE_BY_SLUG_REQUEST,
    onLoadArticleBySlugRequestAsync
  );
}
const articleSagas = [fork(onLoadArticles), fork(onLoadArticleBySlug)];

export default function* articleSaga() {
  yield all([...articleSagas]);
}
