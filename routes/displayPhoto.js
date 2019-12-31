const assert = require("assert");
const fs = require("fs"); //require file system
const formidable = require("formidable");
const ExifImage = require('exif').ExifImage;

const run = (req, res) => {

	let form = new formidable.IncomingForm();

	let photoDetail = {};

	const processExifData = (exifData, callback) => {
		photoDetail.make = exifData.image.Make;
		photoDetail.model = exifData.image.Model;
		photoDetail.createDate = exifData.exif.CreateDate;
		callback();
	};

	form.parse(req, (err, fields, files) => {
		assert.equal(err, null);

		photoDetail.title = fields.title;
		photoDetail.description = fields.description;

		let photo = files.photo;
		let filename = photo.path;

		if (photo.size === 0) {
			res.render("message.ejs", {
				message: "No file uploaded!",
				buttonLink: "Back",
				buttonText: "Back"
			});
			res.end();
			return;
		}

		if (photo.type) {
			//check upload file is image
			if (!photo.type.match(/^image/)) {
				res.render("message.ejs", {
					message: "Upload file is not image!",
					buttonLink: "Back",
					buttonText: "Back"
				});
				res.end();
				return;
			}
			photoDetail.photo_mimetype = photo.type;
		}

		fs.readFile(filename, (err, data) => {
			assert.equal(err, null);
			photoDetail.photo = new Buffer.from(data).toString("base64");

			try {
				new ExifImage({ image: filename }, (error, exifData) => {
					if (error) {
						console.log("Error: " + error.message);
					}
					else {
						console.log(exifData);

						processExifData(exifData, () => {
							res.render("displayPhoto.ejs", { photoDetail: photoDetail });
							res.end();
						});

					}
				});
			} catch (error) {
				console.log("Error: " + error.message);
			}


		});

	});
}


module.exports = run;
