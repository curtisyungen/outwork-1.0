const router = require("express").Router();
const BikeController = require("../../controllers/BikeController");
const controller = new BikeController();

router.get("/getBike", (req, res) => {
    controller.getBike(req, res);
});

router.get("/getBikesByUser", (req, res) => {
    controller.getBikesByUser(req, res);
});

router.post("/createBike", (req, res) => {
    controller.createBike(req, res);
});

router.put("/updateBikeById", (req, res) => {
    controller.updateBikeById(req, res);
});

router.delete("/deleteBikeById", (req, res) => {
    controller.deleteBikeById(req, res);
});

module.exports = router;
