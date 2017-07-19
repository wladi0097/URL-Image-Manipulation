"use strict"
const sharp = require("sharp");
const express = require('express');
const fs = require('fs');
const config = require('./config');

var router = express.Router();
var app = express();

app.use('/', router);

router.get('/', function (req, res) {
	let image = sharp(__dirname + config.folderPath + "1.jpeg")
	
	image.metadata(function(err, meta){		
		var options = {
			"left": 0,
			"top": 0,
			"width": meta.width,
			"height": meta.height
		}
		var param = parseDataIntoObject("100_100_0_0", options, ["left", "top", "width", "height"])
		image.extract(param)
		.then(
			image.toBuffer(function(err, data, info){
						res.status(200).write(new Buffer(data))
						res.end();
					})
		)
	})
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example app listening at http://%s:%s", host, port)
})



function parseDataForInt(data) {
	var temp = data.split('_')
	var params = []
	
	for (var i = 0; i < temp.length; i++) {
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
	
	for (var i = 0; i < temp.length; i++) {
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
	
	for (var i = 0; i < temp.length; i++) {
		if (temp[i] == 'true')
			params.push(true)
		else if(temp[i] == 'false')
			params.push(false)
		else
			params.push(null)
	}
	
	return params
}

function parseDataIntoObject(data, object, keys){
	var temp = data.split('_')
	for (var i = 0; i < temp.length; i++) {
		var value = parseInt(temp[i])
		if (!Object.is(value, NaN) && value != 0){
			object[keys[i]] = value
			console.log(value)
		}
	}
	return object
}

















