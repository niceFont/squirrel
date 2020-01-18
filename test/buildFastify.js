const Fastify = require("fastify")

module.exports = function BuildFastify() {
    const fastify = Fastify()

    fastify.register(require("../dbConnector"))
    fastify.register(require("../router"))
    db.User.sync()

    return fastify
}