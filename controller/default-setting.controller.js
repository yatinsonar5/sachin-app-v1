//Using Database method

const defaultSettings = require("../models/default_setting.model");

exports.defaultsettings = async (req, res) => {
  const defaultSettingsData = new defaultSettings(req.body);

  defaultSettings.findOne(
    { urlId: defaultSettingsData.urlId },
    (err, result) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: "Internal Server Error",
          message: "Failed to connect with Database",
        });
      }
      if (!result) {
        const NewDefaultSettings = new defaultSettings(defaultSettingsData);
        NewDefaultSettings.save((err, result) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: "Internal Server Error",
              message: "Failed to save Default Settings data in Database",
            });
          } else {
            res.status(201).send({
              code: 201,
              status: "Created",
              message: "Default Settings data Saved Successfully",
              data: result,
            });
          }
        });
      } else if (result) {
        defaultSettings.replaceOne(
          {
            urlId: defaultSettingsData.urlId,
          },
          {
            urlId: defaultSettingsData.urlId,
            url: defaultSettingsData.url,
            status: defaultSettingsData.status,
          },
          (err, result) => {
            if (err) {
              res.status(500).send({
                code: 500,
                status: "Internal Server Error",
                message:
                  "Failed to connect to database to update Default Settings data",
              });
            } else {
              res.status(200).send({
                code: 200,
                status: "Success",
                message: "Default Settings Data Saved Successfully",
                data: {
                  url: defaultSettingsData.url,
                  status: defaultSettingsData.status,
                  message: result,
                },
              });
            }
          }
        );
      }
    }
  );
};

// Get UrlData

exports.getdefaultsettings = (req, res) => {
  defaultSettings.findOne({}, { _id: 0, urlId: 0, __v: 0 }, (err, result) => {
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
        message: "Default Settings Data not found in database",
      });
    } else {
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "Default Settings Data fetched Successfully",
        data: result,
      });
    }
  });
};

// Using text file method

// const fs = require("fs")

// exports.defaultsettings = (req, res) => {
//   let data = req.body;
//   // console.log(urlData)
//   if (!Object.keys(data).length) {
//     res.status(400).send({
//       code: 400,
//       status: "Bad Request",
//       message: "Please send some Valid Data",
//     });
//     return;
//   }

//   fs.writeFile("./text/default.txt", JSON.stringify(data), (err) => {
//     if (err) {
//       res.status(500).send({
//         code: 500,
//         status: "Internal Server Error",
//         message: "Failed to send Default Settings Data",
//       });
//       return;
//     }
//     res.send({
//       code: 200,
//       status: "Success",
//       message: "Default Settings Data send Successfully",
//       data: data,
//     });
//   });
// };

// exports.getdefaultsettings = (req, res) => {
//   fs.readFile("./text/default.txt", "utf-8", (err, data) => {
//     if (err) {
//       res.status(500).send({
//         code: 500,
//         status: "Internal Server Error",
//         message: "Failed to read URL data",
//       });
//       return;
//     }
//     if (!data) {
//       res.status(400).send({
//         code: 400,
//         status: "Bad Request",
//         message: "Default Settings Data is not Availble, file is empty",
//       });
//       return;
//     }
//     res.status(200).send({
//       code: 200,
//       status: "Success",
//       message: "Default Settings Data Fetched Successfully",
//       data: JSON.parse(data),
//     });
//   });
// };
