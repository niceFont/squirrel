
const tap = require("tap")
const BuildFastify = require("../buildFastify")
const jwt = require("jsonwebtoken")

tap.test("GET /account/authenticate returns token", t => {

    t.plan(4)
    const fastify = BuildFastify()

    t.teardown(() => fastify.close())

    fastify.inject({
        method: "GET",
        url: "/account/authenticate?api=creeperohman",
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 200)
        t.strictEqual(response.headers["content-type"], "application/json; charset=utf-8")
        t.deepEqual(jwt.verify(JSON.parse(response.payload)["token"], "hey")["api"], "creeperohman")
    })

})
