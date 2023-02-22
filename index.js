const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database Connections

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const MongoURI = process.env.MongoURI;
const LOCALURI = process.env.LOCALURI;

mongoose.connect(MongoURI, { useNewUrlParser: true });

// Cors Handling

app.use(cors());

const corsOptions = {
  origin: ["http://example.com", "http://example2.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//Creating path to access html files

app.use(express.static(path.join(__dirname, "/html")));

app.get("/1.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/1.html"));
});

app.get("/2.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/2.html"));
});

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

//Post Url
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

// Image Upload on S3 bucket

// const AWS = require("aws-sdk");
// AWS.config.update({
//   accessKeyId: "YOUR_ACCESS_KEY_ID",
//   secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
// });
// const s3 = new AWS.S3();

// const multer = require("multer");

// const storage = multer.memoryStorage({
//   destination: (req, file, cb) => {
//     cb(null, "");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now().toString()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage }).single("image");

// app.post("/api/upload", upload, (req, res) => {
//   const file = req.file;

//   const params = {
//     Bucket: "YOUR_BUCKET_NAME",
//     Key: file.filename,
//     Body: file.buffer,
//   };

//   s3.upload(params, (error, data) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).send({
//         code: 500,
//         status: "Internal Server Error",
//         message: "Not able to upload image, Please try again.",
//       });
//     }
//     console.log(data);
//     return res.status(200).send({
//       code: 200,
//       status: "Success",
//       message: "Image has been uploaded",
//       data: data,
//     });
//   });
// });

//Image Upload on Local Disk

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send({
      code: 400,
      status: "Bad Request",
      message: "Please select an image to upload.",
    });
  } else {
    res.send({
      code: 200,
      status: "Success",
      message: "Image has been uploaded",
      fileName: `${file.filename}`,
    });
  }
});

//Login

const jwt = require("jsonwebtoken");
app.use(express.json());

const SECRET_KEY = "yoursecretkey";

const users = [
  {
    userId: 1,
    username: "user1",
    password: "password1",
  },
  {
    userId: 2,
    username: "user2",
    password: "password2",
  },
];

// Route to handle login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).send({
      code: 401,
      status: "Unauthorized",
      message: "Incorrect username or password",
    });
  }
  // Create JWT token
  const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
    expiresIn: "1h",
  });
  // Return token in response
  res.send({
    code: 200,
    status: "Success",
    message: "User LoggedIn Successfully",
    userId: user.userId,
    token,
  });
});

// const jwt = require("jsonwebtoken");
// const secretKey = "your-secret-key";
// const User = require("./models/login_model");

// app.post("/api/login", (req, res) => {
//   User.findOne({ username: req.body.username }, (error, user) => {
//     if (error) {
//       res.status(500).send({
//         code: 500,
//         status: "Internal Server Error",
//         message: "Not able to find User",
//       });
//     } else if (!user) {
//       const newUser = new User({
//         username: req.body.username,
//         password: req.body.password,
//       });
//       newUser.save((error) => {
//         if (error) {
//           res.status(500).send(error);
//         } else {
//           const token = jwt.sign({ id: newUser._id }, secretKey, {
//             expiresIn: "1h",
//           });
//           res.status(200).send({
//             code: 200,
//             status: "Success",
//             message: "User Created Successfully",
//             userId: newUser._id,
//             token,
//           });
//         }
//       });
//     } else if (
//       user.username == req.body.username &&
//       user.password !== req.body.password
//     ) {
//       res.status(401).send({
//         code: 401,
//         status: "Unauthorized",
//         message: "Incorrect Password",
//       });
//     } else if (
//       user.username === req.body.username &&
//       user.password === req.body.password
//     ) {
//       const token = jwt.sign({ id: user._id }, secretKey, {
//         expiresIn: "1h",
//       });
//       res.status(200).send({
//         code: 200,
//         status: "Success",
//         message: "User LoggedIn Successfully",
//         userId: user._id,
//         token,
//       });
//     }
//   });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
