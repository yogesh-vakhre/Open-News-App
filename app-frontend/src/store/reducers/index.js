import { combineReducers } from "redux";

// reducer import
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";

// ==============================|| COMBINE REDUCER ||============================== //

export default combineReducers({
  article: articleReducer,
  auth: authReducer,
});
