import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './components'
import RegisterLogin from './components/register_login';
import Dashboard from './components/dashboard';

const Routes = () => {
return(
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/register_login' exact component={ RegisterLogin } />
        <Route path='/user/dashboard' exact component={ Dashboard } />

    </Switch>
)
};

export default Routes;
