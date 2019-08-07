const router = require("express").Router();
const ShoeController = require("../../controllers/ShoeController");
const controller = new ShoeController();

router.get("/getShoesByUserId/:userId", (req, res) => {
    controller.getShoesByUserId(req, res);
});

router.get("/getShoeMiles", (req, res) => {
    controller.getShoeMiles(req, res);
});

router.get("/getShoeWears", (req, res) => {
    controller.getShoeWears(req, res);
});

router.post("/addShoe", (req, res) => {
    controller.addShoe(req, res);
});

router.put("/addMiles", (req, res) => {
    controller.addMiles(req, res);
});

router.put("/addWears", (req, res) => {
    controller.addWears(req, res);
});

router.delete("/deleteShoe/:id", (req, res) => {
    controller.deleteShoe(req, res);
});

module.exports = router;