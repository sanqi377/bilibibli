import pako from 'pako'
var popup = []
export default class Socket {
    init(room_id) {
        this._popup = popup

        // App热更新调用不重复创建
        if (this._webSocket !== undefined) return

        const socketUrl = 'wss://broadcastlv.chat.bilibili.com:2245/sub'
        const heartData = '[object Object]'

        const firstData = {
            uid: 0,
            roomid: parseInt(room_id, 10),
            protover: 2,
            platform: 'web',
            clientver: '1.8.5',
            type: 2
        }

        try {
            this._webSocket = new WebSocket(socketUrl)
        } catch (err) {
            throw new Error(err)
        }



        this._webSocket.addEventListener('open', (ev) => {
            if (!this._webSocket) throw new Error('web socket 创建失败')
            console.log('sw: open')
            this._webSocket.send(this.sendData(JSON.stringify(firstData), 1, 7, 1))
            this._webSocket.send(this.sendData(heartData, 1, 2, 1))
        })

        this._webSocket.addEventListener('message', (msg) => {
            // 发现消息进入 开始处理前端触发逻辑
            var reader = new FileReader()
            reader.readAsArrayBuffer(msg.data) //把blob对象变成arraybuffer
            reader.onload = (event) => {
                var content = reader.result
                this.handleData(content) // 处理
            }
        })

        this._webSocket.onclose = () => {
            console.log("链接关闭")
            this.init(room_id)

        }

        this._webSocket.onerror = () => {
            console.log("链接错误")
            this.init(room_id)
        }
    }

    handleData(data) {
        const dv = new DataView(data)
            //包长
        const packageLen = dv.getUint32(0)
            //头部长度 固定16
        const headerLen = dv.getUint16(4)
            //协议版本号
        const protover = dv.getUint16(6)
            //协议类型
        const operation = dv.getUint32(8)
            //序列号 通常为1
        const sequence = dv.getUint32(12)
        data = data.slice(headerLen, packageLen)

        switch (protover) {
            case 0:
                //广播信息
                const str = this.uintToString(new Uint8Array(data))
                    //  console.log(str);
                break
            case 1:
                const dataV = new DataView(data)
                console.log(operation)
                if (operation === 3) {
                    // console.log('人气值为：' + dataV.getUint32(0))
                } else if (operation === 8) {
                    //连接成功返回{code:0}
                    const str = this.uintToString(new Uint8Array(data))
                        // console.log(str)
                } else {
                    console.log('unknown data')
                }
                break
            case 2:
                if (operation === 5) {
                    //解压
                    //          try {
                    this.unzip(pako.inflate(new Uint8Array(data)).buffer)
                        //          } catch (err) {
                        //            console.log(err);
                        //          }
                } else {
                    console.log('unknown data')
                }
                break
            default:
                console.log('unknown data')
                break
        }
    }

    unzip(data) {
        var offect = 0
        var len = 0
        const maxLength = data.byteLength
        while (offect < maxLength) {
            data = data.slice(len, maxLength)
            const dv = new DataView(data)
            const packageLen = dv.getUint32(0)
            const headerLen = dv.getUint16(4)
            const protover = dv.getUint16(6)
            const operation = dv.getUint32(8)
            const sequence = dv.getUint32(12)
                // console.log(sequence)
            var datas = data.slice(headerLen, packageLen)
            switch (protover) {
                case 0:
                    //处理解压后一般数据
                    const str = this.uintToString(new Uint8Array(datas))
                    this.parseDanmuMessage(str)
                    break
                case 1:
                    const dataV = new DataView(datas)
                    console.log(dataV)
                    if (operation === 3) {
                        console.log('人气值为：' + dataV.getUint32(0))
                    } else if (operation === 8) {
                        //连接成功返回{code:0}
                        const str = this.uintToString(new Uint8Array(datas))
                        console.log(str)
                    } else {
                        console.log('unknown data')
                    }
                    break
                case 2:
                    if (operation === 5) {
                        //解压
                        try {
                            console.log(
                                pako.inflate(new Uint8Array(datas), {
                                    to: 'string'
                                })
                            )
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        console.log('unknown data')
                    }
                    break
                default:
                    console.log('unknown data')
                    break
            }
            offect += packageLen
            len = packageLen
        }
    }

    /**
     * 发送数据包
     * @param data
     * @param p
     * @param o
     * @param s
     * @returns
     */
    sendData(data, p, o, s) {
        let dataUint8Array = this.stringToUint(data)
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

    stringToUint(s) {
        const charList = s.split('')
        const uintArray = []
        for (let i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0))
        }
        return new Uint8Array(uintArray)
    }

    uintToString(uintArray) {
        return decodeURIComponent(
            escape(String.fromCodePoint.apply(null, uintArray))
        )
    }

    parseDanmuMessage(_jsons) {
        const jsons = JSON.parse(_jsons)
        if (this._popup.length > 20)
            this._popup.splice(0, this._popup.length - 20);
        switch (jsons.cmd) {

            // 弹幕消息
            case 'DANMU_MSG':
                this._popup.push({
                    name: jsons.info[2][1],
                    message: jsons.info[1],
                    type: 'DANMU_MSG'
                })
                break
                // 进入直播间消息    
            case 'INTERACT_WORD':
                this.stringToTTS("欢迎" + jsons.data.uname + "进入直播间")
                break
            default:
                //			  console.log("new data:"+jsons);
                break
        }
    }

    // 语音合成
    stringToTTS(text) {
        var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&text=" + text;
        var n = new Audio()
        n.src = url
        n.play();
    }
}