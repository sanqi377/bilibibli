<template>
    <div id="live">
        <div class="gift">
            <div v-for="item in gift" :key="item">
                {{ item.uname }}：赠送了 {{ item.gift_num }} 个{{
                    item.gift_name
                }}
            </div>
        </div>
        <div class="text">
            <p
                v-for="item in data"
                :key="item.gift_num + Math.floor(Math.random() * 100 + 1)"
            >
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
        }, 500);
    },
    methods: {
        getBarrage() {
            this.$http
                .get(
                    "/api/live/getBarrage?roomid=" +
                        this.$store.state.setting.live
                )
                .then((res) => {
                    this.data = res.data.data.room.slice(-5);
                });

            this.$http
                .get(
                    "/api/live/getGift?cookie=" +
                        this.$store.state.setting.cookie
                )
                .then((res) => {
                    this.gift = res.data.data;
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