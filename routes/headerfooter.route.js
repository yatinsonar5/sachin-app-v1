const express = require('express');
const headerFooterStatusRouter = express.Router();
const HeaderFooterStatus = require('../controller/header-footer.controller');

headerFooterStatusRouter.post("/api/headerfooter", HeaderFooterStatus.headerfooter)

module.exports = headerFooterStatusRouter