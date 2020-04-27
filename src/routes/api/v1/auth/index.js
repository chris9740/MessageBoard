const express = require("express");
const router = express();

const authentication = require("../../../../middleware/authentication");

const authController = require("../../../../controllers/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authentication, authController.logout);

module.exports = router;