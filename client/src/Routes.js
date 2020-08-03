import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Auth from './components/hoc/auth';

import Home from './components/home';
import RegisterLogin from './components/register_login';
import Dashboard from './components/dashboard';
import Register from './components/register_login/register';
import Layout from './components/hoc/layout';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Auth(Home, false)} />
                <Route path='/register' exact component={ Auth(Register, false) } />
                <Route path='/register_login' exact component={ Auth(RegisterLogin, false) } />
                <Route path='/dashboard' exact component={ Auth(Dashboard, true) } />
            </Switch>
        </Layout>
    )
};

export default Routes;
