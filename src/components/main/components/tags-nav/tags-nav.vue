<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown @on-click="handleTagsOption" style="margin-top:7px;" transfer>
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline"/>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <ul :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu" v-show="visible">
      <li :key="key" @click="handleTagsOption(key)" v-for="(item, key) of menuList">{{item}}</li>
    </ul>
    <div class="btn-con left-btn">
      <Button @click="handleScroll(240)" type="text">
        <Icon :size="18" type="ios-arrow-back"/>
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button @click="handleScroll(-240)" type="text">
        <Icon :size="18" type="ios-arrow-forward"/>
      </Button>
    </div>
    <div @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="scroll-outer" ref="scrollOuter">
      <div :style="{left: tagBodyLeft + 'px'}" class="scroll-body" ref="scrollBody">
        <transition-group name="taglist-moving-animation">
          <Tag
            :closable="item.name !== $config.homeName"
            :color="isCurrentTag(item) ? 'primary' : 'default'"
            :data-route-item="item"
            :key="`tag-nav-${index}`"
            :name="item.name"
            @click.native="handleClick(item)"
            @contextmenu.prevent.native="contextMenu(item, $event)"
            @on-close="handleClose(item)"
            ref="tagsPageOpened"
            type="dot"
            v-for="(item, index) in list"
          >{{ showTitleInside(item) }}
          </Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
  import { routeEqual, showTitle } from '@/libs/util'
  import beforeClose from '@/router/before-close'

  export default {
    name: 'TagsNav',
    props: {
      value: Object,
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        tagBodyLeft: 0,
        rightOffset: 40,
        outerPadding: 4,
        contextMenuLeft: 0,
        contextMenuTop: 0,
        visible: false,
        menuList: {
          others: '关闭其他',
          all: '关闭所有'
        }
      }
    },
    computed: {
      currentRouteObj() {
        const { name, params, query } = this.value
        return { name, params, query }
      }
    },
    methods: {
      handlescroll(e) {
        var type = e.type
        let delta = 0
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
        }
        this.handleScroll(delta)
      },
      handleScroll(offset) {
        const outerWidth = this.$refs.scrollOuter.offsetWidth
        const bodyWidth = this.$refs.scrollBody.offsetWidth
        if (offset > 0) {
          this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
        } else {
          if (outerWidth < bodyWidth) {
            if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
              this.tagBodyLeft = this.tagBodyLeft
            } else {
              this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
            }
          } else {
            this.tagBodyLeft = 0
          }
        }
      },
      handleTagsOption(type) {
        if (type.includes('all')) {
          // 关闭所有，除了home
          const res = this.list.filter(item => item.name === this.$config.homeName)
          this.$emit('on-close', res, 'all')
        } else if (type.includes('others')) {
          // 关闭除当前页和home页的其他页
          const res = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === this.$config.homeName)
          this.$emit('on-close', res, 'others', this.currentRouteObj)
          setTimeout(() => {
            this.getTagElementByRoute(this.currentRouteObj)
          }, 100)
        }
      },
      handleClose(current) {
        if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
          new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
            if (close) {
              this.close(current)
            }
          })
        } else {
          this.close(current)
        }
      },
      close(route) {
        const res = this.list.filter(item => !routeEqual(route, item))
        this.$emit('on-close', res, undefined, route)
      },
      handleClick(item) {
        this.$emit('input', item)
      },
      showTitleInside(item) {
        return showTitle(item, this)
      },
      isCurrentTag(item) {
        return routeEqual(this.currentRouteObj, item)
      },
      moveToView(tag) {
        const outerWidth = this.$refs.scrollOuter.offsetWidth
        const bodyWidth = this.$refs.scrollBody.offsetWidth
        if (bodyWidth < outerWidth) {
          this.tagBodyLeft = 0
        } else if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
        } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
          // 标签在可视区域
          this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
        }
      },
      getTagElementByRoute(route) {
        this.$nextTick(() => {
          this.refsTag = this.$refs.tagsPageOpened
          this.refsTag.forEach((item, index) => {
            if (routeEqual(route, item.$attrs['data-route-item'])) {
              const tag = this.refsTag[index].$el
              this.moveToView(tag)
            }
          })
        })
      },
      contextMenu(item, e) {
        if (item.name === this.$config.homeName) {
          return
        }
        this.visible = true
        const offsetLeft = this.$el.getBoundingClientRect().left
        this.contextMenuLeft = e.clientX - offsetLeft + 10
        this.contextMenuTop = e.clientY - 64
      },
      closeMenu() {
        this.visible = false
      }
    },
    watch: {
      '$route'(to) {
        this.getTagElementByRoute(to)
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.getTagElementByRoute(this.$route)
      }, 200)
    }
  }
</script>

<style lang="less">
  @import './tags-nav.less';
</style>
