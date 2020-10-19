import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCH_TASKS_START = "FETCH_TASKS_START";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const getTasks = () => dispatch => {
  dispatch({ type: FETCH_TASKS_START });
};
