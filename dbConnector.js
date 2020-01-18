const fastifyPlugin = require("fastify-plugin")
const DB = require("./models")

async function MySQLConnector(fastify, options) {
    try {

        await DB.sequelize.authenticate()

        await DB.User.sync()

        fastify.decorate("mysql", DB)

    } catch (error) {
        console.error(error)
    }
}

module.exports = fastifyPlugin(MySQLConnector)