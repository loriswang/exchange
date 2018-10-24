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
        // if (error && error.response) {
        //     switch (error.response.status) {
        //     case 400:
        //         console.log('请求错误')
        //         break
        //     case 401:
        //         console.log('未授权，请重新登录')
        //         break
        //     case 403:
        //         console.log('拒绝访问')
        //         break
        //     case 404:
        //         console.log('请求错误,未找到该资源')
        //         break
        //     case 405:
        //         console.log('请求方法未允许')
        //         break
        //     case 408:
        //         console.log('请求超时')
        //         break
        //     case 500:
        //         console.log('服务器端出错')
        //         break
        //     case 501:
        //         console.log('网络未实现')
        //         break
        //     case 502:
        //         console.log('网络错误')
        //         break
        //     case 503:
        //         console.log('服务不可用')
        //         break
        //     case 504:
        //         console.log('网络超时')
        //         break
        //     case 505:
        //         console.log('http版本不支持该请求')
        //         break
        //     default:
        //         console.log(`连接错误${error.response.status}`)
        //     }
        // } else {
        //     console.log('连接到服务器失败')
        // }
        const errData = error.response.data
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
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// export default {
//     install: function (Vue, Option) {
//         Object.defineProperty(Vue.prototype, '$http', {value: instance})
//     }
// }
export default instance
