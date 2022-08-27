let express = require("express")
let jsdom = require("jsdom")
const { JSDOM } = jsdom;
let fs = require("fs")
let server = express()
let Map = require("./map.js")
let {Sun, Shadow} = require("./sun.js")

server.use(express.static(__dirname))

function updateSun(sun, date, map) {
	sun.setDate(date)
	map.setMarker(sun.longitude, sun.latitude, "#FFFF00", "sun")
	shadowGeometry = Shadow.getShadowPolygon(sun, map)
	map.plotXYGeometry(shadowGeometry, color = "#000000", opacity = "50%", "shadow")
}

server.get("/embeddable/", (req, res) => {
    let svgDOM = new JSDOM("<svg width=\"1000\" height=\"1000\" id = \"mainplot\"></svg>");
    let mainMap = new Map("mainplot", document = svgDOM.window.document, window = svgDOM.window)
    let now = new Date(Date.now())
    let sun = new Sun(now)
    let lands = JSON.parse(fs.readFileSync('ne_110m_land.json', 'utf8'))
    let lakes = JSON.parse(fs.readFileSync('ne_110m_lakes.json', 'utf8'))
    for (var i = 0; i < lands.features.length; i++) {
		mainMap.plotGeometry(lands.features[i].geometry.coordinates[0])
	}

	for (var i = 0; i < lakes.features.length; i++) {
		mainMap.plotGeometry(lakes.features[i].geometry.coordinates[0], color = "#0088FF")
	}
    updateSun(sun, now, mainMap)
    res.send(svgDOM.serialize())
})

server.listen(8080)