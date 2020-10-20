import React from 'react';
import Login from './components/Login'
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Taskform from './components/Taskform'
import Header from './components/Header'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Taskform} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}
