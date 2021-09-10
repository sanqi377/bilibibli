import Vue from 'vue'
import api from './api'

import App from './App'
import router from './router'
import store from './store'

import "./assets/font/font.css";
import "./assets/font/font-CN.css";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')