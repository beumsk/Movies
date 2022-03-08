import {
  GET_ACTORS_REQUEST,
  GET_ACTORS_SUCCESS,
  GET_ACTORS_FAILURE,
  GET_ACTORS_UPDATE,
  GET_ACTORS_SEARCH,
  GET_ACTORS_BEST,
  GET_ACTORS_SINGLE
} from "./actionTypes";

export function getActorsRequest() {
  return { type: GET_ACTORS_REQUEST };
}

export function getActorsSuccess(actors) {
  return { type: GET_ACTORS_SUCCESS, payload: actors };
}

export function getActorsFailure(error) {
  return { type: GET_ACTORS_FAILURE, payload: error };
}

export function getActorsUpdate(actors) {
  return { type: GET_ACTORS_UPDATE, payload: actors };
}

export function getActorsSearch(actors) {
  return { type: GET_ACTORS_SEARCH, payload: actors };
}

export function getActorsBest(actors) {
  return { type: GET_ACTORS_BEST, payload: actors };
}

export function getActorsSingle(actors) {
  return { type: GET_ACTORS_SINGLE, payload: actors };
}

const TMDB_KEY = "api_key=04c35731a5ee918f014970082a0088b1";
const BASE_API = "https://api.themoviedb.org/3/";
const MIN_VOTE = "vote_count.gte=5000";
const SORT_BY_POP = "sort_by=popularity.desc";
const SORT_BY_VOTE = "sort_by=vote_average.desc";
const LANG = "language=en-GB";

export function getActors() {
  return function (dispatch) {
    dispatch(getActorsRequest());
    fetch(`${BASE_API}discover/person?${SORT_BY_POP}&${LANG}&${TMDB_KEY}`)
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((actors) => {
        dispatch(getActorsSuccess(actors.results));
      })
      .catch((error) => {
        dispatch(getActorsFailure(error.message));
      });
  };
}

export function updateActors(page) {
  return function (dispatch) {
    dispatch(getActorsRequest());
    fetch(
      `${BASE_API}discover/person?${SORT_BY_POP}&${LANG}&${TMDB_KEY}&page=${page}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((actors) => {
        dispatch(getActorsUpdate(actors.results));
      })
      .catch((error) => {
        dispatch(getActorsFailure(error.message));
      });
  };
}

export function searchActors(searchTerm) {
  return function (dispatch) {
    dispatch(getActorsRequest());
    fetch(
      `${BASE_API}search/person?${MIN_VOTE}&${LANG}&${TMDB_KEY}&query=${searchTerm}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((actors) => {
        dispatch(getActorsSearch(actors.results));
      })
      .catch((error) => {
        dispatch(getActorsFailure(error.message));
      });
  };
}

export function bestActors() {
  return function (dispatch) {
    dispatch(getActorsRequest());
    fetch(
      `${BASE_API}discover/person?${SORT_BY_VOTE}&${MIN_VOTE}&${LANG}&${TMDB_KEY}`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((actors) => {
        dispatch(getActorsBest(actors.results));
      })
      .catch((error) => {
        dispatch(getActorsFailure(error.message));
      });
  };
}

export function singleActor(idd) {
  return function (dispatch) {
    dispatch(getActorsRequest());
    fetch(
      `${BASE_API}person/${idd}?${LANG}&${TMDB_KEY}&append_to_response=movie_credits,tv_credits,combined_credits`
    )
      .then((res) => res.json())
      // .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000)))
      .then((actors) => {
        dispatch(getActorsSingle(actors));
      })
      .catch((error) => {
        dispatch(getActorsFailure(error.message));
      });
  };
}
