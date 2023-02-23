// Post opentab Url Data

app.post("/api/opentab", (req, res) => {
  let urlData = req.body;
  // console.log(urlData)
  if (!Object.keys(urlData).length) {
    res.status(400).send({
      code: 400,
      status: "Bad Request",
      message: "Please send some Valid Data",
    });
    return;
  }

  fs.writeFile("./text/url.txt", JSON.stringify(urlData), (err) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Failed to send URL data",
      });
      return;
    }
    res.send({
      code: 200,
      status: "Success",
      message: "Url Data send Successfully",
      data: urlData,
    });
  });
});

app.get("/api/opentab", (req, res) => {
  fs.readFile("./text/url.txt", "utf-8", (err, urlData) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Failed to read URL data",
      });
      return;
    }
    if (!urlData) {
      res.status(400).send({
        code: 400,
        status: "Bad Request",
        message: "UrlData is not Availble, file is empty",
      });
      return;
    }
    res.status(200).send({
      code: 200,
      status: "Success",
      message: "Url Data Fetched Successfully",
      data: JSON.parse(urlData),
    });
  });
});

// const openTab = require("./models/opentab_model");

// app.post("/api/opentab", async (req, res) => {
//   const urlData = new openTab(req.body);

//   openTab.findOne({ url: urlData.url }, (err, result) => {
//     if (err) {
//       res.status(500).send({
//         code: 500,
//         status: "Internal Server Error",
//         message: "Failed to connect with Database",
//       });
//     }
//     if (!result) {
//       const newopenTab = new openTab(urlData);
//       newopenTab.save((err, result) => {
//         if (err) {
//           res.status(500).send({
//             code: 500,
//             status: "Internal Server Error",
//             message: "Failed to save URL data in Database",
//           });
//         } else {
//           res.status(201).send({
//             code: 201,
//             status: "Created",
//             message: "URL data created and saved in Database Successfully",
//             data: result,
//           });
//         }
//       });
//     } else if (result) {
//       openTab.updateOne(
//         {
//           url: urlData.url,
//         },
//         {
//           time: urlData.time,
//           open_tab_status: urlData.open_tab_status,
//         },
//         (err, result) => {
//           if (err) {
//             res.status(500).send({
//               code: 500,
//               status: "Internal Server Error",
//               message: "Failed to connect to database to update URL data",
//             });
//           } else {
//             res.status(200).send({
//               code: 200,
//               status: "Success",
//               message: "URL Data updated Successfully",
//               data: result,
//             });
//           }
//         }
//       );
//     }
//   });
// });

// Get UrlData
// app.get("/api/opentab", (req, res) => {
//   const url = req.query.url;
//   openTab.findOne({ url: url }, (err, result) => {
//     if (err) {
//       res.status(500).send({
//         code: 500,
//         status: "Internal Server Error",
//         message: "Not able to connect with database",
//       });
//     } else if (!result) {
//       res.status(404).send({
//         code: 404,
//         status: "Not Found",
//         message: "Url Data not found in database",
//       });
//     } else {
//       res.status(200).send({
//         code: 200,
//         status: "Success",
//         message: "Url Data fetched Successfully",
//         data: result,
//       });
//     }
//   });
// });
