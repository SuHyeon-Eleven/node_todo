const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo")
mongoose.connect(" mongodb://127.0.0.1:27017/todo-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
const app = express();
const router = express.Router();
router.get("/", (req, res) => {
    res.send("Hi!");
});


router.post("/todos", async (req, res) => {
    const { value } = req.body; //구조 분해 할당
    const maxOrderTodo = await Todo.findOne().sort("-order").exec(); //exec가 promise값이기 때문에 await로 동작 대기
    let order = 1;
    if (maxOrderTodo) {
        order = maxOrderTodo.order + 1;
    }
    const todo = new Todo({ value, order });
    await todo.save();
    res.send({ todo });
});
app.use("/api", bodyParser.json(), router);
app.use(express.static("./assets"));
app.listen(8080, () => {
    console.log("서버가 켜졌어요!");
});