<template>
  <section class="myself-container content">
    <div class="top_title">节点流量监控</div>
    <div class="user-title" style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="节点流量" name="first" :lazy="true">
            <div style="display: flex;flex-flow: row;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="value1Activechanidactive" placeholder="请输入域名" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="value1acce1" placeholder="全部节点渠道" style="width: 10%;margin-right: 10px;" @change="getdata2(3)">
                <el-option label="全部" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!showzdyz" @click="today(3)">今天</el-button>
                <el-button v-show="!showzdyz" @click="yesterday(3)">昨天</el-button>
                <el-button v-show="!showzdyz" @click="sevendat(3)">近7天</el-button>
                <el-button v-show="!showzdyz" @click="thirtyday(3)">近30天</el-button>
                <el-button @click="showzdyzs">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="showzdyz" style="margin-left:10px;" v-model="val2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(3)">确定</el-button>
            </div>
            <div class="device_form" style="margin-top: 0px;">
              <div id="myChartMap2" :style="{ height: '607px' }"></div>
            </div>
            <div class="devide_table">

              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tableZb" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="渠道ID">
                      <template slot-scope="scope">
                        <div>{{ scope.row.channelid }}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="P2P播放流量">
                      <template slot-scope="scope">
                        <div>{{ scope.row.p2pflow | setbytes }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="上行回源流量">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.upbackflow | setbytes }}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="下行CDN回源流量">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.downcdnflow | setbytes }}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="下行节点回源流量" >
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.downbackflow | setbytes }}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="统计时间">
                      <template slot-scope="scope">
                        <div>{{ scope.row.stime | settimes }}</div>
                        <div>{{ scope.row.etime | settimes }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="TOP加速流量" name="second" :lazy="true">
              <el-tabs v-model="activeName1" type="card" @tab-click="handleClick1">
                <el-tab-pane label="TOP加速次数排行" name="first">
                  <div style="display: flex;flex-flow: row;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                    <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
                    <el-input v-model="value1Activechanidactive" placeholder="请输入域名" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
                    <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>

                    <!-- <el-button-group>
                        <el-button v-show="!showzdyz" @click="today(4)">今天</el-button>
                        <el-button v-show="!showzdyz" @click="yesterday(4)">昨天</el-button>
                        <el-button v-show="!showzdyz" @click="sevendat(4)">近7天</el-button>
                        <el-button v-show="!showzdyz" @click="thirtyday(4)">近30天</el-button>
                        <el-button @click="showzdyzs">自定义
                        <i class="el-icon-date"></i>
                        </el-button>
                    </el-button-group> -->
                    <el-date-picker style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                    <el-button style="margin-left:10px;" type="primary" @click="seachtu(4)">确定</el-button>
                  </div>
                  <div class="devide_table">
                    <el-row type="flex" class="row_active">
                        <el-col :span="24">
                        <el-table :data="tableZb" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
                            <el-table-column label="渠道ID">
                            <template slot-scope="scope">
                                <div>{{ scope.row.chanid }}</div>
                            </template>
                            </el-table-column>

                            <el-table-column label="加速内容名称"  width="400">
                            <template slot-scope="scope">
                                <div>{{ scope.row.urlName }}</div>
                            </template>
                            </el-table-column>
                            <el-table-column label="加速域名">
                            <template slot-scope="scope">
                                <div style="display: flex;justify-content: center;">
                                  <div>{{ scope.row.domain }}</div>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column label="加速次数">
                            <template slot-scope="scope">
                                <div style="display: flex;justify-content: center;">
                                  <div>{{ scope.row.cdnflow }}</div>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column label="加速次数占比" >
                              <template slot-scope="scope">
                                  <div style="display: flex;justify-content: center;">
                                    <div>({{ scope.row.cdnactivepercent | percentss }})</div>
                                  </div>
                              </template>
                            </el-table-column>
                        </el-table>
                        <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye>
                        </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="TOP加速流量排行" name="second">
                  <div style="display: flex;flex-flow: row;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                    <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
                    <el-input v-model="value1Activechanidactive" placeholder="请输入域名" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
                    <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>

                    <!-- <el-button-group>
                        <el-button v-show="!showzdyz" @click="today(4)">今天</el-button>
                        <el-button v-show="!showzdyz" @click="yesterday(4)">昨天</el-button>
                        <el-button v-show="!showzdyz" @click="sevendat(4)">近7天</el-button>
                        <el-button v-show="!showzdyz" @click="thirtyday(4)">近30天</el-button>
                        <el-button @click="showzdyzs">自定义
                        <i class="el-icon-date"></i>
                        </el-button>
                    </el-button-group> -->
                    <el-date-picker style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                    <el-button style="margin-left:10px;" type="primary" @click="seachtu(4)">确定</el-button>
                  </div>
                  <div class="devide_table">
                    <el-row type="flex" class="row_active">
                        <el-col :span="24">
                        <el-table :data="tableZb" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
                            <el-table-column label="渠道ID">
                            <template slot-scope="scope">
                                <div>{{ scope.row.chanid }}</div>
                            </template>
                            </el-table-column>

                            <el-table-column label="加速内容名称"  width="400">
                            <template slot-scope="scope">
                                <div>{{ scope.row.urlName }}</div>
                            </template>
                            </el-table-column>
                            <el-table-column label="加速域名">
                            <template slot-scope="scope">
                                <div style="display: flex;justify-content: center;">
                                  <div>{{ scope.row.domain }}</div>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column label="加速流量">
                            <template slot-scope="scope">
                                <div style="display: flex;justify-content: center;">
                                  <div>{{ scope.row.cdnflow | setbytes }}</div>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column label="流量占比" >
                              <template slot-scope="scope">
                                  <div style="display: flex;justify-content: center;">
                                    <div>({{ scope.row.cdnactivepercent | percentss }})</div>
                                  </div>
                              </template>
                            </el-table-column>
                        </el-table>
                        <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye>
                        </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
  node_traffic_curve,
  node_traffic_table,
  node_traffic_download,
  top_accelcnt_ranking,
  top_dataflow_ranking,
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
      dataAry: [],
      dataAry1: [],
      dataAry2: [],
      value1acce: "-1",
      value1acce1: "-1",
      valueacce: "-1",
      hashidSet: [],
      hashidSets: [
        {
          value: "0",
          label: "云链",
        },
        {
          value: "1",
          label: "西柚机",
        },
        {
          value: "2",
          label: "其他",
        },
      ],
      value1Activechanidactive: "",
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
      tableZb: [],
      activeName: "first",
      activeName1: "first",
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
          prop: "channelid",
          label: "渠道id",
        },
        {
          prop: "p2pflow",
          label: "P2P播放流量",
        },
        {
          prop: "upbackflow",
          label: "上行回源流量",
        },
        {
          prop: "downbackflow",
          label: "下行节点回源流量",
        },
        {
          prop: "upbackflow",
          label: "上行回源流量",
        },
        {
          prop: "downcdnflow",
          label: "下行CDN回源流量",
        },
        {
          prop: "stime-etime",
          label: "统计时间",
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
      pageSize1: 10, //每页数量
      pageNo1: 1, //当前页码
      total_cnt: 1, //数据总量
      total_cnt1: 1, //数据总量
      chanid: "",
      pageActive: 0,
      dataFlownum: 0,
      dataFlownum1: 0,
      flowunit: "",
      timeArrayZb: [],
      timeArrayZb1: [],
      dataZb1: [],
      dataZb3: [],
      dataZb2: [],
      totalp2p: 0,
      totalcdn: 0,
      timeArrayJk: [],
      dataJk1: [],
      dataJk2: [],
      dataJk3: [],
      dataJk4: [],
    };
  },
  filters: {
    settimes(data) {
      var stat = getymdtime(data);
      return stat;
    },
    setbytes(data) {
      return common.formatByteActive(data);
    },
    percentss(data) {
      if (data == 0) {
        return 0 + "%";
      }
      return (data * 100).toFixed(2) + "%";
    },
  },
  components: {
    fenye,
  },
  mounted() {
    //this.today()
    //注释
    // this.querySdkflow()
    //this.querySdkflowTable()
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

    this.getNodeTrafficCurve();
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
    renderHeader(h, { column }) {
      const serviceContent = [
        h(
          "div",
          {
            slot: "content",
            style: "margin-bottom:5px",
          },
          "节点有资源缓存时，切换至CDN加速通道所产生的CDN加速流量"
        ),
      ];
      const paymentContent = h(
        "div",
        {
          slot: "content",
        },
        "节点无资源缓存时，切换至CDN加速通道所产生的的CDN加速流量"
      );
      return h("div", [
        h("span", column.label),
        h(
          "el-tooltip",
          {
            props: {
              placement: "top",
            },
          },
          [
            column.label == "节点有资源时CDN加速流量（%）"
              ? serviceContent
              : paymentContent,
            h("i", {
              class: "el-icon-warning-outline",
              style: "color:orange;margin-left:5px;",
            }),
          ]
        ),
      ]);
    },
    handleCurrentChange1(pages) {
      this.pageNo1 = pages;
      this.querySdkflowTable();
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      this.getbot();
    },
    handleSizeChange1(pagetol) {
      //this.pagesize = pagetol;
      // this.getuserlist();
    },

    //获取每页数量
    handleSizeChange(pagetol) {
      //this.pagesize = pagetol;
      // this.getuserlist();
    },
    //节点流量图
    getNodeTrafficCurve() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.ipfschanel = parseInt(this.value1acce1);
      } else {
        params.ipfschanel = -1;
      }

      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive2(
        this.starttime,
        this.endtime
      );

      node_traffic_curve(params)
        .then(res => {
          if (res.status == 0) {
            console.log(res.data)
            // var num = res.data.pdataArray;
            // var num1 = res.data.cdataArray;
            // if (num !== 0) {
            //   var max = Math.max.apply(null, num);
            // } else if (num1 !== 0) {
            //   var max = Math.max.apply(null, num);
            // }
            // //  max = Math.max.apply(null, num);
            // this.flowunit = this.common.formatByteActiveunit(max);
            // this.totalp2p = res.data.totalp2p;
            // this.totalcdn = res.data.totalcdn;
            // this.timeArrayZb = [];
            // this.timeArrayZb1 = [];
            // this.dataZb1 = [];
            // this.dataZb2 = [];
            // if(params.timeUnit==60){
            //         res.data.timearray.forEach((item, index) => {
            //   this.timeArrayZb.push(getymdtime1(item));
            // });
            // }else{
            //          res.data.timearray.forEach((item, index) => {
            //   this.timeArrayZb.push(getymdtime1(item,11));
            // });
            // }
          
            // this.dataZb1 = res.data.cdnaactivepercent;
            // this.dataZb2 = res.data.cdnpassivepercent;
            // this.dataZb3 = res.data.p2parray;
            // this.dataAry = res.data.cdnaactivearray;
            // this.dataAry1 = res.data.cdnpassivearray;
            //  this.dataAry2 = res.data.pdataArray;
            // this.drawLine2(this.timeArrayZb, this.dataZb1, this.dataZb2,this.dataZb3);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },


    //节点流量表
    node_traffic_table() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.ipfschanel = parseInt(this.value1acce1);
      } else {
        params.ipfschanel = -1;
      }

      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive2(
        this.starttime,
        this.endtime
      );

      node_traffic_table(params)
        .then(res => {
          if (res.status == 0) {
            this.tableZb = [];
            this.tableZb = res.data.list;
            this.total_cnt1 = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    
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
      this.pageNo = 1;
      this.gettable2();
    },

    //今天
    today(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.timeUnit = 60;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //昨天
    yesterday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 1;
      this.endtime = times;
      this.timeUnit = 60;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //七天
    sevendat(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 6;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //三十天
    thirtyday(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 29;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
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

    handleClick1(tab, event){

    },
    //选项卡

    handleClick(tab, event) {
      this.val2 = [];
      this.hashidSet = [];
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;

      this.endtime = Date.parse(new Date()) / 1000;
      this.options3 = [];
      if (tab.index == 0) {
        // this.value1 = "";
        this.value2 = "*";
        this.value3 = "*";
        (this.valueacce = "-1"),
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
      } else if (tab.index == 1) {
        this.valuea1 = "";
        //this.value1 = "";
        this.valuea2 = "*";
        this.valuea3 = "*";
        (this.value1acce = "-1"), (this.options1chanid = []);
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
      if (tab.index == 2) {
        (this.value1acce1 = "-1"), this.getseachlabel1();
        this.querySdkflow();
        let _this = this;
        this.$nextTick(() => {
          _this.querySdkflow();
          _this.querySdkflowTable();
        });
      } else if (tab.index == 3) {
        let _this = this;
        _this.querySdkflowControl();
      }
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
                _this.exoprtant_backsource();
              },
            },
          },
        },
        grid: {
          // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
          left: "3%", // 默认10%，给24就挺合适的。
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
      myChartMap1.clear();
      myChartMap1.setOption(options);
      pop0p;
    },

    drawLine2(x, y, z,a) {
      for (var i = 0; i < y.length; i++) {
        y[i] = (y[i] * 100).toFixed(2);
      }
      for (var i = 0; i < z.length; i++) {
        z[i] = (z[i] * 100).toFixed(2);
      }
       for (var i = 0; i < a.length; i++) {
        a[i] = (a[i] * 100).toFixed(2);
      }
      
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMap2"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量占比",
          left: "12px",
          textStyle: {
            color: "#333333",
            fontSize: 16,
          },
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
                _this.exoprtant_Zb();
              },
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['P2P加速流量', 'CDN无源流量','CDN有源流量'],
          

        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            //  console.log(_this.flowunit)
            //  console.log(_this.dataAry)
            //  for(var i=0;i<_this.dataAry.length;i++){
            return (
              params[0].axisValue +
              "</br>" +
              "CND有源流量:" +
              _this.common.formatByteActive(
                _this.dataAry[params[0].dataIndex]
              ) +"("+(_this.dataZb1[params[0].dataIndex])+"%"+")"+
              "</br>" +
              "CDN无源流量:" +
              _this.common.formatByteActive(_this.dataAry1[params[0].dataIndex])+
             
              "("+(_this.dataZb2[params[0].dataIndex])+"%"+")"+

               "<br>" +
              "P2P加速流量:"+
              _this.common.formatByteActive(_this.dataAry2[params[0].dataIndex])+
            
              "("+(_this.dataZb3[params[0].dataIndex])+"%"+")"
            );
            // }
          },
        },
        grid: {
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 100, // 默认60
        },
        xAxis: {
          data: x,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
        },
        series: [
              {
            name: "P2P加速流量",
            type: "bar",
            stack: "使用情况",
            data: a,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {  color: '#D2E9FF' },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
              },
            },
          },
          {
            name: "CDN无源流量",
            type: "bar",
            stack: "使用情况",
            data: z,
           barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#84C1FF',
              },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
              },
            },
          },
          {
            name: "CDN有源流量",
            type: "bar",
            stack: "使用情况",
            data: y,
             barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#2894FF',
              },
            },
          
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#ffffff",
                fontSize: 10,
              },
            },
          },
          
         
        ],
      };
      myChart.setOption(options);
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
