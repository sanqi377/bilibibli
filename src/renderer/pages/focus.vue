<template>
    <div>
        <Header />
        <div id="penetration" class="barrage">
            <div class="item" v-if="list.length <= 0">弹幕大军正在赶来...</div>
            <div
                class="item"
                v-for="(item, index) in list"
                :key="`DANMU-${index}`"
            >
                <div v-if="item.type === 'DANMU_MSG'">
                    <span class="name">{{ item.name }}：</span>
                    <span class="message">{{ item.message }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import webSocket from "../../plugins/socket";
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
        async getPopups() {
            const data = await this.$api.live.getInfo({
                room_id: this.$store.state.setting.live,
            });
            webSocket.init(data.data.data.room_id);
            this.list = webSocket.focus;
        },
    },
    components: {
        Header,
    },
};
</script>

<style scoped>
.barrage {
    padding: 20px;
    padding-top: 0;
}

.barrage .item {
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 25px;
    color: #fff;
}

.barrage .item .name {
    color: #c4c3c3;
}
</style>