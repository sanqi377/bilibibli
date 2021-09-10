<template>
    <div id="header">
        <div class="head"></div>
        <div id="setting">
            <template v-if="this.$route.name == 'index'">
                <div class="mini" @click="mini">
                    <svg
                        t="1630477094534"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M128 448h768v128H128z"
                            p-id="13735"
                            :fill="stickyIs ? '#00a1d6' : '#8a8a8a'"
                        ></path>
                    </svg>
                </div>
            </template>
            <template v-if="this.$route.name != 'index'">
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
            </template>
            <div class="close" @click="closes">
                <svg
                    t="1628662171323"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5786"
                >
                    <path
                        d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
                        p-id="5787"
                        fill="#8a8a8a"
                    ></path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
const win = require("electron").remote.getCurrentWindow();
var el, el1, el2;

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
    mounted() {
        this.set = this.$store.state.setting;
    },
    methods: {
        mini() {
            this.$electron.ipcRenderer.send("window-mini");
        },
        sticky() {
            this.stickyIs = !this.stickyIs;
            this.$electron.ipcRenderer.send("window-top", this.$route.name);
        },
        lock() {
            this.lockIs = !this.lockIs;
            el = document.getElementById("penetration");
            if (this.lockIs) {
                // el dom 穿透设置
                el.onmouseleave = function () {
                    win.setIgnoreMouseEvents(false);
                };
                el.onmouseenter = function () {
                    win.setIgnoreMouseEvents(true, { forward: true });
                };
            } else {
                el.onmouseleave = function () {
                    win.setIgnoreMouseEvents(false, { forward: false });
                };
                el.onmouseenter = function () {
                    win.setIgnoreMouseEvents(false);
                };
            }
            this.$electron.ipcRenderer.send("window-lock", this.$route.name);
        },
        closes() {
            this.closeIs = !this.closeIs;
            this.$electron.ipcRenderer.send("window-close", this.$route.name);
        },
        setting() {
            this.cancel = true;
        },
        close() {
            this.cancel = false;
        },
    },
};
</script>

<style scoped>
.head {
    width: 100%;
    height: 44px;
    -webkit-app-region: drag;
}
#setting {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    padding: 10px;
    align-items: center;
    z-index: 9999;
}

.setting,
.sticky,
.lock,
.mini,
.close {
    margin: 0 3px;
    z-index: 99;
    cursor: pointer;
    -webkit-app-region: no-drag;
}

#header #setting > div {
    margin: 0 6px;
}

#header #setting > div:first-child {
    margin-left: 0;
}

#header #setting > div:last-child {
    margin-right: 0;
}

#header #setting > div:nth-child(1) {
    right: 90px;
}

#header #setting > div:nth-child(2) {
    right: 60px;
}

#header #setting > div:nth-child(3) {
    right: 30px;
}

#header #setting > div:nth-child(4) {
    right: 0;
}

#header #setting > div:nth-child(1) svg {
    width: 18px;
    height: 17px;
}

#header #setting > div:nth-child(4) svg {
    width: 22px;
    height: 22px;
}

#header svg {
    width: 18px;
    height: 18px;
}
</style>