import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Search from './pages/Search';
import Product from './pages/Product';

const Routes = () => (
    <Switch>
        <Route
            exact
            path='/'
            component={ Search }
        />
        <Route 
            exact
            path='/produtos/:id'
            component= { Product }
        />
        <Route
            component={ () => (
                <div>Page not found</div>
            )}
        />
    </Switch>
);

export default Routes;