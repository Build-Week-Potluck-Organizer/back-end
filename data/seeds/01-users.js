
const bcrypt = require("bcryptjs");
require("dotenv").config();

const hashCount = parseInt(process.env.HASH_COUNT) || 8;

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { username: "fulano", password: bcrypt.hashSync("password", hashCount) },
        { username: "fulana", password: bcrypt.hashSync("password", hashCount) },
      ]);
    });
};
