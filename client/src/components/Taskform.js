import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NewTaskForm = styled.div`
    display: flex;
    justify-content: center;
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
    }); //End of FormSchema
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
        .then(res => console.log(res))
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
      <form onSubmit={onSubmit}>
        <NewTaskForm >
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
        </NewTaskForm>
      </form>  
      );
  }; //End of Taskform
  export default Taskform;