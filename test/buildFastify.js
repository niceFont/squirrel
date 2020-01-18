const Fastify = require("fastify")
const db = require("../models/index")

module.exports = function BuildFastify() {
    const fastify = Fastify()

    fastify.register(require("../dbConnector"))
    fastify.register(require("../router"))
    db.User.sync()

    return fastify
}