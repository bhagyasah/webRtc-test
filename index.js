const express = require('express');
const http = require('http');
const run = require('app-node');
const app = express();
const path = require('path');

const server = http.createServer(app);
  app.use(express.static(path.resolve(__dirname,'.','html')));
  server.listen(6001);
  console.log(`server started at port 6001`);
