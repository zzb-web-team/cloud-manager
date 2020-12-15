<template>
  <div>
    <div class="top_title">播放流量
      <div class="wrapperStyle">
        <div class="itemStyle" :class="{ isSelected: type == 0 }" @click="handleClick(0)">播放流量统计</div>
        <div style="display: none;" class="itemStyle" :class="{ isSelected: type == 2}" @click="handleClick(1)">播放流量分布</div>
        <div class="itemStyle" :class="{ isSelected: type == 1}" @click="handleClick(1)">播放流量终端</div>
      </div>
    </div>
    <section class="content">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
        <el-tab-pane label="播放流量占比" name="threed" :lazy="true"> -->
          <ChangeType @selectType="selectType" type style="margin: 0px 0 37px"/>
          <div v-show="type==0" class="seach">
            <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueDomain" placeholder="请输入域名" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueUrlName" placeholder="请输入加速内容名称" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueRoomId" placeholder="请输入直播间ID" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueStreamName" placeholder="请输入直播流名称" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-select v-model="valueTerminalName" placeholder="全部终端类型" style="width: 10%;margin-right: 10px;" @change="onChanges">
              <el-option label="全部终端" value="-1"></el-option>
              <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="valueChanel" placeholder="全部节点渠道" style="width: 10%;margin-right: 10px;" @change="onChanges">
              <el-option label="全部" value="*"></el-option>
              <el-option v-for="(item, index) in hashidSets1" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <SelectTime ref="selectTime" @selectTime="selectTime" :type="'daterange'" />
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap;">
            <div v-show="type==0" class="user_item">
              <div class="items">
                <img width="111px" height="111px" src="../../assets/img/p2pflow.png" alt="">
                <div>
                  <p class="text">P2P播放流量</p>
                  <p class="count">{{totalp2p |setnum}}<span class="text">{{totalp2p |setunit}}</span></p>
                </div>
              </div>
              <div class="items">
                <img width="111px" height="111px" src="../../assets/img/accesscnt.png" alt="">
                <div>
                  <p class="text" v-if="accelerateType==0">CDN播放流量</p>
                  <p class="text" v-else>有效访问次数</p>
                  <p class="count" v-if="accelerateType==0">{{totalcdn |setnum}}<span class="text">{{totalcdn |setunit}}</span></p>
                  <p class="count" v-else>{{validCnt}}</p>
                </div>
              </div>
            </div>
            <div v-show="type==0" style="flex: 1; min-width: 400px;">
              <div id="myChartMap2" :style="{ height: '500px' }"></div>
            </div>
          </div>
        <!-- </el-tab-pane>
        <el-tab-pane label="播放流量分布" name="second" :lazy="true"> -->
          <div v-show="type==2" style="display: flex;align-items: center; flex-flow: row; margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
            <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <SelectTime @selectTime="selectTime" :type="'daterange'" />
          </div>
          <div v-show="type==2" class="device_form">
            <el-row type="flex" class="row_active">
              <el-col :span="24" style="text-align:left;font-weight: bold;margin-bottom:30px;">播放流量地域分布</el-col>
            </el-row>
            <el-radio-group 
              v-model="radioPlayFlow"
              @change="handleClick1">
              <el-radio-button label="1">P2P播放流量</el-radio-button>
              <el-radio-button label="2">CDN播放流量</el-radio-button>
            </el-radio-group>
            <div id="myChartMap1" :style="{ height: '607px' }"></div>
          </div>
          <div v-show="type==2" class="devide_table">
            <el-row type="flex" class="row_active">
              <el-col :span="24" style="text-align:left;font-weight: bold;margin-bottom:20px;">省/市流量统计</el-col>
            </el-row>
            <div style="display: flex;flex-direction: row; justify-content: space-between">
              <div style="width: 30%;">
                <div v-for="(item, index) in locationCurveList" :key="index" style="display: flex;flex-direction: row;align-items: center;margin-top:8px;">
                  <span style="width: 15%">{{item.region}}</span>
                  <p :style="{height:16 + 'px',width: ((radioPlayFlow == 1 ? item.p2p_flow : item.cdn_flow) / locationMax)*70 +'%', backgroundColor: '#297aff', marginRight: '6px'}"></p>
                  <span style="width: 15%" v-if="radioPlayFlow == 1">{{ item.p2p_flow | setbytes }}</span>
                  <span style="width: 15%" v-else>{{ item.cdn_flow | setbytes }}</span>
                </div>
              </div>
              <el-row type="flex" class="row_active" style="width: 63%;margin-top: 0;">
                <el-col :span="24">
                  <el-table :data="locationTableList" border max-height="750" style="margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="序号">
                      <template slot-scope="scope">
                        <div>{{ scope.row.index }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="省市">
                      <template slot-scope="scope">
                        <div>{{ scope.row.region }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="radioPlayFlow == 1 ? 'P2P播放流量' : 'CDN播放流量'">
                      <template slot-scope="scope">
                        <div v-if="radioPlayFlow == 1">{{scope.row.p2p_flow | setbytes}}</div>
                        <div v-else>{{scope.row.cdn_flow | setbytes}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="流量占比">
                      <template slot-scope="scope">
                        <div v-if="radioPlayFlow == 1">{{scope.row.p2pPercent | percentss}}</div>
                        <div v-else>{{scope.row.cdnPercent | percentss}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- <fenye style="float:right;margin:10px 0 0 0;" :currentPage="pageNo" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt"></fenye> -->
                </el-col>
              </el-row>
            </div>
          </div>
        <!-- </el-tab-pane>
        <el-tab-pane label="播放流量终端" name="four" :lazy="true"> -->
          <div v-show="type==1" class="seach">
            <el-input v-model="valueChannelId" placeholder="请输入渠道ID" @change="onChanges" style="width:160px;margin-right: 10px;">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueDomain" placeholder="请输入域名" style="width:160px;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueUrlName" placeholder="请输入加速内容名称" @change="onChanges" style="width:160px;margin-right: 10px;">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueRoomId" placeholder="请输入直播间ID" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueStreamName" placeholder="请输入直播流名称" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-select v-model="valueChanel" placeholder="全部节点渠道" @change="onChanges" style="width: 10%;margin-right: 10px;">
              <el-option label="全部" value="*"></el-option>
              <el-option v-for="(item, index) in hashidSets1" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <SelectTime @selectTime="selectTime" :type="'daterange'" />
          </div>
          <div v-show="type==1">
            <div v-show="accelerateType==0" id="myChartMap3" :style="{ height: '607px' }"></div>
            <div v-show="accelerateType==1" id="myChartMap4" :style="{ height: '607px' }"></div>
          </div>
        <!-- </el-tab-pane>
      </el-tabs> -->
    </section>
    <div v-show="type==0" class="device_table">
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <el-table v-show="accelerateType==0" :data="tableData" border max-height="750" style="width: 100%;" :cell-style="rowClass" :header-cell-style="headClass">
            <el-table-column label="加速内容名称" prop="urlname"></el-table-column>
            <el-table-column label="播放URL" width="250" prop="playurl"></el-table-column>
            <el-table-column label="P2P播放流量（%）">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;">
                  <div>{{ scope.row.p2pflow | setbytes }}</div>
                  <div>({{ scope.row.p2ppercent | percentss }})</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="CDN播放流量（%）">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;">
                  <div>{{ scope.row.cdnflow | setbytes }}</div>
                  <div>({{ scope.row.cdnpercent | percentss }})</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :render-header="renderHeader" label="节点有资源时CDN播放流量（%）" >
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;">
                  <div>{{ scope.row.cdnactiveflow | setbytes }}</div>
                  <div>({{ scope.row.cdnactivepercent | percentss }})</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :render-header="renderHeader" label="节点无资源时CDN播放流量（%）">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;">
                  <div>{{ scope.row.cdnpassiveflow | setbytes }}</div>
                  <div>({{ scope.row.cdnpassivepercent | percentss }})</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="加速播放次数" prop="times"></el-table-column>
            <el-table-column label="时间" prop="stime" :formatter="timeFormatter"></el-table-column>
          </el-table>
          <el-table v-show="accelerateType==1" :data="tableData" border max-height="750" style="width: 100%;" :cell-style="rowClass" :header-cell-style="headClass">
            <el-table-column label="直播间ID" prop="roomId"></el-table-column>
            <el-table-column label="P2P播放流量">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;">
                  <div>{{ scope.row.sumFlow | setbytes }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="有效访问次数" prop="sumCnt"></el-table-column>
            <el-table-column label="时间" prop="stime" :formatter="timeFormatter"></el-table-column>
          </el-table>
          <fenye style="float:right;margin:10px 0 0 0;" :currentPage="pageNo" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :pagesa="total_cnt"></fenye>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1, splitTimes } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import SelectTime from "@/components/SelectTime";
import ChangeType from "@/components/ChangeType";
import {
  sdk_flow,
  sdk_flow_table,
  sdk_flow_control,
  export_sdk_flow_table_file,
  export_sdk_flow_control_file,
  get_nodetype_enum,
  query_dataflow_location_table,
  query_dataflow_location_curve,
  export_dataflow_location_file,
  live_sdk_flow_control,
  live_sdk_flow_table,
  live_sdk_flow
} from "../../servers/api";
import echarts from "echarts";
import 'echarts/map/js/china.js';
import common from "../../comm/js/util";
import _ from "lodash";

export default {
  data() {
    return {
      type: 0,
      accelerateType: 0,
      dataAry: [],
      dataAry1: [],
      dataAry2: [],
      valueTerminalName: "",
      valueChanel: "",
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
      hashidSets1: [],
      valueDomain: "",
      valueChannelId: "",
      valueUrlName: "",
      valueRoomId: "",
      valueStreamName: "",
      tablecdn: [],
      tableData: [],
      activeName: "threed",
      timeUnit: 60,
      starttime: "",
      endtime: "",
      dataFlowArray: [], //图1
      timeArray: [], //图1
      dataFlowArray2: [], //图2
      timeArray2: [], //图2
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      total_cnt: 0, //数据总量
      dataFlownum: 0,
      flowunit: "",
      timeArrayZb: [],
      timeArrayZb1: [],
      dataZb1: [],
      dataZb3: [],
      dataZb2: [],
      totalp2p: 0,
      totalcdn: 0,
      validCnt: 0,
      timeArrayJk: [],
      dataJk1: [],
      dataJk2: [],
      dataJk3: [],
      dataJk4: [],
      radioPlayFlow: 1,
      locationCurveList: [],
      locationTableList: [],
      locationMax: '',
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
    setunit(data) {
      return common.formatByteActiveunit(data, 0);
    },
    setnum(data) {
      return common.formatByteNum(data, common.formatByteActiveunit(data, 0));
    },
    percentss(data) {
      if (data == 0) {
        return 0 + "%";
      }
      return (data * 100).toFixed(2) + "%";
    },
  },
  components: {
    fenye, SelectTime, ChangeType
  },
  mounted() {
    this.getNodeType();
    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.endtime = Date.parse(new Date()) / 1000;
    this.querySdkflow();
    this.querySdkflowTable();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;

  },
  methods: {
    selectType(v){
      this.accelerateType = v.accelerateType;
      this.reset();
      if(v.accelerateType==0){
        if(this.type==0){
          this.querySdkflow();
          this.querySdkflowTable();
        }else{
          this.querySdkflowControl();
        }
      }else{
        if(this.type==0){
          this.liveQuerySdkFlow();
        }else{
          this.liveSdkflowControl();
        }
      }
    },
    selectTime(val){
      this.starttime = val.starttime;
      this.endtime = val.endtime;
      this.pageNo = 1;
      this.changes();
    },
    changes(){
      if(this.accelerateType==0){
        if(this.activeName == 'threed'){
          this.querySdkflow();
          this.querySdkflowTable();
        }else{
          this.querySdkflowControl();
        }
      }else{
        if(this.activeName == 'threed'){
          this.liveQuerySdkFlow()
        }else{
          this.liveSdkflowControl()
        }
      }
    },
    reset(){
      this.valueChannelId = "";
      this.valueUrlName = "";
      this.valueRoomId = "";
      this.valueStreamName = "";
      this.valueChanel = "";
      this.valueTerminalName = "";
      this.valueDomain = "";
      this.validCnt = 0;
      this.totalp2p = 0;
      this.totalcdn = 0;
      this.$refs.selectTime.resetTimes();
      this.pageNo = 1;
      this.tableData = [];
      this.total_cnt = 0;
      this.timeArrayZb = [];
      this.timeArrayZb1 = [];
      this.dataZb1 = [];
      this.dataZb2 = [];
      this.dataZb3 = [];
      this.dataAry = [];
      this.dataAry1 = [];
      this.dataAry2 = [];
      this.timeArrayJk = [];
      this.dataJk1 = [];
      this.dataJk2 = [];
      this.dataJk3 = [];
      this.dataJk4 = [];
    },
    timeFormatter(row){
      if(this.timeUnit == 120){
        return this.common.getTimess(row.stime * 1000)
      }else{
        return this.common.getTimess(row.stime * 1000) + '~' + this.common.getTimess(row.etime * 1000)
      }
    },
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
    //获取页码
    handleCurrentChange(pages) {
      this.tableData = [];
      this.total_cnt = 0;
      this.validCnt = 0;
      this.totalp2p = 0;
      this.totalcdn = 0;
      this.changes();
    },
    handleSizeChange(pagetol) {
      this.pagesize = pagetol;
      // this.getuserlist();
    },
    onChanges() {
      this.changes();
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
          this.hashidSets1 = list;
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    getParams(){
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if(this.accelerateType == 0){
        params.urlName = this.valueUrlName ? this.valueUrlName : '*' ;
        params.domain = this.valueDomain ? this.valueDomain : "*";
      }
      if(this.accelerateType == 1){
        params.roomId = this.valueRoomId ? this.valueRoomId : '*';
        params.streamName = this.valueStreamName ? this.valueStreamName : '*';
      }
      params.channelId = this.valueChannelId ? this.valueChannelId : '*';
      params.terminalName = this.valueTerminalName ? parseInt(this.valueTerminalName) : -1;
      params.ipfsChannel = this.valueChanel ? this.valueChanel : "*";
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      this.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      return params;
    },
    //点播流量占比图
    querySdkflow() {
      let params = this.getParams();
      sdk_flow(params)
        .then(res => {
          if (res.status == 0) {
            this.totalp2p = res.data.totalp2p;
            this.totalcdn = res.data.totalcdn;
            if([
							...res.data.pdataArray,
							...res.data.cdnpassivearray,
							...res.data.cdnaactivearray,
							].length == 0){
							this.flowunit = 'B'
						}else{
							var max = _.max([
								...res.data.pdataArray,
								...res.data.cdnpassivearray,
								...res.data.cdnaactivearray,
							]);
							this.flowunit = this.common.formatByteActiveunit(max);
						};
            this.timeArrayZb = [];
            this.timeArrayZb1 = [];
            this.dataZb1 = [];
            this.dataZb2 = [];
            this.dataZb3 = [];
            if(res.data.pdataArray.length == 0&&res.data.cdnpassivearray.length == 0&&res.data.cdnaactivearray.length == 0){
							let arr = splitTimes(this.starttime, this.endtime, params.timeUnit);
							if (params.timeUnit == 120) {
								arr.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item));
								});
							} else {
								arr.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item, 1));
								});
							}
							this.dataZb1 = _.fill(Array(arr.length), 0);
							this.dataZb2 = _.fill(Array(arr.length), 0);
							this.dataZb3 = _.fill(Array(arr.length), 0);
							this.dataAry = _.fill(Array(arr.length), 0);
							this.dataAry1 = _.fill(Array(arr.length), 0);
							this.dataAry2 = _.fill(Array(arr.length), 0);
						}else{
              if(params.timeUnit== 120){
                res.data.timearray.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item));
                });
              }else{
                res.data.timearray.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item,11));
                });
              }
            
              this.dataZb1 = res.data.cdnaactivepercent;
              this.dataZb2 = res.data.cdnpassivepercent;
              this.dataZb3 = res.data.p2parray;
              this.dataAry = res.data.cdnaactivearray;
              this.dataAry1 = res.data.cdnpassivearray;
              this.dataAry2 = res.data.pdataArray;
            }
            this.drawLine2(this.timeArrayZb, this.dataZb1, this.dataZb2,this.dataZb3);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点播流量占比表
    querySdkflowTable() {
      let params = this.getParams();
      params.pageNo = this.pageNo - 1,
      params.pageSize = this.pageSize,
      sdk_flow_table(params)
        .then(res => {
          if (res.status == 0) {
            this.tableData = [];
            this.tableData = res.data.list;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点播流量终端
    querySdkflowControl() {
      let params = this.getParams();
      sdk_flow_control(params)
        .then(res => {
          if (res.status == 0) {
            if([
							...res.data.iospstreamarray,
							...res.data.ioscstreamarray,
							...res.data.andriodpstreamarray,
							...res.data.andriodcstreamarray
							].length == 0){
							this.flowunit = 'B'
						}else{
							var max = _.max([
								...res.data.iospstreamarray,
								...res.data.ioscstreamarray,
								...res.data.andriodpstreamarray,
								...res.data.andriodcstreamarray
							]);
							this.flowunit = this.common.formatByteActiveunit(max);
						}

            this.timeArrayJk = [];
            this.dataJk1 = [];
            this.dataJk2 = [];
            this.dataJk3 = [];
            this.dataJk4 = [];

            if(res.data.iospstreamarray.length == 0 && res.data.ioscstreamarray.length == 0 && res.data.andriodpstreamarray.length == 0 && res.data.andriodcstreamarray.length == 0){
							let arr = splitTimes(this.starttime, this.endtime, params.timeUnit);
							if (params.timeUnit == 60) {
								arr.forEach((item, index) => {
									this.timeArrayJk.push(getymdtime1(item));
								});
							} else {
								arr.forEach((item, index) => {
									this.timeArrayJk.push(getymdtime1(item, 1));
								});
							}
							this.dataJk1 = _.fill(Array(arr.length), 0);
							this.dataJk2 = _.fill(Array(arr.length), 0);
							this.dataJk3 = _.fill(Array(arr.length), 0);
							this.dataJk4 = _.fill(Array(arr.length), 0);
						}else{

              res.data.iospstreamarray.forEach((item, index) => {
                this.dataJk1.push(this.common.formatByteNum(item*1, this.flowunit));
              });
              res.data.ioscstreamarray.forEach((item, index) => {
                this.dataJk2.push(this.common.formatByteNum(item*1, this.flowunit));
              });
              res.data.andriodpstreamarray.forEach((item, index) => {
                this.dataJk3.push(this.common.formatByteNum(item*1, this.flowunit));
              });
              res.data.andriodcstreamarray.forEach((item, index) => {
                this.dataJk4.push(this.common.formatByteNum(item*1, this.flowunit));
              });

              res.data.timeArray.forEach((item, index) => {
                this.timeArrayJk.push(getymdtime1(item));
              });
            }
            this.drawLine3(
              this.timeArrayJk,
              this.dataJk1,
              this.dataJk2,
              this.dataJk3,
              this.dataJk4
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //直播播放流量占比
    liveQuerySdkFlow() {
      let params = this.getParams();
      live_sdk_flow(params)
        .then(res => {
          if (res.status == 0) {
            this.totalp2p = res.data.totalp2p;
            this.validCnt = res.data.validCnt;
            if(res.data.pdataArray.length == 0){
							this.flowunit = 'B'
						}else{
							var max = _.max(res.data.pdataArray);
							this.flowunit = this.common.formatByteActiveunit(max);
						};
            this.timeArrayZb = [];
            this.dataZb3 = [];
            if(res.data.pdataArray.length == 0){
							let arr = splitTimes(this.starttime, this.endtime, params.timeUnit);
							if (params.timeUnit == 120) {
								arr.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item));
								});
							} else {
								arr.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item, 1));
								});
							}
							this.dataZb3 = _.fill(Array(arr.length), 0);
							this.dataAry2 = _.fill(Array(arr.length), 0);
						}else{
              if(params.timeUnit== 120){
                res.data.timearray.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item));
                });
              }else{
                res.data.timearray.forEach((item, index) => {
                  this.timeArrayZb.push(getymdtime1(item,11));
                });
              };
              this.dataZb3 = res.data.pdataArray.map((item) =>
                this.common.formatByteNum(item, this.flowunit)
              );
              this.dataAry2 = res.data.pdataArray;
            }
            this.drawLiveLine2(this.timeArrayZb, this.dataZb3);
          }
        })
        .catch(error => {
          console.log(error);
        });
      
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize,
      live_sdk_flow_table(params)
        .then(res => {
          if (res.status == 0) {
            this.tableData = res.data.list;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //直播播放流量终端
    liveSdkflowControl() {
      let params = this.getParams();
      live_sdk_flow_control(params)
        .then(res => {
          if (res.status == 0) {
            if([
							...res.data.iospstreamarray,
							...res.data.andriodpstreamarray,
							].length == 0){
							this.flowunit = 'B'
						}else{
							var max = _.max([
								...res.data.iospstreamarray,
								...res.data.andriodpstreamarray
							]);
							this.flowunit = this.common.formatByteActiveunit(max);
						}

            this.timeArrayJk = [];
            this.dataJk1 = [];
            this.dataJk2 = [];

            if(res.data.iospstreamarray.length == 0 && res.data.andriodpstreamarray.length == 0){
							let arr = splitTimes(this.starttime, this.endtime, params.timeUnit);
							if (params.timeUnit == 60) {
								arr.forEach((item, index) => {
									this.timeArrayJk.push(getymdtime1(item));
								});
							} else {
								arr.forEach((item, index) => {
									this.timeArrayJk.push(getymdtime1(item, 1));
								});
							}
							this.dataJk1 = _.fill(Array(arr.length), 0);
							this.dataJk2 = _.fill(Array(arr.length), 0);
						}else{
              res.data.iospstreamarray.forEach((item, index) => {
                this.dataJk1.push(this.common.formatByteNum(item*1, this.flowunit));
              });
              res.data.andriodpstreamarray.forEach((item, index) => {
                this.dataJk2.push(this.common.formatByteNum(item*1, this.flowunit));
              });
              res.data.timeArray.forEach((item, index) => {
                this.timeArrayJk.push(getymdtime1(item));
              });
            }

            this.drawLiveLine3(
              this.timeArrayJk,
              this.dataJk1,
              this.dataJk2
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //播放流量分布图
    queryDataFlowLocation() {
      let params = this.getParams();
      query_dataflow_location_curve(params).then(res=>{
        if (res.status == 0) {
          this.locationCurveList = res.data.curveList // res.data.curveList;
          this.locationMax = this.radioPlayFlow == 1 ? _.max(res.data.curveList.map(v=>v.p2p_flow)) 
          : _.max(res.data.curveList.map(v=>v.cdn_flow));
          this.drawLine();
        }
      })
      .catch(error => {
        console.log(error);
      });

      query_dataflow_location_table(params).then(res=>{
        if (res.status == 0) {
          this.locationTableList = res.data.tableList.map((v, i)=>{v.index = i+1; return v});;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    //流量监控导出
    exoprtant_Ll() {
      let params = this.getParams();
      export_sdk_flow_control_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //流量占比导出
    exoprtant_Zb() {
      let params = this.getParams();
      export_sdk_flow_table_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 表头样式设置
    headClass() {
      return "text-align: center; background: #FDFBFB; font-weight: 500; color: #333";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    //选项卡
    handleClick(val) {
      this.type = val; 
      this.reset();
      this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.endtime = Date.parse(new Date()) / 1000;
      if (val == 0) {
        if(this.accelerateType == 0){
          this.querySdkflow();
          this.querySdkflowTable();
        }else{
          this.liveQuerySdkFlow();
        }
      } else if(val == 2){
        this.queryDataFlowLocation();
        this.$nextTick(() => {
          this.drawLine();
        });
      } else if (val == 1) {
        if(this.accelerateType==0){
          this.querySdkflowControl();
        }else{
          this.liveSdkflowControl();
        }
      }
    },

    handleClick1() {
      if (this.radioPlayFlow == 1) {
        this.locationMax = _.max(this.locationCurveList.map(v=>v.p2p_flow));
        this.drawLine()
      } else {
        this.locationMax = _.max(this.locationCurveList.map(v=>v.cdn_flow));
        this.drawLine()
      }
    },

    drawLine() {
      let data = [];
      let curveList = this.locationCurveList.sort((a,b)=>{return this.radioPlayFlow == 1 ? b.p2p_flow - a.p2p_flow : b.cdn_flow - a.cdn_flow})
      curveList.forEach(v=>{
        let obj = {};
        obj.name = v.region;
        obj.value = this.radioPlayFlow == 1 ? v.p2p_flow : v.cdn_flow;
        data.push(obj)
      })
      let myChart = this.$echarts.init(document.getElementById("myChartMap1"));
      window.onresize = myChart.resize;
      console.log(this.locationMax);
      let options =  {
            tooltip: {
              formatter:function(params,ticket, callback){
                let value = params.value ? common.formatByteActive(params.value) : 0;
                return params.name+'<br />'+params.seriesName+'：'+ value;
              }
            },
            visualMap: {
                min: 0,
                max: 1024*1024*500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                show:true
            },
            geo: {
                map: 'china',
                roam: false,
                zoom:1.23,
                label: {
                    normal: {
                        show: true,
                        fontSize:'10',
                        color: 'rgba(0,0,0,0.7)'
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        areaColor: '#F3B329',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series : [
                {
                    name: '播放流量',
                    type: 'map',
                    geoIndex: 0,
                    data: data
                }
            ]
        };
      myChart.setOption(options);
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
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAACVklEQVRIS9WVT0gUYRjGn+fT3NnVpFMQHSI6RFEnL3brD4Qys6mEEISi7mjQIRCCgiA6dAgCL4GH3F2XDtWlKNdcCYq9FVSnkOyvh4IIKsFyZnZrvjd2zDLd3F3bS99tmHee3/O9z/fNS1Rh2aY7HNbG4KUMc8vlWAV92JY3C5Eppb61X043flyqWT0AZAMEr7VPMzlpPF+EVAzoa5nbztpQGyHNgN4GcD2ALQBUICr4DOJwfDycLTyWDeiznD0KPA9gf6m2CpAX7R9LTjSkSgIGmmSdvyl3ESInyPINiSCVuGP00bbc98HONHsTE8bkUncDUYn44o0ROFDK9ZL3GlBn4uOhC0GLbMuVAEDdkUjX3/pdKCpmemMkzOXiIpgDOQOIAzBCyO6fGTiaqjuZDt34FfLfAP2mc0rIwMVCdngDqLj287dHMw3PAAbGCmvhmGqXStpG0vWP/jimxQDdlrO5DnwJIAzILESdfjX/IJnN7vterFW25Wb9vHSN3o28XXHRigH6TW9IKIMQPIaWjngm8m61DHr2zhip7FZvsabr4JeNobranUUz6OyUmkbX+0DBdN280TKc5dcKAg5KY6ZzhOS1ogC71WlGDa/nXaPpyj1+qlS8JCBmzh+nVtPxTPj+WsRLAnpaneZUJvJwreIlAf8ivPjtqhn8lwC/cM2F6mgiHbpajR3YltsLIAkwz5jlPiWwC4IXIhwSyIqxVxFU0VAiJ0EUZsUTxqK5dmh9s5JfcZlALaIPBfMgZnlRiD4LcgeBmjIFipaJwCcxRfLcSNrI/AC30TaaX55yXgAAAABJRU5ErkJggg==",
              onclick: function() {
                _this.exoprtant_Zb();
              },
              emphasis: {
                iconStyle: {
                  textFill: '#644CF7'
                }
              }
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['P2P播放流量','CDN播放有源流量', 'CDN播放无源流量'],
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].axisValue +
              "</br>" +
               "P2P播放流量:"+
              _this.common.formatByteActive(_this.dataAry2[params[0].dataIndex])+
              "("+(_this.dataZb3[params[0].dataIndex])+"%"+")" +
              "<br>" +
              "CDN播放有源流量:" +
              _this.common.formatByteActive(
                _this.dataAry[params[0].dataIndex]
              ) +"("+(_this.dataZb1[params[0].dataIndex])+"%"+")" +
              "</br>" +
              "CDN播放无源流量:" +
              _this.common.formatByteActive(_this.dataAry1[params[0].dataIndex])+
             
              "("+(_this.dataZb2[params[0].dataIndex])+"%"+")"
              
            );
            // }
          },
        },
        grid: {
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
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
            name: "P2P播放流量",
            type: "bar",
            stack: "使用情况",
            data: a,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {  color: '#644CF7' },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
                formatter: function(params) {
                  if (params.value > 0) {
                      return params.value;
                  } else {
                      return ' ';
                  }
                }
              },
            },
          },
          {
            name: "CDN播放有源流量",
            type: "bar",
            stack: "使用情况",
            data: y,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#FFB630',
              },
            },
          
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
                formatter: function(params) {
                  if (params.value > 0) {
                      return params.value;
                  } else {
                      return ' ';
                  }
                }
              },
            },
          },
          {
            name: "CDN播放无源流量",
            type: "bar",
            stack: "使用情况",
            data: z,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#FF7847',
              },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
                formatter: function(params) {
                  if (params.value > 0) {
                      return params.value;
                  } else {
                      return ' ';
                  }
                }
              },
            },
          }, 
        ],
      };
      myChart.setOption(options);
    },

    drawLiveLine2(x, a) {
      let _this = this;
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
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAACVklEQVRIS9WVT0gUYRjGn+fT3NnVpFMQHSI6RFEnL3brD4Qys6mEEISi7mjQIRCCgiA6dAgCL4GH3F2XDtWlKNdcCYq9FVSnkOyvh4IIKsFyZnZrvjd2zDLd3F3bS99tmHee3/O9z/fNS1Rh2aY7HNbG4KUMc8vlWAV92JY3C5Eppb61X043flyqWT0AZAMEr7VPMzlpPF+EVAzoa5nbztpQGyHNgN4GcD2ALQBUICr4DOJwfDycLTyWDeiznD0KPA9gf6m2CpAX7R9LTjSkSgIGmmSdvyl3ESInyPINiSCVuGP00bbc98HONHsTE8bkUncDUYn44o0ROFDK9ZL3GlBn4uOhC0GLbMuVAEDdkUjX3/pdKCpmemMkzOXiIpgDOQOIAzBCyO6fGTiaqjuZDt34FfLfAP2mc0rIwMVCdngDqLj287dHMw3PAAbGCmvhmGqXStpG0vWP/jimxQDdlrO5DnwJIAzILESdfjX/IJnN7vterFW25Wb9vHSN3o28XXHRigH6TW9IKIMQPIaWjngm8m61DHr2zhip7FZvsabr4JeNobranUUz6OyUmkbX+0DBdN280TKc5dcKAg5KY6ZzhOS1ogC71WlGDa/nXaPpyj1+qlS8JCBmzh+nVtPxTPj+WsRLAnpaneZUJvJwreIlAf8ivPjtqhn8lwC/cM2F6mgiHbpajR3YltsLIAkwz5jlPiWwC4IXIhwSyIqxVxFU0VAiJ0EUZsUTxqK5dmh9s5JfcZlALaIPBfMgZnlRiD4LcgeBmjIFipaJwCcxRfLcSNrI/AC30TaaX55yXgAAAABJRU5ErkJggg==",
              onclick: function() {
                _this.exoprtant_Zb();
              },
              emphasis: {
                iconStyle: {
                  textFill: '#644CF7'
                }
              }
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['P2P播放流量'],
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].axisValue +
              "</br>" +
               "P2P播放流量:"+
              _this.common.formatByteActive(_this.dataAry2[params[0].dataIndex])
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
          type: "value",
          name: _this.flowunit,
          axisLable: {
            formatter: (value, index) => {
              return _this.common.formatByteNum(value, _this.flowunit);
            },
          }
        },
        series: [
          {
            name: "P2P播放流量",
            type: "bar",
            data: a,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {  
                color: '#644CF7',
                label: {
                  show: false
                } 
              },
            }
          },
        ]
      };
      myChart.setOption(options);
    },

    drawLine3(a, b, c, d, e) {
      var dataTime = a;
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMap3"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量监控",
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
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAACVklEQVRIS9WVT0gUYRjGn+fT3NnVpFMQHSI6RFEnL3brD4Qys6mEEISi7mjQIRCCgiA6dAgCL4GH3F2XDtWlKNdcCYq9FVSnkOyvh4IIKsFyZnZrvjd2zDLd3F3bS99tmHee3/O9z/fNS1Rh2aY7HNbG4KUMc8vlWAV92JY3C5Eppb61X043flyqWT0AZAMEr7VPMzlpPF+EVAzoa5nbztpQGyHNgN4GcD2ALQBUICr4DOJwfDycLTyWDeiznD0KPA9gf6m2CpAX7R9LTjSkSgIGmmSdvyl3ESInyPINiSCVuGP00bbc98HONHsTE8bkUncDUYn44o0ROFDK9ZL3GlBn4uOhC0GLbMuVAEDdkUjX3/pdKCpmemMkzOXiIpgDOQOIAzBCyO6fGTiaqjuZDt34FfLfAP2mc0rIwMVCdngDqLj287dHMw3PAAbGCmvhmGqXStpG0vWP/jimxQDdlrO5DnwJIAzILESdfjX/IJnN7vterFW25Wb9vHSN3o28XXHRigH6TW9IKIMQPIaWjngm8m61DHr2zhip7FZvsabr4JeNobranUUz6OyUmkbX+0DBdN280TKc5dcKAg5KY6ZzhOS1ogC71WlGDa/nXaPpyj1+qlS8JCBmzh+nVtPxTPj+WsRLAnpaneZUJvJwreIlAf8ivPjtqhn8lwC/cM2F6mgiHbpajR3YltsLIAkwz5jlPiWwC4IXIhwSyIqxVxFU0VAiJ0EUZsUTxqK5dmh9s5JfcZlALaIPBfMgZnlRiD4LcgeBmjIFipaJwCcxRfLcSNrI/AC30TaaX55yXgAAAABJRU5ErkJggg==",
              onclick: function() {
                _this.exoprtant_Ll();
              },
              emphasis: {
                iconStyle: {
                  textFill: '#644CF7'
                }
              }
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ["IOS-P2P", "IOS-CDN", "Android-P2P", "Android-CDN"],
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            console.log(_this.flowunit)
            let str = "";
            params.forEach((item, index) => {
              if (index == 0) {
                str +=
                  item.axisValue +
                  "</br>" +
                  item.seriesName +
                  "：" +
                  item.value +
                  _this.flowunit +
                  "</br>";
              } else {
                str +=
                  item.seriesName +
                  "：" +
                  item.value +
                  _this.flowunit +
                  "</br>";
              }
            });
            return str;
          },
        },
        grid: {
          left: "4%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 100, // 默认60
        },
        xAxis: {
          data: a,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: _this.flowunit,
        
        },
        series: [
          {
            name: "IOS-P2P",
            type: "line",
            stack: "使用情况",
            data: b,
            smooth: false,
            symbol: "star", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#644CF7" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "IOS-CDN",
            type: "line",
            stack: "使用情况",
            data: c,
            smooth: false,
            symbol: "triangle", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#FFAF4F" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "Android-P2P",
            type: "line",
            stack: "使用情况",
            data: d,
            smooth: false,
            symbol: "pin", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#FF5A1E" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "Android-CDN",
            type: "line",
            stack: "使用情况",
            data: e,
            smooth: false,
            itemStyle: {
              normal: { color: "#5ED82D" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
        ],
      };
      myChart.setOption(options);
    },

    drawLiveLine3(a, b, c) {
      var dataTime = a;
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMap4"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量监控",
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
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAACVklEQVRIS9WVT0gUYRjGn+fT3NnVpFMQHSI6RFEnL3brD4Qys6mEEISi7mjQIRCCgiA6dAgCL4GH3F2XDtWlKNdcCYq9FVSnkOyvh4IIKsFyZnZrvjd2zDLd3F3bS99tmHee3/O9z/fNS1Rh2aY7HNbG4KUMc8vlWAV92JY3C5Eppb61X043flyqWT0AZAMEr7VPMzlpPF+EVAzoa5nbztpQGyHNgN4GcD2ALQBUICr4DOJwfDycLTyWDeiznD0KPA9gf6m2CpAX7R9LTjSkSgIGmmSdvyl3ESInyPINiSCVuGP00bbc98HONHsTE8bkUncDUYn44o0ROFDK9ZL3GlBn4uOhC0GLbMuVAEDdkUjX3/pdKCpmemMkzOXiIpgDOQOIAzBCyO6fGTiaqjuZDt34FfLfAP2mc0rIwMVCdngDqLj287dHMw3PAAbGCmvhmGqXStpG0vWP/jimxQDdlrO5DnwJIAzILESdfjX/IJnN7vterFW25Wb9vHSN3o28XXHRigH6TW9IKIMQPIaWjngm8m61DHr2zhip7FZvsabr4JeNobranUUz6OyUmkbX+0DBdN280TKc5dcKAg5KY6ZzhOS1ogC71WlGDa/nXaPpyj1+qlS8JCBmzh+nVtPxTPj+WsRLAnpaneZUJvJwreIlAf8ivPjtqhn8lwC/cM2F6mgiHbpajR3YltsLIAkwz5jlPiWwC4IXIhwSyIqxVxFU0VAiJ0EUZsUTxqK5dmh9s5JfcZlALaIPBfMgZnlRiD4LcgeBmjIFipaJwCcxRfLcSNrI/AC30TaaX55yXgAAAABJRU5ErkJggg==",
              onclick: function() {
                _this.exoprtant_Ll();
              },
              emphasis: {
                iconStyle: {
                  textFill: '#644CF7'
                }
              }
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ["IOS-P2P", "Android-P2P",],
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            console.log(_this.flowunit)
            let str = "";
            params.forEach((item, index) => {
              if (index == 0) {
                str +=
                  item.axisValue +
                  "</br>" +
                  item.seriesName +
                  "：" +
                  item.value +
                  _this.flowunit +
                  "</br>";
              } else {
                str +=
                  item.seriesName +
                  "：" +
                  item.value +
                  _this.flowunit +
                  "</br>";
              }
            });
            return str;
          },
        },
        grid: {
          left: "4%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 100, // 默认60
        },
        xAxis: {
          data: a,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: _this.flowunit,
        },
        series: [
          {
            name: "IOS-P2P",
            type: "line",
            data: b,
            smooth: false,
            symbol: "star", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#644CF7" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "Android-P2P",
            type: "line",
            data: c,
            smooth: false,
            symbol: "pin", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#FF5A1E" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          }
        ]
      };
      myChart.setOption(options);
    },
  },
};
</script>

<style lang="scss" scoped>
.top_title{
  text-align: left;
  font-size: 18px;
  color: #333;
  margin-top: 48px;
  .wrapperStyle{
      display: inline;
      margin-left: 54px;
      .itemStyle {
          font-weight: 500;
          display: inline;
          font-size: 16px;
          color: #666;
          margin-right: 48px;
          cursor: pointer;
          height: 20px;
      }
      .isSelected{
          color: #644CF7;
          border-bottom: 4px solid  #644CF7;
      }
  }
}
.device_table {
  background: #fff;
  padding: 72px 64px;
  border-radius: 32px;
  width: 100%;
  height: auto;
  .operating{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 20px;
  }
}
.user_item {
  width: 400px;
  height: auto;
  border-radius: 32px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .items {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .text {
      font-size: 16px;
      color: #333333;
      font-weight: 400;
    }
    .count {
      color: #333333;
      font-size: 40px;   
      font-weight: bold;
    }
  }
}
</style>
