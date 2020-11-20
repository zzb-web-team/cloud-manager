<template>
    <div class="content">
      <div class="top_title">点播SDK发布</div>
      <!-- 搜索 -->
      <div class="seach">
        <el-input placeholder="包名、版本" v-model="input" style="width:200px;margin-right: 10px;" @keyup.enter.native="onSubmitInput">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
        </el-input>
        <!-- <span>应用类型：</span> -->
        <el-select v-model="valueActive" placeholder="请选择应用类型" @change="onchangeTab" style="width:200px;margin-right: 10px;">
            <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <!-- <span>日期：</span> -->
        <el-date-picker v-model="valueTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <!-- <el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button> -->
        <el-button type="primary" @click="reset()" style="margin-left:10px;">重置</el-button>
      </div>
      <!-- 表格 -->
      <div class="device_table">
          <div style="text-align: left;margin-bottom:20px;margin-top:20px;">
              <el-button type="primary" @click="addSdk()">新增发布</el-button>
          </div>

          <!-- 表格 -->
          <el-table stripe ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
              <el-table-column prop="url" label="发布包名"></el-table-column>
              <el-table-column prop="type" label="应用类型"></el-table-column>
              <el-table-column prop="content" label="支持业务类型"></el-table-column>
              <el-table-column prop="version" label="版本"></el-table-column>
              <el-table-column prop="time_create" label="发布时间"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">                          
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="handleDel(scope.row)" type="text" size="small" style="color:red;">删除</el-button>                           
                  </template>
              </el-table-column>
          </el-table>
          <!-- 详情弹窗 -->
          <el-dialog title="新增发布" :visible.sync="dialog" width="600px" class="addSdk">
              <div class="add-sdk">
                  <label for="upload">
                    <div class="upload" :class="{ isStart: startUpload}"  @change="upLoad()">
                      <div class="leftStyle">
                        <img width="55px" height="52px" src="../../assets/img/upload.png" alt="">
                        <p style="font-size: 16px; color: #333; margin-top: 18px;">上传SDK包</p>
                      </div>
                      <div class="rightStyle" v-show="startUpload">
                        <p style="font-size: 14px; color: #999;">{{fileName}}</p>
                        <div style="display: flex; flex-direction: row; align-items: center;">
                          <div style="width: 200px; height: 8px; background: #DFECFD; border-radius: 4px;margin-right: 10px;">
                            <div style="height: 8px; background: #644CF7; border-radius: 4px;" id="loading" v-bind:style="{'width': widthData+'%'}"></div>
                          </div>
                          <span id="per" v-if="perNum<100">{{perNum}}%</span>
                          <img v-else src="../../assets/img/uploadSuccess.png" alt="">
                        </div>
                      </div>
                    </div>
                  </label>
                  <input id="upload" style="display: none;" ref="upLoadFile" @change="upFile()" type="file" name="upload">
                  <div class="item">
                      <div class="item_l">应用类型：</div>
                      <div class="item-r">
                          <el-select v-model="valueActive2" placeholder="请选择" style="width: 240px;">
                              <el-option v-for="(item, index) in optionsActive2" :key="index" :label="item" :value="item"></el-option>
                          </el-select>
                      </div>
                  </div>
                  <div class="item" style="align-items: flex-start;">
                      <div class="item_l">包含功能：</div>
                      <div class="item-r">
                        <el-radio-group v-model="type" @change="selectType()">
                          <el-radio label="点播"></el-radio>
                          <el-radio label="直播" style="margin-right:40px"></el-radio>
                        </el-radio-group>
                        <div class="selectBg" :style="{background: type=='点播' ? 'url('+require('../../assets/img/select.png') + ')' : 'url('+require('../../assets/img/select_right.png') + ')'}">
                          <el-checkbox-group v-if="type=='点播'" v-model="checkList" style="width: 240px;margin-top: 8px;">
                            <el-checkbox label="mp4"></el-checkbox>
                            <el-checkbox label="hls"></el-checkbox>
                            <el-checkbox label="flv"></el-checkbox>
                          </el-checkbox-group>
                          <el-checkbox-group v-else v-model="checkList" style="width: 240px;margin-top: 8px;">
                            <el-checkbox label="hls"></el-checkbox>
                            <el-checkbox label="flv"></el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                  </div>
                  <div class="item">
                      <div class="item_l">版本号：</div>
                      <div class="item-r">
                          <el-input placeholder="请输入版本号" v-model="versionInput" style="width: 240px;"></el-input>
                      </div>
                  </div>
                  <div class="item">
                      <div class="item_l">说明：</div>
                      <div class="item-r">
                          <el-input placeholder="请输入说明地址" v-model="versionInputActive" style="width: 240px;"></el-input>
                      </div>
                  </div>
              </div>
              <div class="dialog-footer">
                  <el-button type="primary" @click="onSubmitUpload">发布</el-button>
                  <el-button @click="dialog=false">取消</el-button>
              </div>
          </el-dialog>
          <!-- 修改 -->
          <el-dialog title="修改SDK" :visible.sync="editDialog" width="600px" class="addSdk">
              <div class="add-sdk">
                  <div class="item">
                    <div class="item_l">SDK包</div>
                    <div class="item-r" style="display: flex; flex-direction: row; align-items: flex-end;">
                      <div style="display: flex; flex-direction: column; align-items: center;">
                        <img width="55px" height="52px" src="../../assets/img/upload.png" alt="">
                        <p style="font-size: 16px; color: #333; margin-top: 18px;">上传SDK包</p>
                      </div>
                      <p style="width: 130px; margin-left: 20px">{{sdkUrl}}</p>
                    </div>
                    
                  </div>
                  <div class="item">
                      <div class="item_l">应用类型</div>
                      <div class="item-r">
                          <el-input v-model="value11" style="width:240px;" disabled></el-input>
                      </div>
                  </div>
                  <div class="item">
                      <div class="item_l">包含功能</div>
                      <div class="item-r">
                        <el-radio-group v-model="type" @change="selectType()">
                          <el-radio label="点播"></el-radio>
                          <el-radio label="直播" style="margin-right:40px"></el-radio>
                        </el-radio-group>
                        <div class="selectBg" :style="{background: type=='点播' ? 'url('+require('../../assets/img/select.png') + ')' : 'url('+require('../../assets/img/select_right.png') + ')'}">
                          <el-checkbox-group v-model="checkList11" style="width:240px;">
                            <el-checkbox label="mp4"></el-checkbox>
                            <el-checkbox label="hls"></el-checkbox>
                            <el-checkbox label="flv"></el-checkbox>
                          </el-checkbox-group>
                        </div>  
                      </div>
                  </div>
                  <div class="item">
                      <div class="item_l">版本号</div>
                      <div class="item-r">
                          <el-input v-model="versionInput1" style="width:240px;" placeholder="请输入内容"></el-input>
                      </div>
                  </div>
                  <div class="item">
                      <div class="item_l">说明</div>
                      <div class="item-r">
                          <el-input v-model="versionInput1Active" style="width:240px;" placeholder="请输入说明地址"></el-input>
                      </div>
                  </div>
              </div>
              <div class="dialog-footer">
                  <el-button type="primary" @click="onEdit">发布</el-button>
                  <el-button @click="editDialog=false">取消</el-button>
              </div>
          </el-dialog>

          <!-- 按钮 -->
          <div style="margin-top: 20px;display: flex;justify-content: flex-end;align-items: center;">
              <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>
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
      options: ["全部", "andriod", "ios"],
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
.customWidth {
  width: 30% !important;
}

//旋转
.aa {
  transition: all 1s;
}

.go {
  transform: rotate(-180deg);
  transition: all 1s;
}

.add-sdk {
  width: 100%;
  height: auto;
  .isStart{
    background: #fff !important;
    border: none !important;
    display: flex;
    flex-direction: row !important;
    align-items: center;
    justify-content: space-between !important;
  }
  .upload{
    width: 100%;
    height: 128px;
    background: #F6F4FF;
    border: 1px solid #644CF7;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .leftStyle{
      width: 100px;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .rightStyle{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    align-items: center;
    margin-top: 48px;
    .choose-file {
      width: 130px;
      height: 25px;
      position: absolute;
      padding: 2px;
      z-index: 99;
    }
    .choose-input {
      position: absolute;
      z-index: 100;
      width: auto;
      opacity: 0;
      height: auto;
    }
    .onchoose-file {
      padding: 7px 20px;
      margin-top: 35px;
    }
    .item-r {
      .selectBg{
        width: 240px; 
        height: 73px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .item_l {
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
.dialog-footer{
  margin-top: 67px;
}
</style>
