<template>
  <div style="margin: 0 10px">
    <label> {{ label }}
      <!--props传值-->
      <!--<input :value="value"-->
      <!--:placeholder="placeholder"-->
      <!--@focus="$emit('focus', $event)"-->
      <!--@input="$emit('input', $event.target.value)">-->

      <!--一次优化-->
      <!--<input :value="value" v-bind="$attrs" @input="$emit('input', $event.target.value)">-->

      <!--二次优化-->
      <input :value="value" v-bind="$attrs" v-on="listeners">
      <!--二次优化-->
    </label>

    <p class="computed">
      <span>请输入名字</span>
      <input type="text" v-model="name">
      <span>computedName: {{computedName}}</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'baseInput',
    props: {
      value: {
        type: String
      },
      label: {
        type: String
      }
    },
    data() {
      return {
        placeholder: '请输入keyword',
        name: 'jake'
      }
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: event => this.$emit('input', event.target.value),
          inheritAttrs: false
        }
      },
      computedName() {
        return this.name
      }
    },
    methods: {
      focus() {
        console.log('ml')
      },
      input() {

      }
    }
  }
</script>

<style lang="less" scoped>
.computed{
  margin: 0 20px ;
}
</style>
