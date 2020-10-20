import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.div `

    display: flex;
    justify-content: space-around;
    align-items: baseline;
    font-family: "Open Sans", Helvetica, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.225em;
    background-color: #2E3842;
    color: #FFFFFF;

    nav {
        display: flex;
        width: 45%;
        justify-content: space-around;
    }

    nav a {
        text-decoration: none;
        margin: 1rem;
        font-size: .75rem;
        color: #FFFFFF;
    }

    h2 {
        font-weight: 800;
    }

    @media (max-width: 945px) {
        flex-direction: column;
        align-items: center;
    }
    `
export default function Header() {
    return (
        <StyledHeader>
            <h2>School in the Cloud</h2>
            <nav>
            <Link className='register' to='/register'>Register</Link>
            <Link className='login' to='/login'>Login</Link>
            <Link className='admin' to='/admin'>Admin</Link>
            <Link className='volunteer'to='volunteer'>Volunteer</Link>
            </nav>
        </StyledHeader>
    )
}