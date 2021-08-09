<template>
    <div id="popups">
        <div class="item" v-for="item in list.room" :key="item.check_info.ts">
            {{ item.nickname }}：{{ item.text }}
        </div>
    </div>
</template>

<script>
var status = true;
export default {
    data() {
        return {
            list: {
                admin: {},
                room: {},
            },
        };
    },
    mounted() {
        this.getPopups();
    },
    methods: {
        getPopups() {
            this.$api.live
                .getPopups({ roomid: this.$store.state.setting.live })
                .then((res) => {
                    this.list.admin = res.data.data.admin;
                    this.list.room = res.data.data.room;
                    if (status) {
                        status = false;
                        setInterval(() => {
                            this.getPopups();
                        }, 500);
                    }
                });
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
}

#popups .item {
    font-size: 15px;
    margin-bottom: 25px;
}

#popups .item:last-child {
  margin-bottom: 0;
}
</style>