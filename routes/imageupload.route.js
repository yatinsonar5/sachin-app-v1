const express = require("express");
const imageUploadRouter = express.Router();
const ImageUpload = require("../controller/image-upload.controller");

imageUploadRouter.post("/api/upload", ImageUpload.upload);

module.exports = imageUploadRouter;
