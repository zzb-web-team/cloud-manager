<template>
    <div class="content">
        <!-- 头部 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item> 点播加速日志</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>
        <a href="/">ip流量</a>
      </el-breadcrumb-item> -->
        </el-breadcrumb>
        <!-- 搜索 -->
        <div class="seach">
            <div class="seach_top" style="display: flex;justify-content: flex-start;">
                <!-- <el-input placeholder="点播IP" v-model="input" class="input-with-select" @keyup.enter.native="onSubmitKey" maxlength="70">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input> -->
                <el-input placeholder="渠道ID" v-model="inputActive1" class="input-with-select" @keyup.enter.native="onSubmitKey" maxlength="70" style="margin-left:20px;">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-input placeholder="加速内容名称" v-model="inputActive2" class="input-with-select" @keyup.enter.native="onSubmitKey" maxlength="70" style="margin-left:20px;">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-select v-model="inputActive3" placeholder="请选择" style="margin-left:20px;">
                    <el-option v-for="(item, index) in yewu" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <div class="seach_top_right" @click="option_display()">
                    筛选
                    <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
                </div>
            </div>
            <div v-if="optiondisplay" class="seach_bottom">
                <span>启用时间：</span>
                <el-date-picker v-model="value1" type="datetimerange" range-separator="至" :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button>
                <el-button type="primary" @click="reset()">重置</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <div style="background: #fff;margin-top:10px;padding:20px;">
            <div style="text-align:right;padding-bottom:10px;">
                <el-button type="primary" @click="toexportExcelNew()">导出</el-button>
            </div>
            <el-table stripe :data="tableData" :cell-style="rowClass" :header-cell-style="headClass" style="width: 100%">
                <el-table-column prop="accelTypes" label="业务场景" width="180"></el-table-column>
                <el-table-column prop="chanId" label="渠道ID" width="180"></el-table-column>
                <el-table-column prop="terminalName" label="点播终端"></el-table-column>
                <el-table-column prop="ipInfo" label="点播IP"></el-table-column>
                <el-table-column prop="urlName" label="加速内容名称"></el-table-column>
                <el-table-column prop="fileUrl" label="播放URL"></el-table-column>
                <el-table-column prop="dataFlow" label="消费流量"></el-table-column>
                <el-table-column prop="reqCount" label="请求数"></el-table-column>
                <el-table-column prop="failCount" label="失败请求数"></el-table-column>
                <el-table-column prop="reqStartTime" label="启用时间" sortable></el-table-column>
                <el-table-column prop="reqEndTime" label="结束时间" sortable></el-table-column>
                <el-table-column prop="useTime" label="用时(s)"></el-table-column>
                <!-- <el-table-column prop="endTS" label="结束时间"></el-table-column>
            <el-table-column prop="totalTime" label="用时"></el-table-column> -->
            </el-table>
        </div>
        <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>
    </div>
</template>

<script>
import fenye from "@/components/fenye";
import {
  query_accelerate_log,
  export_videoaccel_file,
} from "../../servers/api";
import common from "../../comm/js/util";
export default {
  data() {
    return {
      accelType: "0",
      yewu: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "点播加速",
        },
        {
          value: "2",
          label: "点播预热",
        },
        {
          value: "3",
          label: "点播刷新",
        },
        {
          value: "4",
          label: "点播回源",
        },
      ],
      inputActive3: "0",
      rotate: false,
      errTableVisible: false,
      device_show: false,
      currentPage: 1,
      inputActive1: "",
      inputActive2: "",
      total_cnt: 0,
      value1: "",
      input: "",
      value: "",
      input1: "", //开始时间
      input2: "", //结束时间
      optiondisplay: false,
      dev_devation: {},
      sizeForm: {
        date1: "",
        date2: "",
      },
      options: [
        {
          value: 0,
          label: "电信",
        },
        {
          value: 1,
          label: "移动",
        },
        {
          value: 1,
          label: "联通",
        },
      ],
      tableData: [],
      tableData2: [],
      pageActive: 0,
      fileUrl: "",
      userIp: "",
      chanId: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
    };
  },
  components: {
    fenye,
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    //导出
    toexportExcelNew() {
      if (this.tableData.length == 0) {
        this.$message({
          message: "无数据可导出",
          type: "warning",
        });
        return false;
      }
      let startTime = 0;
      let endTime = 0;
      if (this.value1) {
        if (this.value1 == "") {
          startTime = 1571465783;
          endTime = 1576736183;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
        startTime = 1571465783;
        endTime = 1576736183;
      }

      let param = {
        start_ts: startTime,
        end_ts: endTime,
        chanId: this.inputActive1 == "" ? "*" : this.inputActive1,
        fileUrl: this.inputActive2 == "" ? "*" : this.inputActive2,
        userIp: this.input == "" ? "*" : this.input,
      };
      
      export_videoaccel_file(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "下载成功",
              type: "success",
            });
                    window.location.href = res.msg
          }
        })
        .catch(error => {});
    },
    //确定搜索

    //处理启用时间、
    formatterTime(row) {
      return this.common.getTimes(row.startTS * 1000);
    },
    //处理启用时间、
    formatterTime1(row) {
      return this.common.getTimes(row.endTS * 1000);
    },
    //查询信息
    queryInfo() {
      let startTime = 0;
      let endTime = 0;
      if (this.value1) {
        if (this.value1 == "" || this.value1==null) {
          startTime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
          endTime = (new Date()).getTime()/1000;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
        startTime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
          endTime = (new Date()).getTime()/1000;
      }

      let param = {
        start_ts:parseInt(startTime)  ,
        end_ts: parseInt(endTime),
        chanId: this.inputActive1 == "" ? "*" : this.inputActive1,
        fileUrl: this.inputActive2 == "" ? "*" : this.inputActive2,
        userIp: this.input == "" ? "*" : this.input,
        pageNo: this.currentPage - 1,
        pageSize: 10,
        requestFlag: 2,
        accelType: this.inputActive3,
      };
      query_accelerate_log(param)
        .then(res => {
          if (res.status == 0) {
            let tempArr = res.data.list;
            for (var i = 0; i < tempArr.length; i++) {
         
              tempArr[i].reqStartTime = this.common.getTimes(tempArr[i].reqStartTime * 1000);
              tempArr[i].reqEndTime = this.common.getTimes(tempArr[i].reqEndTime * 1000);
              tempArr[i].dataFlow = this.common.formatByteActive(tempArr[i].dataFlow);
              switch (tempArr[i].accelType) {
                case 1:
                  tempArr[i].accelTypes = "点播加速";
                  break;
                case 2:
                  tempArr[i].accelTypes = "点播预热";
                  break;
                case 3:
                  tempArr[i].accelTypes = "点播刷新";
                  break;
                case 4:
                  tempArr[i].accelTypes = "点播回源";
                  break;
              }
            }
            this.tableData = tempArr;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch(error => {
            console.log(error)
        });
    },
    //导出的方法

    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "点播IP",
          "渠道ID",
          "URL",
          "消费流量",
          "请求数",
          "失败请求数",
          "点播IP",
          "结束时间",
          "用时",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "ipInfo",
          "chanId",
          "fileUrl",
          "dataFlow",
          "accessCnt",
          "failCnt",
          "startTS",
          "endTS",
          "totalTime",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "点播加速表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    toexportExcel() {
      let startTime = 0;
      let endTime = 0;
      if (this.value1) {
        if (this.value1 == "") {
          startTime = 1571465783;
          endTime = 1576736183;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
        startTime = 1571465783;
        endTime = 1576736183;
      }

      let param = {
        start_ts: startTime,
        end_ts: endTime,
        chanId: this.inputActive1 == "" ? "*" : this.inputActive,
        fileUrl: this.inputActive2 == "" ? "*" : this.inputActive2,
        userIp: this.input == "" ? "*" : this.input,
        pageNo: this.pageActive,
        pageSize: 10,
        requestFlag: 2,
      };
      query_accelerate_log(param)
        .then(res => {
          if (res.status == 0) {
            if (this.pageActive >= res.data.totalPage) {
              this.exportExcel();
              this.common.monitoringLogs("导出", "导出点播加速日志", 1);
            } else {
              let tempArr = res.data.list;
              for (var i = 0; i < tempArr.length; i++) {
                tempArr[i].startTS = this.common.getTimes(
                  tempArr[i].startTS * 1000
                );
                tempArr[i].endTS = this.common.getTimes(
                  tempArr[i].endTS * 1000
                );
              }
              this.tableData2 = this.tableData2.concat(tempArr);
              this.pageActive++;
              this.toexportExcel();
            }

            this.total_cnt = res.data.totalCnt;
          } else {
            this.common.monitoringLogs("导出", "导出点播加速日志", 0);
          }
        })
        .catch(error => {});
    },

    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定搜索
    seachuser() {
      // this.value = "";
      // this.input = "";

      // this.value = "";
      // this.input = "";
      this.currentPage=1
      this.queryInfo();
    },
    //回车键搜索
    onSubmitKey() {
      this.currentPage = 1;
      this.queryInfo();
    },
    //重置
    reset() {
      this.input = "";
      this.value1 = "";
      this.currentPage = 1;
      this.inputActive1 = "";
      this.inputActive2 = "";

      this.queryInfo();
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    //获取页码
    handleCurrentChange(pages) {
      this.currentPage = pages;
      this.queryInfo();
      //this.getdata();
    },
    //获取每页数量
    handleSizeChange(pagetol) {
      this.currentPage = pagetol;
      //this.getdata();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  .device_title_name {
    width: 16%;
    background: #eeeeee;
    color: #000000;
  }

  .device_title_content {
    width: 16%;
    background: #ffffff;
    color: #000000;
  }

  .tableclose {
    width: 100%;
    padding-top: 10px;
    text-align: center;
  }
}

//旋转
.aa {
  transition: all 1s;
}

.go {
  transform: rotate(-180deg);
  transition: all 1s;
}
</style>
