<template>
  <div>
    <section class="myself-container content">
      <div class="top_title">SDK版本统计</div>
      <div class="seach">
          <el-date-picker style="margin-right:10px;" v-model="val2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes(0)"></el-date-picker>
      </div>
      <div class="device_table">
        <el-row type="flex" class="row_active">
          <el-col :span="24" style="text-align:left;font-weight: bold;padding-left: 10px;">版本分布明细数据</el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
            <el-table :span-method="objectSpanMethod" :data="tableZb" border max-height="800" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                <el-table-column prop="sdkType" label="SDK应用类型" :formatter="formattType">
                </el-table-column>
                <el-table-column label="版本" prop="sdkVersion">
                </el-table-column>
                <el-table-column label="版本用户" prop="userCnt">
                </el-table-column>
                <el-table-column label="占比">
                  <template slot-scope="scope">
                    <div style="display: flex;justify-content: center;">
                      <div>{{ scope.row.percent | percentss }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="版本用户清单">
                  <template slot-scope="scope">
                    <el-button @click="view(scope.$index, scope.row)" class="lab_btn" type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <!-- <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage = "pageNo" :pagesa="total_cnt"></fenye> -->
            </el-col>
        </el-row>
      </div>

      <el-dialog :title="title" :visible.sync="dialogTableVisible" width="50%">
        <el-table :data="tableData" border>
          <el-table-column property="channelId" label="渠道ID"></el-table-column>
          <el-table-column label="安装时间">
            <template slot-scope="scope">
              <div style="display: flex;justify-content: center;">
                <div>{{ scope.row.timeReport | settimes }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </section>
    <div class="device_form">
      <el-radio-group
        v-model="radios"
        size="medium"
        @change="select()"
        style="display: flex;justify-content: center;"
      >
        <el-radio-button label="0">Android</el-radio-button >
        <el-radio-button label="1">IOS</el-radio-button >
      </el-radio-group>
      <div id="myChart1" :style="{ height: '650px' }"></div>
    </div>
  </div>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
  query_sdk_version_curve,
  query_sdk_version_userList,
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
      val2: [],
      radios: 0,
      val3: [],
      timeUnit: 120,
      starttime: "",
      endtime: "",
      androidUsers: [],
      androidVersions: [],
      iosUsers: [],
      iosVersions: [],
      tableZb: [],
      dialogTableVisible: false,
      title: '',
      tableData: [],
      androidData: [],
      iosData: []
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
  created() {
    let times = new Date().getTime() / 1000;
    this.starttime = times - 24 * 60 * 60 * 29;
    this.endtime = Date.parse(new Date()) / 1000;
    this.val2[0] = this.common.getTimess(this.starttime*1000);
    this.val2[1] = this.common.getTimess(this.endtime*1000);
    this.val3[0] = this.common.getTimess(this.starttime*1000);
    this.val3[1] = this.common.getTimess(this.endtime*1000);
    this.sdkVersionStatistics();
  },
  beforeDestroy() {
  },
  methods: {
    formattType(row){
      return row.sdkType == 0 ? 'Android' : 'IOS';
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }){
      if (columnIndex === 0 ){
        if(rowIndex == 0){
          return {
            rowspan: this.androidVersions.length,
            colspan: 1
          };
        }else if(rowIndex == this.androidVersions.length){
          return {
            rowspan: this.iosVersions.length,
            colspan: 1
          };
        }else{
          return{
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    //搜索
    search(){
      this.pageNo = 1;
      this.pageSize = 10;
      this.sdkVersionStatistics();
    },
    search1(){
      this.pageNo1 = 1;
      this.pageSize1 = 10;
      this.sdkVersionStatistics();
    },
    //获取播放信息统计每页数量
    handleSizeChange(pagetol) {
      this.pageSize = pagetol;
      this.sdkVersionStatistics();
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      this.sdkVersionStatistics();
    },
    //获取加速流量每页数量
    handleSizeChange1(pagetol) {
      this.pagesize1 = pagetol;
      this.sdkVersionStatistics();
    },
    //获取页码
    handleCurrentChange1(pages) {
      this.pageNo1 = pages;
      this.sdkVersionStatistics();
    },
    //自定义时间
    gettimes(cal) {
      if(cal == 0){
        this.starttime = this.val2 ? dateToMs(this.val2[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = this.val2 ? dateToMs(this.val2[1]) + (24*60*60-1) : Date.parse(new Date()) / 1000;
      }else{
        this.starttime = this.val3 ? dateToMs(this.val3[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = this.val3 ? dateToMs(this.val3[1]) + (24*60*60-1) : Date.parse(new Date()) / 1000;
      }
      if (this.endtime - this.starttime <= 86400) {
        this.timeUnit = 60 * 2;
      } else if (this.endtime - this.starttime > 86400) {
        this.timeUnit = 60 * 24;
      }
      this.sdkVersionStatistics();
    },
    onChanges() {
      if(this.activeName == 'first'){
        this.pageNo = 1;
        this.sdkVersionStatistics();
      }else{
        this.pageNo1 = 1;
        this.sdkVersionStatistics();
      }
    },
    //android,ios
    select(){
      if (this.radios == 0) {
        this.tableZb = this.androidData;
        this.drawLine(this.androidUsers, this.androidVersions);
      }else{
        this.tableZb = this.iosData;
        this.drawLine(this.iosUsers, this.iosVersions);
      }
    },
    //查看
    view(i, row){
      console.log(i, row);
      this.title = row.sdkType == 0 ? 'android-' + row.sdkVersion + '版本用户' : 'ios-' + row.sdkVersion + '版本用户';
      this.sdkDetailStatistics(row.sdkType, row.sdkVersion);
      setTimeout(() => {
        this.dialogTableVisible = true;
      }, 1000);
    },
    //播放信息统计
    sdkVersionStatistics() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;

      query_sdk_version_curve(params)
        .then(res => {
            this.androidData = res.data.data.filter(v=>v.sdkType == 0);
            this.androidUsers = this.androidData.map(v=>v.userCnt);
            this.androidVersions = this.androidData.map(v => v.sdkVersion);
            this.iosData = res.data.data.filter(v=>v.sdkType == 1);
            this.iosUsers = this.iosData.map(v=>v.userCnt);
            this.iosVersions = this.iosData.map(v => v.sdkVersion)
            this.radios == 0 ? this.drawLine(this.androidUsers, this.androidVersions) : this.drawLine(this.iosUsers, this.iosVersions);
            this.tableZb = this.radios == 0 ? this.androidData : this.iosData;
            // this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
      
      //sdkTypeSdk应用类型0:android1:ios
      //sdkVersionsdk版本
    },

    sdkDetailStatistics(sdkType, sdkVersion){
      let params = new Object();
      params.sdkType = sdkType;
      params.sdkVersion = sdkVersion;
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      query_sdk_version_userList(params)
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    drawLine(users, versions){
        let myChart = this.$echarts.init(document.getElementById("myChart1"));
        window.onresize = myChart.resize;
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['版本用户数'],
                orient: 'vertical',
                padding:[200, 0, 0, 0],
                x:'center',      //可设定图例在左、右、居中
                y:'bottom',     //可设定图例在上、下、居中
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: versions
            },
            color: "#409eff",
            series: [
                {
                    name: '版本用户数',
                    type: 'bar',
                    stack: '总量',
                    barMaxWidth: users.length > 1 ? '25%' : '10%',
                    label: {
                        show: true,
                        position: 'right',
                        color: '#000'
                    },
                    data: users
                },
            ]
        };
        myChart.setOption(option);
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
    margin: 20px 0;
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
