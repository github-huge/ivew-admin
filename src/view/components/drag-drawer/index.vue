<template>
  <Card>
    <h3 style="padding: 10px 0;">drag-drawer组件是对iview的drawer组件的封装，在支持drawer所有api的基础上，支持可拖动和footer底部插槽</h3>
    <div style="padding: 10px 0">
      <b>
        方向
        <i-switch v-model="placement">
          <span slot="open">左</span>
          <span slot="close">右</span>
        </i-switch>
      </b>
      <b>
        是否可拖动
        <i-switch v-model="draggable"></i-switch>
      </b>
      <Button @click="showContainerBDrawer = !showContainerBDrawer" style="margin-left: 10px" type="primary">{{
        showContainerBDrawer ? '关闭' : '打开' }}容器内抽屉
      </Button>
      <Button @click="showWindowBDrawer = true" style="margin-left: 10px" type="primary">打开全屏抽屉</Button>
    </div>
    <div class="drag-drawer-inner-box">
      <drag-drawer :draggable="draggable"
                   :inner="true"
                   :placement="placementComputed"
                   :scrollable="true"
                   :transfer="false"
                   :width.sync="width2"
                   @on-resize="handleResize"
                   min-width="30px"
                   v-model="showContainerBDrawer">
        <div slot="header">
          <Icon :size="18" type="md-aperture"></Icon>
          <b>这是标题</b>
        </div>
        <p :key="n" v-for="n in 200">{{ n }}</p>
        <div slot="footer">
          <p>123123</p>
          <p>21312</p>
        </div>
      </drag-drawer>
    </div>
    <drag-drawer :draggable="draggable"
                 :min-width="300"
                 :placement="placementComputed"
                 :scrollable="true"
                 :width.sync="width1"
                 v-model="showWindowBDrawer">
      <div slot="header">
        <Icon :size="18" type="md-aperture"></Icon>
        <b>这是标题</b>
      </div>
      <Button @click="showBDrawer3 = true">显示多层</Button>
      <p :key="n" v-for="n in 200">{{ n }}</p>
    </drag-drawer>
  </Card>
</template>

<script>
  import DragDrawer from '_c/drag-drawer'

  export default {
    name: 'drag_drawer_page',
    components: {
      DragDrawer
    },
    data() {
      return {
        showWindowBDrawer: false,
        showContainerBDrawer: false,
        showBDrawer3: false,
        width1: 300,
        width2: 200,
        placement: false,
        draggable: true
      }
    },
    computed: {
      placementComputed() {
        return this.placement ? 'left' : 'right'
      }
    },
    methods: {
      handleResize(event) {
        const { atMin } = event
        /* eslint-disable */
        console.log(atMin)
      }
    }
  }
</script>

<style lang="less">
  .drag-drawer-inner-box {
    position: relative;
    width: 500px;
    height: 400px;
    background: pink;
    border: 1px solid pink;
  }
</style>
