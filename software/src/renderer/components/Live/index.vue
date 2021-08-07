<template>
    <div id="live">
        <div class="gift">
            <div v-for="item in gift" :key="item.time">
                {{ item.uname }}：赠送了 {{ item.gift_num }} 个{{ item.gift_name }}
            </div>
        </div>
        <div class="text">
            <p v-for="item in data" :key="item.rnd">
                {{ item.nickname }}：{{ item.text }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Live",
    data() {
        return {
            data: {},
            gift: {},
        };
    },
    mounted() {
        this.getBarrage();
        setInterval(() => {
            this.getBarrage();
        }, 1000);
    },
    methods: {
        getBarrage() {
            this.$http
                .post("https://api.qblog.cc/index/external/getBarrage", {
                    live: this.$store.state.setting.live,
                })
                .then((res) => {
                    this.data = res.data.data.slice(-5);
                    console.log(this.data);
                });

            this.$http
                .post("https://api.qblog.cc/index/external/getGift", {
                    cookie: this.$store.state.setting.cookie,
                })
                .then((res) => {
                    this.gift = res.data.data.slice(-5);
                });
        },
    },
};
</script>

<style scoped>
#live {
    margin: 0 auto;
    color: #fff;
    display: flex;
    line-height: 2;
    padding-bottom: 30px;
    justify-content: space-around;
}

#live > div {
    width: 50%;
    margin: 0 10px;
}
</style>