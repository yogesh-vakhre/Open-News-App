import {
  takeLatest,
  put,
  all,
  fork,
  call,
  takeEvery,
} from "redux-saga/effects";
import {
  LOAD_PROFILE_START,
  SIGN_IN_START,
  SIGN_OUT_START,
  SIGN_UP_START,
  UPDATE_PREFERENCE_START,
} from "../action-types/authActionTypes";
import {
  loadProfileError,
  loadProfileSucess,
  signInError,
  signInSucess,
  signOutError,
  signOutSucess,
  signUpError,
  signUpSucess,
  updatePreferenceError,
  updatePreferenceSucess,
} from "../actions/authActions";
import AuthService from "../services/auth.service";
import {
  deleteToken,
  deleteUserInfo,
  saveToken,
  saveUserInfo,
} from "../localStorage";
import { toast } from "react-toastify";
import { getError } from "../../utils/getError";

function* onSignInStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_In_Payload", payload);
    const response = yield call(AuthService.signIn, payload);
    console.log("Call_Saga_Get_Sign_In_Response", response.data);

    if (response?.data?.status === 200) {
      const { user, token } = response.data.data;
      // if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        saveToken(token);
        saveUserInfo(user);
        yield put(signInSucess(response.data.data));
      // }
      // yield put(signInSucess(response));
    }
  } catch (error) {
    yield put(signInError(getError(error)));
    toast.error(getError(error));
  }
}

function* onSignUpStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_Up_Payload", payload);
    const response = yield call(AuthService.signUp, payload);
    console.log("Call_Saga_Get_Sign_Up_Response", response.data);

    if (response?.data?.status === 201) {
      const { user, token } = response.data.data;
      // if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        saveToken(token);
        saveUserInfo(user);
        yield put(signUpSucess(response.data.data));
      // }
      // yield put(signUpSucess(response.data));
    }
  } catch (error) {
    yield put(signUpError(getError(error)));
    toast.error(getError(error));
  }
}

function* onUpdatePreferenceStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_UPDATE_PREFERENCE_Payload", payload);
    const response = yield call(AuthService.updatePreference, payload);
    console.log("Call_Saga_Get_UPDATE_PREFERENCE_Response", response.data);
    if (response?.data?.status === 200) {
      const  user  = response.data.data;
      saveUserInfo(user);
      yield put(updatePreferenceSucess({user}));
      toast.success(response.data.message);
    } else {
      yield put(updatePreferenceError("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(updatePreferenceError(getError(error)));
    toast.error(getError(error));
  }
}

function* onSignOutStartAsync() {
  try {
    console.log("Call_Saga_Get_Sign_Out");
    deleteToken();
    deleteUserInfo();
    yield put(signOutSucess());
  } catch (error) {
    yield put(signOutError(getError(error)));
    toast.error(getError(error));
  }
}

function* onLoadProfileStartAsync() {
  try {
    const response = yield call(AuthService.getProfile);
    console.log("Call_Saga_Get_Load_Profile_Response", response?.data);
    if (response?.data?.status === 200) {
      const  user  = response.data.data;
      saveUserInfo(user);
      yield put(loadProfileSucess({user}));
    }
  } catch (error) {
    yield put(loadProfileError(getError(error)));
    toast.error(getError(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(SIGN_IN_START, onSignInStartAsync);
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, onSignUpStartAsync);
}

export function* onUpdatePreferenceStart() {
  yield takeLatest(UPDATE_PREFERENCE_START, onUpdatePreferenceStartAsync);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, onSignOutStartAsync);
}

export function* onLoadProfileStart() {
  yield takeLatest(LOAD_PROFILE_START, onLoadProfileStartAsync);
}

const authSagas = [
  fork(onSignInStart),
  fork(onSignUpStart),
  fork(onUpdatePreferenceStart),
  fork(onSignOutStart),
  fork(onLoadProfileStart),
];

export default function* authSaga() {
  yield all([...authSagas]);
}
