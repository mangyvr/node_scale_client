const WebSocket = require('ws');
const ws = new WebSocket('https://77cb1e6b.ngrok.io');

ws.on('open', function open() {
    console.log('connected');
});

ws.on('message', function incoming(data, flags) {
    console.log(data);
});

ws.on('close', function close() {
    console.log('closed');
});
