const router = require("express").Router();
const LiftController = require("../../controllers/LiftController");
const controller = new LiftController();

router.get("/getLift", (req, res) => {
    controller.getLift(req, res);
});

router.post("/createLift", (req, res) => {
    controller.createLift(req, res);
});

router.put("/updateLift", (req, res) => {
    controller.updateLift(req, res);
});

router.delete("/deleteLift", (req, res) => {
    controller.deleteLift(req, res);
});

module.exports = router;
