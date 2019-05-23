const express = require('express');
const http = require('http');
const run = require('app-node');
const app = express();
const path = require('path');
const webSocket = require('ws');

const server = http.createServer(app);
  app.use(express.static(path.resolve(__dirname,'.','html')));
  server.listen(9090);
  console.log(`server started at port 9090`);

  const wss =  new webSocket.Server({port:9091});

  wss.on('connection', (ws, req) => {
    console.log('onconection called');
    wss.onmessage((msg) => {
      console.log(msg);
    })
  })
