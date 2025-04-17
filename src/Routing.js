import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DuffelFlightsForm from './components/DuffelFlightsForm';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={DuffelFlightsForm} />
      </Switch>
    </Router>
  );
};

export default Routing;