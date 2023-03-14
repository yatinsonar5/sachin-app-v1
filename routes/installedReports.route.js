const express = require("express");
const installedReportsRouter = express.Router();
const InstalledReports = require("../controller/installed-reports.controller");

installedReportsRouter.post(
  "/api/installedreports",
  InstalledReports.installedreports
);
installedReportsRouter.get(
  "/api/getinstalledreports",
  InstalledReports.getinstalledreports
);

module.exports = installedReportsRouter;
