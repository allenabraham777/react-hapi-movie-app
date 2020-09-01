import { SET_FILTER, RESET } from "./type";

export const applyFilter = (data) => (dispatch) => {
  console.log("Filter Action");
  dispatch({
    type: SET_FILTER,
    payload: data,
  });
};
