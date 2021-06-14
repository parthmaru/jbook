import cellsReducer from "./cellsReducer";
import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";

const rootReducer = combineReducers({
  cellsReducer,
  bundlesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
