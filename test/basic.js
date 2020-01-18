const tap = require("tap")
const BuildFastify = require("./buildFastify")

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
        t.deepEqual(JSON.parse(response.payload)[0], {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            age: 18,
            createdAt: "2020-01-18T04:25:29.000Z",
            updatedAt: "2020-01-18T04:25:29.000Z"
        })
    })
})


