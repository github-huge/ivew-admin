<style lang="less" scoped>
  .dd {
    & .ivu-select-dropdown {
      max-height: 100% !important;
    }
    & .ivu-select-dropdown {
      max-height: 100% !important;
    }
    & > .ddm {
      text-align: left;
      font-weight: normal;
      & .active {
        color: #008cee
      }
    }
  }
</style>
<template>
  <div class="dd">
    <!--<Dropdown :placement="placement" @on-click="ddClick" transfer>-->
    <!--<span v-if="content.length > 0" style="cursor:pointer">-->
    <!--{{content}}-->
    <!--<Icon type="arrow-down-b" v-if="showArrow"/>-->
    <!--</span>-->
    <!--<Icon type="plus" v-else style="cursor:pointer"></Icon>-->
    <!--<DropdownMenu slot="list" class="ddm">-->
    <!--<DropdownItem v-for="(item, index) in data" :key="index" :name="item.value"-->
    <!--:style="{color:localChoosedItem == item.value ? activeColor:defaultColor}">{{item.name}}-->
    <!--</DropdownItem>-->
    <!--<slot name="diy"></slot>-->
    <!--</DropdownMenu>-->
    <!--</Dropdown>-->
    <Dropdown @on-click="ddClick" transfer>
      <a href="javascript:void(0)">
        操作
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem :disabled="flag"
                      class="dropItem" name="orderDetail">订单详情
        </DropdownItem>
        <DropdownItem
          class="dropItem"
          name="edit">编辑订单
        </DropdownItem>
        <DropdownItem
          class="dropItem"
          name="budget">成本预算
        </DropdownItem>
        <DropdownItem
          class="dropItem"
          name="remit">申请打款
        </DropdownItem>
        <DropdownItem
          class="dropItem"
          name="orderDetail">回团报账
        </DropdownItem>
        <DropdownItem name="orderDetail">申请开票</DropdownItem>
        <DropdownItem name="orderDetail">申请决算</DropdownItem>
        <DropdownItem name="orderDetail">取消订单</DropdownItem>
        <DropdownItem name="orderDetail">查看取消原因</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
  // import { on } from '@/libs/tools'
  export default {
    name: 'dropdown',
    mounted() {

    },
    data() {
      return {
        activeColor: '#008cee',
        defaultColor: '#495060',
        localChoosedItem: '',
        flag: true
      }
    },
    props: {
      placement: {
        type: String,
        default: 'bottom-start'
      },
      showArrow: {
        type: Boolean,
        default: false
      },
      content: {
        type: Object,
        default: () => {
          return {}
        }
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      choosedItem: {
        type: String,
        default: ''
      }
    },
    watch: {
      choosedItem: {
        immediate: true,
        handler(newv, oldv) {
          this.localChoosedItem = newv
        }
      }
    },
    methods: {
      ddClick(name) {
        this.$emit('on-choosed', name)
      }
    }
  }
</script>
