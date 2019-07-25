const router = require("express").Router();
const ShoeController = require("../../controllers/ShoeController");
const controller = new ShoeController();

router.get("/getShoesByUserId/:userId", (req, res) => {
    controller.getShoesByUserId(req, res);
});

router.post("/addShoe", (req, res) => {
    controller.addShoe(req, res);
});

router.delete("/deleteShoe/:id", (req, res) => {
    controller.deleteShoe(req, res);
});

module.exports = router;