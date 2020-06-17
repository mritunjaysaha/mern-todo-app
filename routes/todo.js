const express = require("express");
const { createTodo } = require("../controller/todo");

const router = express.Router();

router.post("/create", createTodo);

module.exports = router;
