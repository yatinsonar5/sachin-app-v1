const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
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

const path = require("path");
app.use(express.static(path.join(__dirname, "/public/html")));

app.get("/api/1.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/1.html"));
});

app.get("/api/2.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/2.html"));
});

//Posting Header Footer Content

app.post("/api/headerfooter", (req, res) => {
  const header = req.body.header;
  const footer = req.body.footer;

  if (header) {
    console.log(header);
    fs.writeFile("./public/html/1.html", `<html> ${header} </html>`, (err) => {
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
    fs.writeFile("./public/html/2.html", `<html> ${footer} </html>`, (err) => {
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

// Image Upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
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
