import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCH_TASKS_START = "FETCH_TASKS_START";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";

export const FETCH_VOLUNTEERS_START = "FETCH_VOLUNTEERS_START";
export const FETCH_VOLUNTEERS_SUCCESS = "FETCH_VOLUNTEERS_SUCCESS";
export const FETCH_VOLUNTEERS_FAILURE = "FETCH_VOLUNTEERS_FAILURE";

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
      dispatch({ type: USER_LOGIN, payload: res.data.user });
      responseCallback(res);
    })
    .catch(err => errorCallback(err));
};

export const userRegister = ({
  newUser,
  responseCallback,
  errorCallback,
}) => dispatch => {
  axiosWithAuth()
    .post("/api/auth/register", newUser)
    .then(res => {
      dispatch({ type: USER_REGISTER, payload: res.data.user });
      responseCallback(res);
    })
    .catch(err => errorCallback(err));
};

export const getVolunteers = () => dispatch => {
  dispatch({ type: FETCH_VOLUNTEERS_START });
  axiosWithAuth()
    .get("/api/volunteers")
    .then(res => {
      console.log(res.data);
      dispatch({ type: FETCH_VOLUNTEERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_TASKS_FAILURE,
        payload: err.response.data.message,
      });
    });
};
