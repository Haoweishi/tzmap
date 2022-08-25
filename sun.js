class Sun {
	constructor(date) {
		this.date = date
		this.longitude = 0
		this.latitude = 0
		this.updatePosition()
	}
	
	setDate(date) {
		this.date = date
		this.updatePosition()
	}
	
	updatePosition() {
		let hr = this.date.getUTCHours() + this.date.getUTCMinutes() / 60
		this.longitude = VectorUtils.degreeToRadian(-hr * 15.0 + 180)
		let daynum = Math.ceil((this.date - new Date(this.date.getFullYear(),0,1)) / 86400000);
		daynum = ((2 * Math.PI) / 365) * (daynum - 82)
		this.latitude = VectorUtils.degreeToRadian(Math.sin(daynum) * 23.5)
	}
}

class Shadow {
	static getShadowPolygon(sun, map) {
		let midnight_longitude = sun.longitude + Math.PI
		let midnight_latitude = sun.latitude + Math.PI
		let xyz = map.geoCoordinateToXY(midnight_longitude, midnight_latitude)
		let sunVector = new Vector3D(xyz[0], xyz[1], xyz[2])
		let v1 = VectorUtils.findOrthogonalVector(sunVector)
		v1.norm()
		let v2 = sunVector.cross(v1)
		v2.norm()
		let coordinates = []
		let r = map.r
		
		for (var i = 0; i < Math.PI * 2; i += Math.PI / 128) {
			let newZ = r * Math.cos(i) * v1.z + r * Math.sin(i) * v2.z
			if (newZ < 0) {
				let newX = r * Math.cos(i) * v1.x + r * Math.sin(i) * v2.x
				let newY = r * Math.cos(i) * v1.y + r * Math.sin(i) * v2.y
				let canvasPos = map.xyToCanvas(newX, newY)
				coordinates.push(canvasPos)
			}
		}
		
		for (var i = midnight_longitude + Math.PI / 2; i > midnight_longitude - Math.PI / 2; i -= Math.PI / 128) {
			let newXY = map.geoCoordinateToXY(i, 0)
			newXY = map.xyToCanvas(newXY[0], newXY[1])
			coordinates.push(newXY)
		}
		
		return coordinates
	}
}