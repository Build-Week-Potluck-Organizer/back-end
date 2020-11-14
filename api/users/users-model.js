const db = require("../../data/dbconfig.js")

function getUsers() {
  return db('users')
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserEvents(username) {
  return db()
    .select('*')
    .from('potluck_guest')
    .where({ username })
    .innerJoin('event', 'potluck_guest.event.id', 'event.event_id')
}

function registerUser(user) {
  return db('users').insert(user)
}

function loginUser(username) {
  return db('users')
    .where({ username })
    .first()
}

module.exports = {
  getUsers, 
  getUserById,
  registerUser,
  getUserEvents,
  loginUser
};
