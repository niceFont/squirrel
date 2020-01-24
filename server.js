require("dotenv").config()
const fastify = require("fastify")({ logger: true })

fastify.register(require("fastify-sensible"))
fastify.register(require("fastify-helmet"))
fastify.register(require("./dbConnector"))
fastify.register(require("./routes/userRoutes"))
fastify.register(require("./routes/accountRoutes"))

fastify.use("/user", require("./middlewares/auth"))

const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()

module.exports = fastify