import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import customer from "./customer";

const rootReducer = combineReducers({
  form,
  customer,
});

export default rootReducer;
