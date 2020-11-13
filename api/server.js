const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const restricted = require("../middleware/restricted.js");
// const usersRouter = require("./users/users-router.js");
// const eventsRouter = require("./events/events-router.js");
// const menuItemsRouter = require("./menuItems/menuItems-router.js")
// const authRouter = require("./auth/auth-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use("/api/users", usersRouter);
// server.use("/api/events", restricted, eventsRouter);
// server.use("/api/menuItems", restricted, menuItemsRouter);
// server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong.",
  });
});

module.exports = server;