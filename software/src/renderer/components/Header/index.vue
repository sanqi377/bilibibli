<template>
    <div id="header">
        <div class="setting" @click="setting">
            <svg
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
                ></path>
            </svg>
        </div>
        <div class="sticky" @click="sticky">
            <svg
                t="1628251102913"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2655"
            >
                <path
                    d="M855.866698 106.426915c0 23.451108-19.010983 42.463114-42.463114 42.463114L203.435319 148.890029c-23.451108 0-42.463114-19.010983-42.463114-42.463114l0 0c0-23.451108 19.010983-42.463114 42.463114-42.463114l609.968266 0C836.855716 63.963801 855.866698 82.974783 855.866698 106.426915L855.866698 106.426915zM511.826038 264.35069c-23.451108 0-42.463114 19.010983-42.463114 42.463114l0 609.968266c0 23.451108 19.010983 42.463114 42.463114 42.463114l0 0c23.451108 0 42.463114-19.010983 42.463114-42.463114L554.289152 306.812781C554.288129 283.361673 535.277146 264.35069 511.826038 264.35069L511.826038 264.35069zM541.961382 233.023194c-16.582677-16.582677-42.517349-17.534352-57.927317-2.124384L171.253362 543.67849c-15.408945 15.408945-14.458293 41.343617 2.124384 57.926294l0 0c16.582677 16.582677 42.517349 17.534352 57.926294 2.124384L544.085766 290.949488C559.494711 275.540544 558.544059 249.605871 541.961382 233.023194L541.961382 233.023194zM481.696834 233.023194c-16.582677 16.582677-17.534352 42.517349-2.124384 57.926294l312.780703 312.780703c15.408945 15.408945 41.343617 14.458293 57.926294-2.124384l0 0c16.582677-16.582677 17.534352-42.517349 2.124384-57.926294L539.623128 230.897787C524.214183 215.488843 498.27951 216.440517 481.696834 233.023194L481.696834 233.023194z"
                    p-id="2656"
                    :fill="stickyIs ? '#00a1d6' : '#8a8a8a'"
                ></path>
            </svg>
        </div>
        <div class="lock" @click="lock">
            <svg
                t="1628251151718"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3861"
            >
                <path
                    d="M864.49 448H768V320c0-141.38-114.62-256-256-256S256 178.62 256 320v128h-96.49c-17.4 0-31.51 14.11-31.51 31.51v448.98c0 17.4 14.11 31.51 31.51 31.51h704.98c17.4 0 31.51-14.11 31.51-31.51V479.51c0-17.4-14.11-31.51-31.51-31.51zM320 320c0-105.87 86.13-192 192-192s192 86.13 192 192v128H320V320z m512 576H192V512h640v384z"
                    p-id="3862"
                    :fill="lockIs ? '#00a1d6' : '#8a8a8a'"
                ></path>
            </svg>
        </div>
        <div class="close" @click="closes">
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
                    :fill="closeIs ? '#00a1d6' : '#8a8a8a'"
                ></path>
            </svg>
        </div>
        <Dialog v-model="cancel" @close="close" />
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import Dialog from "@/components/Dialog";
var el;
export default {
    name: "Header",
    data() {
        return {
            stickyIs: false,
            lockIs: false,
            closeIs: false,
            cancel: false,
        };
    },
    methods: {
        sticky() {
            this.stickyIs = !this.stickyIs;
            el = document.getElementById("main");
            if (this.stickyIs) {
                el.addEventListener("mouseenter", () => {
                    ipcRenderer.send("set-ignore-mouse-events", true, {
                        forward: true,
                    });
                });
                el.addEventListener("mouseleave", () => {
                    ipcRenderer.send("set-ignore-mouse-events", false);
                });
            } else {
                el.addEventListener("mouseenter", () => {
                    ipcRenderer.send("set-ignore-mouse-events", false, {
                        forward: false,
                    });
                });
                el.addEventListener("mouseleave", () => {
                    ipcRenderer.send("set-ignore-mouse-events", false);
                });
            }
            this.$electron.ipcRenderer.send("window-top");
        },
        lock() {
            this.lockIs = !this.lockIs;
            this.$electron.ipcRenderer.send("window-lock");
        },
        closes() {
            this.closeIs = !this.closeIs;
            this.$electron.ipcRenderer.send("window-close");
        },
        setting() {
            this.cancel = true;
            console.log(this.cancel);
        },
        close() {
            this.cancel = false;
        },
    },
    components: {
        Dialog,
    },
};
</script>

<style scoped>
#header {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    -webkit-app-region: drag;
}

.setting,
.sticky,
.lock,
.close {
    margin: 0 3px;
    z-index: 99;
    cursor: pointer;
    position: absolute;
    -webkit-app-region: no-drag;
}

#header > div:nth-child(1) {
    right: 90px;
}

#header > div:nth-child(2) {
    right: 60px;
}

#header > div:nth-child(3) {
    right: 30px;
}

#header > div:nth-child(4) {
    right: 0;
}

#header svg {
    width: 18px;
    height: 18px;
}
</style>