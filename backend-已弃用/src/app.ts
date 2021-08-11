import * as express from 'express'

const app = express()

const routerApi = require("./router/index")

app.use("/api", routerApi)

app.listen(3000, () => {
  console.log("网站服务器已启动")
})

module.exports = app