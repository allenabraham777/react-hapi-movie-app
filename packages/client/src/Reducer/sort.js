import { SET_ORDER } from "../action/type";
const initState = { sort: true };

const sortReducer = (state = initState, action) => {
  console.log("FilterReducre");
  console.log(state);
  switch (action.type) {
    case SET_ORDER:
      return {
        sort: action.payload,
      };
    default:
      return state;
  }
};

export default sortReducer;
