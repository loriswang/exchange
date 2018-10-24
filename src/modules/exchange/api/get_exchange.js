import http from '@/utils/http'
// import axios from 'axios'

export function getAssets() {
    return http({
        url: '/v1/wallet/account/balance',
        method: 'get'
    })
}
export function getSymbols() {
    return http({
        url: '/v1/common/symbols',
        method: 'get'
    })
}
// 提交委托
export function sendMessage(submitData) {
    const data = submitData
    console.log(data)
    return http({
        url: '/v1/trade/orders',
        method: 'post',
        data
    })
}

// 获取委托列表
export function exchangeList(state) {
    const data = state
    return http({
        url: `/v1/trade/orders?state=${data}`,
        method: 'get'
    })
}

// 获取委托uuid详情
export function exchangeItem(id) {
    return http({
        url: `/v1/trade/orders/${id}`,
        method: 'get'
    })
}

// 撤销委托
export function exchangeChanel(id) {
    // const data = {
    //     uuid: id
    // }
    return http({
        url: `/v1/trade/orders/${id}/cancel`,
        method: 'post'
    })
}

// 获取盘口信息
export function getHandicap() {
    return http({
        url: '/v1/market/zltest/depth',
        method: 'get'
    })
}

// 获取价格信息
export function getPrice() {
    return http({
        url: '/v1/market/zltest/ticker',
        method: 'get'
    })
}

// 获取成交时间数组
export function dealList(id) {
    return http({
        url: `/v1/trade/fills?order_uuid=${id}`,
        method: 'get'
    })
}
