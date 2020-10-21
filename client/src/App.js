import React from "react";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { connect } from "react-redux";
import Register from "./components/Register";
import Taskform from "./components/Taskform";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin">
          <Taskform />
          <TaskList />
        </PrivateRoute>
        <PrivateRoute path="/volunteer">
          <TaskList />
        </PrivateRoute>
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
