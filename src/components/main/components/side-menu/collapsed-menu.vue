<template>
  <Dropdown :class="hideTitle ? '' : 'collased-menu-dropdown'" :placement="placement" :transfer="hideTitle"
            @on-click="handleClick" ref="dropdown">
    <a :style="{textAlign: !hideTitle ? 'left' : ''}" @mouseover="handleMousemove($event, children)" class="drop-menu-a"
       type="text">
      <common-icon :color="textColor" :size="rootIconSize" :type="parentItem.icon"/>
      <span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span>
      <Icon :size="16" style="float: right;" type="ios-arrow-forward" v-if="!hideTitle"/>
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu :icon-size="iconSize" :key="`drop-${child.name}`" :parent-item="child"
                        v-if="showChildren(child)"></collapsed-menu>
        <DropdownItem :key="`drop-${child.name}`" :name="child.name" v-else>
          <common-icon :size="iconSize" :type="child.icon"/>
          <span class="menu-title">{{ showTitle(child) }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
  import mixin from './mixin'
  import itemMixin from './item-mixin'
  import { findNodeUpperByClasses } from '@/libs/util'

  export default {
    name: 'CollapsedMenu',
    mixins: [mixin, itemMixin],
    props: {
      hideTitle: {
        type: Boolean,
        default: false
      },
      rootIconSize: {
        type: Number,
        default: 16
      }
    },
    data() {
      return {
        placement: 'right-end'
      }
    },
    methods: {
      handleClick(name) {
        this.$emit('on-click', name)
      },
      handleMousemove(event, children) {
        const { pageY } = event
        const height = children.length * 38
        const isOverflow = pageY + height < window.innerHeight
        this.placement = isOverflow ? 'right-start' : 'right-end'
      }
    },
    mounted() {
      const dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer'])
      if (dropdown) dropdown.style.overflow = 'visible'
    }
  }
</script>
