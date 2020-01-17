const fastifyPlugin = require("fastify-plugin")
const mysql = require("mysql2/promise")
const Sequelize = require("sequelize")
const { User, UserConfig } = require("./Models/User")


async function MySQLConnector(fastify, options) {
    try {
        const sequelize = new Sequelize(options.database, options.user, options.password, {
            host: options.host,
            dialect: "mysql",
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        })

        User.init(UserConfig, {
            sequelize,
            modelName: "user"
        })

        const connection = await sequelize.authenticate()

        const l = await User.sync()
        console.log(l)
        fastify.decorate("mysql", connection)

    } catch (error) {
        console.error(error)
    }
}

module.exports = fastifyPlugin(MySQLConnector)