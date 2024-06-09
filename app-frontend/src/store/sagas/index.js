import { all } from "redux-saga/effects";
import articleSaga from "./articleSaga";
import authSaga from "./authSaga";

export default function* rootSaga() {
  yield all([articleSaga(), authSaga()]);
}
