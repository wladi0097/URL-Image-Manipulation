const sharp = require("sharp")

function parseDataForInt(data) {
    var temp = data.split('_')
    var params = []

    for (i = 0; i < temp.length; i++) {
        var value = parseInt(temp[i])
        if (value !== NaN)
            params.push(value)
        else
            params.push(null)
    }

    return params
}

function resize(image, data) {
    params = parseDataForInt(data)
    if (!params.length < 2 && (params[0] > 0 && params[0] < 16384) && (params[1] > 0) && params[1] < 16384) {
        return image.resize(params[0], params[1])
    } else {
        return image
    }

}

function resizeWidth(image, data) {
	params = parseDataForInt(data)
	return image.resize(params[0])
}

function resizeHeight(image, data) {
	params = parseDataForInt(data)
	return image.resize(null, params[0])
}

function crop(image, data){
    params = data.split('_')
	switch (params[0]) {
		case "north":
			params[0] = sharp.gravity.north;
			break;
		case "northeast":
			params[0] = sharp.gravity.northeast;
			break;
		case "east":
			params[0] = sharp.gravity.east;
			break;
		case "southeast":
			params[0] = sharp.gravity.southeast;
			break;
		case "south":
			params[0] = sharp.gravity.south;
			break;
		case "southwest":
			params[0] = sharp.gravity.southwest;
			break;
		case "west":
			params[0] = sharp.gravity.west;
			break;
		case "northwest":
			params[0] = sharp.gravity.northwest;
			break;		
		case "entropy":
			params[0] = sharp.strategy.entropy;
			break;
		case "attention":
			params[0] = sharp.strategy.attention;
			break;
		case "center":
		case "centre":
		default:
		    return image
			break;
	}
	return image.crop(params[0])
}

function embed(image, data){
	return image.embed()
}

function min(image, data){
	return image.min()
}

function max(image, data){
	return image.max()
}

function ignoreAspectRatio(image, data){
	return image.ignoreAspectRatio()
}

module.exports = function (modContainer) {
	[
		resize,
		resizeWidth,
		resizeHeight,
		crop,
		embed,
		min,
		max,
		ignoreAspectRatio
	].forEach(function (f) {
		modContainer[f.name] = f;
	});
};
