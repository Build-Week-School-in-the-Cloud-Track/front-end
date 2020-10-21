import { USER_LOGIN } from "../actions";

const initialState = {
  currentUser: {},
  tasks: [],
  isFetchingTasks: false,
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
