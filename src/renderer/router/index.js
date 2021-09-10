import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: require('@/pages/index').default
        },
        {
            path: '/barrage',
            name: 'barrage',
            component: require('@/pages/barrage').default
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: require('@/pages/welcome').default
        },
        {
            path: '/music',
            name: 'music',
            component: require('@/pages/music').default
        },
        {
            path: '/focus',
            name: 'focus',
            component: require('@/pages/focus').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})