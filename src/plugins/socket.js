import pako from 'pako'
import store from '../renderer/store'

/**
 * 存放弹幕数据
 */
const arrData = []

var comeinStatus = store.state.setting.comein

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
  // console.log(protover)
  switch (protover) {
    case 0:
      const message = JSON.parse(uintToString(new Uint8Array(data)))
      // console.log(message.cmd, "弹幕信息解密后")
      switch (message.cmd) {
        case "DANMU_MSG":
          arrData.push({
            name: message.info[2][1],
            message: message.info[1],
            type: "DANMU_MSG"
          })
          console.log("这是弹幕信息：", message.info[1])
          break;
        case "INTERACT_WORD":
          arrData.push({
            name: message.data.uname,
            type: "INTERACT_WORD"
          })
          if (comeinStatus) stringToTTS("欢迎" + message.data.uname + "进入直播间")
          // console.log("这是进入直播间信息：", message.data.uname)
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

  if (arrData.length > 15)
    arrData.splice(0, arrData.length - 15);

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

/**
 * 语音合成
 * @param {string} text 
 */
const stringToTTS = (text) => {
  var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&text=" + text;
  var n = new Audio()
  n.src = url
  n.play();
}

export default {
  init,
  arrData
}