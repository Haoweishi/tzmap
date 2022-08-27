class Map {
	constructor (elementId, dom, window) {
	    this.dom = dom
		this.svgElement = this.dom.getElementById(elementId)
		this.documentSize = Math.min(window.innerWidth, window.innerHeight) * 0.9
		this.svgElement.setAttribute("width", this.documentSize)
		this.svgElement.setAttribute("height", this.documentSize)
		
		this.cx = this.documentSize / 2
		this.cy = this.documentSize / 2
		this.r = (this.documentSize / 2) * 0.9
		
		let element = this.dom.createElementNS('http://www.w3.org/2000/svg', 'circle');
		element.setAttribute("cx" , this.cy)
		element.setAttribute("cy" , this.cx)
		element.setAttribute("fill", "blue")
		element.setAttribute("id", "disk")
		element.setAttribute("r", this.r)
		this.svgElement.appendChild(element);
	}
	
	xyToCanvas(x, y) {
		let newX = x + (this.cx)
		let newY = y + (this.cy)
		return [newX, newY]
	}
	
	geoCoordinateToXY(longitude, latitude) {
		let disk = this.dom.getElementById("disk")
		let radius = disk.getAttribute("r")
		let x = radius * Math.cos(longitude - Math.PI / 2) * Math.sin(Math.PI / 2 - latitude)
		let y = radius * Math.sin(longitude + Math.PI / 2) * Math.sin(Math.PI / 2 - latitude)
		let z = radius * Math.cos(Math.PI / 2 - latitude)
		return [x, y, z]
	}
	
	setMarker(longitude, latitude, color, id) {
		let existing = this.dom.getElementById(id)
		let xy = this.geoCoordinateToXY(longitude, latitude)
		let plotXY = this.xyToCanvas(xy[0], xy[1])
		if (existing != null) {
			existing.setAttribute("cx" , plotXY[0])
			existing.setAttribute("cy" , plotXY[1])
			return
		}
		let element = this.dom.createElementNS('http://www.w3.org/2000/svg', 'circle')
		element.setAttribute("cx" , plotXY[0])
		element.setAttribute("cy" , plotXY[1])
		element.setAttribute("fill", color)
		element.setAttribute("id", "sun")
		element.setAttribute("r", 5)
		this.svgElement.appendChild(element);
	}
	
	plotGeometry(coordList, color = "#FFFFFF", opacity = "100%") {
		let geometry = this.dom.createElementNS("http://www.w3.org/2000/svg", "polygon")
		let instructions = ""
		let plotted = 0
		let isVisible = false
		for (var i = 0; i < coordList.length; i++) {
			let coordSet = coordList[i]
			if (coordSet[1] < 0.0) {
				coordSet[1] = 0.0
			} else {
				isVisible = true
			}
			let xyCoord = this.geoCoordinateToXY(VectorUtils.degreeToRadian(coordSet[0]), VectorUtils.degreeToRadian(coordSet[1]))
			let canvasCoord = this.xyToCanvas(xyCoord[0], xyCoord[1])
			let appendable = canvasCoord[0].toString() + "," + canvasCoord[1].toString() + " "
			instructions += appendable
			plotted += 1
		}
		if (plotted > 0 & isVisible) {
			geometry.setAttribute("points", instructions)
			//geometry.setAttribute("stroke", "#FFFFFF")
			geometry.setAttribute("fill", color)
			geometry.setAttribute("fill-opacity", opacity)
			this.svgElement.appendChild(geometry)
		}
	}
	
	plotLine(coordList, color = "#FFFFFF", opacity = "100%") {
		let geometry = this.dom.createElementNS("http://www.w3.org/2000/svg", "polyline")
		let instructions = ""
		let plotted = 0
		let isVisible = false
		for (var i = 0; i < coordList.length; i++) {
			let coordSet = coordList[i]
			if (coordSet[1] < 0.0) {
				coordSet[1] = 0.0
			} else {
				isVisible = true
			}
			let xyCoord = this.geoCoordinateToXY(VectorUtils.degreeToRadian(coordSet[0]), VectorUtils.degreeToRadian(coordSet[1]))
			let canvasCoord = this.xyToCanvas(xyCoord[0], xyCoord[1])
			let appendable = canvasCoord[0].toString() + "," + canvasCoord[1].toString() + " "
			instructions += appendable
			plotted += 1
		}
		if (plotted > 0 & isVisible) {
			geometry.setAttribute("points", instructions)
			geometry.setAttribute("stroke", color)
			geometry.setAttribute("stroke-width", 3)
			this.svgElement.appendChild(geometry)
		}
	}
	
	plotXYGeometry(coordList, color = "#FFFFFF", opacity = "100%", id) {
		let geometry = document.getElementById(id)
		let existing = true
		if (geometry == null) {
			geometry = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
			existing = false
		}
		let instructions = ""
		let plotted = 0
		let isVisible = true
		for (var i = 0; i < coordList.length; i++) {
			let canvasCoord = coordList[i]
			let appendable = canvasCoord[0].toString() + "," + canvasCoord[1].toString() + " "
			instructions += appendable
			plotted += 1
		}
		if (plotted > 0 & isVisible) {
			geometry.setAttribute("points", instructions)
			geometry.setAttribute("fill", color)
			geometry.setAttribute("fill-opacity", opacity)
			geometry.setAttribute("id", id)
			if (!existing) {
				this.svgElement.appendChild(geometry)
			}
		}
	}
	
	setRotate(degrees) {
		let template = 'rotate(' + degrees + ')'
		this.svgElement.setAttribute("transform", template)
	}
}

if (typeof module !== "undefined") {
    module.exports = Map
}