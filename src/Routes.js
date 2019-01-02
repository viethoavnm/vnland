import React from 'react';
import { BrowserRouter, HashRouter, Router, Route, Switch } from 'react-router-dom';
import { history } from '../src/helper';

import {
  PageNotFound,
  Login,
  Register,
  ForgotPW
} from './pages';

import { PrivateRoute, NotRequireLogin, RequireLogin } from './components/commons';

export default () =>
  <Router history={history}>
    <Switch>
      <Route component={PageNotFound}></Route>
    </Switch>
  </Router>;