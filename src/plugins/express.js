const express = require('express')
const app = express()
const axios = require('axios')

const request = require("request");

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);
    else
        next();
});

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
axios.interceptors.response.use(function (response) {
    let data = response.data
    return data.data;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 获取网易云音乐信息
 */
app.get('/music/getSearch', async (req, res) => {
    const { query } = req;
    let name = encodeURI(query.s)
    request({
        url: `http://music.163.com/api/search/get/web?&type=1&offset=0&total=true&limit=1&s=${name}`,
    }, (err, rep, body) => {
        let param = JSON.parse(body);
        if (param.result.songs[0].fee == 1) {
            res.send({ code: 201, msg: '无法播放该歌曲' });
        } else {
            request({
                url: `http://music.163.com/api/song/detail/?id=${param.result.songs[0].id}&ids=[${param.result.songs[0].id}]`,
            }, (err1, rep1, body1) => {
                let param1 = JSON.parse(body1);
                let data = {
                    url: 'http://music.163.com/song/media/outer/url?id=' + param.result.songs[0].id,
                    name: param1.songs[0].name,
                    author: param.result.songs[0].artists[0].name,
                    pic: param1.songs[0].album.blurPicUrl
                }
                res.send({ data });
            });
        }
    });
});

/**
 * 用户信息接口
 * url: /user/getInfo
 * param: 用户 Mid
 * return: name
 */
app.get('/user/getInfo', async (req, res) => {
    const { query } = req;
    query.vmid = query.mid
    let userInfo = {}
    let { card } = await axios.get('https://api.bilibili.com/x/web-interface/card' + param(query))
    // 用户信息赋值
    userInfo.name = card.name
    userInfo.follower = card.fans
    res.send({ userInfo })
});

/**
 * 直播信息接口
 * url: /live/getInfo
 * param: room_id 直播间id
 */
app.get("/live/getInfo", async (req, res) => {
    const { query } = req;
    let info = { title: '', time: 0, online: 0, cat: '' };
    let { title, room_id, live_time, online, parent_area_name } = await axios.get("http://api.live.bilibili.com/room/v1/Room/get_info" + param(query));
    info.title = title;
    info.time = time(live_time);
    info.online = online;
    info.cat = parent_area_name;
    info.room_id = room_id
    res.send({ data: info });
});

/**
 * 发送弹幕接口
 * url: /live/sendBarrage
 * param: roomid、msg、csrf、rnd、fontsize、color、cookie
 */
app.get("/live/sendBarrage", async (req, res) => {
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
        res.send({ data: param });
    });
});

app.listen(3009)