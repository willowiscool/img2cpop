/*
 * Set a berakpoint somewhere where cache is exposed
 * Recommend: line 7578 in theme.v4.js (if you use this, press "more info" on any of the things to activate)
 * Paste this in browser console
 * Copy message into shades.js
Object.values(cache.products.data).map(val => {
	// get description
	const el = document.createElement("div")
	el.innerHTML = val.shade_description
	return {
		name: val.title,
		desc: el.innerText,
		url: val.swatch,
		group: val.tags ? val.tags.filter(e => ["matte", "metallic", "duochrome", "glitter"].includes(e))[0] : "no tags"
	}
})
*/

const ColorThief = require("colorthief")
const shades = require("./shades.json")
const fs = require("fs")
;
(async () => {
	const newShades = await Promise.all(
		shades.map(async shade => {
			return {
				...shade,
				color: await ColorThief.getColor(shade.url)
			}
		})
	)
	fs.writeFileSync("./shadesWithColor.json", JSON.stringify(newShades, null, 2), "utf-8")
})()
