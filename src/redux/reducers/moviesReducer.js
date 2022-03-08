import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIES_UPDATE,
  GET_MOVIES_SEARCH,
  GET_MOVIES_BEST,
  GET_MOVIES_SINGLE
} from "../actionTypes";

const initialState = {
  loading: false,
  movies: [],
  moviesSearch: [],
  moviesBest: [],
  movie: {},
  error: ""
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
        error: ""
      };
    case GET_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_MOVIES_UPDATE:
      return {
        ...state,
        loading: false,
        movies: [...state.movies, ...action.payload],
        error: ""
      };
    case GET_MOVIES_SEARCH:
      return {
        ...state,
        loading: false,
        moviesSearch: action.payload,
        error: ""
      };
    case GET_MOVIES_BEST:
      return {
        ...state,
        loading: false,
        moviesBest: action.payload,
        error: ""
      };
    case GET_MOVIES_SINGLE:
      return {
        ...state,
        loading: false,
        movie: action.payload,
        error: ""
      };
    default:
      return state;
  }
}
