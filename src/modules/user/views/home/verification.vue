<template>
    <div>verification</div>
</template>
<script type="text/ecmascript-6">
    import cookie from '../../../../../src/utils/isCookie'
    import parseURl from '@/utils/parseUrl'
    import {ajaxToken} from '@/modules/user/api/get_user'
    let tokens = 'access_token'
//    let key
    let val
    let timer
//    const adrs = 'www.u.com/home?id=2&type=0&dtype=-1'
    const adrs = window.location.href
//    let refresh = null
    export default {
        name: 'Verification',
        data() {
            return {}
        },
        created() {
            this.readCookie(tokens)
            this.parseURL()
        },
        methods: {
            //            查询cookie是否保存token
            readCookie(tokens) {
                if (cookie.get(tokens) === undefined || cookie.get(tokens) === '') {
                    this.ajaxToken()    // 没有=>请求token
                } else {
//                    有 => 验证token
                    this.getUserData()
                }
            },
            // ajax请求获取token => 保存token => 请求用户数据
            ajaxToken() {
                ajaxToken().then(response => {
                    const res = response
                    if (res.status === 200) {
                        let data = response.data
                        val = data.access_token
                        timer = data.expires_in
                        this.saveCookie(tokens, val, timer)
                    }
                })
            },
            // 获取url中token/
            parseURL() {
                console.log(parseURl(adrs))
            },
            // 保存到cookie
            saveCookie (key, val, time) {
                cookie.set(key, val, time)
            },
            //            base64解密
            //            token请求用户数据
            getUserData () {
                console.log('请求用户数据')
            }
        }

    }
</script>

<style scoped>

</style>
