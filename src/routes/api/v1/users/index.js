const express = require("express");
const router = express.Router();

const authentication = require("../../../../middleware/authentication");

const usersController = require("../../../../controllers/users");

router.get("/@me", authentication, usersController.getOwnProfile);
router.patch("/@me", authentication, usersController.updateProfile);

router.get("/:userId", authentication, usersController.getProfile)

module.exports = router;