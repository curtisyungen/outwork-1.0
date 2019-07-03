const router = require("express").Router();
const BikeController = require("../../controllers/BikeController");
const controller = new BikeController();

router.get("/getBike", (req, res) => {
    controller.getBike(req, res);
});

router.post("/createBike", (req, res) => {
    controller.createBike(req, res);
});

router.put("/updateBike", (req, res) => {
    controller.updateBike(req, res);
});

router.delete("/deleteBike", (req, res) => {
    controller.deleteBike(req, res);
});

module.exports = router;
