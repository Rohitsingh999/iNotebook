const jwt = require("jsonwebtoken");
const JWT_SECRET = "rohitsignature";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to re object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = fetchuser;
