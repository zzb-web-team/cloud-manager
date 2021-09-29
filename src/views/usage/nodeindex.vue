<template>
  <section class="myself-container content"
           @click="closeSel">
    <div class="user-title"
         style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <div style="background:rgba(255,255,255,1);box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);border-radius:2px;padding:30px 25px;">
          <div class="top_title">节点用量</div>
          <div style="display: flex;justify-content: space-between;align-items: center;flex-flow: row;">
            <div>
              <el-input v-model="value1Activechanid"
                        placeholder="请输入节点ID"
                        style="width:160px;margin-right: 10px;margin-top: 20px;"
                        @keyup.enter.native="onChanges">
                <i slot="prefix"
                   class="el-input__icon el-icon-search"
                   @click="onChanges()"></i>
              </el-input>
              <el-select v-model="valuedomian"
                         style="width:160px;margin-right: 10px;margin-top: 20px;"
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-input v-model="value1"
                        placeholder="请输入加速内容名称"
                        style="width:160px;margin-right: 10px;margin-top: 20px;"
                        @keyup.enter.native="onChanges">
                <i slot="prefix"
                   class="el-input__icon el-icon-search"
                   @click="onChanges()"></i>
              </el-input> -->
              <el-radio-group v-model="radio"
                              @change="select_time()"
                              v-show="!showzdy">
                <el-radio-button label="1">今天</el-radio-button>
                <el-radio-button label="2">昨天</el-radio-button>
                <!-- <el-radio-button label="3"
									>近7天</el-radio-button
								>
								<el-radio-button label="4"
									>近30天</el-radio-button
								> -->
                <el-radio-button label="5">自定义</el-radio-button>
              </el-radio-group>
              <el-button type="primary"
                         v-show="showzdy"
                         @click="setZdy"
                         tyle="margin-top: 20px;">自定义</el-button>
              <el-date-picker v-show="showzdy"
                              style="margin-left:10px;margin-top: 20px;"
                              v-model="val2"
                              type="date"
                              placeholder="选择日期"
                              align="left"
                              :picker-options="pickerOptions"
                              @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;margin-top: 20px;"
                         type="primary"
                         @click="seachtu(1)">确定</el-button>
              <el-button style="margin-left:10px;margin-top: 20px;"
                         type="primary"
                         @click="reset()">重置</el-button>
            </div>
            <div style="display:flex;white-space:nowrap;margin-top: 20px;">
              <span style="margin-right:5px;">使用缓存</span>
              <el-switch v-model="useCache"
                         active-color="#297AFF"></el-switch>
            </div>
          </div>
        </div>
        <div class="user_item">
          <div class="item_left"
               style="width:100%;border:none;">
            <div class="item_text"
                 style="text-align:center;">
              总流量
            </div>
            <div class="item_count"
                 style="text-align:center;">
              <span>{{ totalYl | setbytes }}</span>
            </div>
          </div>
        </div>
        <div class="device_form">
          <div id="myChartMap"
               :style="{ height: clientHeight-462+'px' }"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import {
  dateToMs,
  getymdtime,
  getymdtime1,
  splitTimes,
} from '../../servers/sevdate'
import { node_manage_dataflow_curve } from '../../servers/api'
import echarts from 'echarts'
import common from '../../comm/js/util'
import _ from 'lodash'

import base from '../../components/base'
export default {
  mixins: [base],
  data() {
    return {
      plain: '',
      valuedomian: 2,
      value1acce1: '',
      chanIds: [],
      value1Activechanid: '',
      showzdy: false,
      value1: '',
      useCache: true,
      val2: '',
      timeUnit: 5,
      starttime: '',
      endtime: '',
      dataFlowArray: [], //图1
      timeArray: [], //图1
      pageNo: 1, //当前页码
      total_cnt: 1, //数据总量
      flowunit: '',
      totalYl: 0,
      radio: 1,
      options: [
        // { value: 0, label: '全部' },
        { value: 1, label: '内部节点' },
        { value: 2, label: '外部节点' },
      ],
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime()
          if (maxDate) {
            this.selectDate = ''
          }
        },
        disabledDate: (time) => {
          //time.getTime()获取的是时间戳
          // 当前时间往前30天可选
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000
          )
        },
      },
    }
  },
  filters: {
    settimes(data) {
      var stat = getymdtime(data)
      return stat
    },
    setbytes(data) {
      return common.formatByteActive(data)
    },
  },
  mounted() {
    let monitorUrlname = this.$route.query.monitorUrlname
    if (monitorUrlname) {
      this.value1 = monitorUrlname
    } else {
      this.value1 = ''
    }
    let monitorChanId = this.$route.query.monitorChanId
    if (monitorChanId) {
      this.value1Activechanid = monitorChanId
    } else {
      this.value1Activechanid = ''
    }
    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000
    this.endtime = Date.parse(new Date()) / 1000
    this.gettable1()
    // this.drawLine()
  },
  filters: {
    settimes(data) {
      var stat = getymdtime(data)
      return stat
    },
    setbytes(data) {
      return common.formatByteActive(data)
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    this.drawLine()
    this.drawLine1()
  },
  methods: {
    closeSel(event) {
      var currentCli = document.getElementById('sellineName')
      var shopw = document.getElementById('shopw')
      if (currentCli || shopw) {
        if (
          !currentCli.contains(event.target) &&
          !shopw.contains(event.target)
        ) {
        }
      }
    },
    //图表导出
    exoprtant_Yl() {
      this.dataFlowArray = []
      this.timeArray = []
      let params = new Object()
      params.startTs = this.starttime
      params.endTs = this.endtime
      params.useCache = this.useCache == true ? 1 : 0
      if (this.value1) {
        params.urlName = this.value1
      } else {
        params.urlName = '*'
      }
      if (this.chanIds.length == 0) {
        if (this.value1Activechanid == '') {
          params.channelId = '*'
        } else {
          params.channelId = this.value1Activechanid
        }
      } else {
        let nowstr = this.chanIds.join(',')
        params.channelId = nowstr
      }
      if (this.valuedomian !== '') {
        params.domain = this.valuedomian
      } else {
        params.domain = '*'
      }
      if (this.value1acce1 != '') {
        params.ipfsChannel = this.value1acce1
      } else {
        params.ipfsChannel = '*'
      }
      params.timeUnit = 5
      ;(params.pageNo = 0),
        (params.pageSize = 10),
        export_manage_dataflow_table_file(params)
          .then((res) => {
            if (res.status == 0) {
              window.open(res.msg, '_blank')
            }
          })
          .catch((err) => {})
    },

    //输入渠道ID查询
    onChanges() {
      this.pageNo = 1
      this.gettable1()
    },
    setZdy() {
      this.showzdy = !this.showzdy
      this.radio = 1
      this.today()
    },
    select_time() {
      if (this.radio == 1) {
        this.showzdy = false
        this.today()
      } else if (this.radio == 2) {
        this.showzdy = false
        this.yesterday()
      } else if (this.radio == 3) {
        this.showzdy = false
        this.sevendat()
      } else if (this.radio == 4) {
        this.showzdy = false
        this.thirtyday()
      } else if (this.radio == 5) {
        this.showzdy = true
      }
    },
    /** 请求数据 */

    //用量查询图表
    gettable1(data) {
      this.dataFlowArray = []
      this.timeArray = []
      let params = new Object()
      params.startTs = this.starttime
      params.endTs = this.endtime
      if (this.chanIds.length > 0) {
        params.nodeId = this.chanIds
      } else {
        if (this.value1Activechanid !== '') {
          params.nodeId = []
          params.nodeId.push(this.value1Activechanid)
        } else {
          params.nodeId = []
        }
      }
      params.urlName = '*'
      params.nodeId = '*'
      params.channelId = []
      params.domain = '*'
      params.ipfsChannel = '*'
      params.useCache = '1'
      params.timeUnit = 5
      params.pageNo = 0
      params.pageSize = 10
      params.nodeType = this.valuedomian
      node_manage_dataflow_curve(params)
        .then((res) => {
          console.log(res)
          this.drawLine(res.data.data)
          this.totalYl = res.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    seachtu(data) {
      if (this.endtime - this.starttime > 7776000) {
        this.$message({
          message: '起始时间和结束时间最大跨度不能超过三个月',
          type: 'error',
        })
        return false
      }
      this.pageNo = 1
      this.gettable1()
    },
    reset() {
      this.value1Activechanid = ''
      this.valuedomian = ''
      this.value1 = ''
      this.value1acce1 = ''
      this.radio = 1
      this.pageNo = 1
      this.select_time()
    },
    //今天
    today(data) {
      this.plain = 'plain'
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000
      this.starttime = times
      this.endtime = Date.parse(new Date()) / 1000
      this.timeUnit = 5
      this.pageNo = 1
      this.gettable1()
    },
    //昨天
    yesterday(data) {
      this.plain = 'plain'
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000
      this.starttime = times - 24 * 60 * 60 * 1
      this.endtime = times - 1
      this.timeUnit = 5
      this.pageNo = 1
      this.gettable1()
    },
    //七天
    sevendat(data) {
      this.plain = 'plain'
      let times = parseInt(
        new Date(new Date().toLocaleDateString()).getTime() / 1000
      )
      this.starttime = times - 24 * 60 * 60 * 6
      this.endtime = parseInt(new Date(new Date()).getTime() / 1000)
      this.timeUnit = 60 * 24
      this.pageNo = 1
      this.gettable1()
    },
    //三十天
    thirtyday(data) {
      this.plain = 'plain'
      let times = parseInt(
        new Date(new Date().toLocaleDateString()).getTime() / 1000
      )
      this.endtime = parseInt(new Date(new Date()).getTime() / 1000)
      this.starttime = times - 24 * 60 * 60 * 29
      this.timeUnit = 60 * 24
      this.pageNo = 1
      this.gettable1()
    },
    //自定义时间
    gettimes(cal) {
      console.log(cal)
      console.log(this.val2)
      this.starttime = this.val2
        ? dateToMs(this.val2)
        : new Date(new Date().toLocaleDateString()).getTime() / 1000
      this.endtime = this.starttime + 86399
      this.timeUnit = 5
      this.pageNo = 1
      this.gettable1()
    },
    //统一单位数据
    formatByteNum: function (num, unit) {
      if (unit == 'B') {
        return num
      } else if (unit == 'KB') {
        return (num / 1024).toFixed(2)
      } else if (unit == 'MB') {
        return (num / 1024 / 1024).toFixed(2)
      } else if (unit == 'GB') {
        return (num / 1024 / 1024 / 1024).toFixed(2)
      } else if (unit == 'TB') {
        return (num / 1024 / 1024 / 1024 / 1024).toFixed(4)
      } else if (unit == 'PB') {
        return (num / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(4)
      }
    },
    drawLine(list) {
      console.log(list)
      let y_list = []
      if (this.valuedomian == 1) {
        y_list = list[0].dataflowArray
      } else {
        y_list = list[0].outdataflowArray
      }
      let x_list = list[0].timeArray
      let _this = this
      var max = _.max([...y_list])
      let flowunit = this.common.formatByteActiveunit(max)
      console.log(max, flowunit)
      let myChart = echarts.init(document.getElementById('myChartMap')) //这里是为了获得容器所在位置
      myChart.off('click')
      window.onresize = myChart.resize
      //   let list = idlist.map((v) => {
      //     return v + ''
      //   })
      var posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight',
      ]

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right',
          },
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom',
          },
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function (map, pos) {
              map[pos] = pos
              return map
            },
            {}
          ),
        },
        distance: {
          min: 0,
          max: 100,
        },
      }

      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance,
            },
          }
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          })
        },
      }

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff',
          },
        },
      }
      let options = {
          title: {
					text: _this.valuedomian==1?"内部节点":"外部节点",
					left: '12px',
					textStyle: {
						color: '#333333',
						fontSize: 16,
					},
				},
        color: [
          '#42a6f5',
          '#ffa726',
          '#f65f54',
          '#67bb6a',
          '#42a6f5',
          '#5eb2f6',
        ],
        toolbox: {
          show: false,

          feature: {
            mydow: {
              show: true,
              title: '导出',
              icon:
                'path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z',
              onclick: function () {
                _this.exoprtant_Yl()
              },
            },
          },
        },
        // legend: {
        //   data: ['内部节点', '外部节点'],
        //   left: 50,
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            let str =
              params[0].axisValue +
              '<br>' +
              params[0].seriesName +
              '  ' +
              params[0].data +
              flowunit
            return str
          },
        },
        grid: {
          left: '3%', // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 35, // 默认60
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: x_list.map((item) => {
              return getymdtime1(item)
            }),
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: _this.valuedomian == 1 ? '内部节点' : '外部节点',
            type: 'bar',
            barMaxWidth: '20',
            // label: labelOption,
            itemStyle: {
              normal: {
                color: _this.valuedomian == 1 ? '#25ba9c' : '#498eff',
              },
            },
            data: y_list.map((item) => {
              return _this.formatByteNum(item, flowunit)
            }),
          },
        ],
      }
      myChart.clear()
      myChart.setOption(options)
    },
  },
}
</script>

<style lang="scss">
.el-table /deep/.disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}
.el-table /deep/.disabledCheck .cell:before {
  content: '';
  position: absolute;
  right: 11px;
}

.myself-container {
  // width: 100%;
  min-width: 1250px;

  .device_form {
    width: auto;
    height: auto;
    margin-top: 15px;
    background: #ffffff;
    padding: 15px 30px;
    box-sizing: border-box;
    box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
    border-radius: 2px;

    .bottom {
      margin-top: 20px;
    }

    .el-form-item__label {
      white-space: nowrap;
    }

    .el-form-item {
      margin-bottom: 0px;
      margin-left: 10px;
    }

    .row_activess {
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
    }

    .div_show {
      width: auto;
      display: flex;
      height: 40px;
      justify-content: center;
      align-items: center;
      color: #409eff;
      cursor: pointer;
      margin-left: 20px;
    }
    .user_item {
      width: auto;
      height: 130px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
      border-radius: 2px;
      margin-top: 15px;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
      padding: 36px 71px;

      .item_left {
        width: 49%;
        height: 58px;
        border-right: 1px solid #e6e9ed;

        .item_text {
          font-size: 14px;
          color: #333333;
        }

        .item_count {
          line-height: 55px;

          span {
            font-size: 34px;
          }
        }
      }

      .item_right {
        height: 48px;
        width: 49%;
        padding-left: 40px;

        .item_text {
          font-size: 14px;
          color: #333333;
        }

        .item_count {
          line-height: 55px;

          span {
            font-size: 34px;
          }
        }
      }
    }
  }

  .devide_table {
    padding: 35px;
    height: auto;
    margin-top: 15px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
    border-radius: 2px;

    .el-table td,
    .el-table th {
      padding: 6px 0px;
    }
  }

  .devide_pageNation {
    width: 100%;
    height: auto;
    // overflow: hidden;
    margin-top: 20px;

    .devide_pageNation_active {
      float: right;
    }
  }
}

.addaccout {
  .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
  }

  .el-form-item__error {
    margin-left: 80px;
  }
}
.user_item {
  width: auto;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
  border-radius: 2px;
  margin-top: 15px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding: 36px 71px;

  .item_left {
    width: 49%;
    height: 58px;
    border-right: 1px solid #e6e9ed;

    .item_text {
      font-size: 14px;
      color: #333333;
    }

    .item_count {
      line-height: 55px;

      span {
        font-size: 34px;
      }
    }
  }

  .item_right {
    height: 48px;
    width: 49%;
    padding-left: 40px;

    .item_text {
      font-size: 14px;
      color: #333333;
    }

    .item_count {
      line-height: 55px;

      span {
        font-size: 34px;
      }
    }
  }
}
</style>
