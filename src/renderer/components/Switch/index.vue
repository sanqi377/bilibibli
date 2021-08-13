<template>
    <div id="switch">
        <div class="label">{{ title }}：</div>
        <div class="content">
            <label @click="changeSwitch">
                <div class="off" :style="status ? 'left:0' : 'right:0'"></div>
                <div :class="status ? 'active' : ''">开</div>
                <div :class="status ? '' : 'active'">关</div>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: null,
        };
    },
    props: {
        value: {
            type: Boolean,
        },
        title: {
            type: String,
        },
    },
    mounted() {
        setTimeout(() => {
            this.status = this.value;
        }, 1000);
    },
    methods: {
        changeSwitch() {
            this.status = !this.status;
            this.$emit("change", this.status);
        },
    },
    watch: {
        value: function () {
            this.status = this.value;
        },
    },
};
</script>

<style scoped>
#switch {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
}

#switch .label {
    width: 25%;
}

#switch .content {
    width: 75%;
}

#switch label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
    height: 35px;
    border: 1px solid #ccc;
    background: transparent;
    border-radius: 30px;
    position: relative;
    cursor: pointer;
    padding: 0 10px;
}

#switch .off {
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #fff;
}

#switch label > div.active {
    color: #000;
    z-index: 999;
}
</style>