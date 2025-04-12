import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HotelAvailability from './components/HotelAvailability';

function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/hotelbeds-hotels-booking-hotel-availability" component={HotelAvailability} />
      </Switch>
    </Router>
  );
}

export default Routing;