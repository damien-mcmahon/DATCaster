import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Recorder from './recorder';
import Index from './home';
import Channel from './channel';

const App = () => (
  <Router>
    <div>
      <nav>
        <Link to="record">New Cast</Link>
        <Link to="channel">Your Channel</Link>
      </nav>

      <Route exact path="/" component={Index} /> 
      <Route path="/record" component={Recorder} />
      <Route path="/channel" component={Channel} />
    </div>
  </Router>
);

export default App;
