const Fastify = require("fastify")
const db = require("../models/index")
const tap = require("tap")


tap.test("Database should be injected into fastify", async t => {

    let fastify = Fastify()
    t.plan(1)

    fastify.register(require("../dbConnector"))
    t.teardown(() => {
        fastify.close()
    })
    await fastify.ready()

    t.deepEqual(db, fastify.mysql)

})

