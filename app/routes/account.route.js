const express = require("express");
const accounts = require("../controllers/account.controller");

const router = express.Router();

router.route("/create")
    .post(accounts.create);
router.route("/login") 
    .post(accounts.login)

module.exports = router;