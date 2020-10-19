import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup";

const initialFormValues = {
  email: "",
  password: "",
  name: "",
  role: "",
};

const initialFormErrors = {
  email: "",
  password: "",
  name: "",
  role: "",
};

const initialDisabled = true;

function Register() {
  //Constants Below
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //FormSchema Below
  const registerFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required to register"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Must be at least five characters"),
    name: yup
      .string()
      .required("Name is Required")
      .min(3, "Must be at least three characters"),
    role: yup
      .string()
      .oneOf(
        ["student", "admin", "volunteer"],
        "Please select student, admin, or volunteer"
      )
      .required("Selection required"),
  }); //End of FormSchema
  // inputChange function below
  const inputChange = (name, value) => {
    yup
      .reach(registerFormSchema, name)
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
      email: formValues.email,
      password: formValues.password,
      name: formValues.name,
      role: formValues.role,
    };
    axiosWithAuth()
      .post("/api/auth/register", newUser)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  // onInputChange function input change by target value
  const onInputChange = evt => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  //UseEffect for schema validations when formValues change
  useEffect(() => {
    registerFormSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues]);

  //return statement with form
  return (
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
              type="name"
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
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </label>
            <div>{formErrors.role}</div>
          </div>
        </div>
      </div>
      <button disabled={disabled}>Register</button>
    </form>
  );
} //End of Signup Function

export default Register;
