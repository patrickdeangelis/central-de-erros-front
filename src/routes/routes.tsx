import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import SignIn from "../pages/SignIn";
import Dashboard from '../pages/Dashboard'
import Details from '../pages/Details';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/details/:id" exact component={Details} />
      </Switch>
    </Router>
  );
}
