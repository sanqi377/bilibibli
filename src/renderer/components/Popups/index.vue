<template>
    <div id="popups">
        <div class="item" v-if="list.length <= 0">弹幕大军正在赶来...</div>
        <div class="item" v-for="(item, index) in list" :key="`DANMU-${index}`">
            <div v-if="item.type === 'INTERACT_WORD'">
                {{ item.message }}
            </div>
            <div v-if="item.type === 'DANMU_MSG'">
                {{ item.name }}：{{ item.message }}
            </div>
        </div>
        <div v-if="false" class="follow top">XXX<span> 关注了 </span>主播</div>
    </div>
</template>

<script>
import webSocket from "../../../main/socket";

export default {
    data() {
        return {
            list: {},
        };
    },
    mounted() {
        this.getPopups();
    },
    methods: {
        getPopups() {
            webSocket.init("22888172");
            // webSocket.init(
            //     this.$store.state.setting.live
            //         ? this.$store.state.setting.live
            //         : "22888172"
            // );
            this.list = webSocket.arrData;
        },
    },
};
</script>

<style scoped>
@keyframes top {
    to {
        opacity: 1;
        transform: translateY(-25px);
    }
}

#popups {
    border: 1px dashed #fff;
    border-radius: 4px;
    padding: 20px 25px;
    color: #fff;
    position: relative;
    height: 510px;
    overflow: hidden;
}

#popups .item {
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 25px;
}

#popups .item:last-child {
    margin-bottom: 0;
}

.follow {
    position: absolute;
    bottom: 0;
    right: 20px;
    opacity: 0;
    font-size: 18px;
    font-weight: bold;
}

.follow span {
    color: #ffff00;
    font-size: 18px;
}

.top {
    animation: top 1s;
}
</style>