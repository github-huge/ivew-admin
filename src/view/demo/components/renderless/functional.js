export default {
  name: 'FuncRender',
  functional: true,
  render(h, ctx) {
    const { props, children } = ctx
    return h('Row', {
      props: { type: 'flex' }
    }, [
      h('Input', {
        props: {
          clearable: true,
          size: 'small',
          value: props.data.value,
          placeholder: props.data.placeholder
        },
        style: {
          width: '200px',
          marginRight: '10px'
        },
        on: {
          input: () => {
            console.log(props.data)
          }
        }
      }),
      children
    ])
  }
}
