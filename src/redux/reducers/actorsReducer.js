import {
  GET_ACTORS_REQUEST,
  GET_ACTORS_SUCCESS,
  GET_ACTORS_FAILURE,
  GET_ACTORS_UPDATE,
  GET_ACTORS_SEARCH,
  GET_ACTORS_BEST,
  GET_ACTORS_SINGLE
} from "../actionTypes";

const initialState = {
  loading: false,
  actors: [],
  actorsSearch: [],
  actorsBest: [],
  actor: {},
  error: ""
};

export default function actorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTORS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ACTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        actors: action.payload,
        error: ""
      };
    case GET_ACTORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_ACTORS_UPDATE:
      return {
        ...state,
        loading: false,
        actors: [...state.actors, ...action.payload],
        error: ""
      };
    case GET_ACTORS_SEARCH:
      return {
        ...state,
        loading: false,
        actorsSearch: action.payload,
        error: ""
      };
    case GET_ACTORS_BEST:
      return {
        ...state,
        loading: false,
        actorsBest: action.payload,
        error: ""
      };
    case GET_ACTORS_SINGLE:
      return {
        ...state,
        loading: false,
        actor: action.payload,
        error: ""
      };
    default:
      return state;
  }
}
