import React from 'react';
import PropTypes from 'prop-types';

function Layout(props) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/png" href={`${props.domain}/icons/yachay-tiny-logo.png`} />
        <link rel="stylesheet" href={`${props.domain}/css/base.css`} />
        <link rel="stylesheet" href={`${props.domain}/styles.css`} />
      </head>
      <body>
        <div
          id="render-target"
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        />
        <script src={`${props.domain}/bundle.js`} />
        { props.env !== 'production' && (
          <script src="http://localhost:35729/livereload.js" />
        )}
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  env: PropTypes.string,
};

Layout.defaultProps = {
  env: 'development',
};

export default Layout;
