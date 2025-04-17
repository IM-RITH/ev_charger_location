// backend/src/config/index.js
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5001,
  externalApiUrl: process.env.EXTERNAL_API_URL,
  // Be more specific in production
  corsOrigin: process.env.CORS_ORIGIN || "*",
};
