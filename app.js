const express = require("express");

const uploadPhotoFormPage = require("./routes/uploadPhotoForm");
const displayPhotoPage = require("./routes/displayPhoto");
const showMap = require("./routes/showMap");
const messagePage = require("./routes/message");

const app = express();

app.set("view engine", "ejs");

// static file setting
app.use(express.static(__dirname + "/public"));
app.use("/bootstrap_css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/bootstrap_js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

// path handling
app.get("/", uploadPhotoFormPage);
app.post("/upload", displayPhotoPage);
app.get("/map", showMap);
app.get("/message", messagePage);


app.listen(process.env.PORT || 8099);