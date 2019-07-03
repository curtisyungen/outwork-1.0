const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const runRoutes = require("./runRoutes");
const bikeRoutes = require("./bikeRoutes");
const swimRoutes = require("./swimRoutes");
const liftRoutes = require("./liftRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const resetRoutes = require("./resetRoutes");

// User routes
router.use("/users", userRoutes);

// Run routes
router.use("/runs", runRoutes);

// Bike routes
router.use("/bikes", bikeRoutes);

// Swim routes
router.use("/swims", swimRoutes);

// Lift routes
router.use("/lifts", liftRoutes);

// Exercise routes
router.use("/exercises", exerciseRoutes);

// Reset routes
router.use("/reset", resetRoutes);

// For anything else, render the html page
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
