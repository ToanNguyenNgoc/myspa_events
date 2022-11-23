var express = require("express");
var router = express.Router();
var customersCtrl = require("../controllers/customer-controller");

const upload = require("../services/upload");

/* GET home page. */
router.get("/customer", customersCtrl.get);

router.post("/upload", upload.single("file"), customersCtrl.upload);
router.get("/download", customersCtrl.download);

module.exports = router;
