const express = require("express");
const allDetailsRouter = express.Router();
const AllDetails = require("../controller/all-details.controller");

allDetailsRouter.get("/api/getDetails", AllDetails.getDetails);

module.exports = allDetailsRouter;
