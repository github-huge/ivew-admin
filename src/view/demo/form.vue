<style lang="less" scoped>
  .ivu-input-wrapper {
    width: 140px;
  }
</style>
<template>
  <div>
    <Form :model="form" :rules="rules" ref="FormData">
      <FormItem prop="age">
        <Input v-model="form.age"/>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="form.name"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>

  export default {
    name: 'form',
    data() {
      return {
        age: (rule, value, callback) => {
          console.log(value)
          if (!value) {
            return callback(new Error('请输入age'))
          } else {
            callback()
          }
        },
        form: {
          name: '',
          age: 12
        },
        rules: {
          age: [{ required: true, message: '请输入age', trigger: 'blur' }],
          name: [{ required: true, message: '请输入name', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.addRuleProperty()
    },
    methods: {
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
