<template>
  <div>
    <div class="top_title">播放详情统计
      <div class="wrapperStyle">
        <div class="itemStyle" :class="{ isSelected: type == 0 }" @click="handleClick(0)">播放信息统计</div>
        <div class="itemStyle" :class="{ isSelected: type == 1}" @click="handleClick(1)">播放异常统计</div>
      </div>
    </div>
    <section class="content">
      <ChangeType @selectType="selectType" type style="margin: 0px 0 37px"/>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="播放信息统计" name="first"> -->
            <div v-show="type==0" class="seach">
              <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" @change="onChanges">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==1" placeholder="请输入直播间ID" style="width:160px;margin-right: 10px;" v-model="valueRoomId" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==1" placeholder="请输入直播流名称" style="width:160px;margin-right: 10px;" v-model="valueStreamName" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==0" v-model="valuePlayUrl" placeholder="请输入播放URL" style="width:160px;margin-right: 10px;" @change="onChanges">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==0" v-model="valueContent" placeholder="请输入加速内容名称" style="width:160px;margin-right: 10px;" @change="onChanges">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-cascader style="width: 10%;margin-right: 10px;line-height: 36px;" placeholder="请选择播放区域" :options="hashidSet" ref="cascaderAddr" :show-all-levels="false" v-model="valueRegion" @change="onChanges"></el-cascader>
              <el-select v-show="accelerateType==0" v-model="valueIsp" placeholder="请选择运营商网络" style="width: 10%;margin-right: 10px;" @change="onChanges">
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>                
              <el-date-picker style="margin-right:10px;" v-model="times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes(0)"></el-date-picker>
              <el-button type="primary" @click="reset(0)">重置</el-button>
            </div>
            <div v-show="type==0" class="device_table">
              <div class="operating">
                <el-button style="margin-left: auto;" type="primary" @click="toExportVideoInfoExcel">导出</el-button>
              </div>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table v-show="accelerateType==0" :data="dibbleData" border max-height="800" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column prop="playurl" label="播放URL" width="250"></el-table-column>
                    <el-table-column prop="urlname" label="加速内容名称"></el-table-column>
                    <el-table-column prop="channelid" label="渠道ID"></el-table-column>
                    <el-table-column label="P2P播放流量">
                      <template slot-scope="scope">
                        <div>{{ scope.row.p2pflow | setbytes }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="CDN播放流量">
                      <template slot-scope="scope">
                        <div>{{ scope.row.Cdnflow | setbytes }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="P2PSwitchCount" label="P2P切换至CDN（次）"></el-table-column>
                    <el-table-column prop="CDNSwitchCount" label="CDN切换至P2P（次）"></el-table-column>
                    <el-table-column prop="region" label="播放区域（省市）"></el-table-column>
                    <el-table-column prop="isp" label="播放运营商网络"></el-table-column>
                    <el-table-column label="实际播放时间">
                        <template slot-scope="scope">
                            <div>{{ common.formatDays(scope.row.playtime*1000) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间">
                        <template slot-scope="scope">
                          <div>{{ common.getTimess(scope.row.fdate * 1000) }}</div>
                        </template>
                    </el-table-column>
                  </el-table>
                  <el-table v-show="accelerateType==1" :data="liveData" border max-height="800" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column prop="streamName" label="直播流名称"></el-table-column>
                    <el-table-column prop="liveAddr" label="直播流地址" width="250"></el-table-column>
                    <el-table-column prop="roomId" label="直播间ID"></el-table-column>
                    <el-table-column prop="channelId" label="渠道ID"></el-table-column>
                    <el-table-column label="P2P播放流量">
                      <template slot-scope="scope">
                        <div>{{ scope.row.p2pflow | setbytes }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="region" label="播放区域（省市）"></el-table-column>
                    <el-table-column prop="validCnt" label="有效访问数（次）"></el-table-column>
                    <el-table-column label="平均在线时长">
                        <template slot-scope="scope">
                            <div>{{ common.formatDays(scope.row.onlineTime*1000) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间">
                        <template slot-scope="scope">
                          <div>{{ common.getTimess(scope.row.fdate * 1000) }}</div>
                        </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage = "pageNo" :pagesa="total_cnt"></fenye>
                </el-col>
              </el-row>
            </div>
          <!-- </el-tab-pane>
          <el-tab-pane label="播放异常统计" name="second"> -->
            <div v-show="type==1" class="seach">
              <el-input placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" v-model="valueChannelId" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==1" placeholder="请输入直播间ID" style="width:160px;margin-right: 10px;" v-model="valueRoomId" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==1" placeholder="请输入直播流名称" style="width:160px;margin-right: 10px;" v-model="valueStreamName" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==0" placeholder="请输入加速内容名称" style="width:160px;margin-right: 10px;" v-model="valueContent" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-input v-show="accelerateType==0" placeholder="请输入播放URL" style="width:160px;margin-right: 10px;" v-model="valuePlayUrl" @change="onChanges">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-select v-model="exceptionType" style="margin-right: 10px;" placeholder="请选择播放异常类型" @change="onChanges">
                <el-option label="全部" value="-1"></el-option>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="exceptionStatus" style="margin-right: 10px;" placeholder="请选择播放异常原因" @change="onChanges">
                <el-option label="全部" value="-1"></el-option>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-date-picker style="margin-right:10px;" v-model="times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes(1)"></el-date-picker>
              <el-button type="primary" @click="reset(1)">重置</el-button>
            </div>
            <div v-show="type==1" class="device_table">
              <div class="operating">
                <el-button style="margin-left: auto;" type="primary" @click="toExportVideoExceptionExcel">导出</el-button>
              </div>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table v-show="accelerateType==0" :data="dibbleExceptionData" border max-height = "800" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="播放异常类型" prop="exceptionType" :formatter="typeFormat"></el-table-column>
                    <el-table-column label="播放异常原因"  prop="exceptionStatus" :formatter="statusFormat"></el-table-column>
                    <el-table-column label="加速内容名称" prop="urlname" width="250"></el-table-column>
                    <el-table-column label="播放URL" prop="playurl" width="300"></el-table-column>
                    <el-table-column label="渠道ID" prop="channelid"></el-table-column>
                    <el-table-column label="异常次数" prop="times"></el-table-column>
                    <el-table-column label="时间">
                      <template slot-scope="scope">
                        <div>{{ common.getTimess(scope.row.timereport*1000) }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table v-show="accelerateType==1" :data="liveExceptionData" border max-height = "800" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="播放异常类型" prop="exceptionType" :formatter="typeFormat"></el-table-column>
                    <el-table-column label="播放异常原因"  prop="exceptionStatus" :formatter="statusFormat"></el-table-column>
                    <el-table-column label="直播流名称" prop="streamName"></el-table-column>
                    <el-table-column label="直播流地址" prop="liveAddr"></el-table-column>
                    <el-table-column label="直播间ID" prop="roomId"></el-table-column>
                    <el-table-column label="渠道ID" prop="channelId"></el-table-column>
                    <el-table-column label="异常次数" prop="times"></el-table-column>
                    <el-table-column label="时间">
                      <template slot-scope="scope">
                        <div>{{ common.getTimess(scope.row.fdate*1000) }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage = "pageNo" :pagesa="total_cnt"></fenye>
                </el-col>
              </el-row>
            </div>
          <!-- </el-tab-pane>
        </el-tabs> -->
    </section>
  </div>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import ChangeType from "@/components/ChangeType";
import {
  video_info_statistics,
  video_exception_statistics,
  export_video_info_statistics_file,
  export_video_exception_statistics_file,
  live_exception_statistics,
  live_info_statistics,
  export_live_exception_statistics_file,
  export_live_info_statistics_file
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
      type: 0,
      accelerateType: 0,
      hashidSets: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "联通",
          label: "联通",
        },
        {
          value: "移动",
          label: "移动",
        },
        {
          value: "电信",
          label: "电信",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      hashidSet: [
        {
          value: "*",
          label: "全部地区",
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
      options: [
        {
          value: "0",
          label: "前置请求异常",
        },
        {
          value: "1",
          label: "播放异常",
        },
      ],
      options1: [
        {
          value: "0",
          label: "token验证失败",
        },
        {
          value: "1",
          label: "资源未回源",
        },
        {
          value: "2",
          label: "P2P加速禁用",
        },
        {
          value: "3",
          label: "无可用节点",
        },
        {
          value: "4",
          label: "请求异常",
        },
        {
          value: "5",
          label: " P2P播放超时",
        },
      ],
      valuePlayUrl: "",
      valueDomain: "",
      valueContent: "",
      valueChannelId: "",
      valueChanel: "",
      valueRegion: "",
      valueIsp: "",
      valueTerminal: "",
      valueRoomId: "",
      valueStreamName: "",
      exceptionStatus: "",
      exceptionType: "",
      dibbleData: [],
      dibbleExceptionData: [],
      activeName: "first",
      timeUnit: 120,
      starttime: "",
      endtime: "",
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      total_cnt: 1, //数据总量
      total_cnt1: 1, //数据总量
      liveData: [],
      liveExceptionData: [],
      times: []
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
    fenye, ChangeType
  },
  created() {
    let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.starttime = times;
    this.endtime = Date.parse(new Date()) / 1000;
    this.times[0] = this.common.getTimess(this.starttime*1000);
    this.times[1] = this.common.getTimess(this.endtime*1000);
    this.videoInfoStatistics();
  },
  beforeDestroy() {
  },
  methods: {
    selectType(v){
      this.accelerateType = v.accelerateType;
      if(v.accelerateType==0){
        if(this.type==0){
          this.dibbleData = [];
          this.videoInfoStatistics();
        }else{
          this.dibbleExceptionData = [];
          this.videoExceptionStatistics();
        }
      }else{
        if(this.type==0){
          this.liveData = [];
          this.liveInfoStatistics();
        }else{
          this.liveExceptionData = [];
          this.liveExceptionStatistics();
        } 
      }
    },
    ternimalFormatter (row, column) {
      if(row.terminalname == 0){
        return 'Android';
      }else if(row.terminalname == 1){
        return 'IOS';
      }else{
        return '其他';
      }
    },
    netTypeFormatter (row, column) {
      if(row.SDKNetType == 0){
        return 'WIFI';
      }else if(row.SDKNetType == 1){
        return '移动流量(3G/4G/5G)';
      }
    },
    curAccelFormatter(row, column){
      if(row.curAccelState == 0){
        return 'CDN';
      }else if(row.curAccelState == 1){
        return 'P2P';
      }
    },
    typeFormat(row, column){
      if(row.exceptionType == 0){
        return '前置请求异常';
      }else if(row.exceptionType == 1){
        return '播放异常';
      }
    },
    statusFormat(row, column) {
      if(row.exceptionStatus == 0){
        return 'token验证失败';
      }else if(row.exceptionStatus == 1){
        return '资源未回源';
      }if(row.exceptionStatus == 2){
        return 'P2P加速禁用';
      }else if(row.exceptionStatus == 3){
        return '无可用节点';
      }else if(row.exceptionStatus == 4){
        return '请求异常';
      }else if(row.exceptionStatus == 5){
        return 'P2P播放超时';
      }
    },
    //获取播放信息统计每页数量
    handleSizeChange(pagetol) {
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      if(this.accelerateType == 0){
        if(this.activeName == 'first'){
          this.videoInfoStatistics();
        }else{
          this.videoExceptionStatistics();
        }
      }else{
        if(this.activeName == 'first'){
          this.liveInfoStatistics();
        }else{
          this.liveExceptionStatistics();
        }
      }
    },
    //自定义时间
    gettimes(cal) {
      if(cal == 0){
        this.starttime = this.times ? dateToMs(this.times[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = this.times ? dateToMs(this.times[1]) + (24*60*60-1) : Date.parse(new Date()) / 1000;
      }else{
        this.starttime = this.times ? dateToMs(this.times[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = this.times ? dateToMs(this.times[1]) + (24*60*60-1) : Date.parse(new Date()) / 1000;
      }
      if (this.endtime - this.starttime <= 86400) {
        this.timeUnit = 60 * 2;
      } else if (this.endtime - this.starttime > 86400) {
        this.timeUnit = 60 * 24;
      }
      this.onChanges();
    },
    onChanges() {
      if(this.accelerateType == 0){
        if(this.activeName == 'first'){
          this.pageNo = 1;
          this.videoInfoStatistics();
        }else{
          this.pageNo = 1;
          this.videoExceptionStatistics();
        }
      }else{
        if(this.activeName == 'first'){
          this.pageNo = 1;
          this.liveInfoStatistics();
        }else{
          this.pageNo = 1;
          this.liveExceptionStatistics();
        }
      }
    },
    //重置
    reset(param) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.valuePlayUrl = "";
      this.valueChannelId = "";
      this.valueContent = "";
      this.valueRoomId = "";
      this.valueStreamName = "";
      this.times = [];
      this.valueIsp = "";
      this.valueRegion = "";
      this.pageNo = 1;
      this.total_cnt = 0;
      this.exceptionStatus = "";
      this.exceptionType = "";
      if(this.accelerateType == 0){
        if(param == 0){
          this.videoInfoStatistics();
        }else{
          this.videoExceptionStatistics();
        }
      }else{
        if(param == 0){
          this.liveInfoStatistics();
        }else{
          this.liveExceptionStatistics();
        }
      }
    },
    //点播播放信息统计
    videoInfoStatistics() {
      let params = new Object();
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
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
      if (this.valueRegion[1]) {
        params.region = this.valueRegion[1];
      } else {
        params.region = "*";
      }

      if (this.valueIsp != "" && this.valueIsp != "全部") {
        params.isp = this.valueIsp;
      } else {
        params.isp = "*";
      }
      if (this.valuePlayUrl !== "") {
        params.playUrl = this.valuePlayUrl;
      } else {
        params.playUrl = "*";
      }

      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      video_info_statistics(params)
        .then(res => {
            this.dibbleData = res.data.data;
            this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点播播放异常统计
    videoExceptionStatistics(){
      let params = new Object();
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
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
      if (this.valuePlayUrl) {
        params.playUrl = this.valuePlayUrl;
      } else {
        params.playUrl = "*";
      }
      if (this.exceptionType != "") {
        params.exceptionType = parseInt(this.exceptionType);
      } else {
        params.exceptionType = -1;
      }
      if (this.exceptionStatus != "") {
        params.exceptionStatus = parseInt(this.exceptionStatus);
      } else {
        params.exceptionStatus = -1;
      }

      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      video_exception_statistics(params)
        .then(res => {
            this.dibbleExceptionData = res.data.data;
            this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //直播播放信息统计
    liveInfoStatistics() {
      let params = new Object();
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueRoomId !== "") {
        params.roomId = this.valueRoomId;
      } else {
        params.roomId = "*";
      }
      if (this.valueStreamName !== "") {
        params.streamName = this.valueStreamName;
      } else {
        params.streamName = "*";
      }
      if (this.valueRegion[1]) {
        params.region = this.valueRegion[1];
      } else {
        params.region = "*";
      }

      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      live_info_statistics(params)
        .then(res => {
            this.liveData = res.data.data.data;
            this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //直播播放异常统计
    liveExceptionStatistics() {
      let params = new Object();
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.valueChannelId !== "") {
        params.channelId = this.valueChannelId;
      } else {
        params.channelId = "*";
      }
      if (this.valueRoomId) {
        params.roomId = this.valueRoomId;
      } else {
        params.roomId = "*";
      }
      if (this.valueStreamName) {
        params.streamName = this.valueStreamName;
      } else {
        params.streamName = "*";
      }
      if (this.exceptionType != "") {
        params.exceptionType = parseInt(this.exceptionType);
      } else {
        params.exceptionType = -1;
      }
      if (this.exceptionStatus != "") {
        params.exceptionStatus = parseInt(this.exceptionStatus);
      } else {
        params.exceptionStatus = -1;
      }
      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      live_exception_statistics(params)
        .then(res => {
            this.liveExceptionData = res.data.data.data;
            this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //导出播放信息统计
    toExportVideoInfoExcel(){
      let params = new Object();
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
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
      if (this.valueRegion[1]) {
        params.region = this.valueRegion[1];
      } else {
        params.region = "*";
      }

      if (this.valueIsp != "" && this.valueIsp != "全部") {
        params.isp = this.valueIsp;
      } else {
        params.isp = "*";
      }
      if (this.valuePlayUrl !== "") {
        params.playUrl = this.valuePlayUrl;
      } else {
        params.playUrl = "*";
      }

      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_video_info_statistics_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });

    },

    //导出播放异常统计
    toExportVideoExceptionExcel(){
      let params = new Object();
      params.pageNo = this.pageNo1 - 1;
      params.pageSize = this.pageSize1;
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
      if (this.valuePlayUrl) {
        params.playUrl = this.valuePlayUrl;
      } else {
        params.playUrl = "*";
      }
      if (this.exceptionType != "") {
        params.exceptionType = parseInt(this.exceptionType);
      } else {
        params.exceptionType = -1;
      }
      if (this.exceptionStatus != "") {
        params.exceptionStatus = parseInt(this.exceptionStatus);
      } else {
        params.exceptionStatus = -1;
      }

      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      export_video_exception_statistics_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    //选项卡
    handleClick(val) {
      this.type = val;
      this.valuePlayUrl = "";
      this.valueChannelId = "";
      this.valueContent = "";
      this.valueRoomId = "";
      this.valueStreamName = "";
      this.times = [];
      this.valueIsp = "";
      this.valueRegion = "";
      this.pageNo = 1;
      this.total_cnt = 0;
      this.exceptionStatus = "";
      this.exceptionType = "";
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      if (val == 0) {
        this.times[0] = this.common.getTimess(this.starttime*1000);
        this.times[1] = this.common.getTimess(this.endtime*1000);
        if(this.accelerateType == 0){
          this.videoInfoStatistics();
        }else{
          this.liveInfoStatistics()
        }
      } else if (val == 1) {
        this.times[0] = this.common.getTimess(this.starttime*1000);
        this.times[1] = this.common.getTimess(this.endtime*1000);
        if(this.accelerateType == 0){
          this.videoExceptionStatistics();
        }else{
          this.liveExceptionStatistics();
        }
      }
    },
    // 表头样式设置
    headClass() {
      return "text-align: center; background: #FDFBFB; font-weight: 500; color: #333";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
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
</style>
