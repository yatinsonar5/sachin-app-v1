// Default Settings

app.post("/api/defaultsettings", (req, res) => {
    let data = req.body;
    // console.log(urlData)
    if (!Object.keys(data).length) {
      res.status(400).send({
        code: 400,
        status: "Bad Request",
        message: "Please send some Valid Data",
      });
      return;
    }
  
    fs.writeFile("./text/default.txt", JSON.stringify(data), (err) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: "Internal Server Error",
          message: "Failed to send Default Settings Data",
        });
        return;
      }
      res.send({
        code: 200,
        status: "Success",
        message: "Default Settings Data send Successfully",
        data: data,
      });
    });
  });
  
  //Get Default settings Data
  app.get("/api/defaultsettings", (req, res) => {
    fs.readFile("./text/default.txt", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: "Internal Server Error",
          message: "Failed to read URL data",
        });
        return;
      }
      if (!data) {
        res.status(400).send({
          code: 400,
          status: "Bad Request",
          message: "Default Settings Data is not Availble, file is empty",
        });
        return;
      }
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "Default Settings Data Fetched Successfully",
        data: JSON.parse(data),
      });
    });
  });
  