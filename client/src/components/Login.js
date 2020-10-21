import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { StyledLogin } from "../StyledComponents/StyledLogin";
import { userLogin } from "../actions";
import { loginSchema } from "./validation/loginSchema";

const defaultformValues = {
  email: "",
  password: "",
};

const defaultErrorValues = {
  email: "",
  password: "",
  requestError: "",
};

function Login(props) {
  const [formValues, setFormValues] = useState(defaultformValues);
  const [errorState, setErrorState] = useState(defaultErrorValues);
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    loginSchema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues, loginSchema]);

  const validate = e => {
    yup
      .reach(loginSchema, e.target.name)
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

    const errorCallback = err => {
      setErrorState({
        ...errorState,
        requestError:
          err && err.response && err.response.data && err.response.data.error,
      });
    };

    const responseCallback = res => {
      localStorage.setItem("token", res.data.token);
      history.push(`/${res.data.user.role}`);
    };

    props.userLogin({ user, errorCallback, responseCallback });
  };

  return (
    <StyledLogin>
      <div className="container">
        <form onSubmit={formSubmit}>
          <h2>Login</h2>
          <label>
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={inputChange}
            />
            {errorState.email ? (
              <p className="error">{errorState.username}</p>
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
            {errorState.password ? (
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
      </div>
    </StyledLogin>
  );
}

export default connect(null, { userLogin })(Login);
