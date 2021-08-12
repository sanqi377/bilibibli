<template>
    <div id="dialog" class="dialog" v-show="value">
        <div v-if="!type">
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
                    <input type="text" v-model="setting.user" />
                </div>
                <div class="input">
                    <span>直播 Id：</span>
                    <input type="text" v-model="setting.live" />
                </div>
                <div class="input">
                    <span>Cookie：</span>
                    <input type="text" v-model="setting.cookie" />
                </div>
                <SwitchButton
                    title="进房播报"
                    v-model="setting.comein"
                    @change="changeComein"
                />
                <SwitchButton
                    title="关注播报"
                    v-model="setting.follow"
                    @change="changeFollow"
                />
            </div>
            <div class="bottom">
                <div class="cancel" @click="cancel">取消</div>
                <div class="save" @click="save">保存</div>
            </div>
        </div>
        <div v-if="type">
            <div class="top">
                <div class="title">弹幕发送设置</div>
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
                    <span>csrf：</span>
                    <input type="text" v-model="setting.csrf" />
                </div>
                <div class="input">
                    <span>color：</span>
                    <input type="text" v-model="setting.color" />
                </div>
                <div class="input">
                    <span>fontsize：</span>
                    <input type="text" v-model="setting.fontsize" />
                </div>
                <div class="input">
                    <span>rnd：</span>
                    <input type="text" v-model="setting.rnd" />
                </div>
            </div>
            <div class="bottom">
                <div class="cancel" @click="cancel">取消</div>
                <div class="save" @click="save">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
import SwitchButton from "@/components/Switch/index";
export default {
    name: "Dialog",
    props: ["value", "type"],
    data() {
        return {
            setting: {},
        };
    },
    mounted() {
        if (JSON.parse(localStorage.getItem("Setting"))) {
            this.setting = JSON.parse(localStorage.getItem("Setting"));
        }
    },
    methods: {
        save() {
            var data = this.setting;
            this.$store.commit("setSetting", data);
            this.$emit("close");
        },
        cancel() {
            this.$emit("close");
        },
        changeComein(val) {
            this.setting.comein = val;
            console.log(val, "comein");
        },
        changeFollow(val) {
            this.setting.follow = val;
            console.log(val, "follow");
        },
    },
    components: {
        SwitchButton,
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
    z-index: 999999;
}

.dialog .top {
    display: flex;
    justify-content: space-between;
    padding: 18px 25px;
}

.top .title {
    font-size: 20px;
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
    width: 75%;
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
    width: 25%;
}

.close {
    cursor: pointer;
}
</style>