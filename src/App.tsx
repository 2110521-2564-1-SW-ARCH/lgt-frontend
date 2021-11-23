import React from 'react';
import './styles/app.scss';
import { Switch, Route } from "react-router-dom";

import { 
  Home, 
  Login, 
  AddRoute, 
  ResetPassword, 
  Register 
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
        <PrivateRoute exact key="home" path="/home" component={Home} />
        <PrivateRoute exact key="addRoute" path="/transport/add" component={AddRoute} />
      </Switch>
    </div>
  );
}

export default App;
