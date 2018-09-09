import axios from 'axios'
// import store from '@/store/index'
import cookie from 'js-cookie'
// import qs from 'qs'

/**
 * http配置
 */

// 定义测试用户
const testUser = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBlMDAyNzhhMTc5ODE0ODExNmMxYzFjZTA1ZTI1OGZmMTRkYjk1NGEzNWE3Mzg5YjE2YzEyZTU3YmQ1N2MzNTYxNmMzNDI1M2QxMTRiODhlIn0.eyJhdWQiOiI0IiwianRpIjoiMGUwMDI3OGExNzk4MTQ4MTE2YzFjMWNlMDVlMjU4ZmYxNGRiOTU0YTM1YTczODliMTZjMTJlNTdiZDU3YzM1NjE2YzM0MjUzZDExNGI4OGUiLCJpYXQiOjE1MzU0Nzk0MDIsIm5iZiI6MTUzNTQ3OTQwMiwiZXhwIjoxNTM2Nzc1Mzk5LCJzdWIiOiIxMyIsInNjb3BlcyI6W119.E9uJA4EF85P8R3BVBgtkw4DbPULIjRAQKocK1FpMWG2323L3MbD1Mj40D585kBlIsVAfhevITSY019KKRaWDEDiqvgInCpcS6tXFYWpmGHpDK_lSjv5E3YN9ogmkSvS_kef4eC1GnOzE_bGqMMskctjOj_uRliHGcpMAx0yTo9e0lruZ7LQb5nxLXXS5WdAiVrI17XWI0sja8oA_GDl1DTnBlyt70ycxibfa9VlcYJVvITMik9PPHqwotLvkwPa9VJ2jiXjp9h40lnhErdhrP-msUD56pRrbzW4T8YA7GowoS7GvAGkvtdMjpXWD8kS4YJiJpkZMDYwxY2siwjPjgXZvo2Na0kmnYWPJPUsJ0ZUd-llMNNKRAT7EGslHms6tILt4VKoMuqjrjit-YR_EcbFIs3FTlx1hB-ZbpFaZgJ9J6TsBTYT6dhnBqjRPeViz3n4lt8y7Q4KdsZrVLy5Zx7N4BwUy8W_Bt-9Pyqag66t3cV8V6YGD-d3DAK2stTlzkRx7HGwRRPzYkkDqCXsxDizlOxZ3g3fvhtufpGvLdDsb8UWR3zFUu8NUo7FfAYa0tswYiBg-DZBhi3IjWP3fq-F-j7wq9vjbvE0FviSMWlZCcmg4lx-obES70ik26UatPSwVK6ZDlXugQylxidzO-DOuf0GHb525yDXoUfH3t70'

const instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 50000,
    withCredentials: false,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// http request 拦截器
instance.interceptors.request.use(
    config => {
        // POST传参序列化
        // if (config.method === 'post') {
        //     config.data = qs.stringify(config.data)
        // }
        // 若是有做鉴权token , 就给头部带上token

        // 使用token请求数据
        const token = cookie.get('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${testUser}`
        }
        // 使用vuex=>state请求数据
        // if (store.state.user.token) {
        //     config.headers.Authorization = `Bearer ${store.state.user.token}`
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// http response 拦截器
instance.interceptors.response.use(
    response => {
        // token 过期或者其他情况的判断
        // if (response.data.code === -1) {
        //   localStorage.removeItem('token')
        //   router.replace({
        //     path: 'login',
        //     query: { redirect: router.currentRoute.fullPath }
        //   })
        // }else{
        //   return response
        // }

        // 返回响应时做一些处理，我们这里直接返回
        return response
    },
    error => {
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 401:
        //       // 返回 401 清除token信息并跳转到登录页面
        //       localStorage.removeItem('token')
        //       router.replace({
        //         path: 'login',
        //         query: { redirect: router.currentRoute.fullPath }
        //       })
        //   }
        // }
        // 当响应异常时做一些处理
        return Promise.reject(error)
    }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// export default {
//     install: function (Vue, Option) {
//         Object.defineProperty(Vue.prototype, '$http', {value: instance})
//     }
// }
export default instance
