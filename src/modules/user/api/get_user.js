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
        account: 'ex1@gmail.com',
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
