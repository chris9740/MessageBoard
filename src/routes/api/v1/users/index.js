const express = require("express");
const router = express.Router();

const authentication = require("../../../../middleware/authentication");

const usersController = require("../../../../controllers/users");

router.get("/@me", authentication, usersController.getProfile);
router.patch("/@me", authentication, usersController.updateProfile);

module.exports = router;