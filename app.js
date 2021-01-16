const Server = require('./Server');
const { SERVER_PORT } = require('./constants/server');

const server = new Server(SERVER_PORT);
server.listen();

//TO-DO: Move the http status codes to constants.
//TO-DO: Add delay middleware only for api routes.
//TO-DO: Add config page for delay configuration and enable request logger middleware.
//TO-DO: Add creation time to notes.
