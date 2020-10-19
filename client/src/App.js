import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import {Register} from './components/Register'

function App() {
  return <div className="App">
    <Switch>
      <Route path='/register' component={Register} />
    </Switch>
  </div>;
}

export default App;
