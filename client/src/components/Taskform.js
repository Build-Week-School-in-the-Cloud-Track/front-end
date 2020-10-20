import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../img/clouds1.jpg'

export const NewTaskForm = styled.div`
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

input {
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

.terms input {
  width: 15px;
  display: inline-block;
  margin-right: 5px;
}

body {
  background-image: url('https://images.unsplash.com/uploads/14114640960629b5c3fa0/116dc05a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
  background-repeat: no-repeat;
}
`
const initialFormValues = {
    task: "",
    completed: false,
  };

  const initialFormErrors = {
    task: "",
  };

  const initialDisabled = true;
  function Taskform() {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    //FormSchema Below
    const taskformSchema = yup.object().shape({
      task: yup
        .string()
        .required("Task is required to register")
        .min(5, "Must be at least five characters"),
    }); 
    
    //End of FormSchema
    const inputChange = (name, value) => {
      yup
        .reach(taskformSchema, name)
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

    const onSubmit = evt => {
      evt.preventDefault();
      const newTask = {
        task: formValues.task,
        completed: false,
      };
      axios
        .post('https://reqres.in/api/users', newTask)
        .then(res => console.log('submitted', res.data))
        .catch(err => console.log(err));
    };

    const onInputChange = evt => {
      const { name, value } = evt.target;
      inputChange(name, value);
    };

    useEffect(() => {
      taskformSchema.isValid(formValues).then(valid => {
        setDisabled(!valid);
      });
    }, [formValues]);

    return (
      <NewTaskForm>
        <div className='container'>
          <form onSubmit={onSubmit}>
            <h2>Task Log</h2>
            <div className="whole-form">
              <div className="form-inputs">
                  <input
                    value={formValues.task}
                    onChange={onInputChange}
                    name="task"
                    type="text"
                    placeholder="New Task Here"
                  />
                <div>{formErrors.task}</div>
              </div>
            </div>
            <button disabled={disabled} type="submit">Send Task</button>
          </form>
        </div>
        </NewTaskForm>
      );
  }; //End of Taskform
  export default Taskform;