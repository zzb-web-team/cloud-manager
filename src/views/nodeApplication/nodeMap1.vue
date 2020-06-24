<template>
  <section class="myself-container content">
    <div class="top_title">资源监控</div>
    <div class="user-title" style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="加速流量" name="first">
            <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="value1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="valueacce" placeholder="终端" style="width: 10%;margin-right: 10px;" @change="getdata()">
                <el-option label="全部" value="*"></el-option>
                <el-option v-for="(item, index) in hashidSet" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <el-cascader style="width: 10%;margin-right: 10px;line-height: 36px;" placeholder="区域" :options="options2" ref="cascaderAddr" :show-all-levels="false" v-model="value2" @change="getdata"></el-cascader>
              <el-select v-model="value3" placeholder="运营商" style="width: 10%;margin-right: 10px;" @change="getdata()">
                <el-option label="全部" value="*"></el-option>
                <el-option v-for="(item, index) in options3" :key="item + index" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!shoudzyx" @click="today()">今天</el-button>
                <el-button v-show="!shoudzyx" @click="yesterday()">昨天</el-button>
                <el-button v-show="!shoudzyx" @click="sevendat()">近7天</el-button>
                <el-button v-show="!shoudzyx" @click="thirtyday()">近30天</el-button>
                <el-button @click="showzdyx">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="shoudzyx" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(1)">确定</el-button>
            </div>
            <div class="device_form">
              <div id="myChartMap" :style="{ height: '607px' }"></div>
            </div>
            <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;font-weight: bold;padding-left: 10px;">加速流量</el-col>
              </el-row>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tablecdn" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="渠道ID">
                      <template slot-scope="scope">
                        <div>{{ scope.row.chanelId }}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="总流量">
                      <template slot-scope="scope">
                        <div>{{ scope.row.streamAalue |setbytes }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="时间">
                      <template slot-scope="scope">
                        <div>{{ scope.row.timeValue | settimes }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- <fenye2 style="float:right;margin:10px 0 20px 0;" @fatherMethod="getpage" @fathernum="gettol" :pagesa="total_cnt"></fenye2> -->
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <el-tab-pane label="回源统计" name="second">
            <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="value1acce" placeholder="终端" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                <el-option label="全部" value="*"></el-option>
                <el-option v-for="(item, index) in hashidSet" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <el-cascader style="width: 10%;margin-right: 10px;line-height: 36px;" placeholder="区域" :options="options2" ref="cascaderAddr" :show-all-levels="false" v-model="valuea2" @change="getdata1"></el-cascader>
              <el-select v-model="valuea3" placeholder="运营商" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                <el-option label="全部" value="*"></el-option>
                <el-option v-for="(item, index) in options3" :key="item + index" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!showzdyz" @click="today(2)">今天</el-button>
                <el-button v-show="!showzdyz" @click="yesterday(2)">昨天</el-button>
                <el-button v-show="!showzdyz" @click="sevendat(2)">近7天</el-button>
                <el-button v-show="!showzdyz" @click="thirtyday(2)">近30天</el-button>
                <el-button @click="showzdyzs">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="showzdyz" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(2)">确定</el-button>
            </div>
            <div class="device_form" style>
              <div id="myChartMap1" :style="{ height: '607px' }"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from "../../servers/sevdate";
import fenye2 from "@/components/fenye2";
import {
  accelerate_flow_query_conditions,
  accelerate_flow,
  accelerate_flow_table,
  backsource_flow_query_conditions,
  backsource_flow,
  getvideo,
  export_pv_uv_curve_file,
  export_backsource_flow_file,
  export_accelerate_flow_file,
  getterminal,
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
      value1acce: "*",
      valueacce: "*",
      hashidSet: [],
      options2: [
        {
          value: "*",
          label: "全部",
        },
        {
          value: "华北",
          label: "华北",
          children: [
            {
              value: "北京",
              label: "北京",
            },
            {
              value: "内蒙古",
              label: "内蒙古",
            },
            {
              value: "山西",
              label: "山西",
            },
            {
              value: "河北",
              label: "河北",
            },
            {
              value: "天津",
              label: "天津",
            },
          ],
        },
        {
          value: "西北",
          label: "西北",
          children: [
            {
              value: "宁夏",
              label: "宁夏",
            },
            {
              value: "陕西",
              label: "陕西",
            },
            {
              value: "甘肃",
              label: "甘肃",
            },
            {
              value: "青海",
              label: "青海",
            },
            {
              value: "新疆",
              label: "新疆",
            },
          ],
        },
        {
          value: "东北",
          label: "东北",
          children: [
            {
              value: "黑龙江",
              label: "黑龙江",
            },
            {
              value: "吉林",
              label: "吉林",
            },
            {
              value: "辽宁",
              label: "辽宁",
            },
          ],
        },
        {
          value: "华东",
          label: "华东",
          children: [
            {
              value: "福建",
              label: "福建",
            },
            {
              value: "江苏",
              label: "江苏",
            },
            {
              value: "安徽",
              label: "安徽",
            },
            {
              value: "山东",
              label: "山东",
            },
            {
              value: "上海",
              label: "上海",
            },
            {
              value: "浙江",
              label: "浙江",
            },
          ],
        },
        {
          value: "华中",
          label: "华中",
          children: [
            {
              value: "河南",
              label: "河南",
            },
            {
              value: "湖北",
              label: "湖北",
            },
            {
              value: "江西",
              label: "江西",
            },
            {
              value: "湖南",
              label: "湖南",
            },
          ],
        },
        {
          value: "西南",
          label: "西南",
          children: [
            {
              value: "贵州",
              label: "贵州",
            },
            {
              value: "云南",
              label: "云南",
            },
            {
              value: "重庆",
              label: "重庆",
            },
            {
              value: "四川",
              label: "四川",
            },
            {
              value: "西藏",
              label: "西藏",
            },
          ],
        },
        {
          value: "华南",
          label: "华南",
          children: [
            {
              value: "广东",
              label: "广东",
            },
            {
              value: "广西",
              label: "广西",
            },
            {
              value: "海南",
              label: "海南",
            },
          ],
        },
        {
          value: "其他",
          label: "其他",
          children: [
            {
              value: "香港",
              label: "香港",
            },
            {
              value: "澳门",
              label: "澳门",
            },
            {
              value: "台湾",
              label: "台湾",
            },
          ],
        },
      ],
      value1Activechanid: "",
      value1Activechanid1: "",
      value1Active: "",
      options1Active: [],
      shoudzyx: false,
      showzdyz: false,
      options1: [],
      options1chanid: [],

      options3: [
        // {
        //   label: "电信",
        // },
        // {
        //   label: "移动",
        // },
        // {
        //   label: "联通",
        // },
        // {
        //   label: "其他",
        // },
      ],
      options4: [],
      optionsa1: [],
      optionsa2: [],
      valuea2chanid: "",
      optionsa2chanid: [],
      optionsa3: [],
      optionsa4: [],
      value1: "",
      value2: "*",
      value3: "*",
      value4: "",
      valuea1: "",
      valuea2: "*",
      valuea3: "*",
      valuea4: "",
      tablecdn: [],
      activeName: "first",
      pickerOptions: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              const start =
                new Date(new Date(new Date().toLocaleDateString()).getTime()) -
                3600 * 1000 * 24 * 1;
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      val2: [],
      rowHeader: [
        {
          prop: "time",
          label: "节点ID",
        },
        {
          prop: "totals",
          label: "使用流量",
        },
        {
          prop: "online_devices",
          label: "传输次数",
        },
        {
          prop: "average_online",
          label: "日期",
        },
      ],
      rowHeader1: [
        {
          prop: "time",
          label: "节点ID",
        },
        {
          prop: "totals",
          label: "存储容量",
        },
        {
          prop: "online_devices",
          label: "存储次数",
        },
        {
          prop: "average_online",
          label: "日期",
        },
      ],
      tableData: [
        {
          time: "测试数据1",
          totals: "测试数据1",
          online_devices: "测试数据1",
          average_online: "测试数据1",
          new_percent: "测试数据1",
        },
      ],
      timeUnit: 60,
      starttime: "",
      endtime: "",
      dataFlowArray: [], //图1
      timeArray: [], //图1
      dataFlowArray2: [], //图2
      timeArray2: [], //图2
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      total_cnt: 1, //数据总量
      chanid: "",
      pageActive: 0,
      dataFlownum: 0,
      dataFlownum1: 0,
      flowunit: "",
    };
  },
  filters: {
    settimes(data) {
      var stat = getymdtime(data);
      return stat;
    },
    setbytes(data) {
      return (data / 1024 / 1024 / 1024).toFixed(2) + "GB";
    },
  },
  components: {
    fenye2,
  },
  mounted() {
    // if (this.$cookies.get("id")) {
    //     this.chanid = this.$cookies.get("id") * 1;
    // } else {
    //     this.$router.push({
    //         path: "/"
    //     });
    // }
    // if (this.$route.query.urldata) {
    //   console.log(this.$route.query.urldata);
    // }
    let monitorUrlname = this.$route.query.monitorUrlname;
    if (monitorUrlname) {
      this.value1 = monitorUrlname;
    } else {
      this.value1 = "";
    }
    let monitorChanId = this.$route.query.monitorChanId;
    if (monitorChanId) {
      this.value1Activechanid = monitorChanId;
    } else {
      this.value1Activechanid = "";
    }

    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.endtime = Date.parse(new Date()) / 1000;

    this.getseachlabel1();
    // this.configure()
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    this.drawLine();
    this.drawLine1();
  },
  methods: {
    //回源统计图表导出
    exoprtant_backsource() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      //params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.fileName = this.valuea1;
      } else {
        params.fileName = "*";
      }
      if (this.valuea2[1]) {
        params.region = this.valuea2[1];
      } else {
        params.region = "*";
      }

      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.value1acce !== "") {
        params.acce = this.value1acce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_backsource_flow_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //加速流量图标导出
    exoprtant_pupv() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }

      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }

      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_accelerate_flow_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //输入渠道ID查询
    onchanidChange() {
      this.options1chanid = [];
      this.pageActive = 0;
      if (this.value1Activechanid.length != 12) {
        return false;
      }
      this.queryInfoVideo();
    },
    //查询视频名称
    queryInfoVideo() {
      let param = new Object();

      param.chanid = this.value1Activechanid;

      param.page = this.pageActive;
      getterminal(param)
        .then(res => {
          if (res.status == 0) {
            this.hashidSet = [];
            res.result.cols.forEach((item, index) => {
              let obj = {};
              obj.value = item.name;
              obj.label = item.name;
              this.hashidSet.push(obj);
            });
            this.options1chanid = this.options1chanid.concat(this.labelData);
            console.log(this.labelData);
            if (res.result.les_count == 0) {
              return false;
            } else {
              this.pageActive++;
              this.queryInfoVideo();
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdataActive() {},
    showzdyzs() {
      this.showzdyz = !this.showzdyz;
    },
    showzdyx() {
      this.shoudzyx = !this.shoudzyx;
    },
    //获取页码
    getpage(pages) {
      this.pageNo = pages;
      this.getbot();
    },
    //获取每页数量
    gettol(pagetol) {
      this.pagesize = pagetol;
      // this.getuserlist();
    },
    getdata() {
      this.gettable1();
    },
    getdata1() {
      this.gettable2();
    },

    /** 请求数据 */
    //加速流量加载查询条件
    getseachlabel1() {
      this.options1 = [];
      this.options1chanid = [];
      //this.options2 = [];
      //this.options3 = [];
      let params = new Object();
      params.chanId = "*";
      accelerate_flow_query_conditions(params)
        .then(res => {
          // res.data.fileNameSet.forEach((item, index) => {
          //   let obj = {};
          //   obj.label = item;
          //   obj.value = index;
          //   this.options1.push(obj);
          // });
          res.data.ispSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = index;
            this.options3.push(obj);
          });
          res.data.terminalSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = item;
            this.hashidSet.push(obj);
          });
          //   res.data.hashidSet.forEach((item, index) => {
          //   let obj = {};
          //   obj.label = item;
          //   obj.value = item;
          //   this.hashidSet.push(obj);
          // });
          // res.data.chanIdSet.forEach((item, index) => {
          //   let obj = {};
          //   obj.label = item;
          //   obj.value = index;
          //   this.options1Active.push(obj);
          // });
          this.gettable1();
        })
        .catch(Error => {
          console.log(Error);
        });
    },
    //请求数据--加速流量条形图
    gettable1() {
      this.dataFlowArray = [];
      this.timeArray = [];
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }

      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      accelerate_flow(params)
        .then(res => {
          var num = res.data.streamArray;
          var max = Math.max.apply(null, num);
          this.flowunit = this.common.formatByteActiveunit(max);

          res.data.streamArray.forEach((item, index) => {
            this.dataFlowArray.push((item / 1024 / 1024 / 1024).toFixed(2));
          });
          res.data.timeArray.forEach((item, index) => {
            this.timeArray.push(getymdtime1(item));
          });
          this.getbot();
          this.drawLine(this.dataFlowArray, this.timeArray);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //请求数据--加速流量表格
    getbot() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;

      accelerate_flow_table(params)
        .then(res => {
          if (res.status == 0) {
            let chanelIdArr = res.data.chanelIdArray;
            let timeArr = res.data.timeArray;
            let streamArr = res.data.streamArray;
            this.tablecdn = [];
            for (var i = 0; i < timeArr.length; i++) {
              let obj = {
                chanelId: chanelIdArr[i],
                timeValue: timeArr[i],
                streamAalue: streamArr[i],
              };
              this.tablecdn.push(obj);
            }
          } else {
          }

          // this.tablecdn = res.data.tableList;
          // this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //请求数据--回源查询条件
    getseachlabel2() {
      this.optionsa1 = [];
      this.optionsa2 = [];
      this.optionsa3 = [];
      this.options1Active = [];
      let params = new Object();
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }

      backsource_flow_query_conditions(params)
        .then(res => {
          res.data.ispSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = index;
            this.options3.push(obj);
          });
          res.data.terminalSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = item;
            this.hashidSet.push(obj);
          });
          this.gettable2();
        })
        .catch(err => {});
    },
    gettable2() {
      let _this = this;
      this.dataFlowArray2 = [];
      this.timeArray2 = [];
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      //params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.fileName = this.valuea1;
      } else {
        params.fileName = "*";
      }
      if (this.valuea2[1]) {
        params.region = this.valuea2[1];
      } else {
        params.region = "*";
      }

      if (this.valuea3) {
        params.isp = this.valuea3;
      } else {
        params.isp = "*";
      }
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.value1acce !== "") {
        params.acce = this.value1acce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      backsource_flow(params)
        .then(res => {
          var num = res.data.streamArray;
          var max = Math.max.apply(null, num);
          this.flowunit = this.common.formatByteActiveunit(max);

          res.data.streamArray.forEach((item, index) => {
            this.dataFlowArray2.push(
              this.common.formatByteNum(item, this.flowunit)
            );
          });
          // this.timeArray = res.data.timeArray;
          // res.data.timeArray.forEach((item, index) => {
          //   this.timeArray2.push(getymdtime1(item));
          // });

          this.dataFlownum1 = res.data.streamArray.length - 1;
          let upcli = Math.floor(this.dataFlownum1 / 12);
          res.data.timeArray.forEach((item, index) => {
            if (
              index == 0 ||
              index == this.dataFlownum1 ||
              (index % upcli == 0 && index < upcli * 11)
            ) {
              this.timeArray2.push(getymdtime1(item));
            } else {
              this.timeArray2.push("");
            }
          });

          this.drawLine1(this.dataFlowArray2, this.timeArray2);
        })
        .catch(err => {});
    },
    seachtu(data) {
      if (this.endtime - this.starttime > 7776000) {
        this.$message({
          message: "起始时间和结束时间最大跨度不能超过三个月",
          type: "error",
        });
        return false;
      }
      this.pageNo = 1;
      if (data == 1) {
        this.getseachlabel1();
      } else {
        this.getseachlabel2();
      }
    },
    //今天
    today(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.timeUnit = 60;
      if (!data) {
        this.getseachlabel1();
      } else {
        this.getseachlabel2();
      }
    },
    //昨天
    yesterday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 1;
      this.endtime = times;
      this.timeUnit = 60;
      if (!data) {
        this.getseachlabel1();
      } else {
        this.getseachlabel2();
      }
    },
    //七天
    sevendat(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 7;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (!data) {
        this.getseachlabel1();
      } else {
        this.getseachlabel2();
      }
    },
    //三十天
    thirtyday(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 30;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (!data) {
        this.getseachlabel1();
      } else {
        this.getseachlabel2();
      }
    },
    //自定义时间
    gettimes(cal) {
      this.starttime = dateToMs(this.val2[0]);
      this.endtime = dateToMs(this.val2[1]);
      if (this.endtime - this.starttime < 21600) {
        this.timeUnit = 60;
      } else if (
        this.endtime - this.starttime >= 21600 &&
        this.endtime - this.starttime < 86400
      ) {
        this.timeUnit = 60;
      } else if (this.endtime - this.starttime >= 86400) {
        this.timeUnit = 60 * 24;
      }
    },

    // 表头样式设置
    headClass() {
      return "text-align: center;background:#F3F6FB;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    //选项卡

    handleClick(tab, event) {
      this.hashidSet = [];
      this.options3 = [];
      if (tab.index == 0) {
        // this.value1 = "";
        this.value2 = "*";
        this.value3 = "*";
        (this.valueacce = "*"),
          // this.value1Activechanid = "";
          (this.options1chanid = []);
        let monitorUrlname = this.$route.query.monitorUrlname;
        if (monitorUrlname) {
          this.value1 = monitorUrlname;
        } else {
          this.value1 = "";
        }
        let monitorChanId = this.$route.query.monitorChanId;
        if (monitorChanId) {
          this.value1Activechanid = monitorChanId;
        } else {
          this.value1Activechanid = "";
        }

        this.timeUnit = 60;
        this.getseachlabel1();
      } else {
        this.valuea1 = "";
        //this.value1 = "";
        this.valuea2 = "*";
        this.valuea3 = "*";
        (this.value1acce = "*"), (this.options1chanid = []);
        //this.value1Activechanid = "";
        let monitorUrlname = this.$route.query.monitorUrlname;
        if (monitorUrlname) {
          this.value1 = monitorUrlname;
        } else {
          this.value1 = "";
        }
        let monitorChanId = this.$route.query.monitorChanId;
        if (monitorChanId) {
          this.value1Activechanid = monitorChanId;
        } else {
          this.value1Activechanid = "";
        }

        this.timeUnit = 60;
        this.getseachlabel2();
      }
    },
    destroyed: function() {
      this.drawLine();
      this.drawLine1();
    },
    drawLine(x, y) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChartMap = this.$echarts.init(
        document.getElementById("myChartMap")
      );
      window.onresize = myChartMap.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量",
        },
        toolbox: {
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.export_accelerate();
              },
            },
          },
        },
        grid: {
          left: "2%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
        },
        color: "#297AFF",
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            //   _this.common.formatByteActive(params[0].data)

            return (
              params[0].name +
              "<br>" +
              params[0].seriesName +
              ":" +
              params[0].data +
              _this.flowunit
            );
          },
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: y,
        },
        yAxis: {
          name: _this.flowunit,
        },

        series: [
          {
            name: "流量",
            data: x,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };
      myChartMap.setOption(options);
    },
    drawLine1(x, y) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChartMap1 = this.$echarts.init(
        document.getElementById("myChartMap1")
      );
      window.onresize = myChartMap1.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量",
        },
        toolbox: {
          //show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.export_backsource();
              },
            },
          },
        },
        grid: {
          // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
          left: "2%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
        },
        color: "#297AFF",
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].name +
              "<br>" +
              params[0].seriesName +
              ":" +
              params[0].data +
              _this.flowunit
            );
          },
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: y,
        },
        yAxis: {
          name: this.flowunit,
        },
        series: [
          {
            name: "流量",
            data: x,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };
      myChartMap1.setOption(options);
    },
  },
};
</script>

<style lang="scss">
.myself-container {
  width: 100%;
  //min-width: 1600px;

  .device_form {
    width: auto;
    height: auto;
    margin-top: 20px;
    background: #ffffff;
    padding: 15px 30px;
    box-sizing: border-box;
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
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
  }

  .devide_table {
    padding: 35px;
    height: auto;
    margin-top: 20px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
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

// .user-title .user-item {
//   padding: 25px;
//   border-radius: 5px;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// }
</style>
