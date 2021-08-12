import ajax from 'axios'

ajax.defaults.baseURL = "http://localhost:3009"

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
            return ajax.get("/user/getInfo" + data);
        }
    },
    live: {
        getInfo: (param) => {
            const data = paramToString(param)
            return ajax.get("/live/getInfo" + data);
        },
        getPopups: (param) => {
            const data = paramToString(param)
            return ajax.get("/live/getBarrage" + data);
        },
        getFollow: (param) => {
            const data = paramToString(param)
            return ajax.get("/live/getFollow" + data);
        },
        sendPopups: (param) => {
            const data = paramToString(param)
            return ajax.get("/live/sendBarrage" + data);
        }
    }
}

export default api;