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

import { getUserInfo } from "../localStorage";

const initialState = {
  isSignedIn: getUserInfo() !== undefined ? true : false,
  user: getUserInfo() ?? {},
  error: "",
  loader: false,
  success: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
    case UPDATE_PREFERENCE_START:
      return { ...state, user: action.payload, loader: true };
    case LOAD_PROFILE_START:
    case SIGN_OUT_START:
      return { ...state, loader: true };
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case UPDATE_PREFERENCE_SUCCESS:
    case LOAD_PROFILE_SUCCESS:
      console.log("ok",action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        isSignedIn: true,
        loader: false,
        success: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: {},
        isSignedIn: false,
        error: "",
        loader: false,
        success: true,
      };    
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
    case UPDATE_PREFERENCE_ERROR:
    case SIGN_OUT_ERROR:
    case LOAD_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loader: false,
        success: false,
      };
    default:
      return state;
  }
};
export default authReducer;
