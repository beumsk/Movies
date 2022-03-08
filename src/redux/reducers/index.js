import { combineReducers } from "redux";
import movies from "./moviesReducer";
import series from "./seriesReducer";
import actors from "./actorsReducer";

export default combineReducers({
  movies: movies,
  series: series,
  actors: actors
});
