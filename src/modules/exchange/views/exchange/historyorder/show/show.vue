<template>
    <!--交易 -> 当前委托(全部) -> 历史订单 -> 详情-->
    <div class="m-exchange__historyordershowpage" v-if="this.exchangeListData">
        <x-header title="交易详情" :left-options="{backText: ''}">
        </x-header>

        <div class="m-exchange__historyordershow">
            <div class="m-exchange__historyordershow-head">
                <div class="m-exchange__historyordershow-head-caption">
                    <div class="m-exchange__historyordershow-head-title">
                        <span v-if="this.exchangeListData.side === 'sell'"
                              class="m-badge m-badge--danger m-badge--wide">
                            卖出
                        </span>
                        <span v-else="" class="m-badge m-badge--success m-badge--wide">
                            买入
                        </span>
                        <span>
                            {{this.exchangeListData.base | toUpper}}/{{this.exchangeListData.quote | toUpper}}
                        </span>
                    </div>
                    <div class="m-exchange__historyordershow-head-desc">
                        <span v-if="this.exchangeListData.state == 'filled'" class="">
                            成交(100%)
                        </span>
                        <span v-else="" class="m--font-warning">
                            撤单
                        </span>
                    </div>
                </div>
            </div>
            <div class="m-exchange__historyordershow-body">
                <div class="m-exchange__historyordershow-body-item">
                    <div class="m-exchange__historyordershow-body-item-l">
                        类型
                    </div>
                    <div class="m-exchange__historyordershow-body-item-r">
                        限价
                    </div>
                </div>
                <div class="m-exchange__historyordershow-body-item">
                    <div class="m-exchange__historyordershow-body-item-l">
                        成交数量
                    </div>
                    <div class="m-exchange__historyordershow-body-item-r">
                        {{this.exchangeListData.filled_amount | numberIntercept}}
                    </div>
                </div>
                <div class="m-exchange__historyordershow-body-item">
                    <div class="m-exchange__historyordershow-body-item-l">
                        委托数量
                    </div>
                    <div class="m-exchange__historyordershow-body-item-r">
                        {{this.exchangeListData.amount | numberIntercept}}
                    </div>
                </div>
                <div class="m-exchange__historyordershow-body-item">
                    <div class="m-exchange__historyordershow-body-item-l">
                        挂单价格
                    </div>
                    <div class="m-exchange__historyordershow-body-item-r">
                        {{this.exchangeListData.price | numberIntercept}}
                    </div>
                </div>
                <div class="m-exchange__historyordershow-body-item">
                    <div class="m-exchange__historyordershow-body-item-l">
                        成交价格
                    </div>
                    <div class="m-exchange__historyordershow-body-item-r">
                        {{this.exchangeListData.executed_value | numberIntercept}}
                    </div>
                </div>
            </div>
            <div class="m-exchange__historyordershow-footer">
                <div class="m-exchange__historyordershow-footer-item">
                    <div class="m-exchange__historyordershow-footer-item-l">
                        手续费
                    </div>
                    <div v-if="this.exchangeListData.side === 'buy'" class="m-exchange__historyordershow-footer-item-r">
                        {{this.exchangeListData.fill_fees | numberIntercept}} {{this.exchangeListData.base | toUpper}}
                    </div>
                    <div v-else="" class="m-exchange__historyordershow-footer-item-r">
                        {{this.exchangeListData.fill_fees | numberIntercept}} {{this.exchangeListData.quote | toUpper}}
                    </div>
                </div>
                <div class="m-exchange__historyordershow-footer-item">
                    <div class="m-exchange__historyordershow-footer-item-l">
                        成交额
                    </div>
                    <div v-if="this.exchangeListData.side === 'buy'" class="m-exchange__historyordershow-footer-item-r">
                        {{this.exchangeListData.executed_value | numberIntercept}} {{this.exchangeListData.quote | toUpper}}
                    </div>
                    <div v-else="" class="m-exchange__historyordershow-footer-item-r">
                        {{this.exchangeListData.executed_value | numberIntercept}} {{this.exchangeListData.quote | toUpper}}
                    </div>
                </div>
            </div>
        </div>

        <div class="m-exchange__historyorderfilllist" v-if="this.dealListData.data">
            <div class="m-exchange__historyorderfilllist__head">
                <div class="m-exchange__historyorderfilllist__head-caption">
                    <div class="m-exchange__historyorderfilllist__head-title">
                        <h2 class="m-exchange__historyorderfilllist__head-text">
                            成交详情
                        </h2>
                    </div>
                </div>

                <div class="m-exchange__historyorderfilllist__head-tools">
                </div>
            </div>

            <div class="m-exchange__historyorderfilllist__body">
                <div class="m-exchange__historyorderfilllist__body-item m-exchange__historyorderfilllist__body-header">
                    <div class="m-exchange__historyorderfilllist__body-item-1">
                      <span class="m-exchange__historyorderfilllist__body-item-title">
                            日期
                        </span>

                    </div>
                    <div class="m-exchange__historyorderfilllist__body-item-2">
                          <span class="m-exchange__historyorderfilllist__body-item-title">
                            成交价
                        </span>
                    </div>
                    <div class="m-exchange__historyorderfilllist__body-item-3">
                        <span class="m-exchange__historyorderfilllist__body-item-title">
                            成交量
                        </span>
                    </div>
                </div>

                <div class="m-exchange__historyorderfilllist__body-item"
                     v-for="item in this.dealListData.data">
                    <div class="m-exchange__historyorderfilllist__body-item-1">
                      <span class="m-exchange__historyorderfilllist__body-item-date">
                            {{item.created_at.date | strIntercept}}
                        </span>

                    </div>
                    <div class="m-exchange__historyorderfilllist__body-item-2">
                          <span class="m-exchange__historyorderfilllist__body-item-amount">
                            {{item.price | numberIntercept}}
                        </span>
                    </div>
                    <div class="m-exchange__historyorderfilllist__body-item-3">
                        <span class="m-exchange__historyorderfilllist__body-item-price">
                            {{item.amount | numberIntercept}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-exchange__historyordershowpage {
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

        .m-exchange__historyordershow {
            background-color: get-color(light, box);
            .m-exchange__historyordershow-head {
                display: table;
                width: 100%;
                min-height: 80px;
                table-layout: fixed;

                .m-exchange__historyordershow-head-caption {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 1.4rem !important;
                }

                .m-exchange__historyordershow-head-title {
                    display: block;
                    font-size: get-font-size(regular, '+++');
                    font-weight: get-font-weight(bolder);
                }

                .m-exchange__historyordershow-head-desc {
                    display: block;
                    font-size: get-font-size(regular);
                    color: get-color(light, muted);
                    padding-top: 5px;
                }

            }
            .m-exchange__historyordershow-body {
                padding-bottom: $m--space;
                border-bottom: 1px solid get-color(light, panel);

                .m-exchange__historyordershow-body-item {
                    padding: 0 $m--space 10px $m--space;
                    display: table;
                    width: 100%;
                    font-size: get-font-size(regular, '++');

                    .m-exchange__historyordershow-body-item-l {
                        display: table-cell;
                        width: 60%;
                        text-align: left;
                    }

                    .m-exchange__historyordershow-body-item-r {
                        font-weight: get-font-weight(bolder);
                        display: table-cell;
                        text-align: right;
                    }
                }
            }
            .m-exchange__historyordershow-footer {
                padding-top: $m--space;
                padding-bottom: $m--space;
                /*border-bottom: 1px solid get-color(light, panel);*/

                .m-exchange__historyordershow-footer-item {
                    padding: 0 $m--space 10px $m--space;
                    display: table;
                    width: 100%;
                    font-size: get-font-size(regular, '++');

                    .m-exchange__historyordershow-footer-item-l {
                        display: table-cell;
                        width: 60%;
                        text-align: left;
                    }

                    .m-exchange__historyordershow-footer-item-r {
                        font-weight: get-font-weight(bolder);
                        display: table-cell;
                        text-align: right;
                    }
                }
            }
        }

        .m-exchange__historyorderfilllist {
            margin-top: $m--space;
            margin-bottom: $m--space;

            .m-exchange__historyorderfilllist__head {
                display: table;
                width: 100%;
                padding: 0 $m--space;
                height: 3.5rem;
                background-color: get-color(light, box);

                .m-exchange__historyorderfilllist__head-caption {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: left;

                    .m-exchange__historyorderfilllist__head-title {
                        display: table;
                        table-layout: fixed;
                        height: 100%;

                        .m-exchange__historyorderfilllist__head-icon {
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

                        .m-exchange__historyorderfilllist__head-text {
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

                .m-exchange__historyorderfilllist__head-tools {
                    text-align: right;
                    display: table-cell;
                    vertical-align: middle;
                    font-size: get-font-size(regular, '+');
                    // portlet nac
                    .m-exchange__historyorderfilllist__head__nav {
                        display: table;
                        text-align: right;
                        float: right;
                        padding: 0;
                        margin: 0;
                        height: 100%;
                        list-style: none;

                        .m-exchange__historyorderfilllist__head__nav-item {

                            height: 100%;
                            display: table-cell;
                            vertical-align: middle;
                            text-align: center;
                            padding: 0 5px;

                            &.m-exchange__historyorderfilllist__head-item--last {
                                padding-right: 0;
                            }

                            .m-exchange__historyorderfilllist__nav-link {
                                display: inline-block;
                                vertical-align: middle;
                                color: get-color(light, regular);

                                &.m-exchange__historyorderfilllist__nav-link--icon {
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

            .m-exchange__historyorderfilllist__body {
                padding: 0 $m--space;
                background: white;
                font-size: get-font-size(regular, '+');

                .m-exchange__historyorderfilllist__body-header {
                    background-color: get-color(light, box) !important;
                }

                .m-exchange__historyorderfilllist__body-item {
                    display: table;
                    width: 100%;
                    //padding-bottom: $m--space ;
                    padding: 10px 0px;
                    border-bottom: 1px solid get-color(light, panel);

                    .m-exchange__historyorderfilllist__body-item-1 {
                        display: table-cell;
                        width: 40%;
                        vertical-align: top;
                    }

                    .m-exchange__historyorderfilllist__body-item-2 {
                        width: 35%;
                        display: table-cell;
                        vertical-align: top;
                    }

                    .m-exchange__historyorderfilllist__body-item-3 {
                        display: table-cell;
                        vertical-align: top;
                        text-align: right;
                    }

                    .m-exchange__historyorderfilllist__body-item-title {
                        color: get-color(light, muted);
                        display: block;
                    }

                    .m-exchange__historyorderfilllist__body-item-date {
                        font-weight: get-font-weight(bolder);
                        display: block;
                    }

                    .m-exchange__historyorderfilllist__body-item-price {
                        display: block;
                        font-weight: get-font-weight(bolder);
                    }

                    .m-exchange__historyorderfilllist__body-item-amount {
                        display: block;
                        font-weight: get-font-weight(bolder);
                    }

                }
            }

            border-color: array-get($m--state-colors, light, base);
        }
    }

</style>

<script>
    import {XHeader, Group, Cell} from 'vux'
    import {Decimal} from 'decimal.js'
    import {exchangeItem, dealList} from '@/modules/exchange/api/get_exchange'
    import {showloadings, hideloadings} from '@/utils/load'

    export default {
        name: 'User',
        data() {
            return {
                loadingNum: 8,
                uuid: null,
                exchangeListData: null,
                dealListData: null
            }
        },
        created() {
            this.ready()
        },
        beforeRouteEnter(to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            next(vm => {
                // 通过 `vm` 访问组件实例
                vm.ready()
            })
        },
        methods: {
            ready() {
                this.uuid = this.$route.query.uuid
                // 请求数据并替换data数据
                this.getExchangeList(this.uuid)
                this.getDealList(this.uuid)
            },
            getExchangeList(id) {
                this.loadingNum -= 1
                exchangeItem(id).then(res => {
                    if (res.status === 200) {
                        const data = res.data
                        if (data.code === '200') {
                            this.exchangeListData = data.data
                            this.loadingNum += 1
                        }
                    }
                })
            },
            getDealList(id) {
                this.loadingNum -= 1
                dealList(id).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === '200') {
                            this.loadingNum += 1
                            const data = res.data
                            console.log(data)
                            this.dealListData = data
                        }
                    }
                })
            }
        },
        filters: {
            toUpper(val) {
                return val.toUpperCase()
            },
            strIntercept(val) {
                return val.substr(2, 17)
            },
            numberIntercept(val) {
                return new Decimal(val).toFixed(8)
            }
//            计算手续费单位
        },
        watch: {
            loadingNum() {
                if (this.loadingNum === 8) {
                    hideloadings()
                } else {
                    showloadings()
                }
            }
        },
        components: {
            Group,
            XHeader,
            Cell
        }
    }
</script>
