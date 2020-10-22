import React from "react";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { connect } from "react-redux";
import Register from "./components/Register";
import Taskform from "./components/Taskform";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import VolunteerList from "./components/VolunteerList";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" component={Taskform} />
        <PrivateRoute path="/volunteer" component={TaskList} />
        <PrivateRoute path="/student" component={VolunteerList} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, {})(App);
