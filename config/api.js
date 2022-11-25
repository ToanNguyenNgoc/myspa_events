"use strict";
const db = require("./db");
const Customers = db.customers;
const { Op } = require("sequelize");

const responseFormat = (data) => {
  return { time: new Date(), query: data, update: [] };
};
/**
 *
 * @param {"2022-11-20 00:00:00"} time_fetch
 */
module.exports = function (app) {
  // todoList Routes
  app.route("/api/customers").get((req, res) => {
    Customers.findAll()
      .then((data) => {
        if (data.length > 0) {
          const formatValue = data.map(
            (item) =>
              `('${item.id}', '${item.name}', '${item.company}',  '${item.ticket}', '${item.phone}', '${item.check_in}')`
          );
          const query =
            "INSERT INTO `customers` (`id`, `name`, `company`, `ticket`, `phone`, `check_in`) VALUES" +
            formatValue.join(",");
          res.send(responseFormat(query));
        } else res.send(responseFormat(""));
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customers.",
        });
      });
  });
  /**
   * {
   *  script: string[]
   * }
   */
  app.route("/api/customers").post(async (req, res) => {
    const { script } = req.body;
    script.forEach(async (element) => {
      await db.sequelize.query(element);
    });
    res.send({
      message: "send data success",
    });
  });
};
