const express = require("express");
const TrayBannerRouter = express.Router();
const TrayBanner = require("../controller/traybanner.controller");

TrayBannerRouter.get("/api/gettraybanner", TrayBanner.gettraybanner);
TrayBannerRouter.post("/api/traybanner", TrayBanner.traybanner);

module.exports = TrayBannerRouter;