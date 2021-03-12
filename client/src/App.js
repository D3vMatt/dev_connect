import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/layout/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/layout/ProfileForm';
import EducationForm from './components/layout/EducationForm';
import ExperienceForm from './components/layout/ExperienceForm';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { setAuthTokenAsGlobalHeader } from './utils/setAuthToken';
import { authenticateUser } from './actions/auth';

setAuthTokenAsGlobalHeader();

const App = () => {
  useEffect(() => {
    store.dispatch(authenticateUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Alert />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/profile/edit'
                component={ProfileForm}
              />
              <PrivateRoute
                exact
                path='/profile/experience/add'
                component={ExperienceForm}
              />
              <PrivateRoute
                exact
                path='/profile/education/add'
                component={EducationForm}
              />
            </div>
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;
