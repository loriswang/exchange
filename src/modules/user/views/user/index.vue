<template>
    <div class="m-user">
        <group class="m-user__info">
            <div class="m-user__info-l">
                <span class="m-user__info-avataricon" slot="icon"><i class="mcicon-shenfenzheng"></i></span>
            </div>

            <div class="m-user__info-r">
                <span class="m-user__info-name">
                {{this.userName}}
                </span>
                <span class="m-user__info-uid">
                欢迎来到交易所
                </span>
            </div>

            <!--<div class="m-user__info-r">-->
            <!--<router-link to="/login" class="m-user__info-r">-->
            <!--<span class="m-user__info-name">-->
            <!--请点击登录-->
            <!--</span>-->
            <!--<span class="m-user__info-uid">-->
            <!--欢迎来到交易所-->
            <!--</span>-->
            <!--</router-link>-->
            <!--</div>-->

        </group>

        <group class="m-user__setting">
            <cell title="我的资产" is-link link="/account">
                <span class="m-user__setting-icon" slot="icon"><i class="mcicon-icon"></i></span>
            </cell>
            <cell title="订单管理" is-link link="/exchange/openorder">
                <span class="m-user__setting-icon" slot="icon"><i class="mcicon-wendang"></i></span>
            </cell>
            <!--<cell title="安全中心" is-link link="/user/security">-->
                <!--<span class="m-user__setting-icon" slot="icon"><i class="mcicon-anquan"></i></span>-->
            <!--</cell>-->
            <cell title="资金划转" is-link link="/account/transfer">
                <span class="m-user__setting-icon" slot="icon"><i class="mcicon-zhuanzhang"></i></span>
            </cell>
            <!--<cell title="设置" is-link>-->
                <!--<span class="m-user__setting-icon" slot="icon"><i class="mcicon-shezhi"></i></span>-->
            <!--</cell>-->
            <cell title="测试" @click.native="resetData">
                <span class="m-user__setting-icon" slot="icon"><i class="mcicon-shezhi"></i></span>
            </cell>
        </group>

    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-user {
        .weui-cells {
            margin: 0 !important;
            font-size: 1.2rem !important;

            &:before {
                border-top: 0 !important;
            }

            &:after {
                border-bottom: 0 !important;
            }
        }

        .m-user__info {
            display: table;
            width: 100%;

            .m-user__info-l {
                display: table-cell;
                width: 100px;
                padding: 20px;
            }

            .m-user__info-avatar {
                width: 100px;
                height: 100px;
                text-align: center;
                display: block;
            }

            .m-user__info-avataricon {
                font-size: 5rem;
                text-align: center;
                display: block;
                color: get-color(light, muted);
            }

            .m-user__info-avatar img {
                width: 100%;
                border-radius: 50%;
            }

            .m-user__info-r {
                display: table-cell;
                vertical-align: middle;
                /*line-height: 0;*/
            }

            .m-user__info-name {
                display: block;
                font-size: 2.2rem;
                font-weight: get-font-weight(bolder);
                color: $m--font-color;
            }

            .m-user__info-uid {
                font-size: get-font-size(regular);
                color: get-color(light, muted);
            }

        }

        .m-user__setting {
            margin-top: $m--space;

            .m-user__setting-icon {
                font-size: get-font-size(icon, '++');
                padding-right: 10px;
            }

        }

    }
</style>

<script>
    import {Group, Cell, trim} from 'vux'
    import {getUserInfo, ajaxClear} from '@/modules/user/api/get_user'
    import {showloadings, hideloadings, showToasts} from '@/utils/load.js'

    export default {
        name: 'User',
        data() {
            return {
                userInfoData: {},
                userName: ''
            }
        },
        created() {
            this.getUserInfoData()
        },
        beforeRouteEnter(from, to, next) {
            next(vm => {
                vm.getUserInfoData()
            })
        },
        methods: {
            getUserInfoData() {
                showloadings()
                getUserInfo().then(res => {
                    if (res.status === 200) {
                        if (res.data.code === '200') {
                            this.userInfoData = res.data.data
                            hideloadings()
                        }
                    }
                })
            },
            calcUserName() {
                if (this.userInfoData.email) {
                    this.userName = this.userInfoData.email
                } else if (this.userInfoData.mobile) {
                    this.userName = this.userInfoData.mobile
                } else {
                    this.userName = this.userInfoData.uuid
                }
            },
            getChanel() {
                ajaxClear().then(res => {
                    if (res.status === 200) {
                        if (res.data.code) {
                            showToasts('已重置', 'success')
                            hideloadings()
                        }
                    }
                })
            },
            resetData() {
                const _this = this
                this.$vux.confirm.show({
                    title: '操作提示',
                    content: '确认重置',
                    onCancel() {
                    },
                    onConfirm() {
                        _this.getChanel()
                        showloadings()
                    }
                })
            }
        },
        watch: {
            userInfoData() {
                this.calcUserName()
            }
        },
        components: {
            Group,
            Cell,
            trim
        }
    }
</script>
