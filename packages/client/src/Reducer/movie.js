import {
  ADD_MOVIE,
  EDIT_MOVIE,
  FETCH_MOVIE,
  FETCH_ONE_MOVIE,
  SET_ERROR,
  SET_SUCCESS,
  RESET,
  DELETE_MOVIE,
} from "../action/type";

const initState = {
  movies: [],
  movie: {},
  success: false,
  error: false,
  message: "",
};
const movieReducer = (state = initState, action) => {
  switch (action.type) {
    case RESET:
      return { ...state, success: false, error: false, message: "" };
    case FETCH_MOVIE:
      return { ...state, movies: action.payload };
    case FETCH_ONE_MOVIE:
      return { ...state, movie: action.payload };
    case ADD_MOVIE:
      return { ...state, movies: [...state.movies, action.payload] };
    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) =>
          movie.id !== action.payload
        ),
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default movieReducer;
