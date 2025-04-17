const morgan = require("morgan");

// Use 'dev' format for logging during development
const requestLogger = morgan("dev");

module.exports = requestLogger;
