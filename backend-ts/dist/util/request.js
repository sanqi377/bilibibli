"use strict";
const request = require("request");
module.exports = {
    get: (url, data, cookie) => {
        return new Promise((resolve, reject) => {
            // json 数据转为字符串
            let param = () => {
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
            // 请求数据
            request({
                url: url + param(), headers: {
                    cookie
                }
            }, (err, rep, body) => {
                let param = JSON.parse(body);
                resolve(param.data);
            });
        });
    },
    post: (url, data, cookie) => {
        return new Promise((resolve, reject) => {
            // 请求数据
            request.post({
                url, form: data,
                headers: {
                    cookie
                }
            }, (err, rep, body) => {
                let param = JSON.parse(body);
                console.log(param);
                resolve(param.data);
            });
        });
    }
};
