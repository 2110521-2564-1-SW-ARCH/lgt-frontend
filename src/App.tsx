import React from 'react';
import './styles/app.scss';
import { Switch, Route } from "react-router-dom";

import { Home } from './pages';
import { Login } from './pages';
import { ResetPassword } from './pages'
import { Register } from './pages'
import { MyRoutes } from './pages'
import { Plan } from './pages';
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
        <PrivateRoute exact key="my-routes" path="/my-routes" component={MyRoutes} />
        <PrivateRoute exact key="home" path="/home" component={Home} />
        <PrivateRoute exact key="plan-detail" path={`/routes/:id`} component={Plan} />
      </Switch>
    </div>
  );
}

export default App;
