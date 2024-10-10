// src/Hari22/redux/reducer.js

import { INCREMENT, DECREMENT, RESET } from "./action";

// State awal
const initialState = {
  count: 0,
};

// Reducer function
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case RESET:
      return {
        ...state,
        count: state.count * 0,
      };
    default:
      return state;
  }
};

export default countReducer;
