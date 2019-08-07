import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Shoe-related API calls

export default {

    getShoesByUserId: function(userId) {
        return axios.get("/api/shoes/getShoesByUserId/" + userId);
    },

    getShoeMiles: function(userId) {
        return axios.get("/api/shoes/getShoeMiles", { userId: userId });
    },

    getShoeWears: function() {
        return axios.get("/api/shoes/getShoeWears");
    },

    addShoe: function(shoe) {
        return axios.post("/api/shoes/addShoe", shoe);
    },

    deleteShoe: function(id, userId) {
        return axios.delete("/api/shoes/deleteShoe/" + id, userId);
    }
}
