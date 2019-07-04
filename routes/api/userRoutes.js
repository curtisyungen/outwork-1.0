const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const controller = new UserController();

router.get("/loginUser", (req, res) => {
    controller.loginUser(req, res);
});

router.get("/getUser/:email", (req, res) => {
    controller.getUser(req, res);
});

router.get("/getUserById", (req, res) => {
    controller.getUserById(req, res);
});

router.post("/createUser", (req, res) => {
    controller.createUser(req, res);
});

router.post("/followUser", (req, res) => {
    controller.followUser(req, res);
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
