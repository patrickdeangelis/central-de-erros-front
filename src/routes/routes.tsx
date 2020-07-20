import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import SignIn from "../pages/SignIn";
import Dashboard from '../pages/Dashboard'
import Details from '../pages/Details';
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/resetpassword/:uid/:token/" exact component={ResetPassword} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/details/:id" exact component={Details} />
      </Switch>
    </Router>
  );
}
