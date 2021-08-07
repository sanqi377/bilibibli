const express = require("express");
const app = express();

// 前端 router 引入
const apiRouter = require("./router/Api");

// 将接收到的数据转换为 JSON 格式
app.use(express.json());

// 前端 router 使用
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("网站服务器已启动");
});

module.exports = app;