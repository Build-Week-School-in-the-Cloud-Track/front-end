import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem("token"),
    },
    baseURL: "https://school-in-the-cloud-backend.herokuapp.com/",
  });
};
