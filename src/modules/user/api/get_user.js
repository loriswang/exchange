import http from '@/utils/http'

export function test() {
    return http({
        url: '/user/userToken',
        method: 'get'
    })
}

// 获取token
export function ajaxToken() {
    const data = {
        account: 'ex18@gmail.com',
        password: '123123'
    }
    return http({
        url: '/v1/user/auth/login',
        method: 'post',
        data
    })
}
// 获取钱包余额
export function getAssets() {
    return http({
        url: '/v1/wallet/account/balance',
        method: 'get'
    })
}
// 获取第三方钱包余额
export function getThirdAssets() {
    return http({
        url: '/v1/wallet/wallet/balance',
        method: 'get'
    })
}
// 划转提交
export function submitExchange(data) {
    return http({
        url: '/v1/wallet/account/transfer',
        method: 'post',
        data
    })
}
// 请求用户数据
export function getUserInfo() {
    return http({
        url: '/v1/user/user/show',
        method: 'get'
    })
}

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return http({
        url: '/login/login',
        method: 'post',
        data
    })
}

// clear
export function ajaxClear() {
    return http({
        url: '/v1/trade/clear',
        method: 'post'
    })
}
