import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Hall of Fame-related API calls

export default {

    getHof: function() {
        return axios.get("/api/hof/getHof");
    },

    getMaxWorkouts: function() {
        return axios.get("/api/hof/getMaxWorkouts");
    },

    getMinWorkouts: function() {
        return axios.get("/api/hof/getMinWorkouts");
    },

    getLongestRun: function() {
        return axios.get("/api/hof/getLongestRun");
    },

    getMaxClimb: function() {
        return axios.get("/api/hof/getMaxClimb");
    },

    getMaxPushups: function() {
        return axios.get("/api/hof/getMaxPushups");
    },

    getMaxPullups: function() {
        return axios.get("/api/hof/getMaxPullups");
    },

    getMaxGoggins: function() {
        return axios.get("/api/hof/getMaxGoggins");
    },

    getMaxRaces: function() {
        return axios.get("/api/hof/getMaxRaces");
    },

    getTotalTime: function() {
        return axios.get("/api/hof/getTotalTime");
    },

    getRainyDays: function() {
        return axios.get("/api/hof/getRainyDays");
    },

    getSwims: function() {
        return axios.get("/api/hof/getSwims");
    },

    getHotdog: function() {
        return axios.get("/api/hof/getHotdog");
    },

    updateHof: function(award, userName, value) {
        return axios.put("/api/hof/updateHof", {award: award, userName: userName, value: value});
    }
}
