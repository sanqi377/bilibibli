<template>
    <div id="content">
        <Header />
        <Main />
    </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";

export default {
    components: {
        Header,
        Main,
    },
};
</script>

<style scoped>
#content {
    background: rgba(0, 0, 0, 0.7);
}
</style>