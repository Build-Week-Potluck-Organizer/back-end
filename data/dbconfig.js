const knex = require("knex")
const config = require("../knexfile.js")

// To switch between the "developemt" and "testing" environments, one must comment out one or the other and save the change.
// (and possibly run < npx knex migrate:latest --env=testing > < npx knex seed:run --env=testing > ?)

const environment = process.env.DB_ENV || "development"

// const environment = process.env.DB_ENV || "testing";

// The testing database migrations and seeding are handled with the normal commands followed by < --env=testing >.
// e.g. < npx knex migrate:latest --env=testing > < npx knex seed:run --env=testing >

module.exports = knex(config[environment])


