const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


const app = express();
const router = express.Router();
// 라우터 자체만으로 완전 독립된 하나의 미니 app


// "/" ==> /api/
router.get("/", (req, res) => {
    res.send("Hi!");
});

app.use("/api", bodyParser.json(), router);
app.use(express.static("./assets"));

// app.use("/api", express.json(), router);
// app.use = 미들웨어를 붙일 수 있는 코드
// api 요청을 받을때 /api 라는 경로가 맨 앞에 붙어있어야만 뒤에있는 express.json, router 미들웨어에 연결이 된다는 뜻
// /api 로 들어올 때만 미들웨어에 연결!! 

app.listen(8080, () => {
    console.log("서버가 켜졌어요!");
});