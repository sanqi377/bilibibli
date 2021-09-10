<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "bilibili",
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans SC", "Noto Sans JP", sans-serif;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
#app {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    height: 100vh;
}
</style>
