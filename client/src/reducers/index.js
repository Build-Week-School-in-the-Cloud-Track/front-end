import {
  USER_LOGIN,
  USER_REGISTER,
  FETCH_VOLUNTEERS_START,
  FETCH_VOLUNTEERS_SUCCESS,
  FETCH_VOLUNTEERS_FAILURE,
} from "../actions";

const initialState = {
  currentUser: {},
  tasks: [],
  isFetchingTasks: false,
  volunteers: [],
  isFetchingVolunteers: false,
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

    case FETCH_VOLUNTEERS_START:
      return {
        ...state,
        isFetchingVolunteers: true,
      };

    case FETCH_VOLUNTEERS_SUCCESS:
      return {
        ...state,
        volunteers: action.payload,
        isFetchingVolunteers: false,
        error: "",
      };

    case FETCH_VOLUNTEERS_FAILURE:
      return {
        ...state,
        isFetchingVolunteers: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
