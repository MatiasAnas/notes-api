const Server = require('./Server');
const { SERVER_PORT } = require('./constants/server');

const server = new Server(SERVER_PORT);
server.listen();
