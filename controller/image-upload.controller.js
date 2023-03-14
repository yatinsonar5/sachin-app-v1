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

exports.upload = upload.single("image"), (req, res) => {
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
};

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
