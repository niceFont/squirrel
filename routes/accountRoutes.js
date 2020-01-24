const jwt = require("jsonwebtoken")


module.exports = async function AccountRoutes(fastify, options) {

    fastify.get("/account/authenticate", async (req, res) => {
        try {
            if (typeof req.query.api === "undefined" || req.query.api !== "creeperohman") return res.unauthorized()

            const token = jwt.sign(req.query, process.env.SECRET, { expiresIn: "12h" })
            return {
                token
            }
        } catch (error) {
            console.log(error)
            res.internalServerError()
        }
    })
}