import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Activity-related API calls

export default {

    // RUN ROUTES
    // =============================================================

    getRunById: function(runId) {
        return axios.get("/api/runs/getRunById", {id: runId});
    },

    getRunsByUser: function(userId) {
        return axios.get("/api/runs/getRunsByUser", {userId: userId});
    },

    createRun: function(runData) {
        console.log(runData);
        return axios.post("/api/runs/createRun", {runData: runData});
    },

    updateRunById: function(runId) {
        return axios.put("/api/runs/updateRunById", {id: runId});
    },

    deleteRunById: function(runId) {
        return axios.delete("/api/runs/deleteRunById", {id: runId});
    },

    // BIKE ROUTES
    // =============================================================

    getBikeById: function(bikeId) {
        return axios.get("/api/bikes/getBikeById", {id: bikeId});
    },

    getBikesByUser: function(userId) {
        return axios.get("/api/bikes/getBikesByUser", {userId: userId});
    },

    createBike: function(bikeData) {
        return axios.post("/api/bikes/createBike", {bikeData: bikeData});
    },

    updateBikeById: function(bikeId) {
        return axios.put("/api/bikes/updateBikeById", {id: bikeId});
    },

    deleteBikeById: function(bikeId) {
        return axios.delete("/api/bikes/deleteBikeById", {id: bikeId});
    },

    // SWIM ROUTES
    // =============================================================

    getSwimById: function(swimId) {
        return axios.get("/api/swims/getSwimById", {id: swimId});
    },

    getSwimsByUser: function(userId) {
        return axios.get("/api/swims/getSwimsByUser", {userId: userId});
    },

    createSwim: function(swimData) {
        return axios.post("/api/swims/createSwim", {swimData: swimData});
    },

    updateSwimById: function(swimId) {
        return axios.put("/api/swims/updateSwimById", {id: swimId});
    },

    deleteSwimById: function(swimId) {
        return axios.delete("/api/swims/deleteSwimById", {id: swimId});
    },
    
    // LIFT ROUTES
    // =============================================================

    getLiftById: function(liftId) {
        return axios.get("/api/lifts/getLiftById", {id: liftId});
    },

    getLiftsByUser: function(userId) {
        return axios.get("/api/lifts/getLiftsByUser", {userId: userId});
    },

    createLift: function(liftData) {
        return axios.post("/api/lifts/createLift", liftData);
    },

    updateLiftById: function(liftId) {
        return axios.put("/api/lifts/updateLiftById", {id: liftId});
    },

    deleteLiftById: function(liftId) {
        return axios.delete("/api/lifts/deleteLiftById", {id: liftId});
    },
}
