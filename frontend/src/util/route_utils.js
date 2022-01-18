import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

// <AuthRoute path="" component={} />
// only seen if user is logged out
const Auth = ({ loggedIn, path, component: Component, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props => (
            loggedIn ? <Redirect to="/" /> : <Component {...props} />
        )}
    />
);

// PROTECTED ROUTES
const Protected = ({ loggedIn, path, component: Component}) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/" />
        )}
    />
)

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP)(Protected));