<template>
    <div>
        <p>{{this.showText}}</p>
    </div>
</template>
<script type="text/ecmascript-6">
    import cookie from 'js-cookie'
    import parseURl from '@/utils/parseUrl'
    import {getAssets} from '@/modules/user/api/get_user'
    import {mapActions} from 'vuex'

    const tokens = 'access_token'
    const adrs = window.location.href
    export default {
        name: 'autologin',
        data() {
            return {
                token: '',
                timer: {
                    type: Number
                },
                showText: 'loading...'
            }
        },
        created() {
        },
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                vm.indexOfToken()
            })
        },
        methods: {
            ...mapActions([
                'setToken',
                'setEmail',
                'setMobile',
                'setWallet'
            ]),
//            获取钱包余额
            ajaxWallet() {
                getAssets().then((res) => {
                    if (res.status === 200) {
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
                    path: '/exchange'
                })
            },
//            检测字符串中是否包含token
            indexOfToken() {
                const _this = this
                const strToken = adrs.indexOf('?token=')
                if (strToken >= 0) {
                    _this.parseURLFC()
                } else {
                    this.showText = '未查找到token!'
                }
            },
            // 获取url中token/
            parseURLFC() {
                this.token = parseURl(adrs)[0].token
                if (this.token) {
                    this.saveCookie(tokens, this.token)
//                    查看cookie是否保存在session中
                    if (this.getCookie(tokens)) {
                        this.ajaxWallet()
                    }
                } else {
                    this.showText = '未查找到token!'
                }
            },
            // 保存到cookie
            saveCookie(key, val) {
//                const timer = (time + nowTimer) / 1000 / 3600 / 24
                cookie.set(key, val)
            },
//            获取cookie
            getCookie(key) {
                return cookie.get(key)
            },
            saveVuex(func, val) {
                func(val)
            }
        }

    }
</script>

<style scoped>

</style>
