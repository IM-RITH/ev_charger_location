const express = require("express");
const stationRoutes = require("./stationRoutes");

const router = express.Router();

// Mount station routes under /stations
router.use("/stations", stationRoutes);

// Simple health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

module.exports = router;
