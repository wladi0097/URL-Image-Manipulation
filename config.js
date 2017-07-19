const modifier = require("./mods")


const config = {
	
	folderPath: "\\images\\",
	
	supportedFiletype: ["JPG", "JPEG", "PNG"], //["JPG", "JPEG", "PNG", "WebP", "GIF", "SVG", "TIFF"]
	
	commands: {
		
		//resizeImage.js
		"res": modifier.resize,
		"h": modifier.resizeHeight,
		"w": modifier.resizeWidth,
		"q": modifier.quality,
		"crop": modifier.crop,
		"embed": modifier.embed,
		"min": modifier.min,
		"max": modifier.max,
		"iAR": modifier.ignoreAspectRatio,
		
		//imageOperations.js		
		"rotate": modifier.rotate,
		"extract": modifier.extract,
		"flip": modifier.flip,
		"flop": modifier.flop,
		"sharpen": modifier.sharpen,
		"blur": modifier.blur,
		"extend": modifier.extend,
		"flatten": modifier.flatten,
		"trim": modifier.trim,
		"gamma": modifier.gamma,
		"negate": modifier.negate,
		"normalise": modifier.normalise,
		"normalize": modifier.normalise,
		"threshold": modifier.threshold,

		//colorManipulations.js
		
		"background": modifier.background,
		"greyscale": modifier.grayscale,
		"grayscale": modifier.grayscale
	}
	
}
module.exports = config;