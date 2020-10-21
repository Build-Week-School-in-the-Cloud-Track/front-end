import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCH_TASKS_START = "FETCH_TASKS_START";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const USER_LOGIN = "USER_LOGIN";

export const getTasks = () => dispatch => {
  dispatch({ type: FETCH_TASKS_START });
};

export const userLogin = ({
  user,
  errorCallback,
  responseCallback,
}) => dispatch => {
  axiosWithAuth()
    .post("/api/auth/login", user)
    .then(res => {
      console.log("Before Dispatch");
      dispatch({ type: USER_LOGIN, payload: res.data.user });
      console.log("After Dispatch");
      responseCallback(res);
    })
    .catch(err => errorCallback(err));
};
