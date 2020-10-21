import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import img from "../img/clouds1.jpg";
import { userLogin } from "../actions";

export const StyledLogin = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
  }

  .container {
    height: 100vh;
    background-image: url(${img});
  }

  h2 {
    margin: 6% 0 4% 0;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
    font-size: 1.4rem;
  }

  input,
  textarea {
    width: 100%;
    margin: 5px 0 0;
    display: block;
    width: 100%;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 10px;
    transition: all 0.3s;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    background-color: white;
  }
  select {
    height: 40px;
    width: 325px;
  }

  select:focus {
    outline: none;
    border-color: #0099ff;
  }

  input:focus {
    outline: none;
    border-color: #0099ff;
  }

  input:placeholder {
    color: #a8b2b2;
  }

  button {
    width: 150px;
    display: inline-block;
    padding: 8px 11px;
    font-size: 1.2rem;
    text-transform: uppercase;
    border: 0;
    border-radius: 5px;
    letter-spacing: 2px;
    outline: none;
    background-color: #0099ff;
    background-image: linear-gradient(to right, #0099ff, #ccf5ff);
    color: #fff;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    background-image: none;
    background-color: #ccf5ff;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
  }

  button:disabled {
    background-image: none;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }

  .error {
    font-size: 1.2rem;
    color: red;
  }

  .terms {
    display: inline-block;
    align-self: self-start;
  }

  .terms input {
    width: 15px;
    display: inline-block;
    margin-right: 5px;
  }
`;

const formSchema = yup.object().shape({
  email: yup.string().required("please provide email"),
  password: yup
    .string()
    .required("please enter a password")
    .min(5, "password is too short"),
});

function Login(props) {
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
              type="text"
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
