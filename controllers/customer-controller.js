"use strict";

const db = require("../config/db");

const fs = require("fs");
const csv = require("fast-csv");
const CsvParser = require("json2csv").Parser;

const Customers = db.customers;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: total, rows } = data;
  const current_page = page ? +page : 0;
  const total_page = Math.ceil(total / limit);

  return { total, data: rows, total_page, current_page };
};
module.exports = {
  get: (req, res) => {
    const { page } = req.query;
    const { limit, offset } = getPagination(page - 1, 15);
    Customers.findAndCountAll({
      limit: limit,
      offset: offset,
    })
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.render("index", { data: response });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customerss.",
        });
      });
  },

  upload: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
      console.log(req.file);
      let customers = [];
      let path = "uploads/" + req.file.filename;

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          customers.push(row);
        })
        .on("end", () => {
          Customers.bulkCreate(customers)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  },

  download: (req, res) => {
    Customers.findAll().then((objs) => {
      let customers = [];
      objs.forEach((obj) => {
        const { id, name, ticket, position, phone, check_in } = obj;
        Customers.push({ id, name, ticket, position, phone, check_in });
      });

      const csvFields = [
        "STT",
        "Họ tên",
        "Loại vé",
        "Vị trí",
        "SĐT",
        "Check in",
      ];
      const csvParser = new CsvParser({ csvFields });
      const csvData = csvParser.parse(customers);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=tutorials.csv"
      );
      res.status(200).end(csvData);
    });
  },
};
