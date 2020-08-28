import {
  ADD_GENERE,
  FETCH_GENERE,
  SET_ERROR,
  SET_SUCCESS,
  RESET,
} from "../Action/type";
const initState = {
  generes: [],
  error: false,
  success: false,
  message: "",
};

const genereReducer = (state = initState, action) => {
  switch (action.type) {
    case RESET:
      return {
        ...state,
        error: false,
        success: false,
        message: "",
      };
    case ADD_GENERE:
      return {
        ...state,
        generes: [...state.generes, action.payload],
      };
    case FETCH_GENERE:
      return {
        ...state,
        generes: action.payload,
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
        message: action.payload,
      };
    default:
      return state;
  }
};

export default genereReducer;
