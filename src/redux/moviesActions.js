import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIES_UPDATE,
  GET_MOVIES_SEARCH,
  GET_MOVIES_BEST,
  GET_MOVIES_SINGLE
} from "./actionTypes";

export function getMoviesRequest() {
  return { type: GET_MOVIES_REQUEST };
}

export function getMoviesSuccess(movies) {
  return { type: GET_MOVIES_SUCCESS, payload: movies };
}

export function getMoviesFailure(error) {
  return { type: GET_MOVIES_FAILURE, payload: error };
}

export function getMoviesUpdate(movies) {
  return { type: GET_MOVIES_UPDATE, payload: movies };
}

export function getMoviesSearch(movies) {
  return { type: GET_MOVIES_SEARCH, payload: movies };
}

export function getMoviesBest(movies) {
  return { type: GET_MOVIES_BEST, payload: movies };
}

export function getMoviesSingle(movies) {
  return { type: GET_MOVIES_SINGLE, payload: movies };
}

const TMDB_KEY = "api_key=04c35731a5ee918f014970082a0088b1";
const BASE_API = "https://api.themoviedb.org/3/";
const MIN_VOTE = "vote_count.gte=5000";
const SORT_BY_POP = "sort_by=popularity.desc";
const SORT_BY_VOTE = "sort_by=vote_average.desc";
const LANG = "language=en-GB";

export function getMovies() {
  return function (dispatch) {
    dispatch(getMoviesRequest());
    fetch(`${BASE_API}discover/movie?${SORT_BY_POP}&${LANG}&${TMDB_KEY}`)
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((movies) => {
        dispatch(getMoviesSuccess(movies.results));
      })
      .catch((error) => {
        dispatch(getMoviesFailure(error.message));
      });
  };
}

export function updateMovies(page) {
  return function (dispatch) {
    dispatch(getMoviesRequest());
    fetch(
      `${BASE_API}discover/movie?${SORT_BY_POP}&${LANG}&${TMDB_KEY}&page=${page}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((movies) => {
        dispatch(getMoviesUpdate(movies.results));
      })
      .catch((error) => {
        dispatch(getMoviesFailure(error.message));
      });
  };
}

export function searchMovies(searchTerm) {
  return function (dispatch) {
    dispatch(getMoviesRequest());
    fetch(
      `${BASE_API}search/movie?${MIN_VOTE}&${LANG}&${TMDB_KEY}&query=${searchTerm}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((movies) => {
        dispatch(getMoviesSearch(movies.results));
      })
      .catch((error) => {
        dispatch(getMoviesFailure(error.message));
      });
  };
}

export function bestMovies() {
  return function (dispatch) {
    dispatch(getMoviesRequest());
    fetch(
      `${BASE_API}discover/movie?${SORT_BY_VOTE}&${MIN_VOTE}&${LANG}&${TMDB_KEY}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((movies) => {
        dispatch(getMoviesBest(movies.results));
      })
      .catch((error) => {
        dispatch(getMoviesFailure(error.message));
      });
  };
}

export function singleMovie(idd) {
  return function (dispatch) {
    dispatch(getMoviesRequest());
    fetch(
      `${BASE_API}movie/${idd}?${LANG}&${TMDB_KEY}&append_to_response=credits,videos,reviews,recommendations`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((movies) => {
        dispatch(getMoviesSingle(movies));
      })
      .catch((error) => {
        dispatch(getMoviesFailure(error.message));
      });
  };
}
