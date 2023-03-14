const TrayTextAdd = require("../models/traytextadd.model");

exports.traytextadd = async (req, res) => {
  const trayTextAddData = new TrayTextAdd(req.body);

  TrayTextAdd.findOne({ textId: trayTextAddData.textId }, (err, result) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Failed to connect with Database",
      });
    }
    if (!result) {
      const newTrayTextAdd = new TryTextAdd(trayTextAddData);
      newTrayTextAdd.save((err, result) => {
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
      TrayTextAdd.replaceOne(
        {
          textId: trayTextAddData.textId,
        },
        {
          textId: trayTextAddData.textId,
          time_to_stay: trayTextAddData.time_to_stay,
          time_interval: trayTextAddData.time_interval,
          status: trayTextAddData.status,
          title: trayTextAddData.title,
          discription: trayTextAddData.discription,
          target_url: trayTextAddData.target_url,
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
                time_to_stay: trayTextAddData.time_to_stay,
                time_interval: trayTextAddData.time_interval,
                status: trayTextAddData.status,
                title: trayTextAddData.title,
                discription: trayTextAddData.discription,
                target_url: trayTextAddData.target_url,
                message: result,
              },
            });
          }
        }
      );
    }
  });
};

// Get Data

exports.gettraytextadd = (req, res) => {
  TrayTextAdd.findOne({}, { _id: 0, textId: 0, __v: 0 }, (err, result) => {
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
