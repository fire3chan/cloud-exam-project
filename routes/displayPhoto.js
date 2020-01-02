const assert = require("assert");
const fs = require("fs"); //require file system
const formidable = require("formidable");
const ExifImage = require("exif").ExifImage;

const run = (req, res) => {

	let form = new formidable.IncomingForm();

	let photoDetail = {};

	const isEmpty = (aVar) => {
		if (aVar !== null && aVar !== "" && aVar !== undefined) {
			return false;
		}
		return true;
	}
	const processExifData = (exifData, callback) => {
		if (isEmpty(exifData)) {
			callback(true);
		} else {
			photoDetail.make = isEmpty(exifData.image.Make) ? undefined : exifData.image.Make;
			photoDetail.model = isEmpty(exifData.image.Model) ? undefined : exifData.image.Model;
			photoDetail.createDate = isEmpty(exifData.exif.CreateDate) ? undefined : exifData.exif.CreateDate;

			photoDetail.GPSLatitude = convertDMSToDD(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
			photoDetail.GPSLongitude = convertDMSToDD(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
			callback(false);
		}

	};

	const convertDMSToDD = (gpsArr, direction) => {
		if (gpsArr !== null && gpsArr !== "" && gpsArr !== undefined && gpsArr.length !== 0) {
			let degrees = gpsArr[0];
			let minutes = gpsArr[1];
			let seconds = gpsArr[2];

			let dd = degrees + minutes / 60 + seconds / (60 * 60);

			if (direction == "S" || direction == "W") {
				dd = dd * -1;
			} // Don't do anything for N or E
			return dd;
		}
		return undefined;

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
						console.log("Error: 1" + error.message);

					}
					processExifData(exifData, (noExif) => {
						if (noExif) {
							res.render("displayPhoto.ejs", { photoDetail: photoDetail, noExif: true });
							res.end();
						} else {
							res.render("displayPhoto.ejs", { photoDetail: photoDetail, noExif: false });
							res.end();
						}

					});

				});
			} catch (error) {
				console.log("Error: 2" + error.message);
			}


		});

	});
}


module.exports = run;
