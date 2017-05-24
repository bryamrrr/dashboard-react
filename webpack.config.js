const client = require('./webpack/webpack.client.config.js');
const server = require('./webpack/webpack.server.config.js');

const dir = __dirname + '/dist';
client.output.path = dir + '/statics';
server.output.path = dir + '/server';

module.exports = [
  client,
  server
];