<template>
  <div>
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
        placeholder: '请输入keyword'
      }
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: event => this.$emit('input', event.target.value),
          inheritAttrs: false
        }
      }
    },
    methods: {
      focus() {},
      input() {

      }
    }
  }
</script>

<style scoped>

</style>
