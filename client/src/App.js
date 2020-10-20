import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Taskform from './components/Taskform';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register}>
         <Register />
        </Route>
        <Route path="/taskform" component={Taskform}>
          <Taskform />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
