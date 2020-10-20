import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.div `
nav {
    display: flex; 
    justify-content: end;
    margin: 2%;
}

nav a {
    text-decoration: none;
    margin: 1%;
    align-items: flex-end;
    font-size: 1rem;
}

`

export default function Header() {
    return (
        <StyledHeader>
            <nav>
            <Link className='register' to='/register'>Register</Link>
            <Link className='login' to='/login'>Login</Link>
            <Link className='taskform' to='/taskform'>Admin View</Link>
            <Link className='tasklist'to='/tasklist'>Volunteer View</Link>
            </nav>
        </StyledHeader>
    )
}