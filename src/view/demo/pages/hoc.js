export default function WithConsole(WrappedComponent) {
  return {
    props: WrappedComponent.props,
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => {
          return arr.concat(this.$slots[key])
        }, [])
        // 手动更正从父组件透传过来的 slots 的上下文content 为高阶组件的上下文
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      // console.log(Object.keys(this.$slots).reduce((arr, key) => {
      //   return arr.concat(this.$slots[key])
      // }, []))

      // 将this.$slots 格式化为数组，因为h函数第三个参数是子节点，是一个数组
      return h(WrappedComponent, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: this.$props,
        scopedSlots: this.$scopedSlots // 作用域插槽没有上下文概念，可以像props一样透传
      }, slots) // 将slots 作为 h 函数的第三个参数
    },

    mounted() {
      console.log('hoc.js: I have already mounted')
    }
  }
}
