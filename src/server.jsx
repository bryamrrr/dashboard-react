import express from 'express';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Layout from './layout';
import { description } from '../package.json';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://statics.test.com'
  : 'http://localhost:8081';
const env = process.env.NODE_ENV;

const app = express();

app.get('*', (req, res) => {
  const context = {};

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
