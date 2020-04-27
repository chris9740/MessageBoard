const express = require("express");
const router = express.Router();

const authentication = require("../../../../middleware/authentication");
const messageVerification = require("../../../../middleware/messageVerification");

const messageControllers = require("../../../../controllers/messages");

router.get("/", authentication, messageControllers.getMessages);
router.post("/", authentication, messageControllers.sendMessage);
router.get("/:messageId", authentication, messageControllers.getMessage);
router.patch("/:messageId", authentication, messageVerification, messageControllers.updateMessage);
router.delete("/:messageId", authentication, messageVerification, messageControllers.deleteMessage);

module.exports = router;