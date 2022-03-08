import {
  GET_SERIES_REQUEST,
  GET_SERIES_SUCCESS,
  GET_SERIES_FAILURE,
  GET_SERIES_UPDATE,
  GET_SERIES_SEARCH,
  GET_SERIES_BEST,
  GET_SERIES_SINGLE
} from "../actionTypes";

const initialState = {
  loading: false,
  series: [],
  seriesSearch: [],
  seriesBest: [],
  serie: {},
  error: ""
};

export default function seriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_SERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        series: action.payload,
        error: ""
      };
    case GET_SERIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_SERIES_UPDATE:
      return {
        ...state,
        loading: false,
        series: [...state.series, ...action.payload],
        error: ""
      };
    case GET_SERIES_SEARCH:
      return {
        ...state,
        loading: false,
        seriesSearch: action.payload,
        error: ""
      };
    case GET_SERIES_BEST:
      return {
        ...state,
        loading: false,
        seriesBest: action.payload,
        error: ""
      };
    case GET_SERIES_SINGLE:
      return {
        ...state,
        loading: false,
        serie: action.payload,
        error: ""
      };
    default:
      return state;
  }
}
