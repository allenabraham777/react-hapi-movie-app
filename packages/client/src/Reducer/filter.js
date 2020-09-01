import { SET_FILTER } from "../action/type";
const initState = { filters: { rating: 0, genere: false } };

const filterReducer = (state = initState, action) => {
  console.log("FilterReducre");
  console.log(state);
  switch (action.type) {
    case SET_FILTER:
      return {
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
};

export default filterReducer;
