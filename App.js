import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard'; // Asegúrate de importar tu componente Dashboard

const App = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        {/* ... otras rutas ... */}
    </Switch>
);

export default App;