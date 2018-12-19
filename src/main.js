// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import i18n from './lang'
import App from './App'
// import axios from 'axios'

import { ConfirmPlugin, LoadingPlugin, ToastPlugin } from 'vux'
/* eslint-disable import/first */

import '@/assets/css/style.scss'
import '@/assets/css/vux/vux.less'
//
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.use({
    i18n: (key, value) => i18n.t(key, value)
})

// axios.defaults.retry = 4
// axios.defaults.retryDelay = 1000

if ('ontouchstart' in window) {
    FastClick.attach(document.body)
}
// FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
