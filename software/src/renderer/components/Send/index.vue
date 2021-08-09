<template>
    <div id="send">
        <div>
            <span>发送弹幕：</span>
            <input type="text" v-model="text" @keyup.enter="submit" />
            <span @click="edit"
                ><svg
                    t="1628312597601"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2669"
                >
                    <path
                        d="M416.4 958h191.2V849.7c0-12.7 6.4-25.5 19.1-31.9 31.9-12.7 63.7-31.9 89.2-51 12.7-6.4 25.5-6.4 38.2 0l95.6 57.3 95.6-165.7-95.6-57.3C837 588.5 830.6 575.7 837 563c0-19.1 6.4-31.9 6.4-51s0-31.9-6.4-51c0-12.7 6.4-25.5 12.7-31.9l95.6-57.3-95.6-165.7-95.6 57.3c-12.7 6.4-25.5 6.4-38.2 0-25.5-19.1-57.3-38.2-89.2-51-12.7-12.7-19.1-25.5-19.1-38.2V66H416.4v108.3c0 12.7-6.4 25.5-19.1 31.9-31.9 12.7-63.7 31.9-89.2 51-12.7 6.4-25.5 6.4-38.2 0l-95.6-51-95.6 165.6 95.6 57.3c12.7 6.4 19.1 19.1 12.7 31.9 0 19.1-6.4 31.9-6.4 51s0 31.9 6.4 51c6.4 12.7 0 25.5-12.7 31.9l-95.6 57.3 95.6 165.7 95.6-57.3c12.7-6.4 25.5-6.4 38.2 0 25.5 19.1 57.3 38.2 89.2 51 12.7 6.4 19.1 19.1 19.1 31.9V958z m223 63.7H384.6c-19.1 0-31.9-12.7-31.9-31.9v-121c-25.5-12.7-51-25.5-70.1-38.2l-101.9 63.7c-12.7 6.4-31.9 6.4-44.6-12.7L8.6 658.6c-12.7-19.1-6.4-38.2 12.7-44.6l101.9-63.7v-76.5L21.4 410.1c-19.1-6.4-25.5-25.5-12.7-44.6l127.4-223c6.4-12.7 25.5-19.1 44.6-6.4l101.9 63.7c19.1-12.7 44.6-31.9 70.1-38.2V34.1c0-19.1 12.7-31.9 31.9-31.9h254.9c19.1 0 31.9 12.7 31.9 31.9v121.1c25.5 12.7 51 25.5 70.1 38.2l101.9-63.7c12.7-6.4 31.9-6.4 44.6 12.7l127.4 223c12.7 19.1 6.4 38.2-12.7 44.6l-101.9 63.7v76.5l101.9 63.7c12.7 6.4 19.1 25.5 12.7 44.6L888 881.5c-6.4 12.7-25.5 19.1-44.6 12.7l-101.9-63.7c-19.1 12.7-44.6 31.9-70.1 38.2v121.1c-0.1 19.2-12.8 31.9-32 31.9zM512 703.2c-108.3 0-191.2-82.8-191.2-191.2S403.7 320.8 512 320.8 703.2 403.7 703.2 512 620.3 703.2 512 703.2z m0-318.6c-70.1 0-127.4 57.3-127.4 127.4S441.9 639.4 512 639.4 639.4 582.1 639.4 512 582.1 384.6 512 384.6z"
                        p-id="2670"
                        fill="#8a8a8a"
                    ></path></svg
            ></span>
        </div>
        <Dialog v-model="show" :type="true" @close="close" />
    </div>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
    name: "Send",
    data() {
        return {
            text: "",
            show: false,
        };
    },
    methods: {
        submit() {
            this.$api.live.sendPopups({
                roomid: this.$store.state.setting.live,
                msg: this.text,
                csrf: this.$store.state.setting.csrf,
                rnd: this.$store.state.setting.rnd,
                fontsize: this.$store.state.setting.fontsize,
                color: this.$store.state.setting.color,
                cookie: this.$store.state.setting.cookie,
            });
            
            this.text = null;
            this.$http.get(
                "/api/live/sendBarrage?roomid=" +
                    this.$store.state.setting.live +
                    "&msg=" +
                    this.text +
                    "&csrf=" +
                    this.$store.state.setting.csrf +
                    "&rnd=" +
                    this.$store.state.setting.rnd +
                    "&fontsize=" +
                    this.$store.state.setting.fontsize +
                    "&color=" +
                    this.$store.state.setting.color +
                    "&cookie=" +
                    this.$store.state.setting.cookie
            );
            
        },
        edit() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
    },
    components: {
        Dialog,
    },
};
</script>

<style scoped>
#send > div:first-child {
    padding: 0 25px;
    padding-bottom: 30px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#send span {
    display: flex;
    justify-content: flex-start;
    width: 20%;
}

#send span:last-child {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 8%;
}

#send input {
    width: 79%;
    outline: none;
    background: transparent;
    border-radius: 4px;
    border: 1px solid #ccc;
    height: 25px;
    color: #fff;
    padding-left: 8px;
}

#send svg {
    height: 20px;
}
</style>