<template>
  <section class="myself-container content">
    <div class="user-title" style="display: flex;flex-flow: column;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>节点数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>节点平均利用率</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div style="display: flex;flex-flow: row;margin-top: 20px;">
        <el-button>全部城市</el-button>
        <el-button>全部区域</el-button>
        <el-button>全部分组</el-button>
        <el-button>时间粒度</el-button>
        <el-date-picker
          style="margin-left:10px;"
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="left"
        ></el-date-picker>
        <el-button style="margin-left:10px;" type="primary">确定</el-button>
      </div>
      <div style="margin-top:10px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="IP流量" name="first">
            <div class="device_form" style>
              <div id="myChart3" :style="{width: '1600px', height: '300px'}"></div>
            </div>
            <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;    font-weight: bold;">IP流量平均利用率表</el-col>
              </el-row>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <tableBarActive2
                    id="rebateSetTable"
                    ref="table1"
                    tooltip-effect="dark"
                    :rowHeader="rowHeader"
                    :tableData="tableData"
                  ></tableBarActive2>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="FS存储" name="second">
            <div class="device_form" style>
              <div id="myChart4" :style="{width: '1600px', height: '300px'}"></div>
            </div>
            <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;    font-weight: bold;">IP流量平均利用率表</el-col>
              </el-row>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <tableBarActive2
                    id="rebateSetTable"
                    ref="table1"
                    tooltip-effect="dark"
                    :tableData="tableData"
                    :rowHeader="rowHeader1"
                  ></tableBarActive2>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import echarts from "echarts";
import tableBarActive2 from "../../components/tableBarActive2";
export default {
  data() {
    return {
      activeName: "first",
      pickerOptions: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date().setHours(0, 0, 0, 0) ;

              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      rowHeader: [
        {
          prop: "time",
          label: "节点ID"
        },
        {
          prop: "totals",
          label: "使用流量"
        },
        {
          prop: "online_devices",
          label: "传输次数"
        },
        {
          prop: "average_online",
          label: "日期"
        }
      ],
      rowHeader1: [
        {
          prop: "time",
          label: "节点ID"
        },
        {
          prop: "totals",
          label: "存储容量"
        },
        {
          prop: "online_devices",
          label: "存储次数"
        },
        {
          prop: "average_online",
          label: "日期"
        }
      ],
      tableData: [
        {
          time: "测试数据1",
          totals: "测试数据1",
          online_devices: "测试数据1",
          average_online: "测试数据1",
          new_percent: "测试数据1"
        }
      ]
    };
  },
  mounted() {
    this.configure();
    this.configure1();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //选项卡
    handleClick(tab, event) {
      console.log(tab, event);
    },

    configure() {
      let myChart = echarts.init(document.getElementById("myChart3")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      let options = {
        title: {
          text: "IP流量利用率"
        },
        xAxis: {
          type: "category",
          data: [
            "2019-19-11",
            "2019-19-12",
            "2019-19-13",
            "2019-19-14",
            "2019-19-15",
            "2019-19-16",
            "2019-19-17"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [20, 30, 40, 40, 90, 10, 20, 40],

            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#09b0f5"
              }
            }
          }
        ]
      };
      myChart.setOption(options);
    },
    configure1() {
      let myChart = echarts.init(document.getElementById("myChart4")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      let options = {
        title: {
          text: "FS存储利用率"
        },
        xAxis: {
          type: "category",
          data: [
            "2018-19-11",
            "2018-19-12",
            "2018-19-13",
            "2018-19-14",
            "2018-19-15",
            "2018-019-16",
            "2018-19-17"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [20, 30, 40, 40, 90, 10, 20, 40],

            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#09b0f5"
              }
            }
          }
        ]
      };
      myChart.setOption(options);
    }
  },
  components: {
    tableBarActive2
  }
};
</script>

<style lang="scss">
.myself-container {
  width: 100%;
  min-width: 1600px;

  .device_form {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;
    background: #ffffff;
    padding: 15px 30px;
    box-sizing: border-box;

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
  }

  .devide_table {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;

    .el-table td,
    .el-table th {
      padding: 6px 0px;
    }

    .row_active {
      margin-top: 10px;
    }
  }

  .devide_pageNation {
    width: 100%;
    height: auto;
    overflow: hidden;
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

.user-title .user-item {
  background: #f2f2f2;
  padding: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
