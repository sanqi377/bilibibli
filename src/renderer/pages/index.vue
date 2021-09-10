<template>
    <div>
        <Header />
        <div id="content">
            <img src="../assets/img/bilibili.png" />
            <div class="menu">
                <div class="title">
                    <div>MENU</div>
                    <div><img src="../assets/icon/bottom.png" /></div>
                </div>
                <div class="list">
                    <div class="item" @click="goBarrage">
                        <div><img src="../assets/icon/barrage.png" /></div>
                        <div>弹幕显示</div>
                    </div>
                    <div class="item" @click="goWelcome">
                        <div><img src="../assets/icon/join.png" /></div>
                        <div>进入显示</div>
                    </div>
                    <div class="item">
                        <div><img src="../assets/icon/focus.png" /></div>
                        <div>关注显示</div>
                    </div>
                    <div class="item">
                        <div><img src="../assets/icon/gift.png" /></div>
                        <div>礼物显示</div>
                    </div>
                    <div class="item" @click="goMusic">
                        <div><img src="../assets/icon/music.png" /></div>
                        <div>弹幕点歌</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";

export default {
    methods: {
        goBarrage() {
            this.$electron.ipcRenderer.send("openWindows", "barrage");
        },
        goWelcome() {
            this.$electron.ipcRenderer.send("openWindows", "welcome");
        },
        goMusic() {
            this.$electron.ipcRenderer.send("openWindows", "music");
        },
    },
    components: {
        Header,
    },
};
</script>

<style scoped>
#content {
    padding: 40px;
}

#content > img {
    width: 100%;
    height: 65px;
}
.menu {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #8a8a8a;
}
.menu .title {
    color: #8a8a8a;
    display: flex;
    justify-content: space-between;
}

.menu .title img {
    width: 15px;
    height: 16px;
}

.menu .list .item div {
    font-size: 20px;
    display: flex;
    align-items: center;
}

.menu .list .item {
    margin: 20px 0;
    color: #fff;
    display: flex;
    cursor: pointer;
}

.menu .list .item:last-child {
    margin-bottom: 0;
}

.menu .list .item img {
    width: 30px;
    height: 30px;
    margin-right: 15px;
}
</style>