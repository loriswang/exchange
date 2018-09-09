<template>
    <div>verification</div>
</template>
<script type="text/ecmascript-6">
    import cookie from 'js-cookie'
    import parseURl from '@/utils/parseUrl'
    import { ajaxToken, getUserInfo } from '@/modules/user/api/get_user'
    import { mapActions } from 'vuex'
    const tokens = 'access_token'
    const adrs = 'www.u.com/home?id=2&type=0&dtype=-1'
//    const adrs = window.location.href
    export default {
        name: 'Verification',
        data() {
            return {
                token: '',
                timer: {
                    type: Number
                }
            }
        },
        created() {
            this.readCookie(tokens)
            this.parseURL()
        },
        methods: {
            ...mapActions({
                setToken: 'setToken',
                setEmail: 'setEmail',
                setMobile: 'setMobile'
            }),
            //            查询cookie是否保存token
            readCookie(tokens) {
                this.token = cookie.get(tokens)
                if (this.token === undefined || this.token === '') {
                    // 没有=>请求token
                    this.ajaxToken()
                } else {
//                    有 => 验证token
                    this.getUserData(this.token)
                }
            },
            // ajax请求获取token => 保存token => 请求用户数据
            ajaxToken() {
                ajaxToken().then(response => {
                    const res = response
                    if (res.status === 200) {
                        let data = response.data
                        this.token = data.access_token
                        this.timer = data.expires_in
                        this.saveCookie(tokens, this.token, this.timer)
                        this.getUserData(this.token)
                    }
                })
            },
            // 获取url中token/
            parseURL() {
                console.log(parseURl(adrs))
            },
            // 保存到cookie
            saveCookie (key, val, time) {
                const timer = time / 1000 / 3600 / 24
                cookie.set(key, val, { expires: timer })
            },
            //            base64解密
            //            保存token到vuex, token请求用户数据
            getUserData (token) {
                this.setToken(token)
                console.log('请求用户数据')
                getUserInfo().then(response => {
                    const res = response.data
//                    console.log(typeof res.code)
                    if (res.code === '200') {
                        this.setEmail(res.data.email)
                        this.setMobile(res.data.mobile)
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>
