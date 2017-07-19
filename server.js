"use strict"
const sharp = require("sharp");
const express = require('express');
const fs = require('fs');
const config = require('./config');

var router = express.Router();
var app = express();

app.use('/', router);

var server = app.listen(8082, function () {
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example app listening at http://%s:%s", host, port)
})

router.get('/', function (req, res) {
	var img = {
		images:[]
	}
	fs.readdir(__dirname + config.folderPath, (err, files) => {
		res.setHeader('Content-Type', 'application/json')
		try{
			files.forEach(file => {
				img.images.push(file);
			});
			res.status(200).send(JSON.stringify(img));
		}catch(err){
			res.send(JSON.stringify({Error: 'Folder not found'}))
		}
	})
})

router.route('/:modifiers([a-zA-Z0-9_,]*)/:imagePath([a-zA-Z0-9_% .-]+\.(' + config.supportedFiletype.join('|') + '))')
	.get(function(req, res){
		let mod = req.params.modifiers.split(',')
		if(mod.length === 0)
			mod[0] = req.params.modifiers
		try{
			let image = sharp(__dirname + config.folderPath + req.params.imagePath)
			applyModifiers(image, mod, 
				function(sharpO){
				    sharpO.toBuffer(function (err, data, info) {
						res.status(200).write(new Buffer(data))
						res.end();
					})
				})
		}catch(err){
			res.setHeader('Content-Type', 'application/json')
			res.send(JSON.stringify({ Error: 'Folder/File/Command not found' }))
		}
	})
	
router.route('/:imagePath([a-zA-Z0-9_% .-]+\.(' + config.supportedFiletype.join('|') + '))')
	.get(function(req, res){
	    try {
			res.status(200).sendFile(__dirname + config.folderPath + req.params.imagePath)
		}catch(err){
			res.setHeader('Content-Type', 'application/json')
			res.send(JSON.stringify({Error: 'Folder/File not found'}))
		}
	})

function applyModifiers(sharpObject, modidifiers, callback){
	let params = modidifiers[0].split('_')
	let command = params[0]
	params.splice(0,1)
	sharpObject = config.commands[command]
		(sharpObject, params.join('_'))
	modidifiers.splice(0,1)
	if(modidifiers.length > 0)
		applyModifiers(sharpObject, modidifiers, callback)
	else
		callback(sharpObject)
}























