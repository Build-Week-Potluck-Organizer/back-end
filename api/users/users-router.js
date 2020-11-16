const express = require("express");
const Users = require("./users-model");

const router = express.Router();

// get users
// router.get("/", (req, res) => {
//   Users.getUsers()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to get users" });
//     });
// });

// async-await refactor: get users
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.getUsers()
    res.json(users)
  } catch(err) {
      next(err)
  }
})

// get users by id
// router.get('/:id', (req, res) => {
//   Users.getUserById(req.params.id)
//     .then(user => {
//       res.status(200).json(user)
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: 'user not found', 
//         error: err
//       })
//     })
// })

// async-await refactor: get users by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await Users.getUserById(req.params.id)
    res.json(user)
  } catch(err) {
      next(err)
  }
})

// get user events be user id
// router.get('/:id/events', (req, res) => {
//   Users.getUserEvents(req.params.id)
//     .then(events => {
//       res.status(200).json(events)
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: 'events not found',
//         error: err
//       })
//     })
// })

// async-await refactor: get user events by user id 
router.get('/:id/events', async (req, res, next) => {
  try {
    const events = await Users.getUserEvents(req.params.id)
      res.json(events)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
