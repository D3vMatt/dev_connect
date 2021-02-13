import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

const App = () => (
  <Fragment>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <div className='container'>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </div>
      </Switch>
    </Router>
  </Fragment>
);

export default App;
