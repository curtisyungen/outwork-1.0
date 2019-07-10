import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Activity-related API calls

export default {

    // RUNS

    getTotalMilesRun: function(userId) {
        return axios.get("/api/metrics/getPullUps", {userId: userId});
    },

    getTotalClimbRun: function(userId) {
        return axios.get("/api/metrics/getPullUps", {userId: userId});
    },

    getAvgMilesRunPerWeek: function(userId) {
        return axios.get("/api/metrics/getPullUps", {userId: userId});
    },

    // BIKES

    getTotalMilesBiked: function(userId) {
        return axios.get("/api/metrics/getPullUps", {userId: userId});
    },

    // SWIMS

    getTotalMilesSwam: function(userId) {
        return axios.get("/api/metrics/getTotalMilesSwam", {userId: userId});
    },

    // LIFTS

    getTotalPushUps: function(userId) {
        return axios.get("/api/metrics/getPushUps", {userId: userId});
    },

    getTotalPullUps: function(userId) {
        return axios.get("/api/metrics/getPullUps", {userId: userId});
    },
}