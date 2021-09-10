import pako from 'pako'
import store from '../renderer/store'

/**
 * 存放弹幕数据
 */
let arrData = [], welcome = [], focus = [], music = []

/**
 * 初始化 websocket
 * @param {int} room_id 
 */

const init = (room_id) => {

  // websocket 链接地址
  const url = "ws://broadcastlv.chat.bilibili.com:2244/sub"

  // 第一次发包信息，表示进入房间
  const firstData = {
    uid: 0,
    roomid: parseInt(room_id, 10),
    protover: 2,
    platform: 'web',
    clientver: '1.8.5',
    type: 2,
  }

  const heartData = '[object Object]'

  const ws = new WebSocket(url)

  ws.addEventListener('open', () => {
    console.log("web socket: start")
    ws.send(sendData(JSON.stringify(firstData), 1, 7, 4))
  })

  setInterval(() => {
    // console.log("发送心跳包")
    ws.send(sendData(heartData, 1, 2, 1))
  }, 5000);

  /**
   * 当 websocket 收到消息
   */
  ws.onmessage = (msg) => {
    var reader = new FileReader()
    reader.readAsArrayBuffer(msg.data)
    reader.onload = (event) => {
      var content = reader.result
      handleData(content)
    }
  }

  /**
   * 当 websocket 关闭
   */
  ws.onclose = () => {
    ws.close()
    console.log("链接关闭")
    init(room_id)
  }
}


/**
 * 解密弹幕信息
 */
const decode = (data) => {
  const maxLength = data.byteLength
  data = data.slice(0, maxLength)
  const dv = new DataView(data)
  const packageLen = dv.getUint32(0)
  const headerLen = dv.getUint16(4)
  const protover = dv.getUint16(6)
  data = data.slice(headerLen, packageLen)
  switch (protover) {
    case 0:
      const message = JSON.parse(uintToString(new Uint8Array(data)))
      switch (message.cmd) {
        case "DANMU_MSG":
          let index = message.info[1].lastIndexOf("点歌 ")
          if (index === 0) {
            let gm = message.info[1].substring(index + 3, message.info[1].length);
            music.push({
              user: message.info[2][1],
              name: gm,
              type: "DIANGE"
            })
          }
          arrData.push({
            name: message.info[2][1],
            message: message.info[1],
            type: "DANMU_MSG"
          })
          break;
        case "INTERACT_WORD":
          console.log(message)
          // 进入房间信息
          if (message.data.msg_type === 1) {
            welcome.push({
              name: message.data.uname,
              type: "INTERACT_WORD"
            })
          }
          // 关注主播信息
          if (message.data.msg_type === 2) {
            focus.push({
              name: message.data.uname,
              type: "FOCUS"
            })
          }
          break
        // 捕获礼物信息
        case "SEND_GIFT":
          console.log(message)
          break
        default:
          break;
      }
      break;
    case 1:
      // console.log("?????不来东西")
      // console.log('气人值为：' + new DataView(data).getUint32(0))
      break
    default:
      break;
  }

  if (arrData.length > 10) arrData.splice(0, arrData.length - 10);
  if (welcome.length > 5) welcome.splice(0, welcome.length - 5);
  if (focus.length > 5) focus.splice(0, focus.length - 5);
}

/**
 * 处理信息
 */
const handleData = (data) => {
  const dv = new DataView(data)
  const packageLen = dv.getUint32(0)
  const headerLen = dv.getUint16(4)
  const protover = dv.getUint16(6)
  const operation = dv.getUint32(8)
  data = data.slice(headerLen, packageLen)
  // console.log(protover, operation)
  switch (protover) {
    case 0:
      // 纯 json 广播信息
      const str = uintToString(new Uint8Array(data))
      break
    case 1:
      if (operation === 3) {
        // console.log("不来东西！！！！")
        // console.log('人气值为：' + new DataView(data).getUint32(0))
      } else if (operation === 8) {
        console.log("成功连接房间")
      }
      break
    case 2:
      // 弹幕信息
      if (operation === 5) decode(pako.inflate(new Uint8Array(data)).buffer)
      break
    default:
      console.log('unknown data')
      break
  }
}

/**
 * 发送数据包
 * @param {object} data 
 * @param {number} p
 * @param {number} o
 * @param {number} s
 */
const sendData = (data, p, o, s) => {
  let dataUint8Array = stringToUint(data)
  let buffer = new ArrayBuffer(dataUint8Array.byteLength + 16)
  let dv = new DataView(buffer)
  //包长
  dv.setUint32(0, dataUint8Array.byteLength + 16)

  //头部长度 固定16
  dv.setUint16(4, 16)

  //协议版本号
  dv.setUint16(6, parseInt(p, 10))

  //协议类型
  dv.setUint32(8, parseInt(o, 10))

  //序列号 通常为1
  dv.setUint32(12, parseInt(s, 10))
  for (let i = 0; i < dataUint8Array.byteLength; i++) {
    dv.setUint8(16 + i, dataUint8Array[i])
  }
  return buffer
}


const stringToUint = (s) => {
  const charList = s.split('')
  const uintArray = []
  for (let i = 0; i < charList.length; i++) {
    uintArray.push(charList[i].charCodeAt(0))
  }
  return new Uint8Array(uintArray)
}

const uintToString = (uintArray) => {
  return decodeURIComponent(
    escape(String.fromCodePoint.apply(null, uintArray))
  )
}

// /**
//  * 语音合成
//  * @param {string} text 
//  */
// const stringToTTS = (text) => {
//   var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&text=" + text;
//   var n = new Audio()
//   n.src = url
//   n.play();
// }

/**
 * 删除播放完毕或者跳过的歌曲
 *
 * @param {*} name
 */
const deleteMusic = (name) => {
  music.forEach((item, idx) => {
    if (item.name == name) music.splice(idx, 1)
  })
}

export default {
  init,
  arrData,
  welcome,
  music,
  deleteMusic
}