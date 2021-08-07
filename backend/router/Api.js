const router = require("express").Router();
const api = require("../api/Mm");

router

// 今日壁纸
    .post("/mm/today", (req, res) => {
    let data = req.body;
    api.today((data) => {
        res.send({ data: data });
    });
});

module.exports = router;