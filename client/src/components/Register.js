import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userRegister } from "../actions";
import { Link, useHistory } from "react-router-dom";
import { registerSchema } from "./validation/registerSchema";
import { StyledRegister } from "../StyledComponents/StyledRegister";
import * as yup from "yup";

const initialFormValues = {
  email: "",
  password: "",
  name: "",
  role: 0,
  country: "",
};

const initialFormErrors = {
  email: "",
  password: "",
  name: "",
  role: "",
  country: "",
};

const initialDisabled = true;

function Register(props) {
  //Constants Below
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

  // inputChange function below
  const inputChange = (name, value) => {
    yup
      .reach(registerSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // onSubmit function prevent default, envoke submit
  const onSubmit = evt => {
    evt.preventDefault();
    const newUser = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      name: formValues.name.trim(),
      role: parseInt(formValues.role),
      country: formValues.country,
    };

    const responseCallback = res => {
      localStorage.setItem("token", res.data.token);
      history.push(`/${res.data.user.role}`);
    };
    const errorCallback = err => console.log(err.response);

    props.userRegister({ newUser, responseCallback, errorCallback });
  };

  // onInputChange function input change by target value
  const onInputChange = evt => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  //UseEffect for schema validations when formValues change
  useEffect(() => {
    registerSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues]);

  //return statement with form
  return (
    <StyledRegister>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="whole-form">
            <h2>Sign Up Below!</h2>
            <div className="form-inputs">
              <label>
                Email:
                <input
                  value={formValues.email}
                  onChange={onInputChange}
                  name="email"
                  type="email"
                />
              </label>
              <div>{formErrors.email}</div>
              <label>
                Password:
                <input
                  value={formValues.password}
                  onChange={onInputChange}
                  name="password"
                  type="password"
                />
              </label>
              <div>{formErrors.password}</div>
              <label>
                Name:
                <input
                  value={formValues.name}
                  onChange={onInputChange}
                  name="name"
                  type="text"
                />
              </label>
              <div>{formErrors.name}</div>
              <div className="select">
                <label>
                  Role
                  <select
                    className="field"
                    onChange={onInputChange}
                    value={formValues.role}
                    name="role"
                  >
                    <option value="">--Select--</option>
                    <option value={1}>Student</option>
                    <option value={2}>Admin</option>
                    <option value={3}>Volunteer</option>
                  </select>
                </label>
                {formValues.role == 3 ? (
                  <label>
                    Country
                    <input
                      value={formValues.country}
                      onChange={onInputChange}
                      name="country"
                      type="text"
                    />
                  </label>
                ) : null}
                <div>{formErrors.role}</div>
              </div>
            </div>
          </div>
          <button disabled={disabled}>Register</button>
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
    </StyledRegister>
  );
} //End of Signup Function

export default connect(null, { userRegister })(Register);
