import React from 'react';
import './styles/app.scss';
import { Switch, Route } from "react-router-dom";

import { Home } from './pages';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
          <Route exact key="home" path="/" component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
