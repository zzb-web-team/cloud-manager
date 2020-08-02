<template>
  <section class="myself-container content">
    <div class="top_title">播放详情统计</div>
    <div class="user-title" style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="播放信息统计" name="first">
                <div style="display: flex;flex-flow: row;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                <el-input v-model="valueChannelId" placeholder="请输入渠道ID" style="width:160px;margin-right: 10px;"></el-input>
                <el-input v-model="valueDomain" placeholder="请输入域名" style="width:160px;margin-right: 10px;"></el-input>
                <el-input v-model="valueContent" placeholder="请输入加速内容名称" style="width:160px;margin-right: 10px;"></el-input>
                <el-select v-model="valueChanel" placeholder="全部节点渠道" style="width: 10%;margin-right: 10px;">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-select v-model="valueTerminal" placeholder="全部终端类型" style="width: 10%;margin-right: 10px;">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option v-for="(item, index) in hashidSet" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-date-picker style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                <el-button style="margin-left:10px;" type="primary" @click="search">确定</el-button>
                </div>
                <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                    <el-table :data="tableZb" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
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
                                <div>({{ scope.row.Cdnflow | setbytes }})</div>
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
                        <el-table-column label="播放终端IP列表" width="300">
                            <template slot-scope="scope">
                                <div>{{ scope.row.SDKIPList }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="播放终端类型" prop="terminalname" :formatter="ternimalFormatter">
                            <!-- <template slot-scope="scope">
                                <div>{{ scope.row.terminalname }}</div>
                            </template> -->
                        </el-table-column>
                        <el-table-column label="播放终端网络" prop="SDKNetType" :formatter="netTypeFormatter">
                            <!-- <template slot-scope="scope">
                                <div>{{ scope.row.SDKNetType }}</div>
                            </template> -->
                        </el-table-column>
                        <el-table-column label="当前加速通道" prop="curAccelState" :formatter="curAccelFormatter">
                            <!-- <template slot-scope="scope">
                                <div>{{ scope.row.curAccelState }}</div>
                            </template> -->
                        </el-table-column>
                        <el-table-column label="实际播放时间">
                            <template slot-scope="scope">
                                <div>{{ scope.row.Playtime }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="播放开始-结束时间">
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
                        </el-table-column>
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
                            <el-input placeholder="请输入渠道ID、加速内容名称、播放URL" style="width:300px" v-model="searchText" class="input-with-select" @keyup.enter.native="searchInfo" maxlength="70">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <div @click="getShow()" class="div_show" style="color:#606266">
                                筛选
                                <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
                            </div>
                        </el-row>
                        <el-row type="flex" class="row_activess" v-show="showState">
                            <el-form-item label="播放异常类型：" style="display: flex;">
                                <el-select v-model="exceptionType" placeholder="请选择" >
                                  <el-option label="全部" value="-1"></el-option>
                                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="播放异常原因：" style="display: flex;">
                                <el-select v-model="exceptionStatus" placeholder="请选择">
                                  <el-option label="全部" value="-1"></el-option>
                                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="时间：" style="display: flex;">
                                 <el-date-picker style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="search1">确定</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="reset()">重置</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
                <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                    <el-table :data="tableZb1" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
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
                        <el-table-column label="统计时间">
                            <template slot-scope="scope">
                              <div>{{ scope.row.startTim | settimes }}</div>
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
      hashidSet: [
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
      hashidSets: [
        {
          value: "1",
          label: "云链",
        },
        {
          value: "2",
          label: "西柚机",
        },
        {
          value: "3",
          label: "其他",
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
      ],
      valueDomain: "",
      valueContent: "",
      valueChannelId: "",
      valueChanel: "",
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
      this.starttime = dateToMs(this.val2[0]);
      this.endtime = dateToMs(this.val2[1]);
      if (this.endtime - this.starttime <= 86400) {
        this.timeUnit = 60 * 2;
      } else if (this.endtime - this.starttime > 86400) {
        this.timeUnit = 60 * 24;
      }
    },
    //重置
    reset() {
      this.searchText = "";
      this.exceptionStatus = "";
      this.exceptionType = "";
      this.val2=[];
      this.pageSize1 = 1
      this.videoExceptionStatistics();
    },
    //播放信息统计
    videoInfoStatistics() {
      let params = new Object();
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      if (this.valueContent) {
        params.urlname = this.valueContent;
      } else {
        params.urlname = "*";
      }
      if (this.valueChannelId !== "") {
        params.channelid = this.valueChannelId;
      } else {
        params.channelid = "*";
      }
      if (this.valueChanel != "") {
        params.ipfschanel = parseInt(this.valueChanel);
      } else {
        params.ipfschanel = -1;
      }
      if (this.valueTerminal != "") {
        params.terminalname = parseInt(this.valueTerminal);
      } else {
        params.terminalname = -1;
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
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      var reg = /^\d{12}$/;
      if(this.searchText != ""){
        if(reg.test(this.searchText)){
          params.urlname = "*";
          params.channelid = this.searchText;
          params.playurl = "*";
        }else if(this.searchText.startsWith('http')){
          params.urlname = "*";
          params.channelid = "*";
          params.playurl = this.searchText;
        }else{
          params.urlname = this.searchText;
          params.channelid = "*";
          params.playurl = "*";
        }
      }else{
        params.urlname = "*";
        params.channelid = "*";
        params.playurl = "*";
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
