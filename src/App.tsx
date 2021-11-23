import React from 'react';
import './styles/app.scss';
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Login,
  AddRoute,
  ResetPassword,
  Register,
  MyRoutes,
  GeneratePlan,
  Plan
} from './pages';

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
        <PrivateRoute exact key="addRoute" path="/transport/add" component={AddRoute} />
        <PrivateRoute exact key="generated-plan" path="/plan/generated" component={GeneratePlan} />
      </Switch>
    </div>
  );
}

export default App;
