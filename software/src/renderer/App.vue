<template>
    <div id="app" ref="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "my-project",
    data() {
        return {
            height: null,
        };
    },
    mounted() {
        setTimeout(() => {
            this.height = this.$refs.app.offsetHeight;
        }, 1000);
    },
    watch: {
        height: function () {
            this.$electron.ipcRenderer.send(
                "window-height",
                this.$refs.app.offsetHeight
            );
        },
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: xiangsu;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>
