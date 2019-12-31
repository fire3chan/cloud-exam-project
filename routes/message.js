const run = (req, res) => {
    
    const action = req.body.action;
    let messageBody = {
        message: "",
        buttonLink: "",
        buttonText: "",
    };

    switch (action) {
        case "logout":
            res.clearCookie("session");
            messageBody.message = "You have logged out.";
            messageBody.buttonLink = "/";
            messageBody.buttonText = "Home";
            break;
        
    }
 
    res.render("message.ejs", messageBody);
    res.end();

};

module.exports = run;