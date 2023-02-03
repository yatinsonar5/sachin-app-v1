const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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
  const footer = req.body.footer;

  if (header) {
    console.log(header);
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
    console.log(footer);
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
  if (!header && !footer) {
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
  });
});

//Post Url

app.post("/api/url", (req, res) => {
  if (!Object.keys(req.body).length) {
    res.status(400).send({
      code: 400,
      status: "Bad Request",
      message: "Please send some Valid Data",
    });
    return;
  }
  let urlData = req.body;
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

app.get("/api/url", (req, res) => {
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
        message: "Fetched Url Data Successfully",
        data: JSON.parse(urlData),
      });
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
      error: "Incorrect username or password",
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
    userId: user.userId,
    token,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
