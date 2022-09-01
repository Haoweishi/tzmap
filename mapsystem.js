class MapSystem {
    constructor(elementId, window) {
        this.window = window
        this.document = window.document
        this.holder = this.document.getElementById(elementId)
        //this.map = new Map(this.holder.getElementById("map"))

        this.documentSize = Math.min(window.innerWidth, window.innerHeight) * 0.9
        this.holder.setAttribute("width", this.documentSize)
		this.holder.setAttribute("height", this.documentSize)
		this.cx = this.documentSize / 2
		this.cy = this.documentSize / 2

        this.dial = new HourDial("radial", this.holder, this.cx, this.cy, this.documentSize, this.documentSize)

        this.marker = this.holder.getElementById("currentHRMarker")
        this.marker.setAttribute("x", this.cx - this.marker.getBBox().width / 2)
        this.marker.setAttribute("y", this.documentSize * 0.975)
    }
}