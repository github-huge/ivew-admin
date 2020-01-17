<style lang="less" scoped>
  .clear_fix {
    zoom: 1;
  }
  .clear_fix:after {
    content: ".";
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    display: block;
  }
  ul li {
    list-style: none;
    float: left;
  }
  .price_calendar {
    width: 420px;
    .nav {
      height: auto;
      margin: 10px 0;
    }
    .week {
      border: 1px solid #e8e8e8;
      .weekDay {
        &:hover {
          color: #333;
          background: none;
        }
        &:nth-child(1) {
          border-left: 0;
        }
        &:nth-child(7) {
          border-right: 0;
        }
        width: 60px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-weight: bolder;
        border-right: 0;
        border-left: 1px solid #e8e8e8;
      }
    }
    .date {
      border-left: 1px solid #e8e8e8;
      li {
        &:hover {
          background: #3296fa;
          color: #fff;
        }
        text-align: center;
        width: 60px;
        border-right: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        cursor: pointer;
        span {
          display: block;
          line-height: 20px;
          text-align: center;
        }
      }

      .activeColor {
        background: #3296fa;
        color: #ffffff;
      }
    }
  }
  .returnToday {
    &:hover {
      color: #333;
    }
  }
</style>
<template>
  <div>
    <calendar
      class="event-calendar"
      :value="value"
      :format="format"
      :clear-button="clear"
      :placeholder="placeholder"
      :pane="1"
      :has-input="false"
      :on-day-click="onDayClick3"
      :change-pane="changePane"
    >
<!--      <div v-for="(evt, index) in data" :key="index" :slot="evt.day">-->
<!--        ${{evt.price}}-->
<!--      </div>-->
    </calendar>
  </div>
</template>

<script>
  import Calendar from 'vue2-slot-calendar'

  export default {
    name: 'price-calendar',
    components: {
      Calendar
    },
    data() {
      return {
        value: '',
        format: 'yyyy-MM-dd',
        placeholder: '请选择',
        clear: false,
        data: [
          {
            'day': '1',
            'price': '158'
          },
          {
            'day': '2',
            'price': '158'
          },
          {
            'day': '3',
            'price': '159'
          },

          {
            'day': '4',
            'price': '158'
          },
          {
            'day': '5',
            'price': '158'
          },
          {
            'day': '6',
            'price': '158'
          },
          {
            'day': '7',
            'price': '158'
          },
          {
            'day': '8',
            'price': '158'
          },
          {
            'day': '9',
            'price': '158'
          },
          {
            'day': '10',
            'price': '158'
          },
          {
            'day': '11',
            'price': '59'
          },
          {
            'day': '12',
            'price': '59'
          },
          {
            'day': '13',
            'price': '59'
          },
          {
            'day': '14',
            'price': '59'
          },
          {
            'day': '15',
            'price': '59'
          },
          {
            'day': '16',
            'price': '59'
          },
          {
            'day': '17',
            'price': '59'
          },
          {
            'day': '18',
            'price': '59'
          },
          {
            'day': '19',
            'price': '59'
          }, {
            'day': '20',
            'price': '59'
          },
          {
            'day': '21',
            'price': '59'
          }, {
            'day': '22',
            'price': '59'
          }, {
            'day': '23',
            'price': '59'
          }, {
            'day': '24',
            'price': '59'
          },
          {
            'day': '25',
            'price': '59'
          },
          {
            'day': '26',
            'price': '59'
          },
          {
            'day': '27',
            'price': '59'
          },
          {
            'day': '28',
            'price': '59'
          },
          {
            'day': '29',
            'price': '59'
          }, {
            'day': '30',
            'price': '59'
          }, {
            'day': '31',
            'price': '59'
          }
        ]
      }
    },
    methods: {
      onDayClick3(date, evt) {
        console.log(date, evt)
        this.value = date
      },
      changePane(value) {
        console.log(value)
      }
    }
  }
</script>
