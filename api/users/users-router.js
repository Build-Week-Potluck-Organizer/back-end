const express = require("express");
const Users = require("./users-model");

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

// try-catch refactor:
// router.get("/", async (req, res) => {
//   try {
//     const users = await Users.find()
//     res.json(users)
//   } catch(err) {
//       next(err)
//   }
// })

router.get('/:id', (req, res) => {
  Users.getUserById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: 'user not found', 
        error: err
      })
    })
})

router.get('/username/events', (req, res) => {
  Users.getUserEvents(req.params.name)
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => {
      res.status(500).json({
        message: 'events not found',
        error: err
      })
    })
})

module.exports = router;
