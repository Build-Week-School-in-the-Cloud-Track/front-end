import React from 'react';
import './App.css';
import Login from './components/Login'
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}
