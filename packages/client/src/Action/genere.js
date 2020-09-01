import { addGenere, getGenere } from "../apis/geners";
import {
  ADD_GENERE,
  FETCH_GENERE,
  SET_SUCCESS,
  SET_ERROR,
  RESET,
} from "./type";

export const addGenereAction = (data) => (dispatch) => {
  dispatch({ type: RESET });
  addGenere(data)
    .then(() => {
      dispatch({
        type: ADD_GENERE,
        payload: data,
      });
      dispatch({
        type: SET_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERROR,
        payload: error,
      });
    });
};

export const fetchGenereAction = () => (dispatch) => {
  getGenere().then((generes) => {
    dispatch({ type: FETCH_GENERE, payload: generes });
  });
};
