import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios'
import * as yup from "yup";
import styled from 'styled-components';
import img from '../img/clouds1.jpg'


export const StyledRegister = styled.div`

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
  border-color:#0099ff;
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

`

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
    // axiosWithAuth()
    //   .post("/api/auth/register", newUser)
    axios.post('https://reqres.in/api/user')
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
    <StyledRegister>
    <div className='container'>
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
    </div>
    </StyledRegister>
  );
} //End of Signup Function

export default Register;
