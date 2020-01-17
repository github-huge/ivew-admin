<style lang="less" scoped>
  .ivu-input, .ivu-input-wrapper {
    width: 120px;
  }

  .ivu-form-item {
    margin-bottom: 0 !important;
  }
</style>
<style lang="less">
  .formData .ivu-form-item {
    margin: 16px 0;
  }

  .formData .ivu-form-item-error-tip {
    padding-top: 2px;
  }

  .formData .ivu-input-number {
    width: 100%;
  }
</style>
<template>
  <div>
    <Form :model="form" class="formData" ref="formData">
      <Table :columns="form.columnsData" :data="form.tableData" @on-selection-change="changeSelect" border></Table>
      <Button @click="submit('formData')" type="primary">submit</Button>
    </Form>
  </div>
</template>
<script>
  export default {
    name: 'formValidate',
    data() {
      const thisApplyAmount = (rule, value, callback) => {
        console.log(value)
        if (Number(value) === 0) {
          return callback(new Error('请输入申请金额'))
        } else {
          callback()
        }
      }
      return {
        form: {
          columnsData: [
            {
              type: 'selection',
              width: 50,
              render: (h, params) => {
                return h('span', {
                  props: {
                    prop: `tableData[${params.index}].resourceType`
                  }
                })
              }
            },
            {
              title: '资源分类',
              key: 'resourceType',
              minWidth: 100,
              render: (h, params) => {
                return h('span', {}, params.row.resourceType)
              }
            },
            {
              title: '资源名称',
              key: 'resourceName',
              minWidth: 100,
              render: (h, params) => {
                return h('span', {}, params.row.resourceName)
              }
            },
            {
              title: '成本小计',
              key: 'costTotal',
              minWidth: 100,
              render: (h, params) => {
                return h('span', {}, params.row.costTotal)
              }
            },
            {
              title: '已申请金额',
              key: 'alreadyApplyMoney',
              minWidth: 100,
              render: (h, params) => {
                return h('span', {}, params.row.alreadyApplyMoney)
              }
            },
            {
              title: '剩余申请金额',
              key: 'remainAvailableMoney',
              minWidth: 100,
              render: (h, params) => {
                return h('span', {}, params.row.remainAvailableMoney)
              }
            },
            {
              title: '本次申请金额',
              key: 'thisApplyAmount',
              minWidth: 100,
              render: (h, params) => {
                return h('FormItem', {
                  props: {
                    prop: `tableData[${params.index}].thisApplyAmount`,
                    rules: [{ required: true, validator: thisApplyAmount, trigger: 'change' }]
                  }
                }, [h('InputNumber', {
                  props: {
                    disabled: params.row.isSelect,
                    min: 1,
                    max: params.row.remainAvailableMoney,
                    value: Number(this.form.tableData[params.index].thisApplyAmount)
                  },
                  attrs: {
                    id: 'InputNumber' + params.index
                  },
                  on: {
                    'on-change': (event) => {
                      if (event === Number(params.row.remainAvailableMoney)) {
                        this.$Message.error('申请金额不能超过剩余可申请金额')
                      } else {
                        this.form.tableData[params.index].thisApplyAmount = event
                      }
                      this.$nextTick(() => {
                        document.getElementById('InputNumber' + params.index)
                          .childNodes
                          .forEach(item => {
                            item.childNodes.forEach(item => {
                              if (item.tagName === 'INPUT') {
                                item.focus()
                              }
                            })
                            // this.$refs.formData.validate()
                          })
                      })
                    }
                  }
                })
                ])
              }
            },
            {
              title: '打款对象',
              key: 'paymentTarget',
              minWidth: 100,
              render: (h, params) => {
                return h('FormItem', {
                  props: {
                    prop: `tableData[${params.index}].paymentTarget`,
                    rules: [{ required: true, message: '请选择打款对象', trigger: 'change' }]
                  }
                }, [h('Select', {
                  props: {
                    'label-in-value': true,
                    transfer: true,
                    type: 'text',
                    placeholder: '请选择打款对象',
                    value: this.form.tableData[params.index].paymentTarget // 此处如何让数据双向绑定
                  },
                  on: {
                    'on-change': (event) => {
                      this.form.tableData[params.index].paymentTarget = event.value
                      if (event.value === '导游') {
                        this.form.tableData[params.index].isSelect = true
                        this.form.tableData[params.index].thisApplyAmount = params.row.remainAvailableMoney
                      } else {
                        this.form.tableData[params.index].isSelect = false
                      }
                      this.$nextTick(() => {
                        this.$refs.formData.validate()
                      })
                    }
                  }
                }, this.paymentTargetList.map((item) => {
                  return h('Option', {
                    props: {
                      value: item,
                      label: item
                    }
                  })
                }))
                ])
              }
            },
            {
              title: '收款人',
              key: 'payeeId',
              minWidth: 100,
              render: (h, params) => {
                return h('FormItem', {
                  props: {
                    prop: `tableData[${params.index}].payeeId`,
                    rules: [{ required: true, message: '请选择收款人', trigger: 'change' }]
                  }
                }, [h('Select', {
                  props: {
                    'label-in-value': true,
                    transfer: true,
                    type: 'text',
                    placeholder: '请选择收款人',
                    value: this.form.tableData[params.index].payeeId // 此处如何让数据双向绑定
                  },
                  on: {
                    'on-change': (event) => {
                      this.form.tableData[params.index].payeeId = event.value
                      this.$nextTick(() => {
                        this.$refs.formData.validate()
                      })
                    }
                  }
                }, this.payeeList.map((item) => {
                  return h('Option', {
                    props: {
                      value: item.id,
                      label: item.name
                    }
                  })
                }))
                ])
              }
            }
          ],
          tableData: [
            {
              alreadyApplyMoney: 0,
              applyId: '',
              applyTime: '',
              budgetOtherId: '1063319101490491393',
              costTotal: 100,
              costType: '团帽',
              id: '',
              orderId: '1063318054017593346',
              payee: '',
              payeeId: '',
              paymentId: '',
              paymentName: '',
              paymentStatus: '',
              paymentTarget: '',
              paymentTime: '',
              remainAvailableMoney: 100,
              thisApplyAmount: '1',
              _checked: true,
              _disabled: true
            },
            {
              alreadyApplyMoney: 0,
              applyId: '',
              applyTime: '',
              budgetOtherId: '1063319101490491393',
              costTotal: 100,
              costType: '团帽',
              id: '',
              orderId: '1063318054017593346',
              payee: '',
              payeeId: '',
              paymentId: '',
              paymentName: '',
              paymentStatus: '',
              paymentTarget: '',
              paymentTime: '',
              remainAvailableMoney: 200,
              thisApplyAmount: '',
              _checked: true,
              _disabled: true
            },
            {
              alreadyApplyMoney: 0,
              applyId: '',
              applyTime: '',
              budgetOtherId: '1063319101490491393',
              costTotal: 50,
              costType: '团帽',
              id: '',
              orderId: '1063318054017593346',
              payee: '',
              payeeId: '',
              paymentId: '',
              paymentName: '',
              paymentStatus: '',
              paymentTarget: '',
              paymentTime: '',
              remainAvailableMoney: 300,
              thisApplyAmount: '',
              thisPaymentAmount: '',
              _checked: true,
              _disabled: false
            }
          ]
        },
        payeeList: [
          {
            id: '001',
            name: 'jake'
          },
          {
            id: '002',
            name: 'rose'
          }
        ],
        paymentTargetList: ['供应商', '导游']
      }
    },
    mounted() {
      // this.getlist()
    },
    methods: {
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      changeSelect(selection) {
        console.log(selection)
      },
      addResource() {

      }
    }
  }
</script>
