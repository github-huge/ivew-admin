<!--首先是一个基本的 Vue 组件，我们常称其为被包装组件(WrappedComponent)，
假设我们的组件叫做 BaseComponent-->
<template>
  <div>
    <span @click="handleClick">props: {{test}}</span>
    <slot name="slot1"/> <!-- 具名插槽 -->
    <p>===========</p>
    <slot/> <!-- 默认插槽 -->
  </div>
</template>
<script>
  import consoleMixin from './mixins'

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
