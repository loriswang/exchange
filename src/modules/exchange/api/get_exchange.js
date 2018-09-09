import http from '@/utils/http'

export function getAssets() {
    return http({
        url: '/v1/wallet/account/balance',
        method: 'get'
    })
}