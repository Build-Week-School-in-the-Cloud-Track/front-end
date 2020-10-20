import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: JSON.parse(localStorage.getItem("token")),
    },
    baseURL: "https://school-in-the-cloud-backend.herokuapp.com/",
  });
};
