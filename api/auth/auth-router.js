const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const createToken = require("./createToken")
require("dotenv").config()

const router = express.Router()

const hashCount = parseInt(process.env.HASH_COUNT) || 8

// register
router.post("/register", validateUserData, checkUsername, (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, hashCount);
  user.password = hash;

  Users.registerUser(user)
    .then((saved) => {
      const token = createToken(saved)
      delete saved.password
      res.status(201).json({saved, token});
    })
    .catch((err) => {
      res.status(500).json({
        message: "user registration failed",
      });
    });
});

// login
router.post("/login", validateUserData, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);

        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          username: user.username,
          id: user.id,
          token: token,
        });
      } else {
        res.status(401).json({ error: "username or password invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "login failed" });
    });
});

function checkUsername(req, res, next) {
  const { username } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user) {
        res.status(401).json({
          error:
            "Username is already taken.",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

function validateUserData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "username and password required" });
  } else if (req.body.username === undefined) {
    res.status(400).json({ error: "username required" });
  } else if (req.body.password === undefined) {
    res.status(400).json({ error: "password required" });
  } else if (req.body.username === '') {
    res.status(400).json({ error: "username must contain characters" });
  } else if (req.body.password === '') {
    res.status(400).json({ error: "password must contain characters" });
  } else {
    next();
  }
}

module.exports = router;
