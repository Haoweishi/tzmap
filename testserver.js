let express = require("express")
let server = express()

server.use(express.static(__dirname))

server.listen(8080)