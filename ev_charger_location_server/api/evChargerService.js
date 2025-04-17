const axios = require("axios");
const config = require("../config");

const fetchStationsFromApi = async (params) => {
  if (!config.externalApiUrl) {
    throw new Error("External API URL is not configured.");
  }
  try {
    console.log(
      `Calling External API: ${config.externalApiUrl} with params:`,
      params
    );
    const response = await axios.get(config.externalApiUrl, { params });

    if (response.data && response.data.status === "OK") {
      return response.data.data || []; // Return the data array
    } else {
      console.warn("External API returned non-OK status:", response.data);
      // Create a more specific error
      const error = new Error(
        response.data?.message || "External API returned non-OK status"
      );
      error.statusCode = response.status === 200 ? 502 : response.status; // If API says OK=false but HTTP is 200, treat as Bad Gateway
      error.externalResponse = response.data;
      throw error;
    }
  } catch (error) {
    console.error(
      "Axios error fetching from external API:",
      error.response ? error.response.data : error.message
    );
    if (axios.isAxiosError(error)) {
      const err = new Error(
        error.response?.data?.message ||
          "Failed to communicate with external EV service."
      );
      err.statusCode = error.response?.status || 500;
      throw err;
    }
    // Rethrow other errors (like config errors)
    throw error;
  }
};

module.exports = { fetchStationsFromApi };
