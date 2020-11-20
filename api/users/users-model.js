const db = require("../../data/dbconfig.js")

function getUsers() {
  return db('users')
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserEvents(id) {
  return db('events')
    .innerJoin('users', 'events.organizer_id', 'users.id')
    .where('events.organizer_id', id)
    .select('users.username', 'events.event_name')
    .from('events')
}

async function registerUser(user) {
  const [id] = await db('users').insert(user, "id")
  return getUserById(id);
}

function loginUser(username) {
  return db('users')
    .where({ username })
    .first()
}

function findBy(filter) {
  return db("users").where(filter);
}

module.exports = {
  getUsers, 
  getUserById,
  registerUser,
  getUserEvents,
  loginUser,
  findBy,
};
