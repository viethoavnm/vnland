import React from 'react';
import { BrowserRouter, HashRouter, Router, Route, Switch } from 'react-router-dom';
import { history } from '../src/helper';

import {
  PageNotFound,
  Login,
  Register,
  ForgotPW
} from './pages';

import {
  Home
} from "./pages/admins";

import { PrivateRoute, NotRequireLogin, RequireLogin } from './components/commons';

export default () =>
  <Router history={history}>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/ForgotPw" component={ForgotPW} />

      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/Home" component={Home} />

      <Route component={PageNotFound}></Route>
    </Switch>
  </Router>;