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
    <Calendar
      :clear-button="clear"
      :format="format"
      :pane="1"
      :placeholder="placeholder"
      :value="value"
    ></Calendar>

    <main class="price_calendar">
      <ul class="nav clear_fix">
        <li>
          <span>{{dateObj.thisYear + '年' + dateObj.thisMonth + '月'}}</span>
        </li>
        <li @click.native="returnToday" class="returnToday">回到今天</li>
        <li>
          <Button @click="getLastMonth" size="small">退</Button>
        </li>
        <li>
          <Button @click="getNextMonth" size="small">进</Button>
        </li>
      </ul>

      <ul class="week clear_fix">
        <li class="weekDay">日</li>
        <li class="weekDay">一</li>
        <li class="weekDay">二</li>
        <li class="weekDay">三</li>
        <li class="weekDay">四</li>
        <li class="weekDay">五</li>
        <li class="weekDay">六</li>
      </ul>

      <ul class="date clear_fix">

        <li v-if="pioneerDateSequenceInWeek > 0"></li>
        <li v-if="pioneerDateSequenceInWeek > 1"></li>
        <li v-if="pioneerDateSequenceInWeek > 2"></li>
        <li v-if="pioneerDateSequenceInWeek > 3"></li>
        <li v-if="pioneerDateSequenceInWeek > 4"></li>
        <li v-if="pioneerDateSequenceInWeek > 5"></li>

        <li :class="{ activeColor: day.day == dateObj.thisDate ? true :false }"
            :key="index"
            @click.native="pickThisDay(day, index)" v-for="(day, index) in data">
          <span>{{day.day}}</span>
          <span>￥{{day.price}}</span>
        </li>
      </ul>
    </main>
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
        value: null,
        disabled: false,
        format: 'yyyy/MM/dd',
        placeholder: '请选择',
        getBus: '',
        clear: false,
        // 自定义calendar
        remainder: '', // 尾部空格数
        dateCountsInMonth: '',
        pioneerDateSequenceInWeek: '', // 头部空格数
        chosenDay: '',
        loadingPopDataList: false,
        showToolTip: false,
        showPop: false,
        loadingPopData: false,
        hotelId: null, // 酒店ID
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
        ],
        emptyData: [
          { id: 'mon' }, { id: 'tue' }, { id: 'wed' },
          { id: 'thi' }, { id: 'fri' }, { id: 'sta' }
        ],
        dateObj: { date: new Date(), thisYear: -1, thisMonth: -1, thisWeek: -1, thisDate: '', priceArr: [] }
      }
    },
    methods: {
      pickThisDay(date, index) {
        this.choosedDay = date.day
      },
      returnToday() {
        this.dateObj.thisYear = this.dateObj.date.getFullYear()
        this.dateObj.thisMonth = this.dateObj.date.getMonth() + 1
        this.dateObj.thisWeek = this.dateObj.date.getDay()
        this.dateObj.thisDate = this.dateObj.date.getDate()
        this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
        this.getSequenceInWeek(this.dateObj.thisYear, this.dateObj.thisMonth)
        // console.log(this.dateObj.thisDate)
      },
      whenPopoverShow() {
        this.returnToday()
        this.showToolTip = false
      },
      getLastMonth() {
        let newMonth = this.dateObj.thisMonth
        let newYear = this.dateObj.thisYear
        if (newMonth <= 1) {
          newYear -= 1
          newMonth = 12
          this.dateObj.thisYear = newYear
          this.dateObj.thisMonth = newMonth
          this.getSequenceInWeek(newYear, newMonth)
          this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
          this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
        } else {
          newMonth -= 1
          this.dateObj.thisMonth = newMonth
          this.getSequenceInWeek(newYear, newMonth)
          this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
          this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
        }
      },
      getNextMonth() {
        let newMonth = this.dateObj.thisMonth
        let newYear = this.dateObj.thisYear
        if (newMonth >= 12) {
          newYear += 1
          newMonth = 1
          this.dateObj.thisYear = newYear
          this.dateObj.thisMonth = newMonth
          this.getSequenceInWeek(newYear, newMonth)
          this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
          this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
        } else {
          newMonth += 1
          this.dateObj.thisMonth = newMonth
          this.getSequenceInWeek(newYear, newMonth)
          this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
          this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
        }
      },
      // 得到一个月的天数
      getMonthDayCounts(year, month) {
        const dateCounts = new Date(year, month, 0).getDate()
        this.dateCountsInMonth = dateCounts
        return dateCounts // 获取当月最后一天日期
      },
      // 得到每月的一号是周几
      getSequenceInWeek(year, month) {
        const date = new Date(year, month - 1, 1)
        const weekday = date.getDay()
        this.pioneerDateSequenceInWeek = weekday
        // console.log(weekday)
        return weekday
      },
      restEmpty(conts, weekyNum) {
        const totalCell = conts + weekyNum
        this.remainder = totalCell % 7
        // console.log(conts)
        // console.log(weekyNum)
        console.log(this.remainder)
      },
      setEmptyDataLen(index) {
        switch (index) {
          case 0:
            console.log(index)
            this.emptyData = []
            break
          case 1:
            this.emptyData = this.emptyData.slice(0, 1)
            break
          case 2:
            this.emptyData = this.emptyData.slice(0, 2)
            break
          case 3:
            this.emptyData = this.emptyData.slice(0, 3)
            break
          case 4:
            this.emptyData = this.emptyData.slice(0, 4)
            break
          case 5:
            this.emptyData = this.emptyData.slice(0, 5)
            break
          case 6:
            this.emptyData = this.emptyData.slice(0, 6)
            break
        }
      }
    }
  }
</script>
