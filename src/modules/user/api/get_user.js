import http from '@/utils/http'

export function test() {
    return http({
        // url: '/api/env',
        url: '/user/userToken',
        method: 'get'
    })
}

// 获取token
export function ajaxToken() {
    const data = {
        grant_type: 'password',
        client_id: 4,
        client_secret: 'wGDEq1rs2q2P2dXuGJPav8DuxjfpuCK4XAW0lztO',
        username: '18513063312',
        password: '123123'
    }
    return http({
        url: '/v1/oauth/token',
        method: 'post',
        data
    })
}
// export function ajaxToken() {
//     return http({
//         url: '/v1/oauth/token',
//         method: 'post'
//     })
// }

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
