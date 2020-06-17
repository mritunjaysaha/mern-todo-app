const Todo = require("../model/todo.model");

exports.createTodo = (req, res) => {
    const { description } = req.body;
    console.log(description);

    const newTodo = new Todo();

    newTodo.save((err) => {
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
                    msgBody: "Todo successfully created",
                    msgError: true,
                },
            });
        }
    });
};
