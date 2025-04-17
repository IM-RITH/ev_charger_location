// backend/src/controllers/stationController.js
const evChargerService = require("../api/evChargerService");

const getStations = async (req, res, next) => {
  const { near, type, available, min_kw, max_kw, query } = req.query;

  if (!near) {
    // Use next(error) for consistent error handling
    const error = new Error('The "near" parameter is required.');
    error.statusCode = 400;
    return next(error);
  }

  try {
    // Prepare parameters, only including those provided
    const params = {
      near,
      ...(type && { type }),
      ...(available && { available }),
      ...(min_kw && { min_kw }),
      ...(max_kw && { max_kw }),
      ...(query && { query }),
    };

    const stations = await evChargerService.fetchStationsFromApi(params);
    res.json({
      status: "success",
      count: stations.length,
      data: stations,
    }); // Send structured success response
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = {
  getStations,
};
