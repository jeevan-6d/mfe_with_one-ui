import CONFIG from "./config";

const BASE_URL = CONFIG.BASE_URL;
let options = {
  GET: {
    method: "GET",
  },
  POST: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
  PUT: {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  },
  DELETE: {
    method: "DELETE",
  },
};

module.exports = options;
