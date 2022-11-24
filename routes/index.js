var express = require("express");
var router = express.Router();
var customersCtrl = require("../controllers/customer-controller");

const upload = require("../services/upload");

/* GET home page. */
router.get("/customer", customersCtrl.get);
// respond with "hello world" when a GET request is made to the homepage
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/upload", upload.single("file"), customersCtrl.upload);
router.get("/download", customersCtrl.download);

module.exports = router;
