<template>
<div @click="closeSel">
  <section class="content">
    <div class="top_title">节点流量用量
      <div class="wrapperStyle">
        <div class="itemStyle" :class="{ isSelected: accelerateType == 0 }" @click="changeType(0)">点播加速</div>
        <div class="itemStyle" :class="{ isSelected: accelerateType == 1}" @click="changeType(1)">直播加速</div>
      </div>
    </div>
    <div class="seach" style="margin-bottom: 40px;">
      <el-input
        v-model="valueChannelId"
        placeholder="请输入渠道ID"
        style="width:10%;margin-right: 10px;"
        @keyup.enter.native="onChanges"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
      </el-input>
      <el-input
        v-show="accelerateType==1"
        v-model="valueChannelId"
        placeholder="请输入直播间ID"
        style="width:10%;margin-right: 10px;"
        @keyup.enter.native="onChanges"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
      </el-input>
      <el-input
        v-show="accelerateType==1"
        v-model="valueChannelId"
        placeholder="请输入直播流名称"
        style="width:10%;margin-right: 10px;"
        @keyup.enter.native="onChanges"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
      </el-input>
      <el-input
        v-show="accelerateType==0"
        v-model="valueDomain"
        placeholder="请输入域名"
        style="width:10%;margin-right: 10px;"
        @keyup.enter.native="onChanges"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
      </el-input>
      <el-input
        v-show="accelerateType==0"
        v-model="valueContent"
        placeholder="请输入加速内容名称"
        style="width:10%;margin-right: 10px;"
        @keyup.enter.native="onChanges"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onChanges()"></i>
      </el-input>
      <el-select
        v-model="valueIpfsChannel"
        placeholder="全部节点渠道"
        style="width: 10%;margin-right: 10px;"
        @change="onChanges"
      >
        <el-option label="全部" value="*"></el-option>
        <el-option
          v-for="(item, index) in hashidSets"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <SelectTime ref="selectTime" @selectTime="selectTime" :type="'daterange'" />
    </div>
    <div style="display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; flex-wrap: wrap;">
      <div class="user_item" style="margin-right: 95px;margin-bottom: 30px;">
        <div class="item_left" style="margin: 0 30px 22px 0;">
          <div class="item_text" style="text-align:left;">总流量</div>
          <div class="item_count" style="text-align:center;">
            <span>{{ totalYl | setbytes }}</span>
          </div>
        </div>
        <img width="83px" height="260px" src="../../assets/img/backfemale.png" /> 
      </div>
      <div style="flex: 1; min-width: 400px;">
        <!-- <div class="device_form"> -->
          <div id="myChartMap" :style="{ height: '438px' }"></div>
          <div style=" display: flex; justify-content: flex-start;position: relative; margin-top:40px;">
              <div style="width: 150px;height: 40px;border: 1px solid #C0C4CC;color: #000;text-align:center;line-height:40px;margin-right:30px;border-radius: 28px;">用户对比</div>
              <el-button type="primary" style="height: 40px;" icon="el-icon-plus" id="sellineName" @click="showduibi">添加对比</el-button>
              <div
                v-show="duibi"
                style="width: 234px; position: absolute; left: 300px; z-index: 100;height: 350px;border-radius: 5px;box-shadow: -1px 5px 10px -3px;"
                class="shopw"
                id="shopw"
              >
                <el-table
                  ref="multipleTable"
                  :data="optionssearch"
                  tooltip-effect="dark"
                  :header-cell-class-name="cellClass"
                  style="width:234px;background:#fff;"
                  height="350"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="30"></el-table-column>
                  <el-table-column align="right" width="200">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入用户id"
                        @keyup.enter.native="searchid"
                      />
                    </template>
                    <template slot-scope="scope">{{ scope.row.label }}</template>
                  </el-table-column>
                </el-table>
              </div>
          </div>
          
        <!-- </div> -->
      </div>
    </div>
  </section>
  <div class="device_table">
    <el-row type="flex" class="row_active">
      <el-col :span="23">
        <el-table
          :data="tablecdn"
          border
          style="width: 100%; max-height: 530px; overflow-y: auto;"
          :cell-style="rowClass"
          :header-cell-style="headClass"
        >
          <el-table-column label="总流量">
            <template slot-scope="scope">
              <div>{{ scope.row.dataFlow | setbytes }}</div>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="time" :formatter="timeFormatter"></el-table-column>
        </el-table>
        <fenye
          style="float:right;margin:10px 0 0 0;"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :pagesa="total_cnt"
          :currentPage="pageNo"
        ></fenye>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1, splitTimes } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import SelectTime from "@/components/SelectTime";
import {
  cloudUserList,
  manage_dataflow_curve,
  manage_dataflow_table,
  export_manage_dataflow_table_file,
  get_nodetype_enum,
  live_manage_dataflow_curve,
  live_manage_dataflow_table,
  export_live_manage_dataflow_table_file
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";
import _ from "lodash";

export default {
  data() {
    return {
      search: "",
      valueDomain: "",
      valueIpfsChannel: "",
      valueRoomId: "",
      valueStreamName: "",
      duibi: false,
      hashidSets: [],
      chanIds: [],
      optionssearch: [],
      valueChannelId: "",
      showzdyz: false,
      accelerateType: 0,
      valueContent: "",
      tablecdn: [],
      activeName: "first",
      timeUnit: 120,
      starttime: "",
      endtime: "",
      dataFlowArray: [], //图1
      timeArray: [], //图1
      dataFlowArray2: [], //图2
      timeArray2: [], //图2
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      total_cnt: 1, //数据总量
      pageActive: 0,
      pageActive1: 0,
      flowunit: "",
      totalYl: 0,
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
  },
  components: { fenye, SelectTime },
  mounted() {
    this.querychanId();
    this.getNodeType();
    let monitorUrlname = this.$route.query.monitorUrlname;
    if (monitorUrlname) {
      this.valueContent = monitorUrlname;
    } else {
      this.valueContent = "";
    }
    let monitorChanId = this.$route.query.monitorChanId;
    if (monitorChanId) {
      this.valueChannelId = monitorChanId;
    } else {
      this.valueChannelId = "";
    }
    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.endtime = Date.parse(new Date()) / 1000;
    this.gettable1();
    this.gettable2();
  },
  filters: {
    settimes(data) {
      var stat = getymdtime(data);
      return stat;
    },
    setbytes(data) {
      return common.formatByteActive(data);
    },
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
    changeType(v){
      this.accelerateType = v;
      this.tablecdn = [];
      this.totalYl = 0;
      this.pageNo = 1;
      this.timeArray = [];
      this.dataFlowArray = [];
      this.$refs.selectTime.resetTimes();
      this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.endtime = Date.parse(new Date()) / 1000;
      if(v.accelerateType==0){
        this.gettable1();
        this.gettable2();
      }else{
        this.liveDataFlowCurve();
      }
    },
    selectTime(val){
      this.starttime = val.starttime;
      this.endtime = val.endtime;
      this.tablecdn = [];
      this.totalYl = 0;
      if(this.accelerateType == 0){
        this.gettable1();
        this.gettable2();
      }else{
        this.liveDataFlowCurve();
      }
    },
    //  统计时间段
    timeFormatter(row, column){
      if(this.timeUnit == 120){
        let startTime = row.time * 1000;
        let endTime = (row.time + 2*60*60 -1) * 1000
        return this.common.getTimes(startTime) + '-' + this.common.getTimes(endTime)
      }else{
        return this.common.getTimess(row.time * 1000)
      }
    },

    closeSel(event) {
      var currentCli = document.getElementById("sellineName");
      var shopw = document.getElementById("shopw");
      if (currentCli || shopw) {
        if (
          !currentCli.contains(event.target) &&
          !shopw.contains(event.target)
        ) {
          //点击到了id为sellineName以外的区域，隐藏下拉框
          this.duibi = false;
        }
      }
    },
    showduibi() {
      this.duibi = !this.duibi;
    },
    searchid() {
      this.pageActive1 = 0;
      this.optionssearch = [];
      this.querychanId(this.search);
    },
    handleSelectionChange(val) {
      let arrlist = [];
      if (val.length > 0) {
        val.forEach((item) => {
          arrlist.push(String(item.value));
        });
        this.chanIds = arrlist;
        this.gettable1(arrlist);
        this.gettable2(arrlist);
      } else {
        this.chanIds = [];
        this.gettable1(val);
        this.gettable2(val);
      }
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        //你需要判断的条件
        return "disabledCheck";
      }
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      if(this.accelerateType==0){
        this.gettable2();
      }else{
        this.liveDataFlowCurve()
      }
      
    },
    //获取每页数量
    handleSizeChange(pagetol) {
      this.pageSize = pagetol;
    },
    //图表导出
    exoprtant_Yl() {
      this.dataFlowArray = [];
      this.timeArray = [];
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valueContent) {
        params.urlName = this.valueContent;
      } else {
        params.urlName = "*";
      }
      if (this.chanIds.length == 0) {
        if (this.valueChannelId == "") {
          params.channelId = "*";
        } else {
          params.channelId = this.valueChannelId;
        }
      } else {
        let nowstr = this.chanIds.join(",");
        params.channelId = nowstr;
      }
      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }
      if (this.valueIpfsChannel != "") {
        params.ipfsChannel = this.valueIpfsChannel;
      } else {
        params.ipfsChannel = "*";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      (params.pageNo = 0),
        (params.pageSize = 10),
        export_manage_dataflow_table_file(params)
          .then((res) => {
            if (res.status == 0) {
              window.open(res.msg, "_blank");
            }
          })
          .catch((err) => {});
    },
    //输入渠道ID查询
    onChanges() {
      this.pageNo = 1;
      this.gettable1();
      this.gettable2();
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

    //查询用户id
    querychanId(data) {
      let param = new Object();
      if (!data || data == "") {
        param.search = "";
      } else {
        param.search = data + "";
      }
      param.status = null;
      param.start_ts = "";
      param.end_ts = "";
      param.order = "time_create desc";
      param.page = this.pageActive1;
      cloudUserList(param)
        .then((res) => {
          if (res.status == 0) {
            if (data) {
              let obj = {};
              obj.value = res.result.cols[0].id;
              obj.label = res.result.cols[0].id;
              this.optionssearch.push(obj);
            } else {
              let tempArr = [];
              res.result.cols.forEach((item, index) => {
                let obj = {};
                obj.value = item.id;
                obj.label = item.id;
                tempArr.push(obj);
              });

              this.optionssearch = this.optionssearch.concat(tempArr);
              if (res.result.les_count == 0) {
                return false;
              } else {
                this.pageActive1++;
                this.querychanId();
              }
            }
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getdataActive() {},
    showzdyzs() {
      this.showzdyz = !this.showzdyz;
    },
    /** 请求数据 */
    //点播节点流量用量图
    gettable1(data) {
      this.dataFlowArray = [];
      this.timeArray = [];
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valueContent) {
        params.urlName = this.valueContent;
      } else {
        params.urlName = "*";
      }
      if (this.chanIds.length > 0) {
        // let temparr1 = [];
        // temparr1 = data;
        // temparr1.push(parseInt(this.valueChannelId));
        params.channelId = this.chanIds;
      } else {
        if (this.valueChannelId !== "") {
          params.channelId = [];
          params.channelId.push(this.valueChannelId);
        } else {
          params.channelId = [];
        }
      }

      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }
      if (this.valueIpfsChannel != "") {
        params.ipfsChannel = this.valueIpfsChannel;
      } else {
        params.ipfsChannel = "*";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      this.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      (params.pageNo = 0),
        (params.pageSize = 10),
        manage_dataflow_curve(params)
          .then((res) => {
            this.totalYl = res.data.total;
            let nowlengh = res.data.data.length;
            let nowtemp = res.data.data;
            this.curveData = res.data.data;
            let nowarr = [];
            let childlist = [];
            let arrs = [];
            _(res.data.data).forEach(item=>{
              arrs.push(item.dataflowArray)
            });
            if(_.flatten(arrs).length == 0){
              this.flowunit = "B";
            }else{
              let max = _.max(_.flatten(arrs));
              this.flowunit = this.common.formatByteActiveunit(max);
            }

            if(res.data.data[0].dataflowArray.length == 0){
							let arr = splitTimes(this.starttime, this.endtime, this.timeUnit);							
							arr.forEach((item, index) => {
								this.timeArray.push(getymdtime1(item));
							});;
              let obj = {};
              obj.type = "bar";
              obj.barGap = "6%";
              obj.barMaxWidth = 30;
              obj.data = _.fill(Array(arr.length), 0);
              this.curveData[0].dataflowArray = _.fill(Array(arr.length), 0);
              nowarr.push(obj);
						}else{
              for (var i = 0; i < nowlengh; i++) {
                childlist.push(res.data.data[i].channelid);
                let obj = {};
                obj.type = "bar";
                obj.barGap = "6%";
                (obj.barMaxWidth = 30), (obj.name = res.data.data[i].channelid);
                let nowarr1 = [];
                nowtemp[i].dataflowArray.forEach((item, index) => {
                  nowarr1.push(this.common.formatByteNum(item, this.flowunit));
                });
                obj.data = nowarr1;
                nowarr.push(obj);
              }
              res.data.data[0].timeArray.forEach((item, index) => {
                this.timeArray.push(getymdtime1(item));
              });
            }
            this.drawLine(nowarr, this.timeArray, childlist);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    //点播节点流量用量表
    gettable2(data) {
      this.dataFlowArray = [];
      this.timeArray = [];
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      params.pageNo = this.pageNo - 1;
      params.pageSize = 10;
      // params.chanId = this.chanid + "";
      if (this.valueContent) {
        params.urlName = this.valueContent;
      } else {
        params.urlName = "*";
      }

      if (this.chanIds.length > 0) {
        params.channelId = this.chanIds;
      } else {
        if (this.valueChannelId !== "") {
          params.channelId = [];
          params.channelId.push(this.valueChannelId);
        } else {
          params.channelId = [];
        }
      }
      if (this.valueDomain !== "") {
        params.domain = this.valueDomain;
      } else {
        params.domain = "*";
      }
      if (this.valueIpfsChannel != "") {
        params.ipfsChannel = this.valueIpfsChannel;
      } else {
        params.ipfsChannel = "*";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      this.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      manage_dataflow_table(params)
        .then((res) => {
          if (res.status == 0) {
            this.tablecdn = res.data.list;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //直播节点流量用量图
    liveDataFlowCurve(data) {
      this.dataFlowArray = [];
      this.timeArray = [];
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      if (this.chanIds.length > 0) {
        params.channelId = this.chanIds;
      } else {
        if (this.valueChannelId !== "") {
          params.channelId = [];
          params.channelId.push(this.valueChannelId);
        } else {
          params.channelId = [];
        }
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
      if (this.valueIpfsChannel != "") {
        params.ipfsChannel = this.valueIpfsChannel;
      } else {
        params.ipfsChannel = "*";
      }
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      this.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;
      live_manage_dataflow_curve(params)
        .then((res) => {
          this.totalYl = res.data.total;
          let nowlengh = res.data.data.length;
          let nowtemp = res.data.data;
          this.curveData = res.data.data;
          let nowarr = [];
          let childlist = [];
          let arrs = [];
          _(res.data.data).forEach(item=>{
            arrs.push(item.dataflowArray)
          });
          if(_.flatten(arrs).length == 0){
            this.flowunit = "B";
          }else{
            let max = _.max(_.flatten(arrs));
            this.flowunit = this.common.formatByteActiveunit(max);
          }
          if(res.data.data[0].dataflowArray.length == 0){
            let arr = splitTimes(this.starttime, this.endtime, this.timeUnit);							
            arr.forEach((item, index) => {
              this.timeArray.push(getymdtime1(item));
            });;
            let obj = {};
            obj.type = "bar";
            obj.barGap = "6%";
            obj.barMaxWidth = 30;
            obj.data = _.fill(Array(arr.length), 0);
            this.curveData[0].dataflowArray = _.fill(Array(arr.length), 0);
            nowarr.push(obj);
          }else{
            for (var i = 0; i < nowlengh; i++) {
              childlist.push(res.data.data[i].channelid);
              let obj = {};
              obj.type = "bar";
              obj.barGap = "6%";
              (obj.barMaxWidth = 30), (obj.name = res.data.data[i].channelid);
              let nowarr1 = [];
              nowtemp[i].dataflowArray.forEach((item, index) => {
                nowarr1.push(this.common.formatByteNum(item, this.flowunit));
              });
              obj.data = nowarr1;
              nowarr.push(obj);
            }
            res.data.data[0].timeArray.forEach((item, index) => {
              this.timeArray.push(getymdtime1(item));
            });
          }
          this.drawLine(nowarr, this.timeArray, childlist);
        })
        .catch((err) => {
          console.log(err);
        });

      live_manage_dataflow_table(params)
        .then((res) => {
          if (res.status == 0) {
            this.tablecdn = res.data.list;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch((err) => {
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
    drawLine(x, y, idlist) {
      let _this = this;
      let myChart = echarts.init(document.getElementById("myChartMap")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      let list = idlist.map(v => {return v+''})
      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function (map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          ),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };

      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance,
            },
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: "#fff",
          },
        },
      };
      let options = {
        color: [
          "#644CF7",
          "#FFBA19",
          "#8FDD21",
          "#3292D6",
          "#FF6E51",
          "#FF517F",
        ],
        tooltip: {
          trigger: "axis",
              formatter: function(params) {
                console.log(_this.curveData)
              let str =params[0].name;
              for(var i = 0; i < params.length; i++){
                if(params[i].seriesName.includes("series")){
                  console.log(params[i])
                  console.log(_this.curveData[i], '=========', _this.curveData[i].dataflowArray[params[i].dataIndex])
                  str += "<br>" + common.formatByteActive(Number(_this.curveData[0].dataflowArray[params[i].dataIndex])); // + _this.flowunit;
                }else{
                  // console.log(_this.curveData[i].dataflowArray[i])
                  console.log(_this.curveData[i], '=========', _this.curveData[i].dataflowArray[params[i].dataIndex])
                  str += "<br>" + params[i].seriesName + ": " + common.formatByteActive(Number(_this.curveData[0].dataflowArray[params[i].dataIndex]));
                }
                
              }
              return str;
              // return (
              //   params[0].name +
              //   "<br>" +
              //   params[0].seriesName +
              //   ":" +
              //   params[0].data +
              //   _this.flowunit
              // );
            },
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          // show: true,
          itemSize: 20,
					itemGap: 30,
					right: 30,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAACVklEQVRIS9WVT0gUYRjGn+fT3NnVpFMQHSI6RFEnL3brD4Qys6mEEISi7mjQIRCCgiA6dAgCL4GH3F2XDtWlKNdcCYq9FVSnkOyvh4IIKsFyZnZrvjd2zDLd3F3bS99tmHee3/O9z/fNS1Rh2aY7HNbG4KUMc8vlWAV92JY3C5Eppb61X043flyqWT0AZAMEr7VPMzlpPF+EVAzoa5nbztpQGyHNgN4GcD2ALQBUICr4DOJwfDycLTyWDeiznD0KPA9gf6m2CpAX7R9LTjSkSgIGmmSdvyl3ESInyPINiSCVuGP00bbc98HONHsTE8bkUncDUYn44o0ROFDK9ZL3GlBn4uOhC0GLbMuVAEDdkUjX3/pdKCpmemMkzOXiIpgDOQOIAzBCyO6fGTiaqjuZDt34FfLfAP2mc0rIwMVCdngDqLj287dHMw3PAAbGCmvhmGqXStpG0vWP/jimxQDdlrO5DnwJIAzILESdfjX/IJnN7vterFW25Wb9vHSN3o28XXHRigH6TW9IKIMQPIaWjngm8m61DHr2zhip7FZvsabr4JeNobranUUz6OyUmkbX+0DBdN280TKc5dcKAg5KY6ZzhOS1ogC71WlGDa/nXaPpyj1+qlS8JCBmzh+nVtPxTPj+WsRLAnpaneZUJvJwreIlAf8ivPjtqhn8lwC/cM2F6mgiHbpajR3YltsLIAkwz5jlPiWwC4IXIhwSyIqxVxFU0VAiJ0EUZsUTxqK5dmh9s5JfcZlALaIPBfMgZnlRiD4LcgeBmjIFipaJwCcxRfLcSNrI/AC30TaaX55yXgAAAABJRU5ErkJggg==",
              onclick: function () {
                _this.exoprtant_Yl();
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
          data: list,
          bottom: 20,
        },
        grid: {
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 30, // 默认60
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: y,
          },
        ],
        yAxis: [
          {
            name: _this.flowunit,
            type: "value",
          },
        ],
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 50,
            throttle: 10,
            zoomLock: false,
            show: false,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 50,
          },
        ],
        series: x,
      };
      myChart.clear();
      myChart.setOption(options);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table /deep/.disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}
.el-table /deep/.disabledCheck .cell:before {
  content: "";
  position: absolute;
  right: 11px;
}

.user_item {
  background: #FDFBFB;
  width: 324px;
  height: 438px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding: 36px 71px;
  .item_left {
    width: 49%;
    height: 58px;
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
</style>
