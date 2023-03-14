const express = require("express");
const OpenTabRouter = express.Router();
const OpenTab = require("../controller/opentab.controller");

OpenTabRouter.get("/api/getopentab", OpenTab.getopentab);
OpenTabRouter.post("/api/opentab", OpenTab.opentab);

module.exports = OpenTabRouter;
