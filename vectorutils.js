if (typeof require !== "undefined") {
    Vector3D = require("./vector.js")
}

class VectorUtils {
	
	static degreeToRadian(degree) {
		return (Math.PI * degree) / 180
	}
	
	static det(a, b, c, d) {
		return a * d - b * c
	}
	
	static findOrthogonalVector(vector) {
		if (vector.x == 0 & vector.y == 0 & vector.z == 0) {
			let raw = new Vector3D(0, 0, 0)
			return raw
		}
		
		if (vector.x != 0) {
			let newZ = 1.0
			let newY = 1.0
			let newX = (-vector.y - vector.z) / vector.x
			let raw = new Vector3D(newX, newY, newZ)
			return raw
		}
		
		if (vector.y != 0) {
			let newZ = 1.0
			let newX = 1.0
			let newY = (-vector.x - vector.z) / vector.y
			let raw = new Vector3D(newX, newY, newZ)
			return raw
		}
		
		let newX = 1.0
		let newY = 1.0
		let newZ = (-vector.x - vector.y) / vector.z
		let raw = new Vector3D(newX, newY, newZ)
		return raw
	}
}

if (typeof module !== "undefined") {
    module.exports = VectorUtils
}