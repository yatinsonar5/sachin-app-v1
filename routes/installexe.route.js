const express = require("express");
const InstallExeRouter = express.Router();
const InstallExe = require("../controller/install-exe.controller");

InstallExeRouter.get("/api/getinstall_exe", InstallExe.getinstall_exe);
InstallExeRouter.post("/api/install_exe", InstallExe.install_exe);

module.exports = InstallExeRouter;
