<template>
    <div id="main">
        <div class="title">{{ info.nickname }}</div>
        <div class="content">
            <div class="info">
                <img src="./../../assets/img/blibli.png" alt="" />
                <span class="num">{{ follower }}</span>
                <span :class="top ? 'addNum top' : 'addNum'"
                    >{{ difference > 0 ? "+" : "" }}{{ difference }}</span
                >
            </div>
        </div>
        <LiveInfo />
        <Popups v-model="follower" />
        <div v-for="item in fens" :key="item.mid">
            <div class="follow" :class="fensStatus ? 'tops' : ''">
                感谢 <span>{{ item.uname }}</span> 关注了主播
            </div>
        </div>
    </div>
</template>

<script>
import LiveInfo from "@/components/Live/info";
import Popups from "@/components/Popups";
var status = true;

export default {
    name: "Main",
    data() {
        return {
            info: {
                follower: {},
            },
            follower: 0, // 粉丝数量
            difference: 0, // 变化粉丝数量
            status: true,
            top: false, // 粉丝变化时动效开关
            fens: {}, // 新增关注列表
            fensStatus: false, // 新增粉丝动效
        };
    },
    mounted() {
        this.getInfo();
        console.log(this.$store.state.setting)
    },
    methods: {
        /**
         * 获取个人信息（up 主名称及粉丝数量）
         */
        getInfo() {
            this.$api.info
                .getUser({
                    mid: this.$store.state.setting.user,
                })
                .then((res) => {
                    this.info.nickname = res.data.userInfo.name;
                    this.info.follower = res.data.userInfo.follower;
                    if (this.info.follower != this.follower) {
                        this.difference = this.info.follower - this.follower;
                        if (this.info.follower != this.follower) {
                            this.follower = this.info.follower;
                        }
                    }
                    if (status) {
                        status = false;
                        setInterval(() => {
                            this.getInfo();
                        }, 5000);
                    }
                });
        },
    },
    watch: {
        /**
         * 监听粉丝数变化，执行下列方法
         */
        follower: function () {
            /**
             * 关注数发生变化 粉丝数动效开关
             */
            this.top = true;
            setTimeout(() => {
                this.top = false;
            }, 1000);

            /**
             * 关注数发生变化 请求关注列表提取对应粉丝
             */
            this.fensStatus = true;
            console.log("关注变化量：", this.difference);
            this.$api.live
                .getFollow({
                    vmid: this.$store.state.setting.user,
                    pn: 1,
                    ps: this.difference,
                    order: "desc",
                    order_type: "attention",
                    jsonp: "jsonp",
                })
                .then((res) => {
                    console.log(res.data.data.list[0].uname)
                    console.log(this.$store.state.setting.follow)
                    if (res.data.data.list.length >= 50) return;
                    this.fens = res.data.data.list;
                    setTimeout(() => {
                        this.fensStatus = false;
                        this.fens = {};
                    }, 1000);
                    if (!this.$store.state.setting.follow) return;
                    /**
                     * 感谢关注播报
                     */
                    var url =
                        "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&text=" +
                        "谢谢" +
                        res.data.data.list[0].uname +
                        "的关注";
                    var n = new Audio();
                    n.src = url;
                    n.play();
                });
        },
    },
    components: {
        LiveInfo,
        Popups,
    },
};
</script>

<style scoped>
#main {
    padding: 0 25px;
    padding-bottom: 25px;
    z-index: 1;
}

.title {
    color: #fff;
    font-size: 35px;
    text-align: center;
    margin-bottom: 20px;
}

.content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.content .info .addNum {
    opacity: 0;
    position: absolute;
    top: -25px;
    right: 0;
    color: green;
    font-size: 100px;
}

@keyframes top {
    to {
        opacity: 1;
        transform: translateY(-25px);
    }
}

.content .info .top {
    animation: top 1s;
}

.content > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.content span {
    font-size: 90px;
    color: #fff;
}

.content img {
    height: 75px;
    margin-right: 20px;
}

.content .info {
    margin-bottom: 15px;
    position: relative;
}

.data {
    list-style-type: none;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
}

.data li {
    width: 33.33%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.data li:nth-child(3n-1) {
    width: 100px;
    justify-content: flex-start;
    padding-left: 55px;
}

.data li:nth-child(3n) {
    justify-content: flex-end;
}

.data svg {
    height: 18px;
}

.data span {
    margin-left: 5px;
    font-size: 19px;
    font-weight: bold;
}

@keyframes tops {
    to {
        opacity: 1;
        transform: translateY(-25px);
    }
}

.follow {
    position: absolute;
    bottom: 90px;
    right: 50px;
    opacity: 0;
    font-size: 18px;
    font-weight: bold;
}

.follow span {
    color: #ffff00;
    font-size: 18px;
}

.tops {
    animation: tops 1s;
}
</style>