import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const formSchema = yup.object().shape({
  email: yup.string().required("please provide email"),
  password: yup
    .string()
    .required("please enter a password")
    .min(5, "password is too short"),
});

export default function Login() {
  const defaultformValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(defaultformValues);
  const [errorState, setErrorState] = useState({
    ...defaultformValues,
    requestError: "",
  });
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues, formSchema]);

  const validate = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = e => {
    e.persist();
    validate(e);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const formSubmit = e => {
    e.preventDefault();
    const user = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    axiosWithAuth()
      .post("/api/auth/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        history.push(`/${res.data.user.role}`);
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          requestError: err.response.data.error,
        });
      });
  };

  return (
    <form onSubmit={formSubmit}>
      <label>
        Email
        <input
          type="text"
          name="email"
          id="email"
          value={formValues.email}
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={inputChange}
        />
        {errorState.password.length > 0 ? (
          <p className="error">{errorState.password}</p>
        ) : null}
      </label>
      <button id="submitBtn" disabled={disabled}>
        Submit
      </button>
      {errorState.requestError && (
        <p classname="error">{errorState.requestError}</p>
      )}
      <Link to="/register">Don't have an account?</Link>
    </form>
  );
}
