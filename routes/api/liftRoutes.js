const router = require("express").Router();
const LiftController = require("../../controllers/LiftController");
const controller = new LiftController();

router.get("/getLiftById", (req, res) => {
    controller.getLiftById(req, res);
});

router.get("/getLiftsByUser", (req, res) => {
    controller.getLiftsByUser(req, res);
});

router.post("/createLift", (req, res) => {
    controller.createLift(req, res);
});

router.put("/updateLiftById", (req, res) => {
    controller.updateLiftById(req, res);
});

router.delete("/deleteLiftById", (req, res) => {
    controller.deleteLiftById(req, res);
});

module.exports = router;
