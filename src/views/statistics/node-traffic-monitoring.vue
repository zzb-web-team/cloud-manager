<template>
  <section class="myself-container content">
    <div class="top_title">节点流量监控</div>
    <div class="user-title" style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="节点流量" name="first" :lazy="true">
            <div style="display: flex;align-items: center;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width:10%;margin-right: 10px;" @keyup.enter.native="onChanges">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
              </el-input>
              <el-input v-model="valueDomain" placeholder="请输入域名" style="width:10%;margin-right: 10px;" @keyup.enter.native="onChanges">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
              </el-input>
              <el-input v-model="valueContent" placeholder="请输入加速内容名称" style="width:10%;margin-right: 10px;" @keyup.enter.native="onChanges">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
              </el-input>
              <el-select v-model="valueChanel" placeholder="全部节点渠道" style="width: 10%;margin-right: 10px;" @change="onChanges">
                <el-option label="全部" value="*"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-radio-group
                v-model="radio"
                size="medium"
                @change="select_time()"
                v-show="!showzdy"
              >
                <el-radio-button size = "small" label="1">今天</el-radio-button >
                <el-radio-button size = "small" label="2">昨天</el-radio-button >
                <el-radio-button size = "small" label="3">近7天</el-radio-button >
                <el-radio-button size = "small" label="4">近30天</el-radio-button >
                <el-radio-button size = "small" label="5">自定义</el-radio-button >
              </el-radio-group>
              <el-button
                type="primary"
                v-show="showzdy"
                 size = "small"
                style="background:#409EFF;border:#409EFF"
                @click="setZdy"
                >自定义</el-button
						  >
              <el-date-picker v-show="showzdy" style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes(0)"></el-date-picker>
              <!-- <el-button style="margin-left:10px;" type="primary" @click="seachtu()">确定</el-button> -->
            </div>
            <div class="device_form" style="margin-top: 0px;">
              <div id="myChartMap2" :style="{ height: '607px' }"></div>
            </div>
            <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tableZb" border max-height="560px" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
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
                    <!-- <el-table-column label="上行回源流量">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.upbackflow | setbytes }}</div>
                        </div>
                      </template>
                    </el-table-column> -->
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
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange2" @handleSizeChange="handleSizeChange2" :currentPage = "pageNo2" :pagesa="total_cnt2"></fenye>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="TOP加速流量" name="second" :lazy="true">
            <div style="display: flex;align-items: center; flex-flow: row;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="valueChannelId1" placeholder="请输入渠道ID" style="width:10%;margin-right: 10px;" @keyup.enter.native="onChanges">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
              </el-input>
              <el-input v-model="valueDomain1" placeholder="请输入域名" style="width:10%;margin-right: 10px;" @keyup.enter.native="onChanges">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
              </el-input>
              <el-input v-model="valueContent1" placeholder="请输入加速内容名称" style="width:10%;margin-right: 10px;" @keyup.enter.native="onChanges">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
              </el-input>
              <el-date-picker style="margin-left:10px;" v-model="val3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes(1)"></el-date-picker>
              <!-- <el-button style="margin-left:10px;" type="primary" @click="search">确定</el-button> -->
            </div>
            <div class="devide_table">
              <el-radio-group 
                v-model="radioTop"
                @change="handleClick1">
                <el-radio-button label="1">TOP加速次数排行</el-radio-button>
                <el-radio-button label="2">TOP加速流量排行</el-radio-button>
              </el-radio-group>
              <div style="display: flex;justify-content: flex-end;margin-right: 6px;">
                <el-button type="primary" @click="toExportExcel">导出</el-button>
              </div>
              <el-row v-show="radioTop == 1" type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tableTop" border max-height = "530px" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="加速内容名称">
                      <template slot-scope="scope">
                          <div>{{ scope.row.urlname }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="渠道ID">
                    <template slot-scope="scope">
                        <div>{{ scope.row.channelid }}</div>
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
                          <div>{{ scope.row.accelCnt }}</div>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column label="加速次数占比" >
                      <template slot-scope="scope">
                          <div style="display: flex;justify-content: center;">
                            <div>{{ scope.row.accelCntpercent | percentss }}</div>
                          </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 20px 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage = "pageNo" :pagesa="total_cnt"></fenye>
                </el-col>
              </el-row>
              <el-row v-show="radioTop != 1" type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tableTop1" border max-height = "530px" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="加速内容名称">
                      <template slot-scope="scope">
                        <div>{{ scope.row.urlname }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="渠道ID">
                      <template slot-scope="scope">
                        <div>{{ scope.row.channelid }}</div>
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
                          <div>{{ scope.row.dataflow | setbytes }}</div>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column label="流量占比" >
                      <template slot-scope="scope">
                          <div style="display: flex;justify-content: center;">
                            <div>{{ scope.row.dataflowpercent | percentss }}</div>
                          </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :currentPage = "pageNo1" :pagesa="total_cnt1"></fenye>
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
import { dateToMs, getymdtime, getymdtime1, splitTimes } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
  node_traffic_curve,
  node_traffic_table,
  node_traffic_download,
  top_accelcnt_ranking,
  top_dataflow_ranking,
  export_accelcnt_ranking_table_file,
  export_dataflow_ranking_table_file,
  get_nodetype_enum
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";
import _ from "lodash";

export default {
  data() {
    return {
      dataAry: [],
      dataAry1: [],
      dataAry2: [],
      hashidSet: [],
      hashidSets: [],
      valueDomain: "",
      valueContent: "",
      valueChannelId: "",
      valueChanel: "",
      valueDomain1: "",
      valueContent1: "",
      valueChannelId1: "",
      valueChanel1: "",
      valueDomain2: "",
      valueContent2: "",
      valueChannelId2: "",
      valueChanel2: "",
      showzdy: false,
      tablecdn: [],
      tableZb: [],
      tableTop: [],
      tableTop1: [],
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
      val2: [],
      val3: [],
      timeUnit: 120,
      starttime: "",
      endtime: "",
      dataFlowArray: [], //图1
      timeArray: [], //图1
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      pageSize1: 10, //每页数量
      pageNo1: 1, //当前页码
      pageSize2: 10, //每页数量
      pageNo2: 1, //当前页码
      total_cnt: 1, //数据总量
      total_cnt1: 1, //数据总量
      total_cnt2: 1, //数据总量
      chanid: "",
      flowunit: "",
      timeArrayZb: [],
      radio: 1,
      radioTop: 1,
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
    this.getNodeType();
    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.endtime = Date.parse(new Date()) / 1000;
    this.getNodeTrafficCurve();
    this.node_traffic_table();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    this.drawLine2();
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
    search(){
      if(this.radioTop ==1){
        this.pageNo = 1;
        this.pageSize = 10;
        this.topAccelcntRanking();
      }else{
        this.pageNo1 = 1;
        this.pageSize1 = 10;
        this.topDataflowRanking();
      } 
    },
    //获取加速次数每页数量
    handleSizeChange(pagetol) {
      this.pageSize = pagetol;
      this.topAccelcntRanking();
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      this.topAccelcntRanking();
    },
    //获取加速流量每页数量
    handleSizeChange1(pagetol) {
      this.pagesize1 = pagetol;
      this.topDataflowRanking();
    },
    //获取页码
    handleCurrentChange1(pages) {
      this.pageNo1 = pages;
      this.topDataflowRanking();
    },
    //获取节点流量表每页数量
    handleSizeChange2(pagetol) {
      this.pagesize2 = pagetol;
      this.node_traffic_table();
    },
    //获取页码
    handleCurrentChange2(pages) {
      this.pageNo2 = pages;
      this.node_traffic_table();
    },
    //自定义事件组件
    select_time() {
			if (this.radio == 1) {
				this.showzdy = false;
				this.today();
			} else if (this.radio == 2) {
				this.showzdy = false;
				this.yesterday();
			} else if (this.radio == 3) {
				this.showzdy = false;
				this.sevendat();
			} else if (this.radio == 4) {
				this.showzdy = false;
				this.thirtyday();
			} else if (this.radio == 5) {
				this.showzdy = true;
			}
    },
    onChanges() {
      if(this.activeName == 'first'){
        this.pageNo2 = 1;
        this.getNodeTrafficCurve();
        this.node_traffic_table();
      }else{
        if(this.radioTop ==1){
          this.pageNo = 1;
          this.topAccelcntRanking();
        }else{
          this.pageNo1 = 1;
          this.topDataflowRanking();
        }
      }
    },
    //获取节点渠道
    getNodeType(){
      let param = {}
      get_nodetype_enum(param).then(
        (res) => {
          let data = res.data.firstchan;
          let list = data.map((item)=>{
            let obj = {};
            obj.label = item.name;
            obj.value = item.value;
            return obj
          })
          this.hashidSets = list;
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    //节点流量图
    getNodeTrafficCurve() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.valueContent) {
        params.urlName = this.valueContent;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueChanel != "") {
        params.ipfsChanel = this.valueChanel;
      } else {
        params.ipfsChanel = "*";
      }

      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      node_traffic_curve(params)
        .then(res => {
          if (res.status == 0) {
            if([
              ...res.data.p2parray,
              ...res.data.downbackarray,
              ...res.data.downcdnarray,
            ].length == 0){
              this.flowunit = 'B'
            }else{
              var max = _.max([
                ...res.data.p2parray,
                ...res.data.downbackarray,
                ...res.data.downcdnarray,
              ]);
              this.flowunit = this.common.formatByteActiveunit(max);
            }
            this.timeArrayZb = [];

            if(res.data.p2parray.length == 0 && res.data.downbackarray.length ==0 && res.data.downcdnarray.length == 0){
              let arr = splitTimes(this.starttime, this.endtime, params.timeUnit);
              console.log(arr)
              if (params.timeUnit == 120) {
                arr.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item));
                });
              } else {
                arr.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item, 11));
                });
              }

              this.dataAry = _.fill(Array(arr.length), 0);
              this.dataAry1 = _.fill(Array(arr.length), 0);
              this.dataAry2 = _.fill(Array(arr.length), 0);
            }else{
              if(params.timeUnit==120){
                res.data.timearray.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item));
                });
              }else{
                res.data.timearray.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item,11));
                });
              }

              this.dataAry = res.data.downcdnarray.map((item)=>this.common.formatByteNum(item, this.flowunit));
              this.dataAry1 = res.data.downbackarray.map((item)=>this.common.formatByteNum(item, this.flowunit));
              this.dataAry2 = res.data.p2parray.map((item)=>this.common.formatByteNum(item, this.flowunit));
            };
            this.drawLine2(this.timeArrayZb, this.dataAry, this.dataAry1, this.dataAry2);
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
      params.pageNo = this.pageNo2 - 1;
      params.pageSize = this.pageSize2;
      if (this.valueContent) {
        params.urlName = this.valueContent;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueChanel !== "") {
        params.ipfsChanel = this.valueChanel;
      } else {
        params.ipfsChanel = "*";
      }

      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      node_traffic_table(params)
        .then(res => {
          if (res.status == 0) {
            this.tableZb = [];
            this.tableZb = res.data.list;
            this.total_cnt2 = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    //下载节点流量图表
    exoprtNodeTraffic() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valueContent) {
        params.urlName = this.valueContent;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueChanel != "") {
        params.ipfsChanel = this.valueChanel;
      } else {
        params.ipfsChanel = "*";
      }

      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      node_traffic_download(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //TOP加速次数排行
    topAccelcntRanking() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
      // params.chanId = this.chanid + "";
      if (this.valueContent1) {
        params.urlName = this.valueContent1;
      } else {
        params.urlName = "*";
      }
      
      if (this.valueChannelId1 !== "") {
        params.channelId = this.valueChannelId1;
      } else {
        params.channelId = "*";
      }

      if (this.valueDomain1 !== "") {
        params.domain = this.valueDomain1;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      top_accelcnt_ranking(params)
        .then(res => {
          if (res.status == 0) {
            this.tableTop = res.data.data;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //TOP加速流量排行
    topDataflowRanking() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.pageNo = this.pageNo1 - 1;
      params.pageSize = this.pageSize1;
      if (this.valueContent1) {
        params.urlName = this.valueContent1;
      } else {
        params.urlName = "*";
      }
      
      if (this.valueChannelId1 !== "") {
        params.channelId = this.valueChannelId1;
      } else {
        params.channelId = "*";
      }

      if (this.valueDomain1 !== "") {
        params.domain = this.valueDomain1;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      top_dataflow_ranking(params)
        .then(res => {
          if (res.status == 0) {
            this.tableTop1 = res.data.data;
            this.total_cnt1 = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    toExportExcel() {
      if(this.radioTop == 1){
        this.toExportAccelcntExcel()
      }else{
        this.toExportDataflowExcel();
      }
    },

    toExportAccelcntExcel() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.pageNo = this.pageNo1 - 1;
      params.pageSize = this.pageSize1;
      if (this.valueContent1) {
        params.urlName = this.valueContent1;
      } else {
        params.urlName = "*";
      }
      
      if (this.valueChannelId1 !== "") {
        params.channelId = this.valueChannelId1;
      } else {
        params.channelId = "*";
      }

      if (this.valueDomain1 !== "") {
        params.domain = this.valueDomain1;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_accelcnt_ranking_table_file(params).then(res => {
          if (res.status == 0) {
           window.open(res.msg, "_blank");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    toExportDataflowExcel() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.pageNo = this.pageNo1 - 1;
      params.pageSize = this.pageSize1;
      if (this.valueContent1) {
        params.urlName = this.valueContent1;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId1 !== "") {
        params.channelId = this.valueChannelId1;
      } else {
        params.channelId = "*";
      }
      if (this.valueDomain1 !== "") {
        params.domain = this.valueDomain1;
      } else {
        params.domain = "*";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_dataflow_ranking_table_file(params).then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    setZdy() {
      this.showzdy = !this.showzdy;
      this.radio = 1;
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
      this.getNodeTrafficCurve();
      this.node_traffic_table();
    },

    //今天
    today(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.timeUnit = 60;
      this.pageNo2 = 1;
      this.getNodeTrafficCurve();
      this.node_traffic_table();
    },
    //昨天
    yesterday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 1;
      this.endtime = times - 1;
      this.timeUnit = 60;
      this.pageNo2 = 1;
      this.getNodeTrafficCurve();
      this.node_traffic_table();
    },
    //七天
    sevendat(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 6;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      this.pageNo2 = 1;
      this.getNodeTrafficCurve();
      this.node_traffic_table();
    },
    //三十天
    thirtyday(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 29;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      this.pageNo2 = 1;
      this.getNodeTrafficCurve();
      this.node_traffic_table();
    },
    //自定义时间
    gettimes(cal) {
      // let times = parseInt(new Date(new Date()).getTime() / 1000);
      if(cal == 0){
        this.starttime = this.val2 ? dateToMs(this.val2[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = this.val2 ? dateToMs(this.val2[1]) : Date.parse(new Date()) / 1000;
      }else{
        this.starttime = this.val3 ? dateToMs(this.val3[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = this.val3 ? dateToMs(this.val3[1]) + (24*60*60-1) : Date.parse(new Date()) / 1000;
      }
      
      if (this.endtime - this.starttime <= 86400) {
        this.timeUnit = 60 * 2;
      } else if (this.endtime - this.starttime > 86400) {
        this.timeUnit = 60 * 24;
      }
      if(this.activeName == 'first'){
        this.pageNo2 = 1;
        this.getNodeTrafficCurve();
        this.node_traffic_table();
      }else{
        if(this.radioTop ==1){
          this.pageNo = 1;
          this.topAccelcntRanking();
        }else{
          this.pageNo1 = 1;
          this.topDataflowRanking();
        }
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
      if (tab.index == 0) {
        this.val2= [];
        let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.starttime = times;
        this.endtime = Date.parse(new Date()) / 1000;
        this.pageNo2 = 1;
        this.getNodeTrafficCurve();
        this.node_traffic_table();
      } else if (tab.index == 1) {
        this.val3 = [];
        let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.starttime = times;
        this.endtime = Date.parse(new Date()) / 1000;
        this.val3[0] = this.common.getTimes(this.starttime * 1000);
        this.val3[1] = this.common.getTimes(this.endtime * 1000);
        this.topAccelcntRanking();
      }
    },

    handleClick1() {
      this.valueContent1 = "";
      this.valueDomain1 = "";
      this.valueChannelId1 = "";
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.val3[0] = this.common.getTimes(this.starttime * 1000);
      this.val3[1] = this.common.getTimes(this.endtime * 1000);
      if (this.radioTop == 1) {
        this.topAccelcntRanking();
      } else {
        this.topDataflowRanking();
      }
    },

    drawLine2(x, y, z, a) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMap2"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量",
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
                _this.exoprtNodeTraffic();
              },
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['P2P播放流量', '下行节点回源流量','下行CDN回源流量'],
        },
        tooltip: {
          trigger: "axis",
          // backgroundColor: "#FFF",
          formatter: function(params) {
            return (
              params[0].axisValue + "</br>" +
              "P2P播放流量:"+
                _this.dataAry2[params[0].dataIndex] + _this.flowunit +
              "</br>" +
              "<div style='backgroundColor: rgba(0, 0, 0, 0.5); height: 20px;z-index: 99999999;'></div>"+
              params[0].axisValue +
              "</br>" +
              "下行CDN回源流量:" +
                _this.dataAry[params[0].dataIndex] + _this.flowunit
               +
              "</br>" +
              "下行节点回源流量:" +
                _this.dataAry1[params[0].dataIndex] + _this.flowunit
              +
              "<br>" 
            );
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
          type: 'value',
          name: _this.flowunit,
          axisLable: {
            formatter:  (value, index) => {
              return _this.common.formatByteNum(value, _this.flowunit);
            }
          }
        },
        series: [
          {
            name: "P2P播放流量",
            type: "bar",
            data: a,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {  color: '#8FC0FF' },
            }
          },
          {
            name: "下行节点回源流量",
            type: "bar",
            stack: "使用情况",
            data: z,
             barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#FFB430',
              },
            },
            label: {
              normal: {
                show: false,
                position: "inside",
                color: "#ffffff",
                fontSize: 10,
              },
            },
          },
          {
            name: "下行CDN回源流量",
            type: "bar",
            stack: "使用情况",
            data: y,
           barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#FFD800',
              },
            },
            label: {
              normal: {
                show: false,
                position: "inside",
                color: "#333333",
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
    .el-table::before {
      z-index: inherit;
    }
    .el-table td,
    .el-table th {
      padding: 6px 0px;
    }
    .tab_top_btn {
			text-align: left;
			margin-left: 10px;
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

</style>
