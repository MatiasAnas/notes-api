const Server = require('./Server');
const { SERVER_PORT } = require('./constants/server');

const server = new Server(SERVER_PORT);
server.listen();

// TO-DO:
// Add a config view with forms to configure the request delay and enable or disable the request logs.
// Store the config in a json file.
// TO-DO: Add the creation and update times of the notes only for the board, not for the api endpoints.
// TO-DO: Add dynamic port election.
// TO-DO: Add a beautiful home page for the endpoint descriptions.
