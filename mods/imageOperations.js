require("sharp")

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

function parseDataForFloat(data) {
	var temp = data.split('_')
	var params = []
	
	for (i = 0; i < temp.length; i++) {
		var value = parseFloat(temp[i])
		if (value !== NaN)
			params.push(value)
		else
			params.push(null)
	}
	
	return params
}

function parseDataForBoolean(data) {
	var temp = data.split('_')
	var params = []
	
	for (i = 0; i < temp.length; i++) {
		if (temp[i] == 'true')
			params.push(true)
		else if(temp[i] == 'false')
			params.push(false)
		else
			params.push(null)
	}
	
	return params
}

function parseDataIntoObject(data, object){
	var temp = data.split('_')
		
	var index = 0;
	for (var key in object) {
		// skip loop if the property is from prototype
		if (!object.hasOwnProperty(key)) continue;
		var value = parseInt(temp[index])
		if (!Object.is(value, NaN) && value != 0){
			object[key] = value
		}
		index ++
	}
	return object
}

function quality(image, data) {
    var temp = data.split('_')
    var params = []
    for (i = 0; i < temp.length; i++) {
        var value = parseFloat(temp[i])
        if (value !== NaN)
            params.push(value)
        else
            params.push(null)
    }
    if (params.length == 1 && params[0] > 0 && params[0] <= 100) {
        return image.quality(params[0])
    }
    return image
}

function rotate(image, data) {
    param = parseDataForInt(data)
    if (Number.isInteger(param[0]) && param[0] % 90 == 0) {
        return image.rotate(param[0])
    }
    return image
}

function extract(image, data) {
	image.metadata(function(err, meta){
		var options = {
			left: 0,
			top: 0,
			width: meta.width,
			height: meta.height
		}
		console.log(options)
		var param = parseDataIntoObject(data, options)
        console.log(options)
        return image.extract(param)
	})
}


function flip(image, data) {
	return image.flip()
}


function flop(image, data) {
	return image.flop()
}


function sharpen(image, data) {
    var params = parseDataForInt(data)
    if (!params.length < 3 && (params[0] > 0 && params[0] < 2787) && (params[1] > -1 && params[1] < 10001)
        && (params[2] > -1 && params[2] < 10001)) {
        return image.sharpen(params[0], params[1], params[2])
    }
    return image
}


function blur(image, data) {
    var params = parseDataForInt(data)
    if (params.length == 1 && params[0] >= 0.3 && params[0] < 1001) {
        return image.blur(params[0])
    }
    return image	
}

function extend(image, data) {
	var extend = {
		"top": 0,
		"left": 0,
		"bottom": 0,
		"right": 0
	}
	var param = parseDataIntoObject(data, extend)
	if (param.top < 65500 && param.left < 65500 && param.bottom < 65500 && param.right < 65500 &&
	    param.top > -1 && param.left > -1 && param.bottom > -1 && param.right > -1) {
	    return image.extend(param)
	}
    return image
}


function flatten(image, data) {
	return image.flatten()
}


function trim(image, data) {
    var param = parseDataForInt(data)
    if (!param.length < 1 && param[0] >= 1 && param[0] <= 99) {
        return image.trim(param[0])
    }
    return image
}

function gamma(image, data) {
    var param = parseDataForFloat(data)
    if (!param.length < 1 && param[0] >= 1 && param[0] <= 3) {
        return image.gamma(param[0])
    }
    return image
}

function negate(image, data) {
	return image.negate()
}


function normalise(image, data) {
	return image.normalise()
}

function threshold(image, data) {
    var param = parseDataForInt(data)
    if (!param.length < 1 && param[0] >= 0 && param[0] <= 255) {
        return image.threshold(param[0])
    }
    return image
}

module.exports = function (modContainer) {
	[		
		rotate,
		extract,
		flip,
		flop,
		sharpen,
		blur,
		extend,
		flatten,
		trim,
		gamma,
		negate,
		normalise,
		threshold,
        quality
	].forEach(function (f) {
		modContainer[f.name] = f;
	});
};