class HourDial {
    constructor(elementId, parent, cx, cy, width, height) {
        this.cx = cx
        this.cy = cy
        this.parent = parent
        this.clockradial = this.parent.getElementById(elementId)
		this.clockradial.setAttribute("cx", this.cx)
		this.clockradial.setAttribute("cy", this.cy)
		this.clockradial.setAttribute("width", width)
		this.clockradial.setAttribute("height", height)
    }

    updatePosition(currentDate) {
        let degrees = currentDate.getHours() * 15 + currentDate.getMinutes() * 0.25
        this.clockradial.setAttribute("transform", "rotate(" + degrees + ", " + this.cx + " , " + this.cy + ")")
    }
}

if (typeof module !== "undefined") {
    module.exports = HourDial
}