import { combineReducers } from "redux";
import movieReducer from "./movie";
import genereReducer from "./genere";
import filterReducer from "./filter";
import sortReducer from "./sort";

export default combineReducers({
  movie: movieReducer,
  genere: genereReducer,
  filter: filterReducer,
  sort: sortReducer
});
