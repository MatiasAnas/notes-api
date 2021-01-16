class LogRequest {
  handleRequest = (req, _res, next) => {
    console.log(`Request -> URL: '${req.url}' | Method: ${req.method}`);
    console.log('Body:');
    console.log(req.body);
    next();
  };
}

module.exports = LogRequest;
