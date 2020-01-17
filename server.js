const mysql = require("mysql2/promise")
const fastify = require("fastify")({ logger: true })

fastify.register(require("./dbConnector"), {
    host: "localhost",
    password: "1234",
    user: "root",
    database: "test"
})
fastify.register(require("./router"))
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