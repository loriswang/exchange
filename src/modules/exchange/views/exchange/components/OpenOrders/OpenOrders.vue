<template>
    <!--交易(下)->委托纪录-->
    <div class="m-exchange__openorder">
        <div v-if="disabled" class="m-exchange__openorder__head">
            <div class="m-exchange__openorder__head-caption">
                <div class="m-exchange__openorder__head-title">
                    <h2 class="m-exchange__openorder__head-text">
                        当前委托
                    </h2>
                </div>
            </div>

            <div class="m-exchange__openorder__head-tools">
                <ul class="m-exchange__openorder__head__nav">
                    <li class="m-exchange__openorder__head__nav-item">
                        <router-link to="/exchange/openorder">
                            <span class="m-exchange__openorder__nav-link m-exchange__openorder__nav-link--icon">
                                <i class="mcicon-form"></i>
                                <span class="">全部</span>
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="m-exchange__openorder__body">
            <div class="m-exchange__openorder__body-item" v-for="item in this.exchangeListData" :key="item.uuid">
                <div class="m-exchange__openorder__body-item-1">
                    <span v-if="item.side == buy" class="m-exchange__openorder__body-item-side m--font-success">
                            买入
                        </span>
                    <span v-else="" class="m-exchange__openorder__body-item-side m--font-danger">
                            卖出
                        </span>
                    <span class="m-exchange__openorder__body-item-pair">
                            {{item.base | toUpper}}/{{item.quote | toUpper}}
                        </span>
                    <span class="m-exchange__openorder__body-item-name">
                            数量
                        </span>
                    <span class="m-exchange__openorder__body-item-amount">
                            {{item.amount | numberIntercept}}
                        </span>

                </div>
                <div class="m-exchange__openorder__body-item-2">
                    <span class="m-exchange__openorder__body-item-date">
                            {{item.created_at.date | strIntercept}}
                        </span>
                    <span class="m-exchange__openorder__body-item-name">
                            价格
                        </span>
                    <span class="m-exchange__openorder__body-item-price">
                            {{item.price | numberIntercept}}
                        </span>
                </div>
                <div class="m-exchange__openorder__body-item-3">
                    <span class="m-exchange__openorder__body-item-action">
                             <x-button mini plain type="primary" @click.native="onItemClick(item.uuid)">撤销</x-button>
                        </span>
                    <span class="m-exchange__openorder__body-item-name">
                            成交
                        </span>
                    <span class="m-exchange__openorder__body-item-filled">
                            {{item.executed_value | numberIntercept}}
                        </span>
                </div>
            </div>
            <div class="listNone" v-if="this.exchangeListData.length === 0">暂无订单</div>
            <div class="empty_space"></div>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/_config.scss";

    .m-exchange__openorder {
        margin-top: $m--space;
        margin-bottom: $m--space;

        &__head {
            display: table;
            width: 100%;
            padding: 0 $m--space;
            height: 3.5rem;
            background-color: get-color(light, box);

            .m-exchange__openorder__head-caption {
                display: table-cell;
                vertical-align: middle;
                text-align: left;

                .m-exchange__openorder__head-title {
                    display: table;
                    table-layout: fixed;
                    height: 100%;

                    .m-exchange__openorder__head-icon {
                        display: table-cell;
                        vertical-align: middle;
                        line-height: 0;
                        padding: 0 13px 0 0;
                        color: get-color(light, icon, '++');

                        @include icons-attr(font-size, (fontawesome: 1.4rem, lineawesome: 1.6rem, metronic: 1.8rem));

                        i {
                            vertical-align: middle;
                            line-height: 0;
                            display: inline-block;
                            //margin-right: 0.5rem;
                        }
                    }

                    .m-exchange__openorder__head-text {
                        display: table-cell;
                        vertical-align: middle;
                        font-size: get-font-size(regular, '+++');
                        font-weight: get-font-weight(bolder);

                        small {
                            display: inline-block;
                            padding-left: 5px;
                            font-size: get-font-size(regular, '-');
                            font-weight: get-font-weight(normal);
                            color: get-color(light, muted);
                        }

                        .m-portlet__head-desc {
                            margin-top: 0.4rem;
                            display: block;
                            font-size: get-font-size(regular, '-');
                            font-weight: get-font-weight(normal);
                            color: get-color(light, muted);
                        }
                    }
                }
            }

            .m-exchange__openorder__head-tools {
                text-align: right;
                display: table-cell;
                vertical-align: middle;
                font-size: get-font-size(regular, '+');
                // portlet nac
                .m-exchange__openorder__head__nav {
                    display: table;
                    text-align: right;
                    float: right;
                    padding: 0;
                    margin: 0;
                    height: 100%;
                    list-style: none;

                    .m-exchange__openorder__head__nav-item {
                        height: 100%;
                        display: table-cell;
                        vertical-align: middle;
                        text-align: center;
                        padding: 0 5px;

                        &.m-exchange__openorder__head-item--last {
                            padding-right: 0;
                        }

                        .m-exchange__openorder__nav-link {
                            display: inline-block;
                            vertical-align: middle;
                            color: get-color(light, regular);

                            &.m-exchange__openorder__nav-link--icon {
                                padding: 0 2px;
                                i {
                                    vertical-align: middle;
                                    line-height: 0;
                                    display: inline-block;
                                    //margin-right: 0.5rem;
                                }

                                &:hover {
                                    i {
                                        color: get-brand-color()
                                    }
                                }
                            }

                            &:hover {
                                text-decoration: none;
                            }
                        }

                        &:first-child {
                            .m-portlet__nav-item {
                                padding-right: 0;
                            }
                        }
                    }
                }

                .nav.nav-tabs,
                .nav.nav-pills {
                    margin: 0;
                }

                .nav.nav-pills {
                    &.m-nav-pills--align-right {
                        float: right;
                    }
                }
            }

            border-color: array-get($m--state-colors, light, base);
            border-bottom: 1px solid get-color(light, panel);
        }

        .m-exchange__openorder__body {
            padding: 0 $m--space;
            background: white;
            font-size: get-font-size(regular, '+');

            .m-exchange__openorder__body-item {
                display: table;
                width: 100%;
                //padding-bottom: $m--space ;
                padding: $m--space 0px;
                border-bottom: 1px solid get-color(light, panel);

                .m-exchange__openorder__body-item-1 {
                    display: table-cell;
                    width: 40%;
                    vertical-align: top;
                }

                .m-exchange__openorder__body-item-2 {
                    width: 35%;
                    display: table-cell;
                    vertical-align: top;
                }

                .m-exchange__openorder__body-item-3 {
                    display: table-cell;
                    vertical-align: top;
                    text-align: right;
                }

                .m-exchange__openorder__body-item-name {
                    color: get-color(light, muted);
                    display: block;
                }

                .m-exchange__openorder__body-item-side {
                    /*font-weight: get-font-weight(bolder);*/
                }

                .m-exchange__openorder__body-item-pair {
                    /*font-weight: get-font-weight(bolder);*/
                    /*color: get-color(light, muted);*/
                    display: inline-block;
                }

                .m-exchange__openorder__body-item-price {
                    display: block;
                    font-weight: get-font-weight(bolder);
                }

                .m-exchange__openorder__body-item-date {
                    /*font-weight: get-font-weight(bolder);*/
                    /*color: get-color(light, muted);*/
                    display: block;
                }

                .m-exchange__openorder__body-item-amount {
                    display: block;
                    font-weight: get-font-weight(bolder);
                }

                .m-exchange__openorder__body-item-action {
                    display: block;
                }

                .m-exchange__openorder__body-item-filled {
                    display: block;
                    font-weight: get-font-weight(bolder);
                }

                .weui-btn {
                    padding-left: 15px;
                    padding-right: 15px;
                    font-size: get-font-size(regular);
                    line-height: 1.4;
                    border-radius: 0px;
                }

                .weui-btn_plain-primary {
                    color: array-get($m--state-colors, danger, base) !important;
                    border: 1px solid array-get($m--state-colors, danger, base) !important;
                }
            }
            .listNone {
                text-align: center;
                padding: 1rem 0;
            }
            .empty_space {
                height: 6rem;
            }
        }

        background-color: array-get($m--state-colors, light, base);
        border-color: array-get($m--state-colors, light, base);

    }

    .weui-toast {
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

</style>

<script>
    import {Confirm, Loading, XButton, Toast} from 'vux'
    import {Decimal} from 'decimal.js'
    import {exchangeList, exchangeChanel} from '@/modules/exchange/api/get_exchange'
    import {showloadings, hideloadings, showToasts, submit, unsubmit} from '@/utils/load'

    export default {
        name: 'open-orders',
        data() {
            return {
                buy: 'buy',
                exchangeListData: [],
                resetList: false,    // 列表是否需要刷新,true刷新,false不刷新
                state: 'open'
            }
        },
        props: {
            disabled: Boolean,
            submited: Boolean
        },
        created() {
            this.getExchangeList(this.state)
        },
        mounted() {
            this.resetList = this.submited
        },
        methods: {
//            获取委托列表数据
            getExchangeList(state) {
                showloadings()
                exchangeList(state).then(res => {
                    if (res.status === 200) {
                        const data = res.data
                        if (data.code === '200') {
                            this.exchangeListData = data.data
                            hideloadings()
                        }
                    }
                })
            },
//            撤销api,成功刷新列表, 失败提示用户
            getChanel(uid) {
                exchangeChanel(uid)
                    .then(res => {
                        if (res.status === 200) {
                            const data = res.data
                            console.log(data)
                            if (data.code === '200') {
//                        关闭loading
                                hideloadings()
                                showToasts(submit, 'success')
                                this.$emit('submiting', event || window.event)
                            } else {
//                        关闭loading
                                hideloadings()
                                showToasts(unsubmit, 'warn')
                            }
                        } else {
//                        关闭loading
                            hideloadings()
                            showToasts(unsubmit, 'warn')
                        }
                    })
                    .catch(err => {
                        console.log(err)
//                        err()
//                        关闭loading
//                        hideloading(_this)
//                        showToast(_this, err.response.status, 'warn')
                    })
            },
//            弹出撤销提示
            showPlugin(id) {
                const _this = this
                this.$vux.confirm.show({
                    title: '操作提示',
                    content: '确认撤销当前委托',
                    onCancel() {
                    },
                    onConfirm() {
                        _this.getChanel(id)
                        showloadings()
                    }
                })
            },
//            点击撤销委托按钮
            onItemClick(id) {
                this.showPlugin(id)
            }
        },
        filters: {
            toUpper(val) {
                return val.toUpperCase()
            },
            strIntercept(val) {
                return val.substr(5, 14)
            },
            numberIntercept(val) {
                return new Decimal(val).toFixed(6)
            }
        },
        watch: {
            submited() {
                this.resetList = this.submited
            },
            resetList() {
                if (this.resetList) {
                    this.getExchangeList(this.state)
                    this.$emit('reset', event)
//                    this.resetList = false
                }
            }
        },
        components: {
            Confirm,
            XButton,
            Loading,
            Toast
        }
    }
</script>
