let wsClient = function (scaleData, scaleSm) {
  const WebSocket = require('ws');
  const ws = new WebSocket('https://4f568726.ngrok.io');

  ws.on('open', function open() {
    console.log('WS scale connected');
  });

  ws.on('message', function incoming(data, flags) {
    // console.log(data.match(scaleRe)[0]);
    //Keep scaleData at 1023
    scaleData.shift();
    let currWeight = data.match( /(-)?\d+\.\d+/)[0];
    scaleData.push(currWeight);
    scaleSm.setNextState(parseFloat(currWeight));
    if ( scaleSm.transitionReady() ) {
      scaleSm.transition();
    }
    // console.log(`weight: ${currWeight}`);
    // console.log(`currState: ${scaleSm.getCurrState()}`);
    // console.log(`nextState: ${scaleSm.getNextState()}`);
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
