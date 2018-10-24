import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import store from './../store'
import cookie from 'js-cookie'

const tokens = 'access_token'
const testUser = cookie.get(tokens)

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

// router.beforeEach((to, from, next) => {
//   // 设置标题
//   document.title = to.meta.title
//   store.commit('UPDATE_TITLE', to.meta.title)
//   // loading
//   store.commit('UPDATE_LOADING', true)
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (localStorage.token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })
//
// router.afterEach(function(to) {
//   setTimeout(() => {
//     store.commit('UPDATE_LOADING', false)
//   }, 300)
// })
router.beforeEach((to, from, next) => {
    // 设置标题
    document.title = to.meta.title
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (testUser) {
            next()
        } else {
            next({
                path: '/autologin',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
})
router.afterEach((to, from) => {
})

export default router