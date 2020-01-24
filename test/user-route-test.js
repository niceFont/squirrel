const tap = require("tap");
const db = require("../models/index");
const BuildFastify = require("../buildFastify");

tap.test("GET /user/:name returns user", t => {
  t.plan(4);
  const fastify = BuildFastify();

  t.teardown(() => fastify.close());

  fastify.inject(
    {
      method: "GET",
      url: "/user/John"
    },
    (err, response) => {
      t.error(err);
      t.strictEqual(response.statusCode, 200);
      t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8"
      );
      const payload = JSON.parse(response.payload);
      delete payload[0].updatedAt;
      delete payload[0].createdAt;
      t.deepEqual(payload[0], {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        age: 18
      });
    }
  );
});

tap.test("GET /user/:name returns empty", t => {
  const fastify = BuildFastify();

  t.plan(4);

  t.teardown(() => fastify.close());

  fastify.inject(
    {
      method: "GET",
      url: "/user/NotAvailable"
    },
    (err, response) => {
      t.error(err);
      t.strictEqual(response.statusCode, 200);
      t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8"
      );
      t.deepEqual(JSON.parse(response.payload), {});
    }
  );
});

tap.test("POST /user/create creates new user", t => {
  const fastify = BuildFastify();

  t.plan(4);

  t.teardown(() => {
    fastify.close();
    //db.sequelize.close()
  });

  fastify.inject(
    {
      method: "POST",
      url: "/user/create",
      payload: { firstName: "Tester", lastName: "Test", age: 19 }
    },
    (err, response) => {
      t.error(err);
      t.strictEqual(response.statusCode, 200);
      t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8"
      );
      db.User.findAll({
        where: {
          firstName: "Tester"
        },
        limit: 1
      }).then(user => {
        delete user[0].dataValues.id;
        delete user[0].dataValues.createdAt;
        delete user[0].dataValues.updatedAt;
        t.deepEqual(user[0].dataValues, {
          firstName: "Tester",
          lastName: "Test",
          age: 19
        });
        t.done();
      });
    }
  );
});

tap.test("POST /user/create throws error", t => {
  const fastify = BuildFastify();

  t.plan(3);

  t.teardown(() => {
    fastify.close();
    //db.sequelize.close()
  });

  fastify.inject(
    {
      method: "POST",
      url: "/user/create",
      payload: {}
    },
    (err, response) => {
      t.error(err);
      t.strictEqual(response.statusCode, 400);
      t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8"
      );
    }
  );
});
