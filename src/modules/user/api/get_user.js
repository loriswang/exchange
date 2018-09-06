import http from '@/utils/http'

export function test () {
    return http({
        // url: '/api/env',
        url: '/user/userToken',
        method: 'get'
    })
}
// 获取token

export function ajaxToken () {
    return http({
        url: '/user/userToken',
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

export function getUserInfo(token) {
    return http({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}
