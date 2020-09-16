import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Auth from './components/hoc/auth';
import Layout from './components/hoc/layout';

//public
import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/register_login/register';

//private
import Dashboard from './components/dashboard';
import Shop from './components/shop';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Auth(Home, false)} />
                <Route path='/register' exact component={ Auth(Register, false) } />
                <Route path='/register_login' exact component={ Auth(RegisterLogin, false) } />
                <Route path='/shop' exact component={Auth(Shop, true)} />
                <Route path='/dashboard' exact component={ Auth(Dashboard, true) } />
            </Switch>
        </Layout>
    )
};

export default Routes;
