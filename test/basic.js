const tap = require("tap")
const db = require("../models/index")
const BuildFastify = require("../buildFastify")

tap.test("GET / route", t => {

    t.plan(4)
    const fastify = BuildFastify()

    t.teardown(() => fastify.close())


    fastify.inject({
        method: "GET",
        url: "/user/John",
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 200)
        t.strictEqual(response.headers["content-type"], "application/json; charset=utf-8")
        const payload = JSON.parse(response.payload)
        delete payload[0].updatedAt
        delete payload[0].createdAt
        t.deepEqual(payload[0], { id: 1, firstName: "John", lastName: "Doe", age: 18 })
    })
})


