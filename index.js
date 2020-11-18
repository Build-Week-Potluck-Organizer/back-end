const server = require("./api/server.js")
require("dotenv").config()
const port = process.env.PORT || 5000

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
  })
}