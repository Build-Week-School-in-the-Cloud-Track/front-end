import React from 'react';
import Login from './components/Login'
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import Register from "./components/Register";
import Taskform from './components/Taskform';
import TaskList from './components/TaskList'
import Header from './components/Header'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/taskform" component={Taskform} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/tasklist' component={TaskList} />
      </Switch>
    </div>
  );
}
