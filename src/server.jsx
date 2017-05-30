import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './reducers/store';

import Layout from './layout';
import Page from './page';
import { description } from '../package.json';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://statics.test.com'
  : 'http://localhost:8081';
const env = process.env.NODE_ENV;

const app = express();

app.get('*', (req, res) => {
  const context = {};
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Page />
      </StaticRouter>
    </Provider>,
  );

  res.setHeader('Content-Type', 'text/html');

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
  }

  res.write(
    renderToStaticMarkup(
      <Layout
        title={description}
        content={html}
        domain={domain}
        env={env}
      />,
    ),
    () => {
      res.end();
    },
  );
});

const port = 8080;
app.listen(port);
