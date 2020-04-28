const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		if(!file.originalname.match(/\.(jpg|jpeg|png)$/gm)) {
			return cb(new Error("Please upload an image"));
		}

		cb(undefined, true);
	}
});

const authentication = require("../../../../middleware/authentication");

const usersController = require("../../../../controllers/users");

router.get("/@me", authentication, usersController.getOwnProfile);
router.patch("/@me", authentication, usersController.updateProfile);

router.get("/:userId", authentication, usersController.getProfile);

router.get("/@me/avatar", authentication, usersController.getOwnAvatar);
router.get("/:userId/avatar", authentication, usersController.getAvatar);

router.post("/@me/avatar", authentication, upload.single("avatar"), usersController.updateAvatar, (error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

module.exports = router;