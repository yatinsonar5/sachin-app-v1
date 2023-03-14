const versionControl = require("../models/version_control.model");

exports.versioncontrol = async (req, res) => {
  const versionControlData = new versionControl(req.body);

  versionControl.findOne({ vcId: versionControlData.vcId }, (err, result) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Failed to connect with Database",
      });
    }
    if (!result) {
      const NewVersionControl = new versionControl(versionControlData);
      NewVersionControl.save((err, result) => {
        if (err) {
          res.status(500).send({
            code: 500,
            status: "Internal Server Error",
            message: "Failed to save Version Control data in Database",
          });
        } else {
          res.status(201).send({
            code: 201,
            status: "Created",
            message: "Version Control data Saved Successfully",
            data: result,
          });
        }
      });
    } else if (result) {
      versionControl.replaceOne(
        {
          vcId: versionControlData.vcId,
        },
        {
          vcId: versionControlData.vcId,
          download_url: versionControlData.download_url,
          current_version: versionControlData.current_version,
          status: versionControlData.status,
        },
        (err, result) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: "Internal Server Error",
              message:
                "Failed to connect to database to update Version Control data",
            });
          } else {
            res.status(200).send({
              code: 200,
              status: "Success",
              message: "Version Control Data Saved Successfully",
              data: result,
            });
          }
        }
      );
    }
  });
};

exports.getversioncontrol = (req, res) => {
  versionControl.findOne({}, { _id: 0, vcId: 0, __v: 0 }, (err, result) => {
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
        message: "Version Control Data not found in database",
      });
    } else {
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "Version Control Data fetched Successfully",
        data: result,
      });
    }
  });
};
