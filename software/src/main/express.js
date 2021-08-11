const express = require('express')
const app = express()
const axios = require('axios')

const request = require("request");

import store from '../renderer/store'

/**
 * 对象转字符串
 */
let param = (data) => {
    let str = "?";
    let key = [];
    let values = [];
    Object.keys(data).forEach(item => {
        key.push(item);
    });
    Object.values(data).forEach(item => {
        values.push(item);
    });
    for (let i = 0; i < key.length; i++) {
        str += key[i] + "=" + values[i] + "&";
    }
    return str;
};

// 转时间戳
let time = (date) => {
    let time = new Date(date);
    return time.getTime() / 1000;
}

/**
 * 响应拦截器
 */
axios.interceptors.response.use(function(response) {
    let data = response.data
    return data.data;
}, function(error) {
    return Promise.reject(error);
});

/**
 * 用户信息接口
 * url: /user/getInfo
 * param: 用户 Mid
 * return: name
 */
app.get('/user/getInfo', async(req, res) => {
    const { query } = req;
    query.vmid = query.mid

    let userInfo = {}

    // 用户信息
    let userUrl = 'https://api.bilibili.com/x/space/acc/info' + param(query)
    let userData = await axios.get(userUrl)

    // 粉丝信息
    let followerUrl = 'https://api.bilibili.com/x/relation/stat' + param(query)
    let followerData = await axios.get(followerUrl)

    // 用户信息赋值
    userInfo.name = userData.name
    userInfo.follower = followerData.follower
    res.send({ userInfo })
});

/**
 * 直播信息接口
 * url: /live/getInfo
 * param: room_id 直播间id
 */
app.get("/live/getInfo", async(req, res) => {
    const { query } = req;
    let info = { title: '', time: 0, online: 0, cat: '' };
    let { title, live_time, online, parent_area_name } = await axios.get("http://api.live.bilibili.com/room/v1/Room/get_info" + param(query));
    info.title = title;
    info.time = time(live_time);
    info.online = online;
    info.cat = parent_area_name;
    res.send({ data: info });
});

/**
 * 获取弹幕接口
 * url: /live/getBarrage
 * param: roomid 直播间id
 */
app.get("/live/getBarrage", async(req, res) => {
    const { query } = req;
    request({
        url: "https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory" + param(query),
    }, (err, rep, body) => {
        let param = JSON.parse(body);
        res.send({ data: param.data });
    });
});

/**
 * 发送弹幕接口
 * url: /live/sendBarrage
 * param: roomid、msg、csrf、rnd、fontsize、color、cookie
 */
app.get("/live/sendBarrage", async(req, res) => {
    const { query } = req;
    let cookie = store.state.setting.cookie
    request.post({
        url: "https://api.live.bilibili.com/msg/send",
        form: query,
        headers: {
            cookie
        }
    }, (err, rep, body) => {
        let param = JSON.parse(body);
        console.log(param)
        res.send({ data: param });
    });
});

app.listen(3009)