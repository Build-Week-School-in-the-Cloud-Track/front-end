import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const formSchema = yup.object().shape({
    username: yup.string().required('please provide username'),
    password: yup.string()
        .required('please enter a password')
        .min(6, 'password is too short')
})


export default function Login () {

    const defaultformValues = {
        username: '', 
        password: '',
    }

    const [formValues, setFormValues] = useState(defaultformValues)
    const [errorState, setErrorState] = useState({...defaultformValues})
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        formSchema.isValid(formValues)
        .then(valid => setDisabled(!valid))
    }, [formValues, formSchema])

    const validate = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState, [e.target.name]: ''
                })
            })
            .catch(err => {
                setErrorState({
                    ...errorState, [e.target.name]: err.errors[0]
                })
            })
    }

    const inputChange = e => {
        e.persist()
        validate(e)
        setFormValues({...formValues, [e.target.name]: e.target.value})

    }

    const formSubmit = e => {
        e.preventDefault()
        console.log('form submitted')
        const user = {
            username: formValues.username.trim(),
            password: formValues.password.trim(),
        }
        axios.post('https://reqres.in/api/user', user)
            .then(res => {
                console.log('success', res.data)
                setFormValues(defaultformValues)
            })
            .catch(err => console.log(err))

    }

    return (
        <form onSubmit={formSubmit}>
            <label>
                Username
                <input
                type='text'
                name='username'
                id='username'
                value={formValues.username}
                onChange={inputChange}
                />
                {errorState.username.length > 0 ? <p className='error'>{errorState.username}</p> : null}
            </label>
            <label>
                Password
                <input
                type='password'
                name='password'
                id='password'
                value={formValues.password}
                onChange={inputChange}
                />
                 {errorState.password.length > 0 ? <p className='error'>{errorState.password}</p> : null}
            </label>
            <button id='submitBtn' disabled={disabled}>Submit</button>
        </form>
    )
}