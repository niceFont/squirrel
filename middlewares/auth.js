const jwt = require("jsonwebtoken")


module.exports = function AuthMiddleware(req, res, next) {
    if (typeof req.headers["authorization"] !== "undefined") {

        const token = req.headers["authorization"].substr(7)
        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) next(new Error("Unauthorized"))
            else next()
        })
    } else {
        next(new Error("Unauthorized"))
    }
}