import {
  addMovie,
  updateMovie,
  fetchMovie,
  fetchMovieById,
} from "../Apis/movies";
import {
  ADD_MOVIE,
  RESET,
  EDIT_MOVIE,
  FETCH_ONE_MOVIE,
  FETCH_MOVIE,
  SET_ERROR,
  SET_SUCCESS,
} from "./type";
import store from "../store";

export const movieFetchAction = () => (dispatch) => {
  dispatch({ type: RESET });
  fetchMovie().then((movies) => {
    dispatch({
      type: FETCH_MOVIE,
      payload: movies,
    });
  });
};

export const movieFetchByIdAction = (id) => async (dispatch) => {
  dispatch({ type: RESET });
  const movies = store.getState().movie.movies;
  if (movies.length === 0) {
    fetchMovieById(id)
      .then((movie) => {
        dispatch({
          type: FETCH_ONE_MOVIE,
          payload: movie,
        });
      })
      .catch((error) =>
        dispatch({
          type: SET_ERROR,
          payload: { error: true, message: error },
        })
      );
  } else {
    const movie = await movies.find((movie) => movie.id.toString() === id.toString());
    movie
      ? dispatch({
          type: FETCH_ONE_MOVIE,
          payload: movie,
        })
      : dispatch({
          type: SET_ERROR,
          payload: { error: true, message: { error: "No such movie" } },
        });
  }
};

export const movieAddAction = (data) => (dispatch) => {
  dispatch({ type: RESET });
  addMovie(data)
    .then((movie) => {
      dispatch({
        type: ADD_MOVIE,
        payload: movie,
      });
      dispatch({
        type: SET_SUCCESS,
        payload: true,
      });
    })
    .catch(({ error }) =>
      dispatch({
        type: SET_ERROR,
        payload: { error: true, message: error },
      })
    );
};

export const movieEditAction = (data) => (dispatch) => {
  dispatch({ type: RESET });
  updateMovie(data.id, data.value)
    .then((movie) => {
      dispatch({
        type: EDIT_MOVIE,
        payload: movie,
      });
      dispatch({
        type: SET_SUCCESS,
        payload: true,
      });
    })
    .catch((error) =>{
      dispatch({
        type: SET_ERROR,
        payload: { error: true, message: {error} },
      })}
    );
};
