const JWT = require("jsonwebtoken");

const authMiddleware = async(req,res,next) => {
    try {
        // get access to token from request
        const token = req.headers['authorization'].split(" ")[1];

        // send decoded userId
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err){
                return res.status(200).send({
                    message: "Authorization failed",
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Authorization failed",
            success: false
        });
    }
};

module.exports = authMiddleware;