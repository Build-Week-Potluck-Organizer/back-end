require("dotenv").config();
const pg = require("pg");

pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    // connection: {
    //   filename: "./data/users.db3",
    //   },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  testing: {
    client: "sqlite3",
    connection: {
      // filename: "./data/-test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    // this is needed when using foreign keys for sqlite3
	pool: {
		afterCreate: (conn, done) => {
			// runs after a connection is made to the sqlite engine
			conn.run("PRAGMA foreign_keys = ON", done) // turn on FK enforcement
		},
	},
  },
  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};