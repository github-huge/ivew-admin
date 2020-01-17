<template>
  <div>
    <div id="divselect">
      <input
        @blur="listSHow = false"
        @click="inputValue($event)"
        @input="inputKeyWord"
        id="cite" placeholder="请选择分类" v-model.trim="value">
      <ul v-show="listSHow">
        <li :class="{ activeBg: index == num ? true : false }"
            :key="index"
            @mouseover="num = index" ref="li" v-for="(item, index) in List">
          <a>{{item.value}}</a>
        </li>
      </ul>
    </div>
    <Dropdown>
      <a @on-change="changeVlue" href="javascript:void(0)">
        下拉菜单
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem :key="index" @click.native='doMore(item)' v-for="(item, index) in List">{{ item.value }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  export default {
    name: 'dropdownForEnterKey',
    data() {
      return {
        num: 0,
        value: '',
        index: -1,
        listSHow: false,
        List: [
          { id: 'aa', value: 'ASP开发' },
          { id: 'bb', value: '.net开发' },
          { id: 'cc', value: 'php开发' },
          { id: 'dd', value: 'java开发' },
          { id: 'ee', value: 'vue开发' },
          { id: 'ff', value: 'react开发' }
        ]
      }
    },
    methods: {
      doMore(index, val) {
        console.log(index)
        console.log(val)
      },
      changeVlue(params) {
        console.log(params)
      },
      inputKeyWord() {
        // 异步请求
      },
      inputValue(event) {
        this.listSHow = !this.listSHow
        event = event || window.event
        // 阻止冒泡的判断
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
        const that = this
        // 添加键盘事件
        // 问题出在按了回车之后，怎么把对应的分类内容填进去。
        document.onkeydown = function(event) {
          const box = this.getElementById('divselect')
          const as = box.getElementsByTagName('a') // as是一个集合
          // console.log(event)
          event = event || window.event
          // console.log(event.keyCode)
          // 用这个方法获取到：回车是13，空格是32，上键是38，下键是40；
          // console.log(this)
          if (event.keyCode === 40) {
            that.index++
            if (that.index > that.List.length - 1) {
              that.index = 0
            }
            that.num = that.index
            that.value = as[that.index].innerHTML
            // console.log(as)
          }
          if (event.keyCode === 38) {
            that.index--
            if (that.index < 0) {
              that.index = that.List.length - 1
            }
            that.num = that.index
            that.value = as[that.index].innerHTML
          }
          if (event.keyCode === 13) {
            that.value = as[that.index].innerHTML
            that.listSHow = !that.listSHow
          }
        }
      }
    }
  }
</script>

<style scoped>
  .activeBg {
    background: #ccc;
  }

  body, ul, li {
    margin: 0;
    padding: 0;
    font-size: 13px;
  }

  ul, li {
    list-style: none;
  }

  #divselect {
    width: 186px;
    margin: 40px 80px;
    position: relative;
    z-index: 10000;
  }

  #cite {
    width: 184px;
    height: 24px;
    line-height: 24px;
    display: block;
    color: #807a62;
    cursor: pointer;
    font-style: normal;
    padding-left: 4px;
    padding-right: 30px;
    border: 1px solid #333333;
    /*background: url('xjt.png') no-repeat right center;*/
  }

  #divselect ul {
    width: 184px;
    border: 1px solid #333333;
    background-color: #ffffff;
    position: absolute;
    z-index: 20000;
    margin-top: -1px;
  }

  #divselect ul li {
    height: 24px;
    line-height: 24px;
  }

  #divselect ul li a {
    display: block;
    height: 24px;
    color: #333333;
    text-decoration: none;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>

