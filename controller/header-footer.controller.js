//Posting Header Footer Content
const fs = require("fs");
const headerfooterStatus = require("../models/header_footer.model");

exports.headerfooter = async (req, res) => {
  const header = req.body.header;
  const footer = req.body.footer;
  const header_footer = new headerfooterStatus(req.body);

  // res.set("Cache-Control", "no-store");

  if (header || header === "") {
    fs.writeFile("./html/header.html", `<html> ${header} </html>`, (err) => {
      if (err) {
        return res.status(500).end({
          code: 500,
          status: "Internal Server Error",
          error: "Error writing to file",
        });
      }
    });
  }
  if (footer || footer === "") {
    fs.writeFile("./html/footer.html", `<html> ${footer} </html>`, (err) => {
      if (err) {
        return res.status(500).send({
          code: 500,
          status: "Internal Server Error",
          error: "Error writing to file",
        });
      }
    });
  }
  headerfooterStatus.findOne(
    {
      status_Id: header_footer.status_Id,
    },
    (err, result) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: "Internal Server Error",
          message: "Failed to find Header Footer Status data in Database",
        });
      }
      if (!result) {
        const newheaderfooterStatus = new headerfooterStatus(header_footer);
        newheaderfooterStatus.save((err) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: "Internal Server Error",
              message: "Failed to save Header Footer Status data in Database",
            });
          }
        });
      }
      if (result) {
        headerfooterStatus.replaceOne(
          {
            status_Id: header_footer.status_Id,
          },
          {
            status_Id: header_footer.status_Id,
            header: header_footer.header,
            header_status: header_footer.header_status,
            header_time_interval: header_footer.header_time_interval,
            footer: header_footer.footer,
            footer_status: header_footer.footer_status,
            footer_time_interval: header_footer.footer_time_interval,
          },
          (err) => {
            if (err) {
              res.status(500).send({
                code: 500,
                status: "Internal Server Error",
                message:
                  "Failed to connect to database to update Header Footer Status data",
              });
            }
          }
        );
      }
    }
  );
  res.send({
    code: 200,
    status: "Success",
    message: "Data Saved successfully",
    data: {
      header_text: header_footer.header,
      header_status: header_footer.header_status,
      header_time_interval: header_footer.header_time_interval,
      footer_text: header_footer.footer,
      // footer_text: footer.replaceAll("\\", "").trim(),
      footer_status: header_footer.footer_status,
      footer_time_interval: header_footer.footer_time_interval,
    },
  });
};

// To write status in text file

// if (header_status && footer_status) {
//   fs.writeFile(
//     "./text/header_status.txt",
//     JSON.stringify(header_status),
//     (err) => {
//       if (err) {
//         res.status(500).send({
//           code: 500,
//           status: "Internal Server Error",
//           message: "Failed to send header_status",
//         });
//       }
//     }
//   );
//   fs.writeFile(
//     "./text/footer_status.txt",
//     JSON.stringify(footer_status),
//     (err) => {
//       if (err) {
//         res.status(500).send({
//           code: 500,
//           status: "Internal Server Error",
//           message: "Failed to send footer_status",
//         });
//       }
//     }
//   );
// }
// if (!header && !footer) {
//   return res.status(400).json({
//     code: 400,
//     status: "Bad Request",
//     message: "Both header and footer are not available",
//   });
// }
