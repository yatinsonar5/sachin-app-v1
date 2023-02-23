//Posting Header Footer Content

app.post("/api/headerfooter", (req, res) => {
    const header = req.body.header;
    const header_status = req.body.header_status;
    const footer = req.body.footer;
    const footer_status = req.body.footer_status;
  
    if (header) {
      fs.writeFile("./html/1.html", `<html> ${header} </html>`, (err) => {
        if (err) {
          return res.status(500).end({
            code: 500,
            status: "Internal Server Error",
            error: "Error writing to file",
          });
        }
      });
    }
    if (footer) {
      fs.writeFile("./html/2.html", `<html> ${footer} </html>`, (err) => {
        if (err) {
          return res.status(500).send({
            code: 500,
            status: "Internal Server Error",
            error: "Error writing to file",
          });
        }
      });
    }
    if (header_status && footer_status) {
      fs.writeFile("./text/header_status.txt", JSON.stringify(header_status), (err) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: "Internal Server Error",
              message: "Failed to send header_status",
            });
          }
        }
      );
      fs.writeFile("./text/footer_status.txt", JSON.stringify(footer_status), (err) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: "Internal Server Error",
              message: "Failed to send footer_status",
            });
          }
        }
      );
    } if (!header && !footer) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Both header and footer are not available",
      });
    }
    res.send({
      code: 200,
      status: "Success",
      message: "Data written successfully",
      data: {
        header: header,
        header_status: header_status,
        footer: footer,
        footer_status: footer_status,
      },
    });
  });