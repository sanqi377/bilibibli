const express = require("express");
const app = express();

// 前端 router 引入
const apiRouter = require("./router/Api");

// 将接收到的数据转换为 JSON 格式
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// 前端 router 使用
app.use("/bilibili", apiRouter);

// 允许跨域
app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})


app.listen(3000, () => {
    console.log("网站服务器已启动");
});

module.exports = app;