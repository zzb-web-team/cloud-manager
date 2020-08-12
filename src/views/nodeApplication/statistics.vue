<template>
  <section class="myself-container content">
    <div class="top_title">统计分析</div>
    <!-- <div class="user-title" style="display: flex;flex-flow: column;width: 1240px;margin: auto;"> -->
    <div class="user-title">
      <div class="statisics_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="PV/UV" name="first">
            <div style="display: flex;align-items: center;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">

              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
              <el-input v-model="valueDomain" placeholder="请输入域名" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
              <el-input v-model="value1fileName" placeholder="请输入加速内容名称" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
              <el-select v-model="valueacce" placeholder="终端" style="width: 10%;margin-right: 10px;" @change="onChanges">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>

              <el-button-group>
                <el-button v-show="!shoudzy" @click="today(0)">今天</el-button>
                <el-button v-show="!shoudzy" @click="yesterday(0)">昨天</el-button>
                <el-button v-show="!shoudzy" @click="sevendat(0)">近7天</el-button>
                <el-button v-show="!shoudzy" @click="thirtyday(0)">近30天</el-button>
                <el-button @click="showzdy">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="shoudzy" style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <!-- <el-button style="margin-left:10px;" type="primary" @click="seachtu(0)">确定</el-button> -->
            </div>

            <div class="user_item">
              <div class="item_left">
                <div class="item_text">总访问次数(PV)</div>
                <div class="item_count">
                  <span>{{ totalPV }}</span>
                </div>
              </div>
              <div class="item_right">
                <div class="item_text">独立IP访问数(UV)</div>
                <div class="item_count">
                  <span>{{ totalUV }}</span>
                </div>
              </div>
            </div>
            <div class="device_form">
              <div id="myChart" :style="{ height: '607px' }"></div>
            </div>

          </el-tab-pane>

          <el-tab-pane label="访问用户分布" name="second">
            <div style="display: flex;align-items: center;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">

              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
              <el-input v-model="valueDomain" placeholder="请输入域名" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
              <el-input v-model="value1fileName" placeholder="请输入加速内容名称" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
                <el-select v-model="valueacce" placeholder="终端" style="width: 10%;margin-right: 10px;" @change="onChanges">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!shoudzyx" @click="today(1)">今天</el-button>
                <el-button v-show="!shoudzyx" @click="yesterday(1)">昨天</el-button>
                <el-button v-show="!shoudzyx" @click="sevendat(1)">近7天</el-button>
                <el-button v-show="!shoudzyx" @click="thirtyday(1)">近30天</el-button>
                <el-button @click="showzdyx">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="shoudzyx" style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <!-- <el-button style="margin-left:10px;" type="primary" @click="seachtu(1)">确定</el-button> -->
            </div>
            <div class="device_form" style>
              <el-button-group style="display: flex;justify-content: center;">
                <el-button plain @click="goarea()">地区</el-button>
                <el-button plain @click="gosupplier()">运营商</el-button>
              </el-button-group>
              <div id="myChart1" :style="{ height: '607px' }"></div>
            </div>
            <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;    font-weight: bold;padding-left:10px;">{{exportTitle}}</el-col>
              </el-row>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tablecdn" border stripe max-height="530" style="width: 100%; margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column :label="exportTitleTable">
                      <template slot-scope="scope">
                        <div v-if="scope.row.region">
                          {{ scope.row.region }}
                        </div>
                        <div v-else>{{ scope.row.isp }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="P2P播放总流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.dataFlow | formatDataFlow}}</div>
                          <div>({{ scope.row.dataFlowPercnt }})</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="访问用户（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.accessCnt }}</div>
                          <div>({{ scope.row.accessPercent }})</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="平均响应时间(/s)">
                      <template slot-scope="scope">
                        <div>{{ scope.row.avgTime | formatAvgTime }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :currentPage="currentPage1" :pagesa="total_cnt1"></fenye>

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
import { dateToMs, getymdtime } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
  pv_uv_query_conditions,
  pv_uv_curve,
  region_query_conditions,
  query_topregion_accesscnt_curve,
  isp_query_conditions,
  query_topisp_accesscnt_curve,
  query_playtimes_conditions,
  query_playtimes_curve,
  query_playdata_table,
  getvideo,
  export_pv_uv_curve_file,
  export_playtimes_curve_file,
  export_topregion_accesscnt_curve_file,
  export_topisp_accesscnt_curve_file,
  getterminal,
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
        hashidSets: [
        {
          value: "1",
          label: "iOS",
        },
        {
          value: "0",
          label: "android",
        },
        {
          value: "2",
          label: "其他",
        },
      ],
      ableStatus: true,
      primaryActive: "primary",
      exportActive: 0,
      exportTitle: "用户访问分布",
      exportTitleTable: "省市",
      currentPage: 1,
      currentPage1: 1,
      total_cnt1: 0,
      pagesize: 10,
      total_cnt: 0,
      value1fileName: "",
      valueacce: "-1",
      options3: [
        {
          value: "1",
          label: "终端1",
        },

        {
          value: "2",
          label: "终端2",
        },

        {
          value: "3",
          label: "终端3",
        },
      ],

      activeDq: true,
      activeGys: false,
      shoudzy: false,
      shoudzyx: false,
      shoudzyz: false,
      value1Active: "",
      value1Activechanid: "",
      valueDomain: "",
      options1Active: [],
      optionsa1: [],
      optionsa2: [],
      optionsa3: [],
      optionsb1: [],
      optionsb2: [],
      optionsb3: [],
      optionsc1: [],
      optionsc2: [],
      optionsc3: [],
      value_a1: "",
      value_a2: "",
      value_a3: "",
      value_b1: "",
      value_b2: "",
      value_b3: "",
      value_c1: "",
      value_c2: "",
      value_c3: "",
      pageSize: 10, //煤业
      pageNo: 1, //页码
      total_cnt: 1, //数据总量
      tablecdn: [],
      tablecdn2: [],
      activeName: "first",
      totalPV: 0,
      totalUV: 0,
      twob: false,
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
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      val2: [],
      starttime: "",
      endtime: "",
      timeUnit: 60,
      chanid: "",
      uvArray: [], //图一y1
      pvArray: [], //图一y2
      timeArray: [], //图一x
      playTimesArray1: [], //图二y
      timeArray1: [], //图二x
      playTimesArray2: [], //图三y
      timeArray2: [], //图三x
      options1chanid: [],
      value1Activechanid: "",
      pagesActive: true,
    };
  },
  filters: {
    setthtim(data) {
      var stat = getymdtime(data);
      return stat;
    },
    aaa(data) {
      var liu = (data / 1024 / 1024 / 1024).toFixed(4);
      return liu;
    },
    formatDataFlow(data) {
      if (data == 0) {
        return 0;
      } else {
        return common.formatByteActive(data);
      }
    },
    formatPercent(data) {
      if (data == 0) {
        return 0;
      } else {
        return (data * 100).toFixed(6);
      }
    },
    formatAvgTime(data) {
      if (data == 0) {
        return 0;
      } else {
        return data;
      }
    },
  },
  components: {
    fenye,
  },
  mounted() {
    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.endtime = Date.parse(new Date()) / 1000;
    this.getcure(0);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
  },
  methods: {
    //用户用户供应商导出
    exoprtant_topisp() {
      let params = new Object();
      params.chanId = this.chanid + "";
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.timeUnit = this.timeUnit;
      if (this.value1fileName) {
        params.fileName = this.value1fileName;
      } else {
        params.fileName = "*";
      }
      if (this.value_b2) {
        params.region = this.value_b2;
      } else {
        params.region = "*";
      }
      if (this.value_b3) {
        params.isp = this.value_b3;
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
        params.acce = "-1";
      }
      params.timeUnit = this.common.timeUnitActive2(
        this.starttime,
        this.endtime
      );
      export_topisp_accesscnt_curve_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },

    //访问用户地区导出
    exoprtant_topregion() {
      let params = new Object();
      params.chanId = this.chanid + "";
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.timeUnit = this.timeUnit;
      if (this.value1fileName) {
        params.fileName = this.value1fileName;
      } else {
        params.fileName = "*";
      }
      if (this.value_b2) {
        params.region = this.value_b2;
      } else {
        params.region = "*";
      }
      if (this.value_b3) {
        params.isp = this.value_b3;
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
        params.acce = "-1";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_topregion_accesscnt_curve_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //加速内容导出
    exoprtant_content() {
      let params = new Object();
      params.chanId = this.chanid + "";
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.timeUnit = this.timeUnit;
      if (this.value1fileName) {
        params.fileName = this.value1fileName;
      } else {
        params.fileName = "*";
      }
      if (this.value_b2) {
        params.region = this.value_b2;
      } else {
        params.region = "*";
      }
      if (this.value_b3) {
        params.isp = this.value_b3;
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
        params.acce = "-1";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_playtimes_curve_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //PV/UV导出
    exoprtant_pupv() {
      let params = new Object();
      params.chanId = this.chanid + "";
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      params.time_unit = this.timeUnit;

      if (this.value1fileName) {
        params.fileName = this.value1fileName;
      } else {
        params.fileName = "*";
      }
      if (this.value_a2[1]) {
        params.region = this.value_a2[1];
      } else {
        params.region = "*";
      }
      if (this.value_a3) {
        params.isp = this.value_a3;
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
        params.acce = "-1";
      }

      this.uvArray = [];
      this.pvArray = [];
      this.timeArray = [];
      params.timeUnit = this.common.timeUnitActive2(
        this.starttime,
        this.endtime
      );
      export_pv_uv_curve_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //
    onChanges() {
      if(this.activeName == 'first'){
        // this.getseach(0)
        this.getcure(0)
      }else{
        this.currentPage1 = 1;
        this.getcure(1)
        if(this.pagesActive){
          this.getcure(1)
        }else{
          this.getcure(2)
        }
      }
    },
    //获取页码
    handleCurrentChange1(pages) {
      this.currentPage1 = pages;
      if (this.pagesActive == true) {
        this.getcure(1);
      } else {
        this.getcure(2);
      }
    },
    //获取每页数量
    handleSizeChange(pagetol) {
      this.pagesize = pagetol;
      // this.getuserlist();
    },
    handleSizeChange1() {},
    getdata() {
      this.getcure(0);
    },
    getdata1() {
      this.getcure(1);
    },
    getdata2() {
      this.getcure(3);
    },
    //请求数据--曲线图
    getcure(data) {
     
      let params = new Object();
      params.chanId = this.chanid + "";
      params.timeUnit = this.timeUnit;
      if (data == 0) {
        params.startTs = this.starttime;
        params.endTs = this.endtime;
        if (this.value1fileName) {
          params.fileName = this.value1fileName;
        } else {
          params.fileName = "*";
        }
        // if (this.value_a2[1]) {
        //   params.region = this.value_a2[1];
        // } else {
          params.region = "*";
        // }
        // if (this.value_a3) {
        //   params.isp = this.value_a3;
        // } else {
          params.isp = "*";
        // }

        if (this.value1Activechanid !== "") {
          params.chanId = this.value1Activechanid;
        } else {
          params.chanId = "*";
        }
        if (this.valueacce !== "") {
          params.terminalName = this.valueacce;
        } else {
          params.terminalName = "-1";
        }

        this.uvArray = [];
        this.pvArray = [];
        this.timeArray = [];

        params.timeUnit = this.common.timeUnitActive2(
          this.starttime,
          this.endtime
        );
        pv_uv_curve(params)
          .then(res => {
            this.totalPV = res.data.totalPV;
            this.totalUV = res.data.totalUV;
            if (res.data.uvArray) {
              res.data.uvArray.forEach((item, index) => {
                this.uvArray.push(Math.floor(item));
              });
            }
            if (res.data.pvArray) {
              res.data.pvArray.forEach((item, index) => {
                this.pvArray.push(Math.floor(item));
              });
            }
            res.data.timeArray.forEach((item, index) => {
              this.timeArray.push(getymdtime(item));
            });
            this.drawLine();
          })
          .catch(err => {});
      } else if (data == 1 || data == 2) {
        this.tablecdn = [];
        params.startTs = this.starttime;
        params.endTs = this.endtime;
        if (this.value1fileName) {
          params.fileName = this.value1fileName;
        } else {
          params.fileName = "*";
        }
        if (this.value_b2) {
          params.region = this.value_b2;
        } else {
          params.region = "*";
        }
        if (this.value_b3) {
          params.isp = this.value_b3;
        } else {
          params.isp = "*";
        }
        if(this.valueDomain){
          params.domain = this.valueDomain;
        }else{
          params.domain = "*"
        }
        if (this.value1Activechanid !== "") {
          params.chanId = this.value1Activechanid;
        } else {
          params.chanId = "*";
        }
        if (this.valueacce !== "") {
          params.acce = this.valueacce;
        } else {
          params.acce = "-1";
        }
        params.top = 10;
        params.timeUnit = this.common.timeUnitActive(
          this.starttime,
          this.endtime
        );
        
        if (data == 1) {
          this.playTimesArray1 = [];
          this.timeArray1 = [];
          params.pageNo = this.currentPage1 - 1;
          params.pageSize = 10;

          query_topregion_accesscnt_curve(params)
            .then(res => {
              this.playTimesArray1 = res.data.accessCntArray;
              this.timeArray1 = res.data.regionArray;
              this.drawLine1(this.playTimesArray1, this.timeArray1, data);
              this.tablecdn = res.data.accessCntTable;
              this.total_cnt1 = res.data.totalCnt;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.playTimesArray1 = [];
          this.timeArray1 = [];
          params.pageNo = this.currentPage1 - 1;
          params.pageSize = 10;
          query_topisp_accesscnt_curve(params)
            .then(res => {
              this.playTimesArray1 = res.data.accessCntArray;
              this.timeArray1 = res.data.ispArray;
              this.drawLine1(this.playTimesArray1, this.timeArray1, data);
              this.tablecdn = res.data.accessCntTable;
              this.total_cnt1 = res.data.totalCnt;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    // //自定义时间确定按钮
    // seachtu(data) {
    //   this.pageNo = 1;
    //   if (data == 0) {
    //     this.getseach(0);
    //   } else if (data == 1) {
    //     this.getseach(1);
    //   } else {
    //     this.getseach(3);
    //   }
    // },
    //自定义时间显示
    showzdy() {
      this.shoudzy = !this.shoudzy;
    },
    showzdyx() {
      this.shoudzyx = !this.shoudzyx;
    },
    showzdyz() {
      this.shoudzyz = !this.shoudzyz;
    },
    //今天
    today(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.timeUnit = 60;
      if (data == 0) {
        this.getcure(0);
      } else if (data == 1) {
        this.getcure(1);
      } else {
        this.getcure(3);
      }
    },
    //昨天
    yesterday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 1;
      this.endtime = times;
      this.timeUnit = 60;
      if (data == 0) {
        this.getcure(0);
      } else if (data == 1) {
        this.getcure(1);
      } else {
        this.getcure(3);
      }
    },
    //七天
    sevendat(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 7;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (data == 0) {
        this.getcure(0);
      } else if (data == 1) {
        this.getcure(1);
      } else {
        this.getcure(3);
      }
    },
    //三十天
    thirtyday(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 30;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (data == 0) {
        this.getcure(0);
      } else if (data == 1) {
        this.getcure(1);
      } else {
        this.getcure(3);
      }
    },
    //自定义时间-确定
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
      if(this.activeName == 'first'){
        // this.getseach(0)
        this.getcure(0)
      }else{
        this.currentPage1 = 1;
        // this.getcure(1)
        if(this.pagesActive){
          this.getcure(1)
        }else{
          this.getcure(2)
        }
      }
    },
    //切换到地区
    goarea() {
      this.twob = false;
      this.exportActive = 0;
      this.currentPage1 = 1;
      this.exportTitle = "用户访问分布";
      this.exportTitleTable = "省市";
      this.primaryActive = !this.primaryActive;
      (this.pagesActive = true), this.getcure(1);
    },
    //切换到运营商
    gosupplier() {
      this.currentPage1 = 1;
      this.twob = true;
      this.exportActive = 1;
      (this.pagesActive = false), (this.exportTitle = "用户运营商分布");
      this.exportTitleTable = "运营商";
      this.primaryActive = !this.primaryActive;
      this.getcure(2);
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
      this.shoudzy = false;
      this.shoudzyx = false;

      this.shoudzyz = false;

      this.ableStatus = true;
      this.value1fileName = "";
      this.value1Activechanid = "";
      this.valueacce = "-1";
      //切换时重置时间为当前时间
      this.val2 = [];
      this.starttime =
        new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.endtime = Date.parse(new Date()) / 1000;
      if (tab.index == 0) {
        this.value_a1 = "";
        this.value_a2 = "";
        this.value_a3 = "";
        this.value1Activechanid = "";
        // this.getseach(0);
        this.getcure(0)
      } else if (tab.index == 1) {
        this.value_b1 = "";
        this.value_b2 = "";
        this.value_b3 = "";
        this.twob = false;
        this.value1Activechanid = "";
        this.getcure(1);
      }
    },
    destroyed: function() {
      this.drawLine();
      this.drawLine1();
      this.drawLine2();
    },
    drawLine() {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "PV/UV",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        toolbox: {
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            // saveAsImage: { show: false },
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_pupv();
              },
            },
          },
        },
        legend: {
          left: "left",
          data: ["pv", "uv"],
        },
        color: ["#A7D5FF", "#BEA7FF"],
        xAxis: {
          type: "category",
          name: "日期",
          splitLine: {
            show: false,
          },
          data: this.timeArray,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          name: "pv/uv",
          min: 0,
        },
        series: [
          {
            name: "pv",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#A7D5FF",
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#A7D5FF",
                  },
                  {
                    offset: 0.5,
                    color: "#D0E8FF",
                  },
                  {
                    offset: 1,
                    color: "#ffffff",
                  },
                ]),
              },
            }, //填充区域样式
            data: this.pvArray,
          },
          {
            name: "uv",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#BEA7FF",
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#BEA7FF",
                  },
                  {
                    offset: 0.5,
                    color: "#D2D0FF",
                  },
                  {
                    offset: 1,
                    color: "#ffffff",
                  },
                ]),
              },
            }, //填充区域样式
            data: this.uvArray,
          },
        ],
      };
      myChart.setOption(options);
    },
    drawLine1(a, b, data) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "访问用户数(TOP10)",
        },
        grid: {
          // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
          // width: "100%", // grid 组件的宽度。默认自适应。
          // height: "100%",
          // containLabel:true, // grid 区域是否包含坐标轴的刻度标签。(如果true的时候，上下左右可以为0了)
          // show:true, // 是否显示直角坐标系网格。是否显示grid，grid:show后，下面的一些参数生效。
          // backgroundColor:'#ccac62',
          // borderColor:"#000",
        },
        toolbox: {
          //show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            // saveAsImage: { show: false },
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                if (_this.exportActive == 0) {
                  _this.exoprtant_topregion();
                } else {
                  _this.exoprtant_topisp();
                }
              },
            },
          },
        },
        color: "#297AFF",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        xAxis: {
          data: b,
        },
        yAxis: {},
        series: [
          {
            name: data == 1 ? "流量" : "次",
            type: "bar",
            barWidth: 30, //柱图宽度
            data: a,
          },
        ],
      };
      myChart.setOption(options);
    },
    drawLine2(a, b) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      window.onresize = myChart.resize;
      // 绘制图表
      let option = {
        title: {
          text: "访问TOP10",
        },
        grid: {
          // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
          // width: "100%", // grid 组件的宽度。默认自适应。
          // height: "100%",
          // containLabel:true, // grid 区域是否包含坐标轴的刻度标签。(如果true的时候，上下左右可以为0了)
          // show:true, // 是否显示直角坐标系网格。是否显示grid，grid:show后，下面的一些参数生效。
          // backgroundColor:'#ccac62',
          // borderColor:"#000",
        },
        toolbox: {
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            // saveAsImage: { show: false },
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_content();
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        xAxis: {
          type: "category",
          data: b,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: a,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "#409EFF", //改变折线颜色
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
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

    overflow: hidden;
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
    width: auto;

    height: auto;
    overflow: hidden;
    margin-top: 20px;
    background: #ffffff;
    padding: 37px;
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
    border-radius: 2px;

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

.user_item {
  width: auto;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
  border-radius: 2px;
  margin-top: 20px;

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
