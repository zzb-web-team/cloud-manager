<template>
  <div>
    <section class="myself-container content">
      <div class="top_title">播放流量
        <div class="wrapperStyle">
          <div class="itemStyle" :class="{ isSelected: accelerateType == 0 }" @click="changeType(0)">点播加速</div>
          <div class="itemStyle" :class="{ isSelected: accelerateType == 1}" @click="changeType(1)">直播加速</div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
        <el-tab-pane label="播放流量占比" name="threed" :lazy="true">
          <div class="seach">
            <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueDomain" placeholder="请输入域名" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueUrlName" placeholder="请输入加速内容名称" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueRoomId" placeholder="请输入直播间ID" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueStreamName" placeholder="请输入直播流名称" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
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
          <div class="user_item">
            <div class="item_left">
              <div class="item_count" style="text-align:center;">
                <span>{{totalp2p |setbytes}}</span>
              </div>
              <div class="item_text" style="text-align:center;">P2P播放流量</div>
            </div>
            <div class="item_right">
              <div class="item_count" style="text-align:center;">
                <span v-if="accelerateType==0">{{totalcdn |setbytes}}</span>
                <span v-else>{{validCnt}}</span>
              </div>
              <div v-show="accelerateType==0" class="item_text" style="text-align:center;">CDN播放流量</div>
              <div v-show="accelerateType==1" class="item_text" style="text-align:center;">有效访问次数</div>
            </div>
            <img src="../../assets/img/pic1.png" />
          </div>
          <div class="device_table">
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
        </el-tab-pane>
        <el-tab-pane label="播放流量分布" name="second" :lazy="true">
          <div style="display: flex;align-items: center; flex-flow: row; margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
            <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <SelectTime @selectTime="selectTime" :type="'daterange'" />
          </div>
          <div class="device_form">
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
          
          <div class="devide_table">
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
        </el-tab-pane>
        <el-tab-pane label="播放流量终端" name="four" :lazy="true">
          <div class="seach">
            <el-input v-model="valueChannelId" placeholder="请输入渠道ID" @change="onChanges" style="width:160px;margin-right: 10px;">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueDomain" placeholder="请输入域名" style="width:160px;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==0" v-model="valueUrlName" placeholder="请输入加速内容名称" @change="onChanges" style="width:160px;margin-right: 10px;">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueRoomId" placeholder="请输入直播间ID" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-input v-show="accelerateType==1" v-model="valueStreamName" placeholder="请输入直播流名称" style="width: 10%;margin-right: 10px;" @keyup.enter.native="onChanges">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
            </el-input>
            <el-select v-model="valueChanel" placeholder="全部节点渠道" @change="onChanges" style="width: 10%;margin-right: 10px;">
              <el-option label="全部" value="*"></el-option>
              <el-option v-for="(item, index) in hashidSets1" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <SelectTime @selectTime="selectTime" :type="'daterange'" />
          </div>
          <div>
            <div id="myChartMap3" :style="{ height: '607px' }"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <div class="device_form" v-show="activeName=='threed'">
      <div id="myChartMap2" :style="{ height: '650px' }"></div>
    </div>
  </div>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1, splitTimes } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import SelectTime from "@/components/SelectTime";
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
    percentss(data) {
      if (data == 0) {
        return 0 + "%";
      }
      return (data * 100).toFixed(2) + "%";
    },
  },
  components: {
    fenye, SelectTime
  },
  mounted() {
    this.$nextTick(function () {
			this.$refs.tabs.$children[0].$refs.tabs[1].style.display="none";
		})
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
    changeType(v){
      this.accelerateType = v;
      this.activeName = 'threed';
      this.reset();
      if(v==0){
        this.querySdkflow();
        this.querySdkflowTable();
      }else{
        this.liveQuerySdkFlow();
      }
    },
    selectTime(val){
      this.starttime = val.starttime;
      this.endtime = val.endtime;
      this.changes();
    },
    changes(){
      if(this.accelerateType==0){
        if(this.activeName == 'first'){
          this.querySdkflow();
          this.querySdkflowTable();
        }else{
          this.querySdkflowControl();
        }
      }else{
        if(this.activeName == 'first'){
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
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.valueUrlName) {
        params.urlName = this.valueUrlName;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueChanel !== "") {
        params.ipfsChannel = this.valueChanel;
      } else {
        params.ipfsChannel = "*";
      }
      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }
      params.timeUnit = this.common.timeUnitActive1(
        this.starttime,
        this.endtime
      );
      this.timeUnit = this.common.timeUnitActive1(
        this.starttime,
        this.endtime
      );
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
            // this.dataJk1 = res.data.iospstreamarray;
            // this.dataJk2 = res.data.ioscstreamarray;
            // this.dataJk3 = res.data.andriodpstreamarray;
            // this.dataJk4 = res.data.andriodcstreamarray;
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
            // this.dataJk1 = res.data.iospstreamarray;
            // this.dataJk2 = res.data.ioscstreamarray;
            // this.dataJk3 = res.data.andriodpstreamarray;
            // this.dataJk4 = res.data.andriodcstreamarray;
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
    //播放流量分布图
    queryDataFlowLocation() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;

      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }

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
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.valueUrlName) {
        params.urlName = this.valueUrlName;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueChanel !== "") {
        params.ipfsChannel = this.valueChanel;
      } else {
        params.ipfsChannel = "*";
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
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.valueUrlName) {
        params.urlName = this.valueUrlName;
      } else {
        params.urlName = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueTerminalName !== "") {
        params.terminalName = parseInt(this.valueTerminalName);
      } else {
        params.terminalName = -1;
      }
      if (this.valueChanel !== "") {
        params.ipfsChannel = this.valueChanel;
      } else {
        params.ipfsChannel = "*";
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
    handleClick(tab, event) {
      this.reset();
      if (tab.index == 0) {
        if(this.accelerateType == 0){
          this.querySdkflow();
          this.querySdkflowTable();
        }else{
          this.liveQuerySdkFlow();
        }
      } else if(tab.index == 1){
        this.queryDataFlowLocation();
        this.$nextTick(() => {
          this.drawLine();
        });
      } else if (tab.index == 2) {
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
            name: "P2P播放流量",
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
                color: '#84C1FF',
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
                color: '#2894FF',
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
                color: '#2894FF',
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
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_Ll();
              },
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
              normal: { color: "#E8505B" },
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
              normal: { color: "#14B1AB" },
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
              normal: { color: "#F2C33C" },
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
              normal: { color: "#5970CC" },
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
  },
};
</script>

<style lang="scss" scoped>
.user_item {
  width: auto;
  height: auto;
  background: #FDFBFB;
  border-radius: 32px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 36px 71px;
  .item_left {
    width: 33%;
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
    width: 33%;
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
