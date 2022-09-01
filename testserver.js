let express = require("express")
let jsdom = require("jsdom")
const { JSDOM } = jsdom;
let fs = require("fs")
let server = express()
let Map = require("./map.js")
let {Sun, Shadow} = require("./sun.js")
let MapSystem = require("./mapsystem.js")

server.use(express.static(__dirname))

let template = '<svg width = "1000" height = "1000" id = "mapInterface"><g id = "map"></g><image href="clockradial.svg" id = "radial"></image><image href="hourMarker.svg" id = "currentHRMarker"></image></svg>'
let outputDOM = new JSDOM(template)
let mapSystem = new MapSystem("mapInterface", outputDOM.window)
let lands = JSON.parse(fs.readFileSync('ne_110m_land.json', 'utf8'))
let lakes = JSON.parse(fs.readFileSync('ne_110m_lakes.json', 'utf8'))
for (var i = 0; i < lands.features.length; i++) {
    mapSystem.map.plotGeometry(lands.features[i].geometry.coordinates[0])
}

for (var i = 0; i < lakes.features.length; i++) {
	mapSystem.map.plotGeometry(lakes.features[i].geometry.coordinates[0], color = "#0088FF")
}

server.get("/embeddable/", (req, res) => {
    let now = new Date(Date.now())
    mapSystem.setTime(now)
    res.send(outputDOM.serialize())
})

server.listen(8080)