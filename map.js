class WorldMap {
	constructor (elementId, window, parent, docSize) {
	    this.dom = window.document
		this.svgElement = parent.getElementById(elementId)
		
		this.cx = docSize / 2
		this.cy = docSize / 2
		this.r = (docSize / 2) * 0.9
		
		let element = this.dom.createElementNS('http://www.w3.org/2000/svg', 'circle');
		element.setAttribute("cx" , this.cx)
		element.setAttribute("cy" , this.cy)
		element.setAttribute("fill", "blue")
		element.setAttribute("id", "disk")
		element.setAttribute("r", this.r)
		this.svgElement.appendChild(element);

		this.rotation = 0

		this.earthRadius = 3963
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
		let geometry = this.dom.getElementById(id)
		let existing = true
		if (geometry == null) {
			geometry = this.dom.createElementNS("http://www.w3.org/2000/svg", "polygon")
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
		let template = 'rotate(' + degrees + ',' + this.cx +  ',' + this.cy + ')'
		this.svgElement.setAttribute("transform", template)
	}

	getGreatCircleTrack(start, end) {
	    let startXYZ = this.geoCoordinateToXY(VectorUtils.degreeToRadian(start[0]), VectorUtils.degreeToRadian(start[1]))
	    let endXYZ = this.geoCoordinateToXY(VectorUtils.degreeToRadian(end[0]), VectorUtils.degreeToRadian(end[1]))
	    let axis = startXYZ.cross(endXYZ)
	}

	getDistance(start, end) {
	    let startXYZ = this.geoCoordinateToXY(VectorUtils.degreeToRadian(start[0]), VectorUtils.degreeToRadian(start[1]))
	    let endXYZ = this.geoCoordinateToXY(VectorUtils.degreeToRadian(end[0]), VectorUtils.degreeToRadian(end[1]))
	    let a = new Vector3D(startXYZ[0], startXYZ[1], startXYZ[2])
	    let b = new Vector3D(endXYZ[0], endXYZ[1], endXYZ[2])

	    let cosTheta = (a.dot(b)) / (a.magnitude() * b.magnitude())
	    let diffAngle = Math.acos(cosTheta)
	    let arcPercentage = diffAngle / (2 * Math.PI)
	    let distance = arcPercentage * (2 * this.earthRadius * Math.PI)
	    return distance
	}
}

if (typeof module !== "undefined") {
    module.exports = WorldMap
}