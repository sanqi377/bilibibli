<template>
    <div id="content">
        <Header />
        <Main />
        <Send />
    </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Send from "@/components/Send";

export default {
    components: {
        Header,
        Main,
        Send,
    },
};
</script>

<style scoped>
#content {
    background: rgba(0, 0, 0, 0.7);
}
</style>