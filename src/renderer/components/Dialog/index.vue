<template>
    <div class="dialog" v-if="value">
        <div class="top">
            <div class="title">基本设置</div>
            <div class="close" @click="cancel">
                <svg
                    t="1628251169825"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4721"
                >
                    <path
                        d="M574.55 522.35L904.4 192.5c16.65-16.65 16.65-44.1 0-60.75l-1.8-1.8c-16.65-16.65-44.1-16.65-60.75 0L512 460.25l-329.85-330.3c-16.65-16.65-44.1-16.65-60.75 0l-1.8 1.8c-17.1 16.65-17.1 44.1 0 60.75l329.85 329.85L119.6 852.2c-16.65 16.65-16.65 44.1 0 60.75l1.8 1.8c16.65 16.65 44.1 16.65 60.75 0L512 584.9l329.85 329.85c16.65 16.65 44.1 16.65 60.75 0l1.8-1.8c16.65-16.65 16.65-44.1 0-60.75L574.55 522.35z"
                        p-id="4722"
                        fill="#8a8a8a"
                    ></path>
                </svg>
            </div>
        </div>
        <div class="content">
            <div class="input">
                <span>用户 Id：</span>
                <input type="text" v-model="info.user" />
            </div>
            <div class="input">
                <span>直播 Id：</span>
                <input type="text" v-model="info.live" />
            </div>
            <div class="input">
                <span>Cookie：</span>
                <input type="text" v-model="info.cookie" />
            </div>
        </div>
        <div class="bottom">
            <div class="cancel" @click="cancel">取消</div>
            <div class="save" @click="save">保存</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dialog",
    props: ["value"],
    data() {
        return {
            info: {},
        };
    },
    mounted() {
        this.info = JSON.parse(localStorage.getItem("Setting"));
    },
    methods: {
        save() {
            var data = this.info;
            this.$store.commit("setSetting", data);
            this.$emit("close");
        },
        cancel() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.dialog {
    width: 80%;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    z-index: 999999
}

.dialog .top {
    display: flex;
    justify-content: space-between;
    padding: 20px 25px;
}

.top .title {
    font-size: 25px;
}

.bottom {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
}

.content {
    padding: 10px 25px;
}

.bottom > div {
    padding: 10px 15px;
    margin: 0 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
}

.bottom > div:hover {
    background: rgba(255, 255, 255, 0.9);
    color: #000;
}

.dialog svg {
    height: 25px;
}

.content .input input {
    width: 85%;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 25px;
    color: #fff;
    outline: none;
    padding-left: 5px;
}

.content .input {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
}

.content .input span {
    width: 15%;
}

.close {
    cursor: pointer;
}
</style>