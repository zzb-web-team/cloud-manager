<template>
    <div>
        <div class="top_title">终端信息</div>
        <div class="content">
            <div class="seach" style="margin-top: 0;">
                <el-input placeholder="请输入终端名称、渠道ID" v-model="input" style="width:200px;margin-right: 10px;" @keyup.enter.native="onSubmitInput">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
                </el-input>
                <!-- <span>应用类型：</span> -->
                <el-select v-model="valueActive" placeholder="请选择加速业务类型" @change="onchangeTab" style="width:200px;margin-right: 10px;">
                    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item"></el-option>
                </el-select>
                <!-- <span>日期：</span> -->
                <el-date-picker v-model="valueTime" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <!-- <el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button> -->
                <el-button type="primary" @click="reset()" style="margin-left:10px;">重置</el-button>
            </div>
            <!-- 表格 -->
            <div class="device_table">
                <div class="operating">
                    <div style="margin-left: auto;display:flex;flex-direction: row; align-items: center;cursor: pointer;">
                        <img width="24px" height="22px" src="../../assets/img/export.png" alt="">
                        <span style="color: #644CF7;font-size: 16px;margin-left:8px;">导出</span>
                    </div>
                </div>
                <el-table stripe ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
                    <el-table-column prop="deviceNo" label="发布包名"></el-table-column>
                    <el-table-column prop="type" label="应用类型"></el-table-column>
                    <el-table-column prop="teminalName" label="支持业务类型"></el-table-column>
                    <el-table-column prop="channelId" label="版本"></el-table-column>
                    <el-table-column prop="time_create" label="发布时间"></el-table-column>
                </el-table>
                <!-- 按钮 -->
                <div style="margin-top: 20px;display: flex;justify-content: flex-end;align-items: center;">
                    <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fenye from "@/components/fenye";
import {
  userlist,
  sdklist,
  savesdk,
  editsdk,
  hostUrl,
  delsdk,
} from "../../servers/api";
export default {
  data() {
    return {
      type: "点播",
      input: "", //搜索输入框
      value1: "IOS",
      value11: "",
      dialog: false,
      editDialog: false,
      radio: "1",
      radioes: "1",
      checkList: ["mp4"],
      checkList1: ["mp4"],
      checkList11: [],
      sadioes: 1,
      pagesize: 10,
      valueTime: "",
      total_cnt: 1,
      form: {
        account: "",
        nickname: "",
        pwd: "",
        conpwd: "",
        actualname: "",
        tel: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      details: {},

      formLabelWidth: "60px",
      optiondisplay: false,
      rotate: false,
      disableStatus: false,
      disableStatus1: false,
      versionInputActive: "",

      tolpage: 1,
      uploadTab: false,
      input1: "",

      value: "",
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      valueActive: "",
      valueActive2: "andriod",
      tableData: [],
      options: ["全部", "点播", "直播"],
      options1: ["andriod", "ios"],
      optionsActive2: ["andriod", "ios"],

      sdkUrl: "",
      versionInput1: "",
      versionInput1Active: "",
      versionInput: "",
      currentPage: 1,
      total_cnt: 0,
      sdkId: 0,
      perNum: 0,
      widthData: 0,
      perNum1: 0,
      widthData1: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      startUpload: false,
      fileName: "",
    };
  },
  components: {
    fenye,
  },
  created() {},
  mounted() {
    this.querySdkList();
    // this.getuserlist();
  },
  methods: {
    selectType(){
      console.log(this.type)
    },
    onchangeTab() {
      this.querySdkList();
    },
    //回车键搜索
    onSubmitInput() {
      this.querySdkList();
    },
    //重置
    reset() {
      this.value = "";
      this.input = "";
      this.currentPage = 1;
      this.valueActive = "";
      this.valueTime = "";
      this.querySdkList();
    },
    //获取SDK列表
    querySdkList() {
      let startTime = "";
      let entTime = "";
      if (!this.valueTime) {
        startTime = "";
        entTime = "";
      } else {
        if (this.valueTime[0] == undefined) {
          startTime = "";
        } else {
          startTime = this.valueTime[0].getTime() / 1000;
        }
        if (this.valueTime[1] == undefined) {
          entTime = "";
        } else {
          entTime = this.valueTime[1].getTime() / 1000;
        }
      }

      let param = {
        page: this.currentPage - 1,
        search: this.input,
        type: this.valueActive == "全部" ? "" : this.valueActive,
        start_ts: startTime,
        end_ts: entTime,
      };
      sdklist(param)
        .then(res => {
          if (res.status == 0) {
            let temp = res.result.cols;
            for (var i = 0; i < temp.length; i++) {
              temp[i].time_create = this.common.getTimes(
                temp[i].time_create * 1000
              );
            }
            this.tableData = res.result.cols;
            if (res.result.page == 0) {
              this.total_cnt =
                res.result.cols.length * (res.result.page + 1) +
                res.result.les_count;
            } else {
              this.total_cnt =
                res.result.cols.length +
                10 * res.result.page +
                res.result.les_count;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //新增
    addSdk() {
      this.perNum = 0;
      this.widthData = 0;
      this.versionInput = "";
      this.versionInputActive = "";
      // this.checkList = []
      this.dialog = true;
      this.startUpload = false;
      this.fileName = "";
      // console.log(this.$refs.upLoadFile);
      // this.$refs.upLoadFile.value = "";
    },
    //修改弹窗
    handleEdit(rows) {
      this.editDialog = true;
      this.sdkUrl = rows.url;
      let tempArr = rows.content;
      this.checkList11 = tempArr.split(",");
      this.versionInput1 = rows.version;
      this.versionInput1Active = rows.description;
      this.value11 = rows.type;
      this.sdkId = rows.id;
      this.perNum1 = 0;
      this.widthData1 = 0;
    },
    //修改
    onEdit() {
      let nowVerson = /^\d+\.\d+\.\d+$/;
      if (this.checkList11.length == 0) {
        this.$message({
          message: "请至少选择一项功能",
          type: "warning",
        });
        return false;
      }
      if (!nowVerson.test(this.versionInput1)) {
        this.$message({
          message: "版本输入格式有误，请重新输入",
          type: "warning",
        });
        return false;
      }
      this.editDialog = false;
      let nowdescription = this.versionInputActive;
      if (this.versionInputActive == "") {
        nowdescription = "";
      } else {
        nowdescription = this.versionInputActive;
      }
      let param = {
        id: this.sdkId,
        url: this.sdkUrl,
        type: this.value11,
        content: this.checkList11.join(","),
        version: this.versionInput1,
        description: this.versionInput1Active,
      };
      editsdk(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.querySdkList();
            this.common.monitoringLogs("修改 ", "修改SDK信息", 1);
          } else {
            this.common.monitoringLogs("修改 ", "修改SDK信息", 0);
          }
        })
        .catch(error => {});
    },
    handleDel(rows) {
      this.$confirm('是否删除SDK?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            id: rows.id
          }
          delsdk(param).then(
            res => {
              if (res.status == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.querySdkList();
              } else {
                this.$message({
                  message: "删除失败",
                  type: "error",
                });
              }
            }
          )
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
    },

    //获取页码
    handleCurrentChange(pages) {
      this.currentPage = pages;
      this.querySdkList();
      //this.getdata();
    },
    //获取每页数量
    handleSizeChange(pagetol) {
      //this.getdata();
    },
    //回车事件
    onSubmit() {},
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定搜索
    seachuser() {
      this.querySdkList();
    },

    //表格查看
    handleClick(row) {
      if (row.radio == "启用") {
        this.sadioes = "1";
      } else {
        this.sadioes = "2";
      }
      this.details = row;
      this.dialog = true;
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 禁用
    disableuser() {
      this.$confirm("禁用后该用户不能登陆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //启用
    enableuser() {},
    // 删除
    deleateuser() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "状态",
          "用户ID",
          "用户名",
          "手机号",
          "累计消耗流量",
          "注册时间",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "status",
          "user_id",
          "user_name",
          "user_tel",
          "flow",
          "time_create",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "用户注册信息");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    // 表头样式设置
    headClass() {
      return "text-align: center; background: #FDFBFB; font-weight: 500; color: #333";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    upLoad() {
      this.$refs.upLoadFile.click();
    },
    upFile() {
      let _this = this;
      var file = document.getElementById("upload");
      var f = file.files[0];
      if (f == undefined) {
        this.$message({
          type: "warning",
          message: "请选择要上传的文件",
        });
        return false;
      }

      var totalSize = f.size;
      if (totalSize == 0) {
        this.$message({
          message: "请选择文件SIZE大于0文件",
          type: "success",
        });
        return false;
      }
      this.startUpload = true;
      this.fileName = f.name;
      this.disableStatus = true;
      var len = 2 * 1024 * 1024;
      var tota_temp = Math.ceil(totalSize / len);

      var start = 0;
      var end = start + len;
      var index = 1;

      var blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice;

      var fileReader = new FileReader();

      function sliceandpost() {
        //if (start >= totalSize)return;
        //if (index >= tota_temp)return;

        var temp = f.slice(start, end);
        var formData = new FormData();
        formData.append("file", temp);
        formData.append("fileName", f.name);
        formData.append("num", index);
        formData.append("start", start);
        formData.append("end", end);
        formData.append("totalSize", totalSize);
        formData.append("total", tota_temp);
        var url = hostUrl + "/cloud/uploadsdk";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onchange;
        xhr.open("POST", url);
        xhr.send(formData);

        function onchange() {
          // 4 = "loaded"
          if (xhr.readyState == 4) {
            // 200 = "OK"
            if (xhr.status == 200) {
              //var headers =  JSON.parse(xhr.responseText);
              var headers = JSON.parse(xhr.response);
              //分片上传成功
              if (headers.status == 0) {
                index = index + 1;
                // 改变下一次截取的位置
                start = end;
                end = start + len;
                // 因为截取可能超过totalSize，判断最后一次截取是否大于totalSize如果大于就直接让end等于totalSize
                if (end > totalSize) {
                  end = totalSize;
                }
                _this.widthData = Math.floor(index / tota_temp * 100);
                _this.perNum = Math.floor(index / tota_temp * 100);
                sliceandpost();
              } else if (headers.status == 1) {
                _this.widthData = 100;
                _this.perNum = 100;
                document.getElementById("result").innerHTML =
                  "上传成功:" + headers.msg;
                _this.sdkUrl = headers.url;
                _this.disableStatus = false;
                _this.uploadTab = true;
              } else {
                _this.uploadTab = false;
              }
            } else {
              alert("Problem retrieving XML data:" + xhr.statusText);
            }
          }
        }
      }
      sliceandpost();
    },
    upFile1() {
      let _this = this;

      var file = document.getElementById("f1");
      var f = file.files[0];
      console.log(f)
      if (f == undefined) {
        this.$message({
          type: "warning",
          message: "请选择要上传的文件",
        });
        return false;
      }

      var totalSize = f.size;
      if (totalSize == 0) {
        this.$message({
          message: "请选择文件SIZE大于0文件",
          type: "success",
        });
        return false;
      }
      this.disableStatus1 = true;
      var len = 2 * 1024 * 1024;
      var tota_temp = Math.ceil(totalSize / len);
      var start = 0;
      var end = start + len;
      var index = 1;

      var blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice;

      var fileReader = new FileReader();

      function sliceandpost() {
        //if (start >= totalSize)return;
        //if (index >= tota_temp)return;

        var temp = f.slice(start, end);
        var formData = new FormData();
        formData.append("file", temp);
        formData.append("fileName", f.name);
        formData.append("num", index);
        formData.append("start", start);
        formData.append("end", end);
        formData.append("totalSize", totalSize);
        formData.append("total", tota_temp);
        var url = hostUrl + "/cloud/uploadsdk";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onchange;
        xhr.open("POST", url);
        xhr.send(formData);

        function onchange() {
          // 4 = "loaded"
          if (xhr.readyState == 4) {
            // 200 = "OK"
            if (xhr.status == 200) {
              //var headers =  JSON.parse(xhr.responseText);
              var headers = JSON.parse(xhr.response);
              //分片上传成功
              if (headers.status == 0) {
                index = index + 1;
                // 改变下一次截取的位置
                start = end;
                end = start + len;
                // 因为截取可能超过totalSize，判断最后一次截取是否大于totalSize如果大于就直接让end等于totalSize
                if (end > totalSize) {
                  end = totalSize;
                }
                _this.widthData1 = Math.floor(index / tota_temp * 100);
                _this.perNum1 = Math.floor(index / tota_temp * 100);
                sliceandpost();
              } else if (headers.status == 1) {
                document.getElementById("result").innerHTML =
                  "上传成功:" + headers.msg;
                _this.widthData1 = 100;
                _this.perNum1 = 100;
                _this.sdkUrl = headers.url;
                _this.disableStatus1 = false;
              } else {
              }
            } else {
            }
          }
        }
      }
      sliceandpost();
    },
    //上传
    onSubmitUpload() {
      if (this.uploadTab == false) {
        this.$message({
          message: "请上传应用包",
          type: "warning",
        });
        return false;
      }

      let nowVerson = /^\d+\.\d+\.\d+$/;
      if (this.checkList.length == 0) {
        this.$message({
          message: "请至少选择一项功能",
          type: "warning",
        });
        return false;
      }
      if (!nowVerson.test(this.versionInput)) {
        this.$message({
          message: "版本输入格式有误，请重新输入",
          type: "warning",
        });
        return false;
      }

      this.dialog = false;
      let param = {
        url: this.sdkUrl,
        type: this.valueActive2,
        content: this.checkList.join(","),
        version: this.versionInput,
        description: this.versionInputActive,
      };
      savesdk(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.querySdkList();
            this.common.monitoringLogs("新增 ", "新增SDK", 1);
          } else {
            this.$message({
              message: "添加失败",
              type: "error",
            });
            this.common.monitoringLogs("新增 ", "新增SDK", 0);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.top_title{
    margin-top: 49px;
    text-align: left;
    font-size: 18px;
    color: #333;
}
</style>
