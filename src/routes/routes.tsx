import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import SignIn from "../pages/SignIn";
import Dashboard from '../pages/Dashboard'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}
