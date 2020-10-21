import styled from "styled-components";
import img from "../img/clouds1.jpg";

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
