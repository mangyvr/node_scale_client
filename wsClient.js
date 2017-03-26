var wsClient = function (scaleData) {
  const WebSocket = require('ws');
  const ws = new WebSocket('https://17790942.ngrok.io');

  ws.on('open', function open() {
    console.log('WS scale connected');
  });

  ws.on('message', function incoming(data, flags) {
    // console.log(data.match(scaleRe)[0]);
    //Keep scaleData at 1023
    scaleData.shift();
    scaleData.push(data.match( /(-)?\d+\.\d+/)[0]);
  });

  ws.on('close', function close() {
    console.log('WS scale closed');
  });

  process.on('SIGINT', function() {
    console.log('Closing WS connection.');
    ws.close();
  });
};

module.exports = wsClient;
