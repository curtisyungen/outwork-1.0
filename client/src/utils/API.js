import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default {

    // BOOK ROUTES
    // =============================================================

    getAllBooks: function () {
        return axios.get("/api/books/getAllBooks/");
    },

    getSearchSuggestions: function (bookSearch) {
        return axios.get("/api/books/getSearchSuggestions/" + bookSearch);
    },

    searchForBook: function (userInput) {
        return axios.get("/api/books/searchForBook/" + userInput);
    },

    getAvailableBooks: function () {
        return axios.get("/api/books/getAvailableBooks/");
    },

    getUnavailableBooks: function () {
        return axios.get("/api/books/getUnavailableBooks/");
    },

    getFilteredAvailable: function(filter) {
        return axios.get("/api/books/getFilteredAvailable/" + filter);
    },

    getFilteredBooks: function(availFilter, formatFilter, subjectFilter) {
        return axios.get("/api/books/getFilteredBooks", { params: { availFilter: availFilter, formatFilter: formatFilter, subjectFilter: subjectFilter}});
    },

    getPaperbacks: function () {
        return axios.get("/api/books/getPaperbacks/");
    },

    getHardcovers: function () {
        return axios.get("/api/books/getHardcovers/");
    },

    getSubject: function (subject) {
        return axios.get("/api/books/getSubject/" + subject);
    },

    getBookByTitle: function (title) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
    },
    
    getBookSuggestions: function() {
        return axios.get("/api/books/getBookSuggestions");
    },

    // USER ROUTES
    // =============================================================

    loginUser: function (email, password) {
        return axios.get("/api/users/loginUser/", { params: { email: email, password: password }});
    },

    createNewUser: function (name, email, password) {
        let user = {
            name: name,
            email: email,
            password: password,
        };

        return axios.post("/api/users/createNewUser", user);
    },

    updateCart: function (email, cart) {
        return axios.put("/api/users/updateCart/" + email, cart);
    },

    findExistingUser: function (email) {
        return axios.get("/api/users/findExistingUser/" + email);
    },

    submitNewPassword: function(email, password) {
        return axios.put("/api/users/submitNewPassword", { email: email, password: password });
    },

    // CART ROUTES
    // =============================================================

    checkBookAvail: function (book) {
        return axios.get("/api/books/checkBookAvail/" + book.title);
    },

    addToCart: function (book, email) {
        return axios.put("/api/books/addToCart/" + email, book);
    },

    deleteFromCart: function (book) {
        return axios.put("/api/books/deleteFromCart", book);
    },

    getBooksInCart: function(email) {
        return axios.get("/api/books/getBooksInCart/" + email);
    },

    // PAYPAL ROUTES
    // =============================================================

    payUsingPayPal: function (total) {
        return axios.post("/api/payPal/payUsingPayPal/" + total);
    },

    successfulPayment: function (paymentId, payerId, total) {
        return axios.get("/api/payPal/successfulPayment", { params: { paymentId: paymentId, payerId: payerId, total: total }});
    },

    cancelPayment: function () {
        return axios.get("/api/payPal/cancelPayment");
    },

    // ORDER ROUTES
    // =============================================================

    getUserBookOrders: function(email) {
        return axios.get("/api/orders/getUserBookOrders/" + email);
    },

    createBookOrder: function(order) {
        return axios.post("/api/orders/createBookOrder", order);
    },

    purchaseBook: function(book, email) {
        return axios.put("/api/books/purchaseBook/" + email, book);
    },

    saveOrderTotal: function(total) {
        return axios.post("/api/orders/saveOrderTotal", total);
    },

    // EMAIL ROUTES
    // =============================================================

    sendConfirmationEmail: function(orderInfo) {
        return axios.post("/api/orders/sendConfirmationEmail", orderInfo);
    },

    submitContactForm: function(userEmail, userMsg) {
        let email = "congobooksales@gmail.com";
        let subject = "Message from Congo User";
        let message = 
        `User email: ${userEmail}
        User message: ${userMsg}`;

        return axios.post("/api/contact/submitContactForm", { email: email, subject: subject, message: message });
    },

    sendCopyToUser: function(userEmail, userMsg) {
        let email = userEmail;
        let subject = "Your message to Congo";
        let message = 
        `Hi there, 
        
        Thanks for contacting Congo. We'll be in touch with you shortly. 
        
        For now, here's a copy of your message: 
        
        ${userMsg}

        Sincerely, 

        Congo`;

        return axios.post("/api/contact/submitContactForm", { email: email, subject: subject, message: message });
    },

    // PASSWORD RESET ROUTES
    // =============================================================

    setResetCode: function(email) {
        let resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        return axios.post("/api/reset/setResetCode", { email: email, resetCode: resetCode });
    },

    sendPasswordResetCode: function(email, resetCode) {
        return axios.post("/api/reset/sendPasswordResetCode", { email: email, resetCode: resetCode });
    },

    submitResetCode: function(email, resetCode) {
        return axios.get("/api/reset/submitResetCode/", { params: { email: email, resetCode: resetCode }});
    },

    clearResetCode: function(email) {
        return axios.delete("/api/reset/clearResetCode/" + email);
    },
};
