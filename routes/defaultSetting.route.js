const express = require("express");
const defaultSettingRouter = express.Router();
const DefaultSetting = require("../controller/default-setting.controller");

defaultSettingRouter.get(
  "/api/getdefaultsettings",
  DefaultSetting.getdefaultsettings
);
defaultSettingRouter.post(
  "/api/defaultsettings",
  DefaultSetting.defaultsettings
);

module.exports = defaultSettingRouter;
