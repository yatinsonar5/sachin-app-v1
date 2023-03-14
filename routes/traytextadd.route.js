const express = require("express");
const TrayTextAddRouter = express.Router();
const TrayTextAdd = require("../controller/traytextadd.controller");

TrayTextAddRouter.get("/api/gettraytextadd", TrayTextAdd.gettraytextadd);
TrayTextAddRouter.post("/api/traytextadd", TrayTextAdd.traytextadd);

module.exports = TrayTextAddRouter;
