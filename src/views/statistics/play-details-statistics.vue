<template>
  <section class="myself-container content">
    <div class="top_title">播放详情统计</div>
    <div class="user-title" style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="播放信息统计" name="first">
                <div style="display: flex;flex-flow: row;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
                <el-input v-model="valueDomain" placeholder="请输入域名" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
                <el-input v-model="valueContent" placeholder="请输入加速内容名称" style="width:160px;margin-right: 10px;" @change="onChanges"></el-input>
                <el-cascader style="width: 10%;margin-right: 10px;line-height: 36px;" placeholder="请选择播放区域" :options="hashidSet" ref="cascaderAddr" :show-all-levels="false" v-model="valueRegion" @change="onChanges"></el-cascader>
                <el-select v-model="valueIsp" placeholder="请选择运营商网络" style="width: 10%;margin-right: 10px;" @change="onChanges">
                  <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                
                <el-date-picker style="margin-left:10px;" v-model="val2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                <!-- <el-button style="margin-left:10px;" type="primary" @click="search">确定</el-button> -->
                </div>
                <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                    <el-table :data="tableZb" border max-height="550" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                        <el-table-column label="播放URL">
                        <template slot-scope="scope">
                            <div>{{ scope.row.playurl }}</div>
                        </template>
                        </el-table-column>

                        <el-table-column label="加速内容名称">
                            <template slot-scope="scope">
                                <div>{{ scope.row.urlname }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="渠道ID">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center;">
                                <div>{{ scope.row.channelid }}</div>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="P2P加速流量">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center;">
                                <div>{{ scope.row.p2pflow | setbytes }}</div>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="CDN加速流量">
                            <template slot-scope="scope">
                                <div style="display: flex;justify-content: center;">
                                <div>{{ scope.row.Cdnflow | setbytes }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="P2P切换至CDN（次）">
                            <template slot-scope="scope">
                                <div>{{ scope.row.P2PSwitchCount }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="CDN切换至P2P（次）">
                            <template slot-scope="scope">
                                <div>{{ scope.row.CDNSwitchCount }}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="播放终端IP列表" width="300">
                            <template slot-scope="scope">
                                <div>{{ scope.row.SDKIPList }}</div>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="播放区域（省市）" >
                            <template slot-scope="scope">
                                <div>{{ scope.row.region }}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="播放终端类型" prop="terminalname" :formatter="ternimalFormatter">
                            <template slot-scope="scope">
                                <div>{{ scope.row.terminalname }}</div>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="播放运营商网络">
                            <template slot-scope="scope">
                                <div>{{ scope.row.isp }}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="当前加速通道" prop="curAccelState" :formatter="curAccelFormatter">
                            <template slot-scope="scope">
                                <div>{{ scope.row.curAccelState }}</div>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="实际播放时间">
                            <template slot-scope="scope">
                                <div>{{ common.formatDays(scope.row.playtime*1000) }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="时间">
                            <template slot-scope="scope">
                              <div>{{ scope.row.fdate | settimes }}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="播放开始-结束时间">
                            <template slot-scope="scope">
                                <div>{{ scope.row.playstartTime | settimes }}</div>
                                <div>{{ scope.row.playendTime | settimes }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="统计时间">
                            <template slot-scope="scope">
                                <div>{{ scope.row.startTime | settimes }}</div>
                                <div>{{ scope.row.endTime | settimes }}</div>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :pagesa="total_cnt"></fenye>
                    </el-col>
                </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="播放异常统计" name="second">
                <div class="device_form">
                    <el-form ref="form">
                        <el-row type="flex">
                            <el-input placeholder="请输入渠道ID、加速内容名称、播放URL" style="width:300px" v-model="searchText" class="input-with-select"  @change="onChanges" maxlength="70">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <div @click="getShow()" class="div_show" style="color:#606266">
                                筛选
                                <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
                            </div>
                        </el-row>
                        <el-row type="flex" class="row_activess" v-show="showState">
                            <el-form-item label="播放异常类型：" style="display: flex;">
                              <el-select v-model="exceptionType" placeholder="请选择" @change="onChanges">
                                <el-option label="全部" value="-1"></el-option>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="播放异常原因：" style="display: flex;">
                              <el-select v-model="exceptionStatus" placeholder="请选择" @change="onChanges">
                                <el-option label="全部" value="-1"></el-option>
                                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="时间：" style="display: flex;">
                              <el-date-picker style="margin-left:10px;" v-model="val2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                            </el-form-item>
                            <!-- <el-form-item>
                                <el-button type="primary" @click="search1">确定</el-button>
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" @click="reset()">重置</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
                <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                    <el-table :data="tableZb1" border max-height = "530px" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                        <el-table-column label="播放异常类型" prop="exceptionType" :formatter="typeFormat">
                        <!-- <template slot-scope="scope">
                            <div>{{ scope.row.exceptionType }}</div>
                        </template> -->
                        </el-table-column>

                        <el-table-column label="播放异常原因"  prop="exceptionStatus" :formatter="statusFormat">
                        <!-- <template slot-scope="scope">
                            <div>{{ scope.row.exceptionStatus }}</div>
                        </template> -->
                        </el-table-column>
                        <el-table-column label="加速内容名称">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center;">
                                <div>{{ scope.row.urlname }}</div>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="播放URL">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center;">
                                <div>{{ scope.row.playurl }}</div>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="渠道ID" >
                            <template slot-scope="scope">
                                <div style="display: flex;justify-content: center;">
                                <div>{{ scope.row.channelid }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="异常次数">
                            <template slot-scope="scope">
                              <div>{{ scope.row.times }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="时间">
                            <template slot-scope="scope">
                              <div>{{ scope.row.timereport | settimes }}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye>
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
import { dateToMs, getymdtime, getymdtime1 } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
  video_info_statistics,
  video_exception_statistics
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
      showState: false,
      rotate: false,
      searchText: '',
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
      valueDomain: "",
      valueContent: "",
      valueChannelId: "",
      valueChanel: "",
      valueRegion: "",
      valueIsp: "",
      valueTerminal: "",
      exceptionStatus: "",
      exceptionType: "",
      shoudzyx: false,
      showzdyz: false,
      tableZb: [],
      tableZb1: [],
      activeName: "first",
      activeName1: "first",
      val2: [],
      timeUnit: 120,
      starttime: "",
      endtime: "",
      dataFlowArray: [], //图1
      timeArray: [], //图1
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      pageSize1: 10, //每页数量
      pageNo1: 1, //当前页码
      total_cnt: 1, //数据总量
      total_cnt1: 1, //数据总量
      chanid: "",
      flowunit: "",
      timeArrayZb: [],
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
    let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.starttime = times;
    this.endtime = Date.parse(new Date()) / 1000;
    this.videoInfoStatistics();
  },
  beforeDestroy() {
  },
  methods: {
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
    getShow() {
      this.showState = !this.showState;
      this.rotate = !this.rotate;
    },
    //搜索
    search(){
      this.pageNo = 1;
      this.pageSize = 10;
      this.videoInfoStatistics();
    },
    search1(){
      this.pageNo1 = 1;
      this.pageSize1 = 10;
      this.videoExceptionStatistics();
    },
    //获取播放信息统计每页数量
    handleSizeChange(pagetol) {
      this.pageSize = pagetol;
      this.videoInfoStatistics();
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      this.videoInfoStatistics();
    },
    //获取加速流量每页数量
    handleSizeChange1(pagetol) {
      this.pagesize1 = pagetol;
      this.videoExceptionStatistics();
    },
    //获取页码
    handleCurrentChange1(pages) {
      this.pageNo1 = pages;
      this.videoExceptionStatistics();
    },
    //自定义时间
    gettimes(cal) {
      // alert(cal)
      if(cal){
        this.starttime = dateToMs(this.val2[0]);
        this.endtime = dateToMs(this.val2[1]);
        if (this.endtime - this.starttime <= 86400) {
          this.timeUnit = 60 * 2;
        } else if (this.endtime - this.starttime > 86400) {
          this.timeUnit = 60 * 24;
        }
      }else{
        let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.starttime = times;
        this.endtime = Date.parse(new Date()) / 1000;
      }
      if(this.activeName == 'first'){
        this.pageNo = 1;
        this.videoInfoStatistics();
      }else{
        this.pageNo = 1;
        this.videoExceptionStatistics();
      }
      
    },
    onChanges() {

      if(this.activeName == 'first'){
        this.pageNo = 1;
        this.videoInfoStatistics();
      }else{
        this.pageNo = 1;
        this.videoExceptionStatistics();
      }
    },
    //重置
    reset() {
      this.searchText = "";
      this.exceptionStatus = "";
      this.exceptionType = "";
      this.val2=[];
      this.pageSize1 = 10;
      this.pageNo1 = 1;
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.videoExceptionStatistics();
    },
    //播放信息统计
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
      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }

      params.timeUnit = 60;
      this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      video_info_statistics(params)
        .then(res => {
            this.tableZb = res.data.data;
            this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },

    videoExceptionStatistics(){
      let params = new Object();
      params.pageNo = this.pageNo1 - 1;
      params.pageSize = this.pageSize1;
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      var reg = /^\d{12}$/;
      if(this.searchText != ""){
        if(reg.test(this.searchText)){
          params.urlName = "*";
          params.channelId = this.searchText;
          params.playUrl = "*";
        }else if(this.searchText.startsWith('http')){
          params.urlName = "*";
          params.channelId = "*";
          params.playUrl = this.searchText;
        }else{
          params.urlName = this.searchText;
          params.channelId = "*";
          params.playUrl = "*";
        }
      }else{
        params.urlName = "*";
        params.channelId = "*";
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
            this.tableZb1 = res.data.data;
            this.total_cnt1 = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //选项卡
    handleClick(tab, event) {
      this.val2= [];
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      if (tab.index == 0) {
        this.videoInfoStatistics();
      } else if (tab.index == 1) {
        this.videoExceptionStatistics();
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
