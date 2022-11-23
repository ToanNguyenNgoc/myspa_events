"use strict";
const db = require("./db");
const Customers = db.customers;

const responseFormat = (data) => {
  return { time: new Date(), query: data, update: [] };
};
module.exports = function (app) {
  // todoList Routes
  app.route("/api/customers").get((req, res) => {
    Customers.findAll()
      .then((data) => {
        if (data.length > 0) {
          const formatValue = data.map(
            (item) =>
              `('${item.id}', '${item.name}', '${item.company}', '${item.phone}, '${item.check_in}')`
          );
          const query =
            "INSERT INTO `customers` (`id`, `name`, `company`, `phone`, `check_in`) VALUES" +
            formatValue.join(",");
          res.send(responseFormat(query));
        } else res.send(responseFormat(null));
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customers.",
        });
      });
  });

  app.route("/api/customers").post((req, res) => {
    const { script } = req.body;
    script.forEach((element) => {
      Customers.update(
        { check_in: element.check_in },
        {
          where: { id: element.id },
        }
      );
    });
    res.send({
      message: "send data success",
    });
  });
};
