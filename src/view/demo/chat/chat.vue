<template>
  <div class="chat">
    <div class="content">
      <div class="msglist">
        <search></search>
        <chatlist></chatlist>
      </div>
      <div class="chatbox">
        <message></message>
        <v-text></v-text>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '../components/chat/search/search'
  import chatlist from '../components/chat/chatlist/chatlist'
  import message from '../components/chat/message/message'
  import vText from '../components/chat/text/text'

  export default {
    components: {
      search,
      chatlist,
      message,
      vText
    }
  }
</script>

<style lang="less" scoped>
  .chat {
    .content {
      margin: 20px;
      display: flex;
      width: 800px;
      background: #f2f2f2;
      .msglist {
        width: 250px;
        background: rgb(230, 230, 230)
      }
      .chatbox {
        flex: 1
      }
    }
  }
</style>
