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
            difference: 0,
            status: true,
            top: false,
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            console.log("请求粉丝")
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
        follower: function () {
            this.top = true;
            setTimeout(() => {
                this.top = false;
            }, 1000);
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
</style>