<template>
  <div>
    <BaseInput
      :value="value"
      @focus="handleFocus"
      @input="handleInput"
      label="密码"
      placeholder="请填写密码"></BaseInput>

    <base-component :test="100">
      <h2 slot="slot1">BaseComponent slot</h2>
      <p>default slot</p>
    </base-component>

    <enhanced-com @customize-click="handleCustClick">
      <h2 slot="slot1">EnhancedComponent slot</h2>
      <p>default slot</p>
    </enhanced-com>

    <!--reduce-->
    <p>数组元素之和: <span id="demo"></span></p>
  </div>
</template>

<script>
  import BaseInput from './baseInput'
  import baseComponent from './baseComponent'
  import hoc from './hoc'

  const EnhancedCom = hoc(baseComponent)

  export default {
    name: 'highFunction',
    components: {
      BaseInput, baseComponent, EnhancedCom
    },
    mounted() {
      this.myFunction()
      console.log(BaseInput)
      // console.log(this.$vnode)
    },
    data() {
      return {
        value: '',
        numbers: [15.5, 2.3, 1.1, 4.7]
      }
    },
    methods: {
      handleInput() {
        console.log('inputing')
      },
      handleFocus() {
        console.log('focus')
      },
      handleCustClick() {
        console.log('hoc')
      },
      getSum(total, currentValue, currentIndex, arr) {
        // console.log(total)
        // console.log(currentValue)
        // console.log(currentIndex)
        // console.log(arr)
        return total + Math.round(currentValue)
      },
      myFunction() {
        // reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
        // reduce() 可以作为一个高阶函数，用于函数的 compose
        // 注意: reduce() 对于空数组是不会执行回调函数的。
        // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        document.getElementById('demo').innerHTML = this.numbers.reduce(this.getSum, 0)
      }
    }
  }
</script>

<style scoped>
</style>
