let express = require("express")
let server = express()

server.use(express.static(__dirname))

server.get("/embeddable/", (req, res) => {
    res.send("Hello World")
})

server.listen(8080)