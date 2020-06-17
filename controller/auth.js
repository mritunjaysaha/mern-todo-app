const User = require("../model/user.model");
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: { msgBody: "Invalid email" },
            msgError: true,
        });
    }
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
        console.log(username);
        if (err) {
            return res.status(500).json({
                message: { msgBody: "Error has occured", msgError: true },
            });
        }
        if (user) {
            return res.status(400).json({
                message: {
                    msgBody: "Username is already taken",
                    msgError: true,
                },
            });
        } else {
            const newUser = new User({ username, password });

            newUser.save((err) => {
                if (err) {
                    return res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true,
                        },
                    });
                } else {
                    return res.status(201).json({
                        message: {
                            msgBody: "Account successfully created",
                            msgError: false,
                        },
                    });
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;
    const error = validationResult(req);

    if (error) {
        return res.status(500).json({
            message: {
                msgBody: "Error has occured",
                msgError: true,
            },
        });
    }

    User.findOne({ username }, (error, user) => {
        console.log(username);
        if (error) {
            return res.status(500).json({
                message: {
                    msgBody: "Error has occured",
                    msgError: true,
                },
            });
        }
        if (!user) {
            return res.status(400).json({
                message: {
                    msgBody: "User does not exists",
                    msgError: true,
                },
            });
        }

        if (!user.comparePassword(password)) {
            return res.json({
                message: {
                    msgBody: "Username and passwords do not match",
                    msgError: true,
                },
            });
        }

        const { _id } = user._id;
        const { username } = req.body;
        const token = JWT.sign(
            {
                iss: "mj",
                sub: _id,
            },
            "mj"
        );

        res.cookie(("token", token, { expire: new Data() + 9999 }));
        res.json({ isAuthentiated: true, user: username });
    });
};
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: { msgBody: "User successfully signed out", msgError: true },
    });
};
