import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// User-related API calls

export default {

    // USER ROUTES
    // =============================================================

    loginUser: function(email, password) {
        return axios.get("/api/users/loginUser", {email: email, password: password});
    },

    getUser: function(email) {
        return axios.get("/api/users/getUser", {email: email});
    },

    getUserById: function(userId) {
        return axios.get("/api/users/getUserById", {userId: userId});
    },

    createUser: function(user) {
        return axios.post("/api/users/createUser", {user});
    },

    updateWeight: function(userId, weight) {
        return axios.put("/api/users/updateWeight", {userId: userId, weight: weight});
    },

    deleteUser: function(userId, email) {
        return axios.delete("/api/users/deleteUser", {userId: userId, email: email});
    },

    followUser: function(userId) {
        return axios.put("/api/users/followUser", {userId: userId});
    },

    // PASSWORD RESET ROUTES
    // =============================================================

    updatePassword: function(userId, password) {
        return axios.put("/api/users/updatePassword", {userId: userId, password: password});
    },

    setResetCode: function (email) {
        let resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        return axios.post("/api/reset/setResetCode", { email: email, resetCode: resetCode });
    },

    sendPasswordResetCode: function (email, resetCode) {
        return axios.post("/api/reset/sendPasswordResetCode", { email: email, resetCode: resetCode });
    },

    submitResetCode: function (email, resetCode) {
        return axios.get("/api/reset/submitResetCode/", { params: { email: email, resetCode: resetCode } });
    },

    clearResetCode: function (email) {
        return axios.delete("/api/reset/clearResetCode/" + email);
    },
}