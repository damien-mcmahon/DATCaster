import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Recorder from './pages/Recorder';
import Index from './pages/Index';

const App = () => (
  <Router>
    <div>
      <nav>
        <Link to="record">New Cast</Link>
      </nav>
    <Route exact path="/" component={Index} /> 
    <Route path="/record" component={Recorder} />
    </div>
  </Router>
);

export default App;
