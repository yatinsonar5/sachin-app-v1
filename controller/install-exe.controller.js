const InstallExe = require("../models/installexe.model");

exports.install_exe = async (req, res) => {
  const installExeData = new InstallExe(req.body);

  InstallExe.findOne({ exe_Id: installExeData.exe_Id }, (err, result) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Failed to connect with Database",
      });
    }
    if (!result) {
      const newInstallExe = new InstallExe(installExeData);
      newInstallExe.save((err, result) => {
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
      InstallExe.replaceOne(
        {
          exe_Id: installExeData.exe_Id,
        },
        {
          exe_Id: installExeData.exe_Id,
          exe_path: installExeData.exe_path,
          time: installExeData.time,
          status: installExeData.status,
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
                exe_path: installExeData.exe_path,
                time: installExeData.time,
                status: installExeData.status,
                message: result,
              },
            });
          }
        }
      );
    }
  });
};

// Get UrlData

exports.getinstall_exe = (req, res) => {
  InstallExe.findOne({}, { _id: 0, exe_Id: 0, __v: 0 }, (err, result) => {
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
