import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './src/components/Login';
import Base from './src/pages/Base'; 

const App = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/base" component={Base} />
        {/* ... otras rutas ... */}
    </Switch>
);

export default App;