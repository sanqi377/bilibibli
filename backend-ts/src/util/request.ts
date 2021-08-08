const request = require("request");

module.exports = {
  get: (url: string, data: object, cookie?: string) => {
    return new Promise((resolve, reject,) => {
      // json 数据转为字符串
      let param = () => {
        let str: string = "?";
        let key: string[] = [];
        let values: string[] = [];
        Object.keys(data).forEach(item => {
          key.push(item)
        })

        Object.values(data).forEach(item => {
          values.push(item)
        })

        for (let i = 0; i < key.length; i++) {
          str += key[i] + "=" + values[i] + "&"
        }
        return str;
      }
      // 请求数据
      request({
        url: url + param(), headers: {
          cookie
        }
      }, (err: any, rep: any, body: string) => {
        let param: { data: object } = JSON.parse(body)
        resolve(param.data);
      })
    })
  },
  post: (url: string, data: object, cookie?: string) => {
    return new Promise((resolve, reject,) => {
      // 请求数据
      request.post({
        url, form: data,
        headers: {
          cookie
        }
      }, (err: any, rep: any, body: string) => {
        let param: { data: object } = JSON.parse(body)
        console.log(param)
        resolve(param.data);
      })
    })
  }
}