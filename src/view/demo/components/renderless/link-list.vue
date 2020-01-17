<template>
  <ul>
    <li :key="index" v-for="(link, index) in links">
      <slot name="link"
            :link="link"
            :bookmark="bookmark"
            :bookmarkButtonEvents="{
               click: () => bookmark(link)
            }"
      ></slot>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'link-list',
    data() {
      return {
        links: [
          { href: 'https://www.baidu.com', title: '百度', bookmarked: true },
          { href: 'https://www.iviewui.com', title: 'iview', bookmarked: false },
          { href: 'https://ant.design/index-cn', title: 'Antd', bookmarked: false }
        ]
      }
    },
    methods: {
      bookmark(link) {
        link.bookmarked = !link.bookmarked
      }
    }
  }
</script>

<style lang="less" scoped>
  ul {
    list-style: none;
  }
</style>
