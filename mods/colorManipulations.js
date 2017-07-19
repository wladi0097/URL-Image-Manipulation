require("sharp")

function background(image, data) {
    var temp = data.split('_')
    if (!temp.length < 3) {
        var param = "rgb(" + temp.join(',') + ")"
        return image.background(param)
    }
}

function grayscale(image, data) {
    return image.grayscale()
}


module.exports = function (modContainer) {
    [
        background,
        grayscale
	].forEach(function (f) {
		modContainer[f.name] = f;
	});
};