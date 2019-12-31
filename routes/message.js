const run = (req, res) => {

    let messageBody = {
        message: "",
        buttonLink: "",
        buttonText: "",
    };

    res.render("message.ejs", messageBody);
    res.end();

};

module.exports = run;