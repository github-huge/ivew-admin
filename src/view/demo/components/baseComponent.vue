<style lang="less" scoped>
  .margin_h_10{
    margin: 0  10px;
  }
</style>
<!--首先是一个基本的 Vue 组件，我们常称其为被包装组件(WrappedComponent)，
假设我们的组件叫做 BaseComponent-->
<template>
  <div>
    <Row type="flex">
      <span >props[test]: {{test}}</span>
      <Button class="margin_h_10" type="primary" size="small" @click="handleClick">increase</Button>
    </Row>
    <slot name="slot1"/> <!-- 具名插槽 -->
    <p>========================</p>
    <slot/> <!-- 默认插槽 -->
  </div>
</template>

<script>
  import consoleMixin from '../pages/mixins'

  export default {
    name: 'baseComponent',
    mounted() {
      console.log(this.$vnode)
    },
    props: {
      test: Number
    },
    mixins: [consoleMixin],
    methods: {
      handleClick() {
        this.$emit('customize-click')
      }
    }
  }
</script>
