export default function WithConsole(WrappedComponent) {
  return {
    props: WrappedComponent.props,
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => {
          // console.log(arr)
          // console.log(key)
          return arr.concat(this.$slots[key])
        }, [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      // console.log(Object.keys(this.$slots).reduce((arr, key) => {
      //   return arr.concat(this.$slots[key])
      // }, []))
      return h(WrappedComponent, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: this.$props,
        scopedSlots: this.$scopedSlots
      }, slots)
    },
    mounted() {
      console.log('I have already mounted')
    }
  }
}
