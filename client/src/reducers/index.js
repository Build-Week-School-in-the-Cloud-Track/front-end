import { USER_LOGIN, USER_REGISTER } from "../actions";

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

    case USER_REGISTER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
