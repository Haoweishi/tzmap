class MapSystem {
    constructor(elementId, window) {
        this.window = window
        this.document = window.document
        this.holder = this.document.getElementById(elementId)
        this.documentSize = Math.min(window.innerWidth, window.innerHeight) * 0.9
        this.map = new Map("map", window, this.holder, this.documentSize)

        this.holder.setAttribute("width", this.documentSize)
		this.holder.setAttribute("height", this.documentSize)
		this.cx = this.documentSize / 2
		this.cy = this.documentSize / 2

        this.dial = new HourDial("radial", this.holder, this.cx, this.cy, this.documentSize, this.documentSize)

        this.marker = this.holder.getElementById("currentHRMarker")
        this.marker.setAttribute("x", this.cx - this.marker.getBBox().width / 2)
        this.marker.setAttribute("y", this.documentSize * 0.975)
        this.sun = new Sun(new Date(0))
    }

    setTime(date) {
        map.dial.updatePosition(date)
        this.sun.setDate(date)
	    this.map.setMarker(this.sun.longitude, this.sun.latitude, "#FFFF00", "sun")
	    let shadowGeometry = Shadow.getShadowPolygon(this.sun, map.map)
	    this.map.plotXYGeometry(shadowGeometry, "#000000", "50%", "shadow")
    }
}