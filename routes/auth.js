const express = require("express");
const { check } = require("express-validator");
const { signup, signin, signout } = require("../controller/auth");

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
router.post(
    "/signin",
    [check("username").isEmail(), check("password").isLength({ min: 1 })],
    signin
);

router.get("/signout", signout);
module.exports = router;
