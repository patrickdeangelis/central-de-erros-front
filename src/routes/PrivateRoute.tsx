import React from 'react';
import {Redirect, Route, RouteProps as ReactDOMRouteProps} from 'react-router-dom';
import {useAuth} from '../hooks/AuthContext'

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useAuth();

  return (
    <Route
      component={() => {
        return isAuthenticated() ? <Component/> : <Redirect to={{pathname: '/'}}/>
      }}
      {...rest}
    />
  );
}

export default PrivateRoute;