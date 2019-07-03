const router = require("express").Router();
const SwimController = require("../../controllers/SwimController");
const controller = new SwimController();

router.get("/getSwimById", (req, res) => {
    controller.getSwimById(req, res);
});

router.get("/getSwimsByUser", (req, res) => {
    controller.getSwimsByUser(req, res);
});

router.post("/createSwim", (req, res) => {
    controller.createSwim(req, res);
});

router.put("/updateSwimById", (req, res) => {
    controller.updateSwimById(req, res);
});

router.delete("/deleteSwimById", (req, res) => {
    controller.deleteSwimById(req, res);
});

module.exports = router;
