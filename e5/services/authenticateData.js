module.exports = {
    authenticateData: (req, res, next) => {
        try {
            var data = JSON.parse(req.body);
            console.log(data);
            next();
        }catch(err) {
            console.log("in");
            res.status(400).send("Invalid Input type");
        }
        
    }
}