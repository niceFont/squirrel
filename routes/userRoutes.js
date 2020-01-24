
const userCreateOpts = {
    schema: {
        body: {
            type: "object",
            required: ["firstName", "lastName", "age"],
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



module.exports = async function UserRouter(fastify, options) {


    fastify.post("/user/create", userCreateOpts, async (req, res) => {
        try {
            const database = fastify.mysql
            const result = await database.User.create(req.body)

            return {
                ...result
            }
        } catch (error) {
            res.internalServerError()
        }

    })


    fastify.post("/user/update", async (req, res) => {
        try {
            const { User } = fastify.mysql
            const result = await User.update(req.body, {
                where: {
                    id: req.body.id,
                }
            })

            return {
                ...result
            }

        } catch (error) {
            console.log(error)
            res.badRequest()
        }
    })

    fastify.delete("/user/delete", async (req, res) => {
        try {
            const { User } = fastify.mysql
            await User.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.code(200).send("Deleted")
        } catch (error) {
            res.badRequest()
        }
    })
    fastify.get("/user/:name", async (req, res) => {
        try {
            const database = fastify.mysql

            const result = await database.User.findAll({
                where: {
                    firstName: req.params.name
                },
                limit: 1
            })
            return {
                ...result
            }

        } catch (error) {
            res.internalServerError()
        }
    })
}
