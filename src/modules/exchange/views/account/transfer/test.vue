<template>
    <div>
        <popup-picker :title="title"
                      :data="typeList"
                      v-model="value"
                      @on-show="onShow"
                      @on-hide="onHide"
                      @on-change="onChange"
                      placeholder="请选择">
        </popup-picker>
    </div>
</template>


<script>
    import {PopupPicker} from 'vux'

    export default {
        data() {
            return {
                date: '',
                title: '币种选择',
                list: [this.typeList],
                value: []
            }
        },
        props: [
            'typeList'
        ],
        methods: {
            onChange(val) {
                this.value = val
                this.$emit('changeType', val)
            },
            onShow() {
//                console.log('on show')
            },
            onHide(type) {
//                console.log('on hide', type)
            }
        },
        watch: {
//            'typeList'() {
//                this.list[0] = this.typeList
//            }
        },
        components: {
            PopupPicker
        }
    }
</script>

<style scoped>
    .picker-buttons {
        margin: 0 15px;
    }
</style>