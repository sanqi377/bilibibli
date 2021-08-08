import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3000"

import App from './App'
import router from './router'
import store from './store'

import "./assets/font/font.css";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')