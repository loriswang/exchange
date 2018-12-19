import axios from 'axios'
import cookie from 'js-cookie'
import {hideloadings, showToasts} from './load'
import {errInfo} from './errInfoList'

// import store from '@/store/index'
// import qs from 'qs'
// import router from '../router'
/**
 * http配置
 */

const errToast = function (code) {
    if (errInfo[code]) {
        hideloadings()
        showToasts(errInfo[code], 'warn')
    } else {
        hideloadings()
        showToasts(`错误, ${code}`, 'warn')
    }
}

const tokens = 'access_token'
// 定义测试用户
const testUser = cookie.get(tokens)

const instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 10000,
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
        //     switch (error.response.status) {
        //         case 401:
        //             // 返回 401 清除token信息并跳转到登录页面
        //             // localStorage.removeItem('token')
        //             router.replace({
        //                 path: '/autologin',
        //                 query: {redirect: router.currentRoute.fullPath}
        //             })
        //     }
        // }
        console.log(error.response)
        const errData = error.response.data
        console.log(errData.code)
        if (errData.code === 500) {
            errToast(errData.error_code)
        } else if (errData.code === 400) {
            hideloadings()
            showToasts(errData.code, 'warn')
        } else {
            hideloadings()
            showToasts(errData.code, 'warn')
        }
        // 当响应异常时做一些处理
        return Promise.reject(error)
    }
    // function axiosRetryInterceptor(err) {
    //     console.log('timeout')
    //     var config = err.config
    //     // If config does not exist or the retry option is not set, reject
    //     if (!config || !config.retry) return Promise.reject(err)
    //
    //     // Set the variable for keeping track of the retry count
    //     config.__retryCount = config.__retryCount || 0
    //
    //     // Check if we've maxed out the total number of retries
    //     if (config.__retryCount >= config.retry) {
    //         // Reject with the error
    //         return Promise.reject(err)
    //     }
    //
    //     // Increase the retry count
    //     config.__retryCount += 1
    //
    //     // Create new promise to handle exponential backoff
    //     var backoff = new Promise(function (resolve) {
    //         setTimeout(function () {
    //             resolve()
    //         }, config.retryDelay || 1)
    //     })
    //
    //     // Return the promise in which recalls axios to retry the request
    //     return backoff.then(function () {
    //         return axios(config)
    //     })
    // }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// export default {
//     install: function (Vue, Option) {
//         Object.defineProperty(Vue.prototype, '$http', {value: instance})
//     }
// }
export default instance
