// const knex = require("knex")
// const knexfile = require("../knexfile")

// // module.exports = knex(knexfile[process.env.NODE_ENV])
// module.exports = knex(knexfile.development)

const knex = require("knex");
const config = require("../knexfile.js");
const environment = process.env.DB_ENV || "development";
module.exports = knex(config[environment]);