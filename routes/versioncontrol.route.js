const express = require("express");
const versionControlRouter = express.Router();
const VersionControl = require("../controller/version-control.controller");

versionControlRouter.get(
  "/api/getversioncontrol",
  VersionControl.getversioncontrol
);
versionControlRouter.post("/api/versioncontrol", VersionControl.versioncontrol);

module.exports = versionControlRouter;
