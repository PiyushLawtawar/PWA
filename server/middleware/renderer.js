import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import App from '../../src/App';
import Template from './template';
import manifest from '../../public/manifest.json';

export default (store) => (reqRoute, cb) => {
  const modules = [];
  const routerContext = {};

  // render the app as a string
  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={m => modules.push(m)}>
      <ReduxProvider store={store}>
        <StaticRouter location={`/${reqRoute}`} context={routerContext}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    </Loadable.Capture>
  );

  // get the stringified state
  const reduxState = JSON.stringify(store.getState());

  // get HTML headers
  const helmet = Helmet.renderStatic();
  let htmlData = Template(manifest['main.js'], manifest['vendor.js'], manifest['main.css'], html);

  // now inject the rendered app into our html and send it to the client
  htmlData = htmlData
    // write the string version of our state
    .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
    // write the HTML header tags
    .replace('<title></title>', helmet.title.toString() + helmet.meta.toString());

  return cb(null, htmlData);
}
