const express = require('express');
const loginRouter = express.Router();
const Login = require('../controller/login.controller');

loginRouter.post("/api/login", Login.login)

module.exports = loginRouter;
