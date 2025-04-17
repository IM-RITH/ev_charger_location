const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes"); // Main router
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");

const app = express();

// --- Middleware ---
// Enable CORS
app.use(cors({ origin: config.corsOrigin })); // Use config for origin

// Request logging
app.use(requestLogger);

// Body parsing (optional for this GET endpoint, but good practice)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
// Mount all routes under /api
app.use("/api", routes);

// --- Not Found Handler ---
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// --- Centralized Error Handler ---
// Must be the last middleware
app.use(errorHandler);

// --- Start Server ---
app.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`CORS Origin: ${config.corsOrigin}`);
});
