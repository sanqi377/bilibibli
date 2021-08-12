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
        async getPopups() {
            const data = await this.$api.live.getInfo({
                room_id: this.$store.state.setting.live,
            });
            webSocket.init(data.data.data.room_id,this.$store.state.setting.comein);
            this.list = webSocket.arrData;
        },
    },
};
</script>

<style scoped>


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
</style>