<template>
  <Select
    @on-change="handleChange"
    class="tree-select"
    multiple
    ref="select"
    v-bind="$attrs"
  >
    <tree-select-tree-item
      :data="data"
      :load-data="loadData"
      :selectedArray="value"
      @on-check="handleTreeCheck"
      @on-clear="handleClear"
    ></tree-select-tree-item>
  </Select>
</template>

<script>
  import Emitter from 'iview/src/mixins/emitter'
  import TreeSelectTreeItem from './tree-select-tree.vue'

  export default {
    name: 'TreeSelect',
    mixins: [Emitter],
    components: {
      TreeSelectTreeItem
    },
    props: {
      value: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      loadData: Function
    },
    data() {
      return {
        isChangedByTree: true,
        isInit: true
      }
    },
    provide() {
      return {
        parent: this
      }
    },
    methods: {
      handleChange(selected) {
        if (!this.isChangedByTree) this.$emit('input', selected)
        this.isChangedByTree = false
      },
      handleTreeCheck(selectedArray) {
        this.isChangedByTree = true
        this.$emit('input', selectedArray.map(item => item.id))
      },
      handleClear() {
        this.$refs.select.reset()
      }
    }
  }
</script>

<style lang="less">
  .tree-select {
    .ivu-select-dropdown {
      padding: 0 6px;
    }
  }
</style>
