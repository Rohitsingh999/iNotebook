const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "rohitsignature";
//router is use  ->how an application respond to client request for any particular endpoint
const router = express.Router();

//  Route -1 : create a User using  : Post "/api/auth/createuser" . Doesn't require Authentication

router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("email", "Enter valid Email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //if there is any error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: "Enter valid Details" });
    }
    //check weather te user email exists already

    try {
      // find user from data-base
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          success,
          error: " Sorry user with this email already exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, error: "Internal  Server error occur" });
    }

    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err.message);
    //   res.json({ error: err.message });
    // });
  }
);

//Route -2 Authenticate (login) a user   Post "/api/auth/login"

router.post(
  "/login",
  [
    body("password", "password cannot be blank").exists(),
    body("email", "Enter valid Email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //if there is any error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: "invalid Credentials" });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }

      const payload = {
        id: user.id,
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, error: "Internal  Server error occur" });
    }
  }
);

//Route -3 Get loggedin User Details using    Post "/api/auth/getuser" . login required

router.post("/getuser", fetchuser, async (req, res) => {
  let success = false;
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ success, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: " Internal  Server error occur" });
  }
});

module.exports = router;
