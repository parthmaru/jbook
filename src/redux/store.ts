import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistMiddleware } from "./middleware/persist-middleware";

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(persistMiddleware, thunk)
);
