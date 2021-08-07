<template>
    <div id="send">
        <span>发送弹幕：</span
        ><input type="text" v-model="text" @keyup.enter="submit" />
    </div>
</template>

<script>
export default {
    name: "Send",
    data() {
        return {
            text: "",
        };
    },
    methods: {
        submit() {
            console.log(this.$store.state.setting.cookie);
            this.$http
                .post(
                    "https://api.live.bilibili.com/msg/send",
                    {
                        csrf: "6e48119d0b6ccacae16ad64a8ee877a0",
                        color: "16777215",
                        msg: this.text,
                        roomid: 22888172,
                        fontsize: 25,
                        rnd: 1628325352,
                    },
                    {
                        headers: {
                            cookie: this.$store.state.setting.cookie,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                });
        },
    },
};
</script>

<style scoped>
#send {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 30px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#send > span {
    width: 15%;
}

#send > input {
    width: 85%;
    outline: none;
    background: transparent;
    border-radius: 4px;
    border: 1px solid #ccc;
    height: 25px;
    color: #fff;
    padding-left: 8px;
}
</style>