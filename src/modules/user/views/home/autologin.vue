<template>
    <div>verification</div>
</template>
<script type="text/ecmascript-6">
    import cookie from 'js-cookie'
    import parseURl from '@/utils/parseUrl'
    import { getAssets } from '@/modules/user/api/get_user'
    import { mapActions } from 'vuex'
    const tokens = 'access_token'
//    const adrs = 'www.u.com/home?id=2&type=0&dtype=-1'
//    const nowTimer = Math.round(new Date() / 1000)
    const adrs = window.location.href
    export default {
        name: 'autologin',
        data() {
            return {
                token: '',
                timer: {
                    type: Number
                }
            }
        },
        created() {
//            this.readCookie(tokens)
            this.parseURL()
        },
        methods: {
            ...mapActions([
                'setToken',
                'setEmail',
                'setMobile',
                'setWallet'
            ]),
            //            查询cookie是否保存token
            readCookie(tokens) {
//                this.token = cookie.get(tokens)
//                if (this.token === undefined || this.token === '') {
//                    // 没有=>请求token
//                    this.ajaxToken()
//                } else {
// //                    有 => 验证token
//                    this.ajaxWallet()
//                }
            },
            // ajax请求获取token => 保存token => 请求用户数据
            ajaxToken() {
//                ajaxToken().then(response => {
//                    const res = response
//                    if (res.status === 200) {
//                        let data = response.data.data
//                        console.log('ddd' + data)
//                        this.token = data.token.access_token
//                        this.timer = data.token.expires_in
//                        this.saveCookie(tokens, this.token, this.timer)
//                        this.saveVuex(this.setToken, data.token.access_token)
//                        this.saveVuex(this.setEmail, data.user.email)
//                        this.saveVuex(this.setMobile, data.user.mobile)
//                        this.ajaxWallet()
//                    }
//                })
            },
//            获取钱包余额
            ajaxWallet () {
                getAssets().then((res) => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        let data = res.data.data
                        this.saveVuex(this.setWallet, data)
//                      跳转页面
                        this.getDescribe()
                    }
                })
            },
//          跳转页面
            getDescribe() {
                this.$router.push({
                    path: 'exchange'
                })
            },
            // 获取url中token/
            parseURL() {
                const _this = this
                this.token = parseURl(adrs)[0].token
                async function ajax() {
                    _this.saveCookie(tokens, _this.token)
                }
                ajax().then(
                    _this.ajaxWallet()
                )
            },
            // 保存到cookie
            saveCookie (key, val) {
//                const timer = (time + nowTimer) / 1000 / 3600 / 24
                cookie.set(key, val)
            },
            saveVuex (func, val) {
                func(val)
            }
        }

    }
</script>

<style scoped>

</style>
