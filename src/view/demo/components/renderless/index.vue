<template>
  <div>
    <!--函数式template -->
    <FuncTemplate :data="data" @input="handleInput">
      <Button size="small" type="primary">children Button</Button>
    </FuncTemplate>

    <!--函数式render -->
    <FuncRender :data="data">
      <Button size="small" type="primary">child 组件</Button>
    </FuncRender>

    <Link-list>
      <div slot="link" slot-scope="{ link, bookmark, bookmarkButtonAttrs, bookmarkButtonEvents }">
        <Icon type="ios-star" v-show="link.bookmarked" />
        <a :href="link.href">{{ link.title }}</a>
        <button class="tag" color="success" v-on="bookmarkButtonEvents"> mark </button>
      </div>
    </Link-list>

<!--    <RecycleScroller-->
<!--      class="scroller"-->
<!--      :items="list"-->
<!--      :item-size="32"-->
<!--      key-field="id"-->
<!--      v-slot="{ item }"-->
<!--    >-->
<!--      <div class="user">-->
<!--        {{ item.name }}-->
<!--      </div>-->
<!--    </RecycleScroller>-->
  </div>
</template>
<script>
  import FuncTemplate from './function.vue'
  import LinkList from './link-list.vue'
  import FuncRender from './functional'
  import { RecycleScroller } from 'vue-virtual-scroller'
  export default {
    name: 'render_map',
    components: {
      FuncTemplate,
      FuncRender,
      LinkList,
      RecycleScroller
    },
    data() {
      return {
        data: {
          placeholder: 'keyword',
          value: ''
        }
      }
    },
    methods: {
      handleInput(e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tag {
    margin: 0 10px;
  }

</style>
