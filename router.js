
module.exports = async function router(fastify, options) {

    fastify.get("/", async (req, res) => {
        return { hello: "world" }
    })

    fastify.get("/user/:name", async (req, res) => {
        const database = fastify.mysql
        const [rows, fields] = await database.execute("SELECT * FROM users WHERE `name` = ?", [req.params.name])

        return {
            user: rows
        }
    })
}
