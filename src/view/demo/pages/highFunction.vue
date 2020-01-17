<style lang="less" scoped>
  .margin_v_10 {
    margin: 10px 0;
  }
  .basicComponent{
    padding: 20px;
    background: yellowgreen;
  }
  .EnhanceComponent{
    padding: 20px;
    background: darkorange;
  }
</style>

<template>
  <div>
    <Row type="flex">
      <InputNumber v-model="number" :precision="2"></InputNumber>
      <BaseInput
        v-model="value"
        @focus="handleFocus"
        label="密码"
        placeholder="请填写密码"></BaseInput>
        <span>{{value}}</span>
    </Row>

    <Row class="basicComponent">
      <b>基础组件</b>
      <base-component @customize-click="handleCustomizeClick" :test="test">
        <h4 slot="slot1">BaseComponent Named slot</h4>
        <p>BaseComponent default slot</p>
      </base-component>
    </Row>

    <div class="margin_v_10">~~~~~~~~~~~分割线~~~~~~~~~~~~~</div>

    <Row class="EnhanceComponent">
      <b>高阶组件</b>
      <enhanced-com @customize-click="handleCustomizeClick" :test="test">
        <h4 slot="slot1">EnhancedComponent Named slot</h4>
        <p>EnhancedComponent default slot</p>
      </enhanced-com>
    </Row>

    <!--reduce-->
    <p class="margin_v_10">数组元素之和 {{sum}}</p>
    <p class="margin_v_10">数组元素之差 {{minus}}</p>
    <p class="margin_v_10">数组元素之积 {{multiply}}</p>
    <p class="margin_v_10">数组元素之商 {{division}}</p>
  </div>
</template>

<script>
  import BaseInput from '../components/baseInput'
  import baseComponent from '../components/baseComponent'
  import hoc from './hoc'
  import { sum, minus, multiply, division } from 'float-calc.js'

  const EnhancedCom = hoc(baseComponent)
  export default {
    name: 'highFunction',
    components: {
      BaseInput,
      baseComponent,
      EnhancedCom
    },
    mounted() {
      this.sum = sum(this.numbers, 2)
      this.minus = minus(this.dataList)
      this.multiply = multiply(this.dataList)
      this.division = division(this.dataList)
    },
    data() {
      return {
        number: 0,
        test: 100,
        value: 'u',
        numbers: [1.55, 2.35, 1.139, 4.7],
        dataList: [0.15, 2],
        sum: 0,
        minus: 0,
        multiply: 0,
        division: 0
      }
    },
    methods: {
      handleInput(e) {
        this.$nextTick(() => {

        }, context)
        console.log('inputing', e)
      },
      handleFocus() {
        console.log('focus')
      },
      handleCustomizeClick() {
        this.test++
      }
    }
  }
</script>
