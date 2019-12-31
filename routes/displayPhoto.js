const assert = require("assert");
const fs = require("fs"); //require file system
const formidable = require("formidable");
const ExifImage = require('exif').ExifImage;

const run = (req, res) => {

	// let form = new formidable.IncomingForm();

	// form.parse(req, (err, fields, files) => {
	// 	assert.equal(err, null);

	// 	console.log("Fields", fields);
	// 	let photo = files.photo;
	// 	console.log(photo);
	// 	let filename = photo.path;

	// 	if (photo.size === 0) {
	// 		console.log("No file");
	// 		res.render("message.ejs", {
	// 			message: "No file uploaded!",
	// 			buttonLink: "Back",
	// 			buttonText: "Back"
	// 		});
	// 		res.end();
	// 		return;
	// 	}

	// 	if (photo.type) {
	// 		//check upload file is image
	// 		if (!photo.type.match(/^image/)) {
	// 			res.render("message.ejs", {
	// 				message: "Upload file is not image!",
	// 				buttonLink: "Back",
	// 				buttonText: "Back"
	// 			});
	// 			res.end();
	// 			return;
	// 		}
	// 		photo["photo_mimetype"] = photo.type;
	// 	}

	// 	fs.readFile(filename, (err, data) => {
	// 		assert.equal(err, null);
	// 		photo["photo"] = new Buffer.from(data).toString("base64");
	// 		res.render("displayPhoto.ejs", { photo: photo });
	// 		res.end();
	// 	});

	// });
	res.render("displayPhoto.ejs");
	res.end();
}


module.exports = run;
