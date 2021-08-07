const express = require("express");
const router = express.Router();
const request = require('request')


/**
 * 用户信息接口
 * url: /bilibili/user/getInfo
 * param: 用户 Mid
 */
router.post("/user/getInfo", (req, res) => {
    let mid = req.body.mid;
    let info = {};
    request('https://api.bilibili.com/x/space/acc/info?mid=' + mid, (err, rep, body) => {
        body = JSON.parse(body)
        info.nickname = body.data.name;
        request('https://api.bilibili.com/x/relation/stat?vmid=' + mid, (err, rep, body) => {
            body = JSON.parse(body)
            info.follower = body.data.follower;
            res.send({ data: info });
        })
    })
});


/** 
 * 用户投稿视频接口
 * url: /bilibili/user/getVideo
 * param: 用户 Mid
 */
router.post("/user/getVideo", (req, resp) => {
    let mid = req.body.mid;
    let info = [];
    let bvid = [];
    const getInfoList = (info, id, title) => {
        return new Promise(resolve =>
            request('https://api.bilibili.com/x/web-interface/archive/stat?bvid=' + id, (err, rep, body) => {
                let bodys = JSON.parse(body).data;
                bodys.title = title
                info.push(bodys)
                resolve(info)
            })
        )
    }
    request('https://api.bilibili.com/x/space/arc/search?mid=' + mid, (err, rep, body) => {
        body = JSON.parse(body)
        body.data.list.vlist.forEach(item => {
            let object = { title: item.title, bvid: item.bvid }
            bvid.push(object);
        })
        return new Promise(resolve => {
            bvid.forEach(item => {
                getInfoList(info, item.bvid, item.title)
                    .then((res) => {
                        if (info.length === bvid.length) {
                            resolve(res)
                        }
                    })
            })
        }).then(res => {
            resp.send({ data: res })
        })
    })
});

/**
 * 弹幕接口
 * url: /bilibili/live/getBarrage
 * param: 直播间 id
 */
router.post("/live/getBarrage", (req, res) => {
    let liveId = req.body.id;
    request('https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=' + liveId, (err, rep, body) => {
        body = JSON.parse(body).data;
        res.send({ data: body });
    })
});

/**
 * 发送弹幕接口
 * url: /bilibili/live/sendBarrage
 * param: roomid、msg、csrf、rnd、fontsize、color
 * headers: cookie
 */
router.post("/live/sendBarrage", (req, res) => {
    let body = req.body;
    request.post({ url: 'https://api.live.bilibili.com/msg/send', form: body, headers: { cookie: body.cookie } }, (err, rep, body) => {
        body = JSON.parse(body);
        res.send({ data: "发送成功" });
    })
});

/**
 * 礼物接口
 * url: /bilibili/live/getGift
 * param: 用户cookie cookie
 */
router.post("/live/getGift", (req, res) => {
    let cookie = req.body.cookie;
    let date = new Date();
    let month, day;
    month = date.getMonth() + 1;
    day = date.getDay() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    date = date.getFullYear() + '-' + month + '-' + day;
    request({
        url: 'https://api.live.bilibili.com/xlive/revenue/v1/giftStream/getReceivedGiftStreamList?page_num=1&page_size=20&begin_time=' + date,
        headers: {
            cookie
        }
    }, (err, rep, body) => {
        body = JSON.parse(body).data.list;
        res.send({ data: body });
    })
});

module.exports = router;