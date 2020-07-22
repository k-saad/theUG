import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Auth from './components/hoc/auth';

import Home from './components'
import RegisterLogin from './components/register_login';
import Dashboard from './components/dashboard';
import Register from './components/register_login/register';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Auth(Home, false)} />
            <Route path='/register' exact component={ Auth(Register, false) } />
            <Route path='/register_login' exact component={ Auth(RegisterLogin, false) } />
            <Route path='/dashboard' exact component={ Auth(Dashboard, true) } />
        </Switch>
    )
};

export default Routes;
