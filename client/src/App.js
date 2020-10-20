import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";

import Register from "./components/Register";
import Taskform from "./components/Taskform";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/taskform" component={Taskform} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}
