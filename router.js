
const userCreateOpts = {
    schema: {
        body: {
            type: "object",
            properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                age: { type: "number" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    age: { type: "number" },
                    created_at: { type: "number" },
                    updated_at: { type: "number" }
                }
            }
        }
    }
}



module.exports = async function router(fastify, options) {

    fastify.get("/", async (req, res) => {
        return { hello: "world" }
    })

    fastify.post("/user/create", userCreateOpts, async (req, res) => {
        try {
            const database = fastify.mysql
            const result = await database.User.create(req.body)

            return {
                ...result
            }
        } catch (error) {
            console.error(error)
        }

    })

    fastify.get("/user/:name", async (req, res) => {
        const database = fastify.mysql

        const result = await database.User.findAll({
            where: {
                firstName: req.params.name
            }
        })
        return {
            ...result
        }
    })
}
