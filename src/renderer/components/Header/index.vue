<template>
    <div id="header" ref="header">
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
        <div class="close" @click="close">
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
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
var el;
export default {
    name: "Header",
    data() {
        return {
            stickyIs: false,
            lockIs: false,
            closeIs: false,
        };
    },
    mounted() {},
    methods: {
        sticky() {
            this.stickyIs = !this.stickyIs;
            this.$electron.ipcRenderer.send("window-top");
        },
        lock() {
            this.lockIs = !this.lockIs;
            el = document.getElementById("main");
            el.addEventListener("mouseenter", () => {
                ipcRenderer.send("set-ignore-mouse-events", true, {
                    forward: true,
                });
            });
            el.addEventListener("mouseleave", () => {
                ipcRenderer.send("set-ignore-mouse-events", false);
            });
            this.$electron.ipcRenderer.send("window-lock");
        },
        close() {
            this.closeIs = !this.closeIs;
            this.$electron.ipcRenderer.send("window-close");
        },
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

#header > div {
    margin: 0 3px;
    z-index: 99;
    cursor: pointer;
    position: absolute;
    -webkit-app-region: no-drag;
}

#header > div:nth-child(1) {
    right: 60px;
}

#header > div:nth-child(2) {
    right: 30px;
}

#header > div:nth-child(3) {
    right: 0;
}

#header svg {
    width: 18px;
    height: 18px;
}
</style>