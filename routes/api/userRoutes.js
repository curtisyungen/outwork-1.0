const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const controller = new UserController();

router.get("/loginUser", (req, res) => {
    controller.loginUser(req, res);
});

router.get("/getUser", (req, res) => {
    controller.getUser(req, res);
});

router.post("/createUser", (req, res) => {
    controller.createUser(req, res);
});

router.put("/updatePassword", (req, res) => {
    controller.updatePassword(req, res);
});

router.put("/updateWeight", (req, res) => {
    controller.updateWeight(req, res);
});

router.delete("/deleteUser", (req, res) => {
    controller.deleteUser(req, res);
});

module.exports = router;
