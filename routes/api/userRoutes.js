const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const controller = new UserController();

router.get("/loginUser", (req, res) => {
    controller.loginUser(req, res);
});

module.exports = router;
