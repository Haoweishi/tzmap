class Vector3D {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}
	
	add(other) {
		this.x += other.x
		this.y += other.y
		this.z += other.z
	}
	
	sub(other) {
		this.x -= other.x
		this.y -= other.y
		this.z -= other.z
	}
	
	dot(other) {
		let result = this.x * other.x + this.y * other.y + this.z * other.z
		return result
	}
	
	magnitude() {
		return Math.sqrt(this.dot(this))
	}
	
	norm() {
		let mag = this.magnitude()
		this.x = this.x / mag
		this.y = this.y / mag
		this.z = this.z / mag
	}
	
	cross(other) {
		let newX = VectorUtils.det(this.y, this.z, other.y, other.z)
		let newY = -VectorUtils.det(this.x, this.z, other.x, other.z)
		let newZ = VectorUtils.det(this.x, this.y, other.x, other.y)
		let result = new Vector3D(newX, newY, newZ)
		return result
	}
}

if (typeof module !== "undefined") {
    module.exports = Vector3D
}