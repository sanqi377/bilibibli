<template>
    <div id="main">
        <div class="title">{{ info.nickname }}</div>
        <div class="content">
            <div class="info">
                <img src="./../../assets/img/blibli.png" alt="" />
                <span class="num">{{ follower }}</span>
                <span :class="top ? 'addNum top' : 'addNum'"
                    >{{ status ? "+" : "" }}{{ difference }}</span
                >
            </div>
        </div>
        <LiveInfo />
        <Live />
    </div>
</template>

<script>
import Live from "@/components/Live";
import LiveInfo from "@/components/Live/info";

export default {
    name: "Main",
    data() {
        return {
            info: {
                follower: {},
            },
            follower: 0,
            video: [],
            difference: 0,
            status: true,
            top: false,
            videos: {},
            number: 0,
        };
    },
    mounted() {
        this.getInfo();
        setInterval(() => {
            this.getInfo();
        }, 5000);
    },
    methods: {
        getInfo() {
            this.$http
                .get(
                    "http://localhost:3000/api/user/getInfo?mid=" +
                        this.$store.state.setting.user
                )
                .then((res) => {
                    this.info.nickname = res.data.data.nickname;
                    this.info.follower = res.data.data.follower;

                    if (this.info.follower != this.follower) {
                        this.top = true;
                        this.difference = this.info.follower - this.follower;
                        if (this.difference > 0) {
                            this.status = true;
                        } else {
                            this.status = false;
                        }
                        this.follower = this.info.follower;
                    }
                    setTimeout(() => {
                        this.top = false;
                    }, 1000);
                });
        },
    },
    components: {
        Live,
        LiveInfo,
    },
};
</script>

<style scoped>
#main {
    padding: 0 65px;
}

.title {
    color: #fff;
    font-size: 45px;
    text-align: center;
    margin-bottom: 30px;
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
    font-size: 120px;
    color: #fff;
}

.content img {
    height: 100px;
    margin-right: 25px;
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