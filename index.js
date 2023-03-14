const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Environment Variable configuration
const dotenv = require("dotenv");
dotenv.config();

// Cors Handling
const cors = require("cors");
app.use(cors());

const corsOptions = {
  origin: ["http://example.com", "http://example2.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//Cache Control

// const nocache = require("nocache");
// app.use(nocache());

app.get("/", (req, res) => {
  res.send("Hello, This API is Working");
});

//Creating path to access html files

app.use(express.static(path.join(__dirname, "/html")));

app.get("/header.html", (req, res) => {
  // Set the Cache-Control header to no-cache
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(__dirname, "/html/header.html"));
});

app.get("/footer.html", (req, res) => {
  // Set the Cache-Control header to no-cache
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(__dirname, "/html/footer.html"));
});

app.get("/headerbnanner.html", (req, res) => {
  // Set the Cache-Control header to no-cache
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(__dirname, "/html/headernanner.html"));
});

//Posting Header Footer Content
const headerfooterRoute = require("./routes/headerfooter.route");
app.use("/", headerfooterRoute);

// Opentab Url Data
const opentabRoute = require("./routes/opentab.route");
app.use("/", opentabRoute);

// Default settings Data
const defaultsettingsRoute = require("./routes/defaultSetting.route");
app.use("/", defaultsettingsRoute);

// Version Control
const versionControlRoute = require("./routes/versioncontrol.route");
app.use("/", versionControlRoute);

// Get all details
const allDetailsRoute = require("./routes/allDetails.route");
app.use("/", allDetailsRoute);

// Image Upload
const imageUploadRoute = require("./routes/imageupload.route");
app.use("/", imageUploadRoute);

// Login
const loginRoutes = require("./routes/login.route");
app.use("/", loginRoutes);

// Installed Reports
const installedReportsRoutes = require("./routes/installedReports.route");
app.use("/", installedReportsRoutes);

// Tray Add Text
const trayAddTextRoutes = require("./routes/traytextadd.route");
app.use("/", trayAddTextRoutes);

// Tray Banner
const trayBannerRoutes = require("./routes/traybanner.route");
app.use("/", trayBannerRoutes);

//InstallExe
const installExeRoutes = require("./routes/installexe.route");
app.use("/", installExeRoutes);

// Port
const port = process.env.PORT;

// Server Initialisation
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
