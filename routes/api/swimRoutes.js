const router = require("express").Router();
const SwimController = require("../../controllers/SwimController");
const controller = new SwimController();

router.get("/getSwim", (req, res) => {
    controller.getSwim(req, res);
});

router.post("/createSwim", (req, res) => {
    controller.createSwim(req, res);
});

router.put("/updateSwim", (req, res) => {
    controller.updateSwim(req, res);
});

router.delete("/deleteSwim", (req, res) => {
    controller.deleteSwim(req, res);
});

module.exports = router;
