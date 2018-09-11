<template>
    <div class="m-account">
        <x-header title="我的资产" :left-options="{backText: ''}">
            <a @click="linkFinance()" class="m-exchange__openorder__nav-link m-exchange__openorder__nav-link--icon"
               slot="right">
                <i class="mcicon-form"></i>
                <span class="">充值记录</span>
            </a>
        </x-header>

        <group class="m-account__info">
            <div class="m-account__info-c">
                <span class="m-account__info-title">
                    估值（BTC)
                </span>
                <span class="m-account__info-balance">
                    2.10888555
                </span>
                <span class="m-account__info-balance-local">
                    ≈120088 CNY
                </span>
            </div>
        </group>

        <group class="m-account__list" v-if="this.assetsList">
            <cell @click.native="getDescribe(item)" v-for="item in this.assetsList" :key="item.currency">
                    <div slot="title">
                        <span class="m-account__list_code">{{item.currency}}</span>
                        <span class="m-account__list-name">({{item.fullName}})</span>
                    </div>
                    <span slot="icon" class="m-account__list-icon">
                    <img :src='item.src'>
                </span>
                    <span class="m-account__list-total">
                    {{item.available}}
                </span>
            </cell>

            <!--<cell is-link link="/account/show">-->
            <!--<div slot="title">-->
            <!--<span class="m-account__list_code">FBC</span>-->
            <!--<span class="m-account__list-name">(Fortune Coin)</span>-->
            <!--</div>-->
            <!--<span slot="icon" class="m-account__list-icon">-->
            <!--<img src="~@/assets/img/currency/fbc.png">-->
            <!--</span>-->
            <!--<span class="m-account__list-total">-->
            <!--1800000.00-->
            <!--</span>-->
            <!--</cell>-->

        </group>

    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-account {

        .weui-cell {
            padding: 15px 15px !important;
        }

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

        .m-account__info {
            display: table;
            width: 100%;

            .m-account__info-c {
                vertical-align: middle;
                width: 100%;
                /*line-height: 0;*/
                padding: $m--space;
                background: get-color(light, panel, '-');
            }

            .m-account__info-title {
                font-size: get-font-size(regular);
                color: get-color(light, muted);
                display: block;
            }

            .m-account__info-balance {
                font-size: 2.2rem;
                font-weight: get-font-weight(boldest);
                display: block;
            }

            .m-account__info-balance-local {
                font-size: get-font-size(regular);
                display: inline-block;
            }

        }

        .m-account__list {
            margin-top: 1.1rem;

            .m-account__list-name {
                /*font-size: 1rem;*/
                /*display: table-cell;*/
                /*vertical-align: middle;*/
                color: get-color(light, muted);
            }

            .m-account__list-icon {
                font-size: get-font-size(regular, '++');
                width: 100%;
                padding-right: 10px;
            }

            .m-account__list-icon img {
                vertical-align: middle;
                width: 20px;
            }

            .m-account__list-total {
                color: $m--font-color;
                font-weight: get-font-weight(bolder);
            }

        }

    }
</style>

<script>
    import {XHeader, Group, Cell} from 'vux'
    import { mapActions } from 'vuex'
    import {getAssets} from '@/modules/exchange/api/get_exchange'

    const imgSrc = {
        FBC: {
            src: require('@/assets/img/currency/btc.png'),
            fullName: 'Fortune Coin'
        },
        BTC: {
            src: require('@/assets/img/currency/btc.png'),
            fullName: 'Bitcoin'
        },
        ETH: {
            src: require('@/assets/img/currency/eth.png'),
            fullName: 'Ethereum'
        },
        EOS: {
            src: require('@/assets/img/currency/eos.png'),
            fullName: 'Eos'
        },
        USDT: {
            src: require('@/assets/img/currency/usdt.png'),
            fullName: 'TetherUS'
        },
        ZL: {
            src: require('@/assets/img/currency/usdt.png'),
            fullName: 'ZL'
        }
    }

    export default {
        name: 'User',
        data() {
            return {
                imgList: [],
                assetsList: []
            }
        },
        created() {
            this.getAssets()
        },
        methods: {
            ...mapActions({
                setAssets: 'setAssets'
            }),
            linkFinance() {
                this.$router.push({path: '/finance'})
            },
            getDescribe(item) {
//                console.log('click')
                this.$router.push({
                    path: '/account/show',
                    query: {
                        item: item
                    }
                })
            },
            getAssets() {
                getAssets().then((response) => {
                    const res = response.data
                    if (res.code === '200') {
                        let data = this.addText(res.data)
                        this.assetsList = data
                        this.setAssets(this.assetsList)
                    }
                })
            },
            addText(data) {
                const vdata = data
                for (let i = 0; i < vdata.length; i++) {
                    const currency = vdata[i].currency.toUpperCase()
                    vdata[i].src = null
                    vdata[i].FullName = null
                    vdata[i].src = imgSrc[currency].src
                    vdata[i].fullName = imgSrc[currency].fullName
                }
                return vdata
            }
        },
        filters: {},

        components: {
            Group,
            XHeader,
            Cell
        }
    }
</script>
