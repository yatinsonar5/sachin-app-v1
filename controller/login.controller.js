const dotenv = require("dotenv");
dotenv.config();

//Login

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// Login Using MongoDb database

const User = require("../models/login_model");

exports.login = (req, res) => {
  // Check User already exists?
  User.findOne({ username: req.body.username }, (error, user) => {
    if (error) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Not able to find User",
      });
    } else if (!user) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      //If User not Exists with given UserID then Register that User
      newUser.save((error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).send({
            code: 200,
            status: "Success",
            message: "User Created Successfully",
            userId: newUser._id,
            token,
          });
        }
      });
      //If User Exists then check Password
    } else if (
      user.username == req.body.username &&
      user.password !== req.body.password
    ) {
      res.status(401).send({
        code: 401,
        status: "Unauthorized",
        message: "Incorrect Password",
      });
      //If User Exists and Password Matched then Login user
    } else if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "User LoggedIn Successfully",
        userId: user._id,
        token,
      });
    }
  });
};

// Login Using Hardcode

// const users = [
//   {
//     userId: 1,
//     username: "user1",
//     password: "password1",
//   },
//   {
//     userId: 2,
//     username: "user2",
//     password: "password2",
//   },
// ];

// // Route to handle login
// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   // Check if user exists
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (!user) {
//     return res.status(401).send({
//       code: 401,
//       status: "Unauthorized",
//       message: "Incorrect username or password",
//     });
//   }
//   // Create JWT token
//   const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
//     expiresIn: "1h",
//   });
//   // Return token in response
//   res.send({
//     code: 200,
//     status: "Success",
//     message: "User LoggedIn Successfully",
//     userId: user.userId,
//     token,
//   });
// };
