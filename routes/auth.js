const express = require("express");
const { check } = require("express-validator");
const { signup } = require("../controller/auth");

const router = express.Router();

router.post(
    "/signup",
    [
        check("username").isEmail().withMessage("Valid email is required"),
        check("password")
            .isLength({ min: 5 })
            .withMessage("Password should be of minimum length 5"),
    ],
    signup
);

module.exports = router;
