import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';

const AsyncPageDefault = Loadable({
  loader: () => import('./PageDefault'),
  loading: () => <div>loading page...</div>,
  modules: ['pageDefault'],
});

const AsyncPageAnother = Loadable({
  loader: () => import('./PageAnother'),
  loading: () => <div>loading another page...</div>,
  modules: ['pageAnother'],
});

export default () => (
  <Switch>
    <Route path="/" exact component={AsyncPageDefault} />
    <Route path="/another" component={AsyncPageAnother} />
  </Switch>
);
