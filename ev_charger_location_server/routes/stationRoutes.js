const express = require("express");
const stationController = require("../controller/stationController");

const router = express.Router();

router.get("/", stationController.getStations);

module.exports = router;
