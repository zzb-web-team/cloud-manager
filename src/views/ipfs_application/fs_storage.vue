<template>
  <div class="content">
    <!-- 头部 -->
    <div class="bread_crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>视频点播日志</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>
          <a href="/">FS存储</a>
        </el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>

    <!-- 搜索 -->
    <div class="seach">
      <div class="seach_top">
        <el-input placeholder="视频ID" v-model="input" class="input-with-select" @keyup.enter.native="onSubmitKey" maxlength="70">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
        </el-input>
        <el-input placeholder="渠道ID" v-model="inputActive1" class="input-with-select" @keyup.enter.native="onSubmitKey" maxlength="70" style="margin-left:20px">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
        </el-input>
        <el-input placeholder="加速内容名称" v-model="inputActive2" class="input-with-select" @keyup.enter.native="onSubmitKey" maxlength="70" style="margin-left:20px">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
        </el-input>
        <div class="seach_top_right" @click="option_display()">
          筛选
          <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
        </div>
      </div>
      <div v-if="optiondisplay" class="seach_bottom">
        <span>点播时间：</span>
        <el-date-picker v-model="value1" type="datetimerange" :picker-options="pickerOptions" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div style="text-align:right;padding: 10px;background: #fff;margin-top:20px;padding-right:20px;">
      <el-button type="primary" @click="toexportExcelNew()" style="margin-top:10px;">导出</el-button>

    </div>
    <div style="background: #fff;padding:20px;padding-top:0px;">
      <el-table stripe :data="tableData" border :cell-style="rowClass" :header-cell-style="headClass" style="width: 100%">
        <el-table-column prop="fileIdActive" label="视频ID" width="500"></el-table-column>
        <el-table-column prop="chanId" label="渠道ID" width="180"></el-table-column>
        <el-table-column prop="fileName" label="加速内容名称"></el-table-column>
        <el-table-column prop="fileSize" label="文件大小" width="120"></el-table-column>
        <el-table-column prop="dataFlow" label="点播流量"></el-table-column>
        <el-table-column prop="userIpInfo" label="点播IP"></el-table-column>
        <el-table-column prop="startTS" label="点播时间"></el-table-column>
      </el-table>
    </div>
    <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>
  </div>
</template>

<script>
import fenye from "@/components/fenye";
import { query_videoplay_log, export_videoplay_file } from "../../servers/api";
import common from "../../comm/js/util";

import base from "../../components/base"
export default {
    mixins:[base],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      rotate: false,
      errTableVisible: false,
      device_show: false,
      currentPage: 1,
      total_cnt: 0,
      value1: "",
      inputActive1: "",
      inputActive2: "",
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
          label: "A渠道",
        },
        {
          value: 1,
          label: "B渠道",
        },
      ],
      tableData: [],
      tableData2: [],
      pageActive: 0,
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
        if (this.value1 == "" || this.value1 == null) {
          startTime =
            new Date(new Date().toLocaleDateString()).getTime() / 1000;
          endTime = new Date().getTime() / 1000;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
        startTime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
        endTime = new Date().getTime() / 1000;
      }
      let param = {
        start_ts: parseInt(startTime) ,
        end_ts: parseInt(endTime) ,
        chanId: this.inputActive1 == "" ? "*" : this.inputActive1,
        fileId: this.input == "" ? "*" : this.input,
        fileName: this.inputActive2 == "" ? "*" : this.inputActive2,
      };
      export_videoplay_file(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "下载成功",
              type: "success",
            });
          
            window.location.href = res.msg;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //回车键搜索
    onSubmitKey() {
      this.currentPage = 1;
      this.queryInfo();
    },
    //处理启用时间、
    formatterTime(row) {
      return this.common.getTimes(row.startTS * 1000);
    },
    //查询信息
    queryInfo() {
      let startTime = 0;
      let endTime = 0;
      if (this.value1) {
        if (this.value1 == "" || this.value1 == null) {
         
            startTime =
            (new Date().getTime() / 1000)-60*60*24*90
          endTime = new Date().getTime() / 1000;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
       startTime =  (new Date().getTime() / 1000)-60*60*24*90
        endTime = new Date().getTime() / 1000;
      }
      

      let param = {
        
        start_ts: parseInt(startTime),
        end_ts: parseInt(endTime),
        chanId: this.inputActive1 == "" ? "*" : this.inputActive1,
        fileId: this.input == "" ? "*" : this.input,
        fileName: this.inputActive2 == "" ? "*" : this.inputActive2,
        pageNo: this.currentPage - 1,
        pageSize: 10,
      };
        if(endTime-startTime>60*60*24*90){
            this.$message({
          message: "只能查询三个月以内的数据",
          type: "error",
        });
        return false
      }
      query_videoplay_log(param)
        .then(res => {
          if (res.status == 0) {
            this.tableData =[]
            let tempArr = res.data.list;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].startTS = this.common.getTimes(
                tempArr[i].startTS * 1000
              );
              if (tempArr[i].fileSize == 0) {
                tempArr[i].fileSize = 0;
              } else {
                tempArr[i].fileSize = this.common.formatByteActive(
                  tempArr[i].fileSize
                );
              }
              if (tempArr[i].dataFlow == 0) {
                tempArr[i].dataFlow = 0;
              } else {
                tempArr[i].dataFlow = this.common.formatByteActive(
                  tempArr[i].dataFlow
                );
              }
              if(tempArr[i].videoType==0){
                    tempArr[i].fileIdActive="mp4"+"_"+tempArr[i].fileId
              }
              else if(tempArr[i].videoType==1){
                    tempArr[i].fileIdActive="hls"+"_"+tempArr[i].fileId
              }
              else if(tempArr[i].videoType==0){
                    tempArr[i].fileIdActive="flv"+"_"+tempArr[i].fileId
              }
             
            }
            this.tableData = tempArr;
            this.total_cnt = res.data.totalCnt;
          }
        })
        .catch(error => {});
    },
    //导出
    toexportExcel() {
      let startTime = 0;
      let endTime = 0;
      if (this.value1) {
        if (this.value1 == "") {
          startTime = 1576400000;
          endTime = 1576499999;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
        startTime = 1576400000;
        endTime = 1576499999;
      }

      let param = {
        start_ts: startTime,
        end_ts: endTime,
        chanId: this.inputActive1 == "" ? "*" : this.inputActive1,
        fileId: this.input == "" ? "*" : this.input,
        fileName: this.inputActive2 == "" ? "*" : this.inputActive2,
        pageNo: this.currentPage - 1,
        pageSize: 10,
      };
      query_videoplay_log(param)
        .then(res => {
          if (res.status == 0) {
            if (this.pageActive >= res.data.totalPage) {
              this.exportExcel();
              this.common.monitoringLogs("导出", "导出视频点播日志", 1);
            } else {
              let tempArr = res.data.list;
              for (var i = 0; i < tempArr.length; i++) {
                tempArr[i].startTS = this.common.getTimes(
                  tempArr[i].startTS * 1000
                );
              }

              this.tableData2 = this.tableData2.concat(tempArr);
              this.pageActive++;
              this.toexportExcel();
            }
            // this.tableData = res.data.list
            // this.total_cnt = res.data.totalCnt
          } else {
            this.common.monitoringLogs("导出", "导出视频点播日志", 0);
          }
        })
        .catch(error => {});
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
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定搜索
    seachuser() {
      // this.value1 = "";
      // this.input = "";
      this.currentPage = 1;
      this.queryInfo();
    },
    //重置
    reset() {
      this.value = "";
      this.input = "";
      this.value1 = "";
      (this.inputActive2 = ""), (this.inputActive1 = "");
      (this.currentPage = 1), this.queryInfo();
    },

    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel.js");
        const tHeader = [
          "视频ID",
          "渠道ID",
          "视频名称",
          "文件大小",
          "点播流量",
          "点播IP",
          "点播时间",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "fileId",
          "chanId",
          "fileName",
          "fileSize",
          "dataFlow",
          "userIpInfo",
          "startTS",
        ];

        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "视频点播日志");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
