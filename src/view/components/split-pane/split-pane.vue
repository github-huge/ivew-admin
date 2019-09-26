<template>
  <div class="split-pane-page-wrapper">
    <split-pane @on-moving="handleMoving" v-model="offset">
      <div class="pane left-pane" slot="left">
        <split-pane @on-moving="handleMoving" mode="vertical" v-model="offsetVertical">
          <div class="pane top-pane" slot="top"></div>
          <div class="pane bottom-pane" slot="bottom"></div>
          <div class="custom-trigger" slot="trigger">
            <icons :size="22" class="trigger-icon" color="#fff" type="resize-vertical"/>
          </div>
        </split-pane>
      </div>
      <div class="pane right-pane" slot="right"></div>
    </split-pane>
  </div>
</template>

<script>
  import SplitPane from '_c/split-pane'
  import Icons from '_c/icons'

  export default {
    name: 'split_pane_page',
    components: {
      SplitPane,
      Icons
    },
    data() {
      return {
        offset: 0.6,
        offsetVertical: '250px'
      }
    },
    methods: {
      handleMoving(e) {
        console.log(e.atMin, e.atMax)
      }
    }
  }
</script>

<style lang="less">
  .center-middle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .split-pane-page-wrapper {
    height: 600px;
    .pane {
      width: 100%;
      height: 100%;
      &.left-pane {
        background: sandybrown;
      }
      &.right-pane {
        background: palevioletred;
      }
      &.top-pane {
        background: sandybrown;
      }
      &.bottom-pane {
        background: palevioletred;
      }
    }
    .custom-trigger {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #000000;
      position: absolute;
      .center-middle;
      box-shadow: 0 0 6px 0 rgba(28, 36, 56, 0.4);
      i.trigger-icon {
        .center-middle;
      }
    }
  }
</style>
