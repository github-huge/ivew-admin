<template>
  <div>
    <Card shadow title="社区">
      <row :gutter="32" class="join-page">
        <i-col span="10">
          <img class="qq-group-img" src="../assets/images/icon-qr-qq-wechat.png">
          <row justify="center" type="flex">
            <i-col span="12">
              <p>QQ 群号：621780943</p>
            </i-col>
            <i-col span="12"></i-col>
          </row>
        </i-col>
        <i-col span="14">
          <div class="join-page-other">
            <Button size="large" target="_blank" to="https://zhuanlan.zhihu.com/feview">
              <img class="join-page-other-icon" src="../assets/images/icon-social-zhihu.svg">
              iView 知乎专栏
            </Button>
            <Button size="large" target="_blank" to="https://juejin.im/user/56fe494539b0570054f2e032">
              <img class="join-page-other-icon" src="../assets/images/icon-social-juejin.svg">
              掘金
            </Button>
            <Button size="large" target="_blank" to="https://live.bilibili.com/1353202">
              <img class="join-page-other-icon" src="../assets/images/icon-social-bilibili.svg">
              活动直播间
            </Button>
            <Button size="large" target="_blank" to="https://twitter.com/iViewUI">
              <img class="join-page-other-icon" src="../assets/images/icon-social-twitter.svg">
              Twitter
            </Button>
          </div>
        </i-col>
      </row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'join_page',
  data() {
    return {
    }
  }
}
</script>
<style>
  .join-page{
    text-align: center;
  }
  .qq-group-img{
    width: 100%;
  }
  .join-page-other-icon{
    width: 20px;
    vertical-align: middle;
    margin-right: 6px;
  }
  .join-page-other{
    text-align: left;
  }
  .join-page-other .ivu-btn{
    margin-right: 6px;
  }
</style>
