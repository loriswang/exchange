<template>
    <!--交易 -> 当前委托(全部) -> 当前订单-->
    <div class="">
        <x-header title="当前订单" :left-options="{backText: ''}">
            <router-link to="openorder/historyorder"
                         class="m-exchange__openorder__nav-link m-exchange__openorder__nav-link--icon"
                         slot="right">
                <i class="mcicon-form"></i>
                <span class="">历史订单</span>
            </router-link>
        </x-header>
        <open-orders class="m--marginless" :submited="this.submited" @reset="resetSubmited" @submiting="refreshing"></open-orders>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-exchange__openorder {
        .weui-cell {
            padding: 15px 15px !important;
        }
    }

</style>

<script>
    import {XHeader, Group, Cell} from 'vux'
    import OpenOrders from '../components/OpenOrders/OpenOrders.vue'

    export default {
        name: 'openorders',
        data() {
            return {
                imgList: [],
                submited: false
            }
        },
        beforeRouteEnter(from, to, next) {
            next(vm => {
                vm.submited = true
            })
        },
        created() {
        },
        methods: {
            resetSubmited() {
                this.submited = false
            },
            refreshing() {
                this.submited = true
            }
        },
        components: {
            Group,
            XHeader,
            Cell,
            OpenOrders
        }
    }
</script>
