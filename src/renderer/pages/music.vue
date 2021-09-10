<template>
    <div>
        <Header />
        <div class="player">
            <div :class="`info ${isPlayer ? 'active' : ''}`">
                <span class="artist">{{ playerIng.name }}</span>
                <span class="name">{{ playerIng.author }}</span>
                <div class="progress-bar">
                    <div
                        class="bar"
                        :style="'width: ' + Number(Process_Now) + '%'"
                    ></div>
                </div>
            </div>
            <div :class="`control-panel ${isPlayer ? 'active' : ''}`">
                <div class="album-art"></div>
                <div class="controls">
                    <div class="prev"></div>
                    <div class="play" @click="play"></div>
                    <div class="next" @click="next"></div>
                </div>
            </div>
        </div>
        <div class="list">
            <div>
                <div class="item" v-show="list.length <= 0">暂无待播歌曲</div>
                <div class="item" v-for="item in list" :key="item.name">
                    <div>歌名：{{ item.name }}</div>
                    <div>用户：{{ item.user }}</div>
                </div>
            </div>
        </div>
        <audio :src="playerIng.url" ref="audio" style="display: none"></audio>
    </div>
</template>

<script>
import Header from "@/components/Header";
import webSocket from "../../plugins/socket";
let time, aud;
export default {
    data() {
        return {
            list: [], // 歌曲列表
            playerIng: {}, // 正在播放列表
            Process_Now: 0, // 播放进度
            isPlayer: false, // 是否播放中
        };
    },
    mounted() {
        this.getPopups();
        aud = this.$refs.audio;
    },
    methods: {
        async getPopups() {
            const data = await this.$api.live.getInfo({
                room_id: this.$store.state.setting.live,
            });
            webSocket.init(data.data.data.room_id);
            this.list = webSocket.music;
        },
        play(xy) {
            if (xy != true) {
                if (this.isPlayer) {
                    this.isPlayer = !this.isPlayer;
                    aud.pause(); // 暂停
                    clearInterval(time); // 清除定时器
                } else {
                    if (this.playerIng.name) {
                        this.isPlayer = !this.isPlayer;
                        aud.play();
                        this.TimeSpan(this.playerIng.name);
                    } else {
                        this.isPlayer = !this.isPlayer;
                        if (this.isPlayer && this.list.length > 0) {
                            this.$api.music
                                .getSearch({ s: this.list[0].name })
                                .then((res) => {
                                    if (res.data.code == 201) {
                                        this.list.splice(0, 1);
                                        webSocket.deleteMusic(
                                            this.list[0].name
                                        );
                                    }
                                    this.playerIng = res.data.data;
                                    let s = document.createElement("style");
                                    s.innerText =
                                        ".control-panel .album-art::before{background: url(" +
                                        this.playerIng.pic +
                                        ");}";
                                    document.body.appendChild(s);
                                    setTimeout(() => {
                                        aud.play();
                                        // 播放
                                        this.TimeSpan(this.playerIng.name);
                                        this.list.splice(0, 1);
                                    }, 3000);
                                });
                        }
                    }
                }
            } else {
                this.isPlayer = !this.isPlayer;
                if (this.isPlayer && this.list.length > 0) {
                    this.$api.music
                        .getSearch({ s: this.list[0].name })
                        .then((res) => {
                            if (res.data.code == 201) {
                                this.list.splice(0, 1);
                                webSocket.deleteMusic(this.list[0].name);
                            }
                            this.playerIng = res.data.data;
                            this.list.splice(0, 1);
                            let s = document.createElement("style");
                            s.innerText =
                                ".control-panel .album-art::before{background: url(" +
                                this.playerIng.pic +
                                ");}";
                            document.body.appendChild(s);
                            setTimeout(() => {
                                aud.play();
                                // 播放
                                this.TimeSpan(this.playerIng.name);
                            }, 3000);
                        });
                }
            }
        },
        // 计算长度
        TimeSpan(name) {
            time = setInterval(() => {
                this.Process_Now = (
                    (aud.currentTime / aud.duration) *
                    100
                ).toFixed(2); // 将 Process_Now 转换为整数并给它加一个px单位
                if (aud.ended) {
                    this.playerIng = {};
                    this.isPlayer = !this.isPlayer;
                    this.play();
                    this.Process_Now = 0;
                    webSocket.deleteMusic(name);
                }
            }, 1000);
        },
        // 下一首
        next() {
            this.playerIng = this.list[0];
            this.isPlayer = !this.isPlayer;
            this.Process_Now = 0;
            this.play(true);
        },
    },
    components: {
        Header,
    },
    watch: {
        list: function () {
            if (this.list.length > 0 && this.isPlayer === false) this.play();
        },
    },
};
</script>

<style scoped>
.player {
    padding: 20px;
    padding-top: 0;
    position: relative;
    margin-top: 60px;
}

.player .info {
    position: absolute;
    height: 60px;
    top: 0;
    opacity: 0;
    left: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px 15px 5px 110px;
    border-radius: 15px;
    transition: all 0.5s ease;
}

.player .info .artist,
.player .info .name {
    display: block;
}

.player .info .artist {
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
}

.player .info .name {
    color: #999;
    font-size: 12px;
    margin-bottom: 8px;
}

.player .info .progress-bar {
    background-color: #ddd;
    height: 2px;
    width: 100%;
    position: relative;
}

.player .info .progress-bar .bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: red;
    transition: all 0.2s ease;
}

.player .info.active {
    top: -60px;
    opacity: 1;
    transition: all 0.5s ease;
}

.control-panel {
    position: relative;
    border-radius: 15px;
    width: 100%;
    height: 80px;
    z-index: 5;
    display: flex;
    justify-content: space-between;
}

.control-panel .album-art {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0);
    transform: scale(1);
    transition: all 0.5s ease;
}

.control-panel .album-art::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}

.control-panel .album-art::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80px;
}

.control-panel.active .album-art {
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.2);
    transform: scale(1.2);
    transition: all 0.5s ease;
}

.control-panel.active .album-art::before {
    animation: rotation 3s infinite linear;
    -webkit-animation: rotation 3s infinite linear;
    animation-fill-mode: forwards;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.controls {
    display: flex;
    align-items: center;
}

.controls .prev,
.controls .play,
.controls .next {
    display: flex;
    width: 55px;
    height: 45px;
    border-radius: 10px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 20px;
    margin: 5px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    -webkit-transition: background-color 0.3s ease;
    margin-right: 15px;
}

.controls > div:last-child {
    margin-right: 0;
}

.controls .prev:hover,
.controls .play:hover,
.controls .next:hover {
    background-color: #eee;
    transition: background-color 0.3s ease;
    -webkit-transition: background-color 0.3s ease;
}

.controls .prev {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1MC40ODggMjUwLjQ4OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjUwLjQ4OCAyNTAuNDg4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9IlByZXZpb3VzX3RyYWNrIj4KCTxwYXRoIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDsiIGQ9Ik0yMzcuNDg0LDIyLjU4N2MtMy4yNjYsMC03LjU5MS0wLjQwMS0xMS4wNzIsMi4wMDVsLTkyLjI2NCw3Ny45MVYzNy4yNTIgICBjMC0yLjUwNywwLjA1Ny0xNC42NjYtMTMuMDA0LTE0LjY2NmMtMy4yNjUsMC03LjU5LTAuNDAxLTExLjA3MiwyLjAwNUw4LjEwNywxMTAuNjkzYy05LjY2OSw2LjY3NC03Ljk5NywxNC41NTEtNy45OTcsMTQuNTUxICAgcy0xLjY3MSw3Ljg3OCw3Ljk5NywxNC41NTFsMTAxLjk2NSw4Ni4xMDJjMy40ODIsMi40MDUsNy44MDcsMi4wMDQsMTEuMDcyLDIuMDA0YzEzLjA2MiwwLDEzLjAwNC0xMS43LDEzLjAwNC0xNC42NjZ2LTY1LjI0OSAgIGw5Mi4yNjQsNzcuOTExYzMuNDgyLDIuNDA1LDcuODA3LDIuMDA0LDExLjA3MiwyLjAwNGMxMy4wNjIsMCwxMy4wMDQtMTEuNywxMy4wMDQtMTQuNjY2VjM3LjI1MiAgIEMyNTAuNDg4LDM0Ljc0NiwyNTAuNTQ2LDIyLjU4NywyMzcuNDg0LDIyLjU4N3oiIGZpbGw9IiNjMmM2Y2YiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
}

.controls .play {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIzMi4xNTMgMjMyLjE1MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjMyLjE1MyAyMzIuMTUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9IlBsYXkiPgoJPHBhdGggc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkOyIgZD0iTTIwMy43OTEsOTkuNjI4TDQ5LjMwNywyLjI5NGMtNC41NjctMi43MTktMTAuMjM4LTIuMjY2LTE0LjUyMS0yLjI2NiAgIGMtMTcuMTMyLDAtMTcuMDU2LDEzLjIyNy0xNy4wNTYsMTYuNTc4djE5OC45NGMwLDIuODMzLTAuMDc1LDE2LjU3OSwxNy4wNTYsMTYuNTc5YzQuMjgzLDAsOS45NTUsMC40NTEsMTQuNTIxLTIuMjY3ICAgbDE1NC40ODMtOTcuMzMzYzEyLjY4LTcuNTQ1LDEwLjQ4OS0xNi40NDksMTAuNDg5LTE2LjQ0OVMyMTYuNDcxLDEwNy4xNzIsMjAzLjc5MSw5OS42Mjh6IiBmaWxsPSIjYzJjNmNmIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
}

.controls .next {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1MC40ODggMjUwLjQ4OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjUwLjQ4OCAyNTAuNDg4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9Ik5leHRfdHJhY2tfMiI+Cgk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7IiBkPSJNMjQyLjM4MSwxMTAuNjkzTDE0MC40MTUsMjQuNTkxYy0zLjQ4LTIuNDA2LTcuODA1LTIuMDA1LTExLjA3MS0yLjAwNSAgIGMtMTMuMDYxLDAtMTMuMDAzLDExLjctMTMuMDAzLDE0LjY2NnY2NS4yNDlsLTkyLjI2NS03Ny45MWMtMy40ODItMi40MDYtNy44MDctMi4wMDUtMTEuMDcyLTIuMDA1ICAgQy0wLjA1NywyMi41ODcsMCwzNC4yODcsMCwzNy4yNTJ2MTc1Ljk4M2MwLDIuNTA3LTAuMDU3LDE0LjY2NiwxMy4wMDQsMTQuNjY2YzMuMjY1LDAsNy41OSwwLjQwMSwxMS4wNzItMi4wMDVsOTIuMjY1LTc3LjkxICAgdjY1LjI0OWMwLDIuNTA3LTAuMDU4LDE0LjY2NiwxMy4wMDMsMTQuNjY2YzMuMjY2LDAsNy41OTEsMC40MDEsMTEuMDcxLTIuMDA1bDEwMS45NjYtODYuMTAxICAgYzkuNjY4LTYuNjc1LDcuOTk3LTE0LjU1MSw3Ljk5Ny0xNC41NTFTMjUyLjA0OSwxMTcuMzY3LDI0Mi4zODEsMTEwLjY5M3oiIGZpbGw9IiNjMmM2Y2YiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
}

.control-panel.active .controls .play {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIzMi42NzkgMjMyLjY3OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjMyLjY3OSAyMzIuNjc5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9IlBhdXNlIj4KCTxwYXRoIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDsiIGQ9Ik04MC41NDMsMEgzNS43OTdjLTkuODg1LDAtMTcuODk4LDguMDE0LTE3Ljg5OCwxNy44OTh2MTk2Ljg4MyAgIGMwLDkuODg1LDguMDEzLDE3Ljg5OCwxNy44OTgsMTcuODk4aDQ0Ljc0NmM5Ljg4NSwwLDE3Ljg5OC04LjAxMywxNy44OTgtMTcuODk4VjE3Ljg5OEM5OC40NCw4LjAxNCw5MC40MjcsMCw4MC41NDMsMHogTTE5Ni44ODIsMCAgIGgtNDQuNzQ2Yy05Ljg4NiwwLTE3Ljg5OSw4LjAxNC0xNy44OTksMTcuODk4djE5Ni44ODNjMCw5Ljg4NSw4LjAxMywxNy44OTgsMTcuODk5LDE3Ljg5OGg0NC43NDYgICBjOS44ODUsMCwxNy44OTgtOC4wMTMsMTcuODk4LTE3Ljg5OFYxNy44OThDMjE0Ljc4MSw4LjAxNCwyMDYuNzY3LDAsMTk2Ljg4MiwweiIgZmlsbD0iI2MyYzZjZiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
}

.list {
    display: inline-block;
    width: 100%;
    border-radius: 15px;
    margin-bottom: 15px;
}

.list > div {
    margin: 0 15px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    padding: 15px;
}

.list .item {
    color: #fff;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.list .item:last-child {
    padding-bottom: 0;
}
</style>