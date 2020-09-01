import { SET_ORDER } from "./type";

export const applySort = (data) => (dispatch) => {
  console.log("Filter Action");
  dispatch({
    type: SET_ORDER,
    payload: data,
  });
};
