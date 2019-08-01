const db = require("../models/index.js");
const nodemailer = require("nodemailer");

class ResetController {

    setResetCode(req, res) {
        db.Reset.findOrCreate({
            where: { email: req.body.email },
            defaults: {
                email: req.body.email,
                resetCode: req.body.resetCode,
            }
        })
            .then((reset) => {
                res.json(reset);
            });
    }

    sendPasswordResetCode(req, res) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "congoserver@gmail.com",
                pass: process.env.GMAIL_PASSWORD,
            }
        });

        let mailOptions = {
            from: "congoserver@gmail.com",
            to: req.body.email,
            subject: "Congo password assistance",
            text: `
            Hi there,
            Here is your One Time Password: ${req.body.resetCode}.
            If you continue to have issues, please contact us by responding to this email. 
            We'll be happy to assist you in recovering your account.
            Sincerely, 
            Outwork`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                // Used only to fulfill axios promise
                db.Books.findAll({})
                    .then(() => {
                        res.json("Complete");
                    });
            }
        });
    }

    submitResetCode(req, res) {
        db.Reset.findAll({
            where: {
                email: req.query.email,
                resetCode: req.query.resetCode
            }})
            .then((user) => {
                res.json(user);
            });
    }

    clearResetCode(req, res) {
        db.Reset.destroy({
            where: {
                email: req.params.email
            }})
            .then(() => {
                res.json("Deleted.");
            });
    }
}

module.exports = ResetController;