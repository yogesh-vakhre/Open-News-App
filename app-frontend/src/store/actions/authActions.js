import {
  LOAD_PROFILE_ERROR,
  LOAD_PROFILE_START,
  LOAD_PROFILE_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  UPDATE_PREFERENCE_ERROR,
  UPDATE_PREFERENCE_START,
  UPDATE_PREFERENCE_SUCCESS,
} from "../action-types/authActionTypes";

export const signInStart = (user) => ({
  type: SIGN_IN_START,
  payload: user,
});

export const signInSucess = (data) => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signUpStart = (user) => ({
  type: SIGN_UP_START,
  payload: user,
});

export const signUpSucess = (data) => ({
  type: SIGN_UP_SUCCESS,
  payload: data,
});

export const signUpError = (error) => ({
  type: SIGN_UP_ERROR,
  payload: error,
});

export const updatePreferenceStart = (user) => ({
  type: UPDATE_PREFERENCE_START,
  payload: user,
});

export const updatePreferenceSucess = (data) => ({
  type: UPDATE_PREFERENCE_SUCCESS,
  payload: data,
});

export const updatePreferenceError = (error) => ({
  type: UPDATE_PREFERENCE_ERROR,
  payload: error,
});

export const signOutStart = () => ({
  type: SIGN_OUT_START,
});

export const signOutSucess = (data) => ({
  type: SIGN_OUT_SUCCESS,
  payload: data,
});

export const signOutError = (error) => ({
  type: SIGN_OUT_ERROR,
  payload: error,
});

export const loadProfileStart = (user) => ({
  type: LOAD_PROFILE_START,
  payload: user,
});

export const loadProfileSucess = (data) => ({
  type: LOAD_PROFILE_SUCCESS,
  payload: data,
});

export const loadProfileError = (error) => ({
  type: LOAD_PROFILE_ERROR,
  payload: error,
});
