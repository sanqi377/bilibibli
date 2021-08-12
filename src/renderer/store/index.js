import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

var setting;
try {
    setting = JSON.parse(localStorage.getItem("Setting"))
} catch (err) {
    setting = {
        user: 403379471,
        live: 22888172,
        comein: false,
        follow: true
    }
}

export default new Vuex.Store({
    state: {
        setting: setting
    },
    mutations: {
        setSetting(state, $isSetting) {
            state.setting = $isSetting;
            localStorage.setItem("Setting", JSON.stringify(state.setting))
        },
    },
    actions: {
        setSetting(context, $isSetting) {
            context.commit('setSetting', $isSetting);
        },
    },
    modules,
    plugins: [
        createPersistedState(),
        // createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production'
})