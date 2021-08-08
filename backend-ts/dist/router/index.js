"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require("express").Router();
const http = require("../util/request");
const date = require("../util/time");
/**
 * 用户信息接口
 * url: /api/user/getInfo
 * param: 用户 Mid
 */
router.get("/user/getInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    query.vmid = query.mid;
    let info = { nickname: '', follower: 0 };
    let { name } = yield http.get("https://api.bilibili.com/x/space/acc/info", query);
    let { follower } = yield http.get("https://api.bilibili.com/x/relation/stat", query);
    info.nickname = name;
    info.follower = follower;
    res.send({ data: info });
}));
/**
 * 直播信息接口
 * url: /api/live/getInfo
 * param: room_id 直播间id
 */
router.get("/live/getInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    let info = { title: '', time: 0, online: 0, cat: '' };
    let { title, live_time, online, parent_area_name } = yield http.get("http://api.live.bilibili.com/room/v1/Room/get_info", query);
    info.title = title;
    info.time = date.time(live_time);
    info.online = online;
    info.cat = parent_area_name;
    res.send({ data: info });
}));
/**
 * 获取弹幕接口
 * url: /api/live/getBarrage
 * param: roomid 直播间id
 */
router.get("/live/getBarrage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    let data = yield http.get("https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory", query);
    res.send({ data });
}));
/**
 * 获取礼物接口
 * url: /api/live/getGift
 * param: cookie 用户登录cookie
 */
router.get("/live/getGift", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const datas = {
        page_num: 1,
        page_size: 5,
        begin_time: date.toDay(),
    };
    let data = yield http.get("https://api.live.bilibili.com/xlive/revenue/v1/giftStream/getReceivedGiftStreamList", datas, query.cookie);
    res.send({ data: data.list });
}));
/**
 * 发送弹幕接口
 * url: /api/live/sendBarrage
 * param: roomid、msg、csrf、rnd、fontsize、color
 */
router.get("/live/sendBarrage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    let cookie = query.cookie;
    delete query.cookie;
    let data = yield http.post("https://api.live.bilibili.com/msg/send", query, cookie);
    res.send({ data: data });
}));
module.exports = router;
