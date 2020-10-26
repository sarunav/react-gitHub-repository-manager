import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Header from './components/ui/Header'
import Home from './components/pages/Home';
import CreateRepository from './components/pages/CreateRepository';
import ViewRepository from './components/pages/ViewRepository';


const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-github" component={CreateRepository} />
          <Route path="/repository/:id" component={ViewRepository} />
        </Switch>
      </Router>
      </>
  );
}

export default App;
