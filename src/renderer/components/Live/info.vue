<template>
    <div id="live-info">
        <div class="title">{{ data.title }}</div>
        <div class="info">
            <ul>
                <li>主播人气：{{ data.online }}</li>
                <li>直播时长：{{ data.time }}</li>
                <li>直播分类：{{ data.cat }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
var status = true;
export default {
    data() {
        return {
            data: {},
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            this.$api.live
                .getInfo({ room_id: this.$store.state.setting.live })
                .then((res) => {
                    this.data = res.data.data;
                    this.data.time = this.customTime(res.data.data.time);
                    if (status) {
                        status = false;
                        setInterval(() => {
                            this.getInfo();
                        }, 5000);
                    }
                });
        },
        customTime(item) {
            const nowTime = new Date().getTime();
            const minuteTime = 60 * 1000;
            const hourTime = 60 * minuteTime;
            const dayTime = 24 * hourTime;
            const monthTime = dayTime * 30;
            const yearTime = monthTime * 12;
            const historyTime = new Date(item * 1000).getTime();
            const diffTime = parseInt(nowTime) - parseInt(historyTime);
            let descTime;
            if (diffTime >= yearTime) {
                // 按年算
                descTime = parseInt(diffTime / yearTime) + " 年";
            } else if (diffTime < yearTime && diffTime >= monthTime) {
                //按月算
                descTime = parseInt(diffTime / monthTime) + " 月";
            } else if (diffTime < monthTime && diffTime >= dayTime) {
                //按天算
                descTime = parseInt(diffTime / dayTime) + " 天";
            } else if (diffTime < dayTime && diffTime >= hourTime) {
                //按小时算
                descTime = parseInt(diffTime / hourTime) + " 小时";
            } else if (diffTime < hourTime && diffTime >= minuteTime) {
                //按分钟算
                descTime = parseInt(diffTime / minuteTime) + " 分钟";
            } else {
                descTime = "刚刚";
            }
            return descTime;
        },
    },
};
</script>

<style scoped>
.title {
    font-size: 20px;
    color: #fff;
    text-align: center;
}
.info ul {
    margin: 20px 0;
    list-style-type: none;
    display: flex;
    color: #fff;
    justify-content: space-around;
}
</style>