var express = require("express");
var router = express.Router();
var customersCtrl = require("../controllers/customer-controller");
var usersCtrl = require("../controllers/auth-controller");

const { verifySignUp, authJwt } = require("../middleware");

const upload = require("../services/upload");

router.get("/login", (req, res) => {
  res.render("login");
});

/* GET home page. */
router.get("/customer", [authJwt.verifyToken], customersCtrl.get);
/* GET home page. */
router.post("/customer/:id", customersCtrl.update);
// respond with "hello world" when a GET request is made to the homepage
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/upload", upload.single("file"), customersCtrl.upload);
router.get("/download", customersCtrl.download);

router.post(
  "/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  usersCtrl.signup
);

router.post("/auth/signin", usersCtrl.signin);
module.exports = router;
