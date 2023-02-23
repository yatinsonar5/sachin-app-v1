// Get all details

app.get("/api/getDetails", (req, res) => {
    const data1 = fs.readFileSync("./html/1.html", "utf-8");
    const header = data1.replace(/<\/?(html)[^>]*>/gi, '')
    const header_status = fs.readFileSync("./text/header_status.txt", "utf8");
    const data2 = fs.readFileSync("./html/2.html", "utf-8");
    const footer = data2.replace(/<\/?(html)[^>]*>/gi, '')
    const footer_status = fs.readFileSync("./text/footer_status.txt", "utf8");
    const urlData = fs.readFileSync("./text/url.txt", "utf8");
  
    if (!header && !footer && !urlData) {
      res.status(404).send({
        code: 404,
        status: "Not Found",
        header_status: JSON.parse(header_status),
        header_text: "header data is not available",
        footer_status: JSON.parse(footer_status),
        footer_text: "footer data is not available",
        open_tab_data: "urlData is not available",
      });
    } else if (header && footer && urlData)
      res.status(200).send({
        code: 200,
        status: "Success",
        header_status: JSON.parse(header_status),
        header_text: header,
        footer_status: JSON.parse(footer_status),
        footer_text: footer,
        open_tab_data: JSON.parse(urlData),
      });
  });
  