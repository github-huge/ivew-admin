<template>
  <div class="scroll" ref="viewBox">
    <Form :model="basicInfo" :rules="rules" class="basicInfo" ref="basicInfo">
      <FormItem label="出团天数" prop="dayNumber">
        <Input clearable
               placeholder="请输入出团天数"
               style="width: 140px"
               v-model="basicInfo.dayNumber"></Input>
      </FormItem>
      <FormItem label="出团人数">
        <Input
          clearable
          placeholder="请输入出团人数"
          style="width: 140px"
          v-model="basicInfo.peopleNumber"></Input>
      </FormItem>
      <Button @click="submit" type="primary">submit</Button>
    </Form>

    <Button id="button" type="primary">点我</Button>
    <Table :columns="columns" :data="tableData"></Table>
    <ul>
      <li :key="index" v-for="(item,index) in arr1">{{ item }}</li>
    </ul>
  </div>

</template>
<script>
  import { on } from '@/libs/tools'
  import dropdown from './dropdown'

  export default {
    name: 'render_map',
    components: {
      dropdown
    },
    data() {
      const dayNumber = (rule, value, callback) => {
        const regExp = /^(-)?[1-9][0-9]*$/
        if (!value) {
          return callback(new Error('请输入出团人数'))
        } else if (!regExp.test(value)) {
          return callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
      return {
        basicInfo: {
          dayNumber: null,
          peopleNumber: null
        },

        rules: {
          dayNumber: [
            { required: true, validator: dayNumber, trigger: 'blur' }
          ]
        },
        placeholder: '请输入keyword',
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: ''
        },
        arr: ['1', '2'],
        arr1: ['0', '90'],
        tableData: [
          {
            name: 'John Brown',
            age: '',
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: '',
            address: 'London No. 1 Lake Park'
          }
        ],
        columns: [
          {
            title: '年龄',
            key: 'age',
            render: (h, params) => {
              return h('Select', {
                props: {
                  value: this.tableData[params.index].age,
                  placeholder: '请输选择年龄'
                },
                on: {
                  'on-change': (event) => {
                    this.tableData[params.index].name = event
                  }
                }
              }, [
                h('Option', {
                  props: {
                    value: '1'
                  }
                }, '12'),
                h('Option', {
                  props: {
                    value: '2'
                  }
                }, '18')
              ])
            }
          },
          {
            title: '姓名',
            key: 'name',
            render: (h, params) => {
              return h('Input', {
                props: {
                  clearable: true,
                  value: this.tableData[params.index].age,
                  placeholder: '请输入姓名'
                }
              })
            }
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              // console.log(params)
              return h(dropdown, {
                props: {
                  content: params
                },
                on: {
                  'on-choosed': (name) => {
                    this.choosedFlag(params, name)
                  }
                }
              }, [
                h('DropdownItem',
                  {
                    slot: 'diy',
                    style: {
                      color: '#2d8cf0'
                    },
                    props: {
                      name: 'add',
                      divided: true
                    }
                  }, '添加并标注'),
                h('DropdownItem',
                  {
                    slot: 'diy',
                    style: {
                      color: '#2d8cf0'
                    },
                    props: {
                      name: 'clear'
                    }
                  }, '清除该标注')
              ])
            }
          }
        ],
        dropColumns: [
          {
            title: '标注',
            key: 'callout',
            align: 'center',
            renderHeader: (h, params) => {
              return h(dropdown, {
                props: {
                  placement: 'bottom-start',
                  showArrow: true,
                  content: '标注',
                  data: this.flags
                },
                on: {
                  'on-choosed': (value) => {
                    this.queryForm.callout = value
                    this.getResumeFromEmailBy()
                  }
                }
              })
            },
            render: (h, params) => {
              console.log()
              return h(dropdown, {
                props: {
                  content: params.row.callout || '',
                  data: this.flags.slice(1)
                },
                on: {
                  'on-choosed': () => {
                    this.choosedFlag(params)
                  }
                }
              }, [
                h('DropdownItem',
                  {
                    slot: 'diy',
                    style: {
                      color: '#2d8cf0'
                    },
                    props: {
                      name: 'add',
                      divided: true
                    }
                  }, '添加并标注'),
                h('DropdownItem',
                  {
                    slot: 'diy',
                    style: {
                      color: '#2d8cf0'
                    },
                    props: {
                      name: 'clear'
                    }
                  }, '清除该标注')
              ])
            }
          }
        ]
      }
    },
    mounted() {
      this.arr1 = this.arr.concat(this.arr1)
      const button = document.getElementById('button')
      on(button, 'click', () => {
        // console.log(this)
      })
    },
    methods: {
      choosedFlag(params, name) {
        console.log(params)
        console.log(name)
      },
      submit() {
        this.$refs.basicInfo.validate((valid) => {

        })
      }
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    width: 400px;
  }

  .top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }

</style>
