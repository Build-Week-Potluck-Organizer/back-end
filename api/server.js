const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const bodyParser = require("body-parser");

const restricted = require("../middleware/restricted.js");
const usersRouter = require("./users/users-router.js");
const eventsRouter = require("./events/events-router.js");
const authRouter = require("./auth/auth-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.use("/api/users", /* restricted, */ usersRouter); 
server.use("/api/events", /* restricted, */ eventsRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ "message": "api is go" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: err.message
  });
});

module.exports = server;