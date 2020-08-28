import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import genereReducer from "./genereReducer";

export default combineReducers({ movie: movieReducer, genere: genereReducer });
