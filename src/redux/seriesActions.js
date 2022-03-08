import {
  GET_SERIES_REQUEST,
  GET_SERIES_SUCCESS,
  GET_SERIES_FAILURE,
  GET_SERIES_UPDATE,
  GET_SERIES_SEARCH,
  GET_SERIES_BEST,
  GET_SERIES_SINGLE
} from "./actionTypes";

export function getSeriesRequest() {
  return { type: GET_SERIES_REQUEST };
}

export function getSeriesSuccess(series) {
  return { type: GET_SERIES_SUCCESS, payload: series };
}

export function getSeriesFailure(error) {
  return { type: GET_SERIES_FAILURE, payload: error };
}

export function getSeriesUpdate(series) {
  return { type: GET_SERIES_UPDATE, payload: series };
}

export function getSeriesSearch(series) {
  return { type: GET_SERIES_SEARCH, payload: series };
}

export function getSeriesBest(series) {
  return { type: GET_SERIES_BEST, payload: series };
}

export function getSeriesSingle(series) {
  return { type: GET_SERIES_SINGLE, payload: series };
}

const TMDB_KEY = "api_key=04c35731a5ee918f014970082a0088b1";
const BASE_API = "https://api.themoviedb.org/3/";
const MIN_VOTE = "vote_count.gte=5000";
const SORT_BY_POP = "sort_by=popularity.desc";
const SORT_BY_VOTE = "sort_by=vote_average.desc";
const LANG = "language=en-GB";

export function getSeries() {
  return function (dispatch) {
    dispatch(getSeriesRequest());
    fetch(`${BASE_API}discover/tv?${SORT_BY_POP}&${LANG}&${TMDB_KEY}`)
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((series) => {
        dispatch(getSeriesSuccess(series.results));
      })
      .catch((error) => {
        dispatch(getSeriesFailure(error.message));
      });
  };
}

export function updateSeries(page) {
  return function (dispatch) {
    dispatch(getSeriesRequest());
    fetch(
      `${BASE_API}discover/tv?${SORT_BY_POP}&${LANG}&${TMDB_KEY}&page=${page}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((series) => {
        dispatch(getSeriesUpdate(series.results));
      })
      .catch((error) => {
        dispatch(getSeriesFailure(error.message));
      });
  };
}

export function searchSeries(searchTerm) {
  return function (dispatch) {
    dispatch(getSeriesRequest());
    fetch(
      `${BASE_API}search/tv?${MIN_VOTE}&${LANG}&${TMDB_KEY}&query=${searchTerm}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((series) => {
        dispatch(getSeriesSearch(series.results));
      })
      .catch((error) => {
        dispatch(getSeriesFailure(error.message));
      });
  };
}

export function bestSeries() {
  return function (dispatch) {
    dispatch(getSeriesRequest());
    fetch(
      `${BASE_API}discover/tv?${SORT_BY_VOTE}&${MIN_VOTE}&${LANG}&${TMDB_KEY}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((series) => {
        dispatch(getSeriesBest(series.results));
      })
      .catch((error) => {
        dispatch(getSeriesFailure(error.message));
      });
  };
}

export function singleSerie(idd) {
  return function (dispatch) {
    dispatch(getSeriesRequest());
    fetch(
      `${BASE_API}tv/${idd}?${LANG}&${TMDB_KEY}&append_to_response=credits,videos,reviews,recommendations`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((series) => {
        dispatch(getSeriesSingle(series));
      })
      .catch((error) => {
        dispatch(getSeriesFailure(error.message));
      });
  };
}
