"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const routerApi = require("./router/index");
app.use("/api", routerApi);
app.listen(3001, () => {
    console.log("网站服务器已启动");
});
module.exports = app;
