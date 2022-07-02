let shades
// can't use top level await because not a module
// if I make it a module, alpine won't find the run function
(async () => {
	const res = await fetch("./shadesWithColor.json")
	shades = await res.json()
})()

const colorThief = new ColorThief()
function run() {
	document.querySelector("#image").src = URL.createObjectURL(document.querySelector("#input").files[0])
	return getPalette()
}
function getPalette() {
	return new Promise(resolve => {
		document.querySelector("#image").addEventListener("load", () => {
			const palette = colorThief.getPalette(image)
			resolve({
				palette,
				shadesets: palette.map(color =>
					shades.sort((a, b) => {
						return chroma.deltaE(a.color, color) > chroma.deltaE(b.color, color) ? 1 : -1
					}).slice(0, 3)
				)
			})
		})
	})
}

function runWith(src) {
	document.querySelector("#image").src = src
	return getPalette()
}
