const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = createToken;

function createToken(user) {
  const payload = {
    user_id: user.id,
  };

  const secret = process.env.JWT_SECRET || "No me digas.";

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, secret, options);
}