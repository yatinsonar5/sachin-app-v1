const fs = require("fs");
const TrayBanner = require("../models/traybanner.model");

exports.traybanner = async (req, res) => {
  const header = req.body.header_banner;
  const trayBanner = new TrayBanner(req.body);

  if (header || header === "") {
    fs.writeFile(
      "./html/headerBanner.html",
      `<html> ${header} </html>`,
      (err) => {
        if (err) {
          return res.status(500).end({
            code: 500,
            status: "Internal Server Error",
            error: "Error writing to file",
          });
        }
      }
    );
  }

  TrayBanner.findOne({ tray_Id: trayBanner.tray_Id }, (err, result) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Failed to connect with Database",
      });
    }
    if (!result) {
      const newTrayBanner = new TrayBanner(trayBanner);
      newTrayBanner.save((err, result) => {
        if (err) {
          res.status(500).send({
            code: 500,
            status: "Internal Server Error",
            message: "Failed to Save Data in Database",
          });
        } else {
          res.status(201).send({
            code: 201,
            status: "Created",
            message: "Data Saved Successfully",
            data: result,
          });
        }
      });
    } else if (result) {
      TrayBanner.replaceOne(
        {
          tray_Id: trayBanner.tray_Id,
        },
        {
          tray_Id: trayBanner.tray_Id,
          header_banner: trayBanner.header_banner,
          header_banner_status: trayBanner.header_banner_status,
          time: trayBanner.time
        },
        (err, result) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: "Internal Server Error",
              message: "Failed to connect to database to update Data",
            });
          } else {
            res.status(200).send({
              code: 200,
              status: "Success",
              message: "Data Saved Successfully",
              data: {
                header_banner: trayBanner.header_banner,
                header_banner_status: trayBanner.header_banner_status,
                time: trayBanner.time,
                message: result,
              },
            });
          }
        }
      );
    }
  });
};

exports.gettraybanner = (req, res) => {
  TrayBanner.findOne({}, { _id: 0, tray_Id: 0, __v: 0 }, (err, result) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Not able to connect with database",
      });
    } else if (!result) {
      res.status(404).send({
        code: 404,
        status: "Not Found",
        message: "Data not found in database",
      });
    } else {
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "Data fetched Successfully",
        data: result,
      });
    }
  });
};
