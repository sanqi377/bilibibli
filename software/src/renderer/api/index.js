import ajax from 'axios'

// ajax.defaults.baseURL = "http://bilibili.qblog.cc/"
ajax.defaults.baseURL = "http://localhost:3004"

const paramToString = (param) => {
    var str = "?"
    var key = Object.keys(param)
    var val = Object.values(param)
    for (let i = 0; i < Object.keys(param).length; i++) {
        str += key[i] + "=" + val[i] + "&"
    }
    return str
}

const api = {
    info: {
        getUser: (param) => {
            const data = paramToString(param)
            return ajax.get("/api/user/getInfo" + data);
        }
    },
    live: {
        getInfo: (param) => {
            const data = paramToString(param)
            return ajax.get("/api/live/getInfo" + data);
        },
        getPopups: (param) => {
            const data = paramToString(param)
            return ajax.get("/api/live/getBarrage" + data);
        },
        sendPopups: (param) => {
            const data = paramToString(param)
            return ajax.get("/api/live/sendBarrage" + data);
        }
    }
}

export default api;