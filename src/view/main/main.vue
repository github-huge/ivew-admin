<template>
  <Layout class="main" style="height: 100%">
    <Sider :collapsed-width="64" :style="{overflow: 'hidden'}" :width="256" class="left-sider" collapsible hide-trigger v-model="collapsed">
      <side-menu :active-name="$route.name" :collapsed="collapsed" :menu-list="menuList" @on-select="turnToPage" accordion ref="sideMenu">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img :src="maxLogo" key="max-logo" v-show="!collapsed" />
          <img :src="minLogo" key="min-logo" v-show="collapsed" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avator="userAvator"/>
          <language :lang="local" @on-lang-change="setLocal" style="margin-right: 10px;"/>
          <fullscreen style="margin-right: 10px;" v-model="isFullscreen"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :list="tagNavList" :value="$route" @input="handleClick" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
  import SideMenu from './components/side-menu'
  import HeaderBar from './components/header-bar'
  import TagsNav from './components/tags-nav'
  import User from './components/user'
  import Fullscreen from './components/fullscreen'
  import Language from './components/language'
  import { mapActions, mapMutations } from 'vuex'
  import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
  import minLogo from '@/assets/images/logo-min.jpg'
  import maxLogo from '@/assets/images/logo.jpg'
  import './main.less'

  export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    User
  },
  data() {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    tagRouter() {
      return this.$store.state.app.tagRouter
    },
    userAvator() {
      return this.$store.state.user.avatorImgPath
    },
    cacheList() {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList() {
      return this.$store.getters.menuList
    },
    local() {
      return this.$store.state.app.local
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange(state) {
      this.collapsed = state
    },
    handleCloseTag(res, type, route) {
      let openName = ''
      if (type === 'all') {
        this.turnToPage('home')
        openName = 'home'
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
          openName = route.name
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          openName = nextRoute.name
        }
      }
      this.setTagNavList(res)
      this.$refs.sideMenu.updateOpenName(openName)
    },
    handleClick(item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route'(newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({ route: this.$store.state.app.homeRoute })
    this.setBreadCrumb(this.$route.matched)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 文档提示
    this.$Notice.info({
      title: '想快速上手，去看文档吧',
      duration: 0,
      render: (h) => {
        return h('p', {
          style: {
            fontSize: '13px'
          }
        }, [
          '点击',
          h('a', {
            attrs: {
              href: 'https://lison16.github.io/iview-admin-doc/#/',
              target: '_blank'
            }
          }, 'iview-admin2.0文档'),
          '快速查看'
        ])
      }
    })
  }
}
</script>
