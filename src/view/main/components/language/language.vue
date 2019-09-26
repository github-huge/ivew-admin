<template>
  <div>
    <Dropdown @on-click="selectLang" trigger="click">
      <a href="javascript:void(0)">
        {{ title }}
        <Icon :size="18" type="md-arrow-dropdown" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem :key="`lang-${key}`" :name="key" v-for="(value, key) in localList">{{ value }}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'Language',
  props: {
    lang: String
  },
  data() {
    return {
      langList: {
        'zh-CN': '语言',
        'zh-TW': '語言',
        'en-US': 'Lang'
      },
      localList: {
        'zh-CN': '中文简体',
        'zh-TW': '中文繁体',
        'en-US': 'English'
      }
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    title() {
      return this.langList[this.lang]
    }
  },
  methods: {
    selectLang(name) {
      this.$emit('on-lang-change', name)
    }
  }
}
</script>
