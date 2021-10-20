import React from 'react';
import './styles/app.scss';
import { Switch, Route } from "react-router-dom";

import { Home } from './pages';
import { Login } from './pages';
import { ResetPassword } from './pages'
import { Register } from './pages'
import PrivateRoute from "./components/privateroute";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact key="login" path="/" component={Login} />
        <Route
          exact
          key="reset password"
          path="/password/reset"
          component={ResetPassword}
        />
        <Route exact key="register" path="/register" component={Register} />
        <PrivateRoute exact key="home" path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
