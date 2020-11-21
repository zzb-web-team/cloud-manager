<template>
  <div class="content">
    <div class="top_title">域名管理</div>
    <div class="seach">
        <el-input placeholder="请输入渠道ID丶域名" v-model="input_text" style="width:200px;margin-right: 10px;" @keyup.enter.native="onSubmit">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
        </el-input>
        <el-select v-model="value" placeholder="请选择状态" @change="getdata()" style="width:200px;margin-right: 10px;">
          <el-option v-for="(item, index) in options" :key="index + 'reat'" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <!-- <span style="margin-left: 10px;">日期：</span> -->
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="gettimes"></el-date-picker>
        <!-- <el-button type="primary" @click="seachuser()" style="margin-left: 10px;">确定</el-button> -->
        <el-button type="primary" @click="reset()" style="margin-left: 10px;">重置</el-button>
    </div>
      <!-- 表格头部按钮 -->
    <div class="device_table">
        <div class="operating">
          <el-button  type="primary" @click="new_btn">
            <span class="el-icon-plus"></span>
            添加域名
          </el-button>
        </div>
        <!-- 主体表格 -->
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" :default-sort="{ prop: 'date', order: 'descending' }" @selection-change="handleSelectionChange" @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="buser_id" label="渠道ID"></el-table-column>
          <el-table-column prop="domain" label="源站域名">
            <template slot-scope="scope">
              <div>{{scope.row.domain}}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 1" style="color: green;">正常运行</span>
              <span v-else-if="scope.row.state == 0" style="color: red;">已停止</span>
              <span v-else-if="scope.row.state == 2" style="color: red;">回源失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="time_create" sortable="custom" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.create_time }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="revise(scope.$index, scope.row)" class="lab_btn" type="text" size="small">修改</el-button>
              <el-button v-if="scope.row.state == 1" @click="disableuser(scope.$index, scope.row)" type="text" size="small">停用</el-button>
              <el-button v-else @click="enableuser(scope.$index, scope.row)" type="text" size="small">启用</el-button>
              <el-button :disabled="scope.row.state == 1" @click="deleateuser(scope.$index, scope.row)" class="lab_btn" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部分页和按钮 -->
        <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center;">
          <div>
            <el-button type="text" size="small" @click="batchenableuser()">启用</el-button>
            <el-button type="text" size="small" @click="batchdisableuser()">停用</el-button>
            <el-button type="text" size="small" :disabled="activeTab" @click="batchdeleateuser()">删除</el-button>
          </div>
          <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
        </div>

        <!-- 添加域名弹窗 -->
        <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" class="add_dialog" @close="handleClose">
          <el-form :model="form" ref="accelerate_dialog">
            <el-form-item label="渠道ID" :label-width="formLabelWidth" prop="id" :rules="[{
								validator: checkuserId,
								trigger: 'blur',
							}]">
              <el-input v-model="form.id" autocomplete="off" :disabled="dialog_title == '修改域名'" placeholder="请输入渠道ID"></el-input>
            </el-form-item>
            <el-form-item label="源站域名" :label-width="formLabelWidth" prop="name" :rules="[{ validator: jiourl, trigger: 'blur' }]">
              <el-input v-model="form.name" autocomplete="off" placeholder="http://或https://开头，72字符内"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="quxzteaone">取 消</el-button>
            <el-button type="primary" @click="quxzteao">{{ dialog_title == '新增域名' ? '确定' : '修改' }}
            </el-button>
          </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import pageNation from "@/components/pageNation";
import { dateToMs, getymdtime } from "../../servers/sevdate";
import {
  query_url,
  change_state,
  delete_url,
  getterminal,
  query_domain,
  add_domain,
  modify_domain,
  del_domain,
  change_domainstate,
  query_domain_for_admin,
} from "../../servers/api";
import common from "../../comm/js/util";
import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      input_text: "",
      input_domain: "",
      activeTab: false,
      activeTabs: false,
      buser_id: "",
      rotate: false,
      optiondisplay: false,
      currentPage: 1,
      dialog_title: "新增域名",
      title_num: 0,
      total_cnt: 1,
      order: 0,
      input: "", //搜索输入框
      value: "",
      value1: "",
      options: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 1,
          label: "正常运行",
        },

        {
          value: 0,
          label: "已停用",
        },
      ],
      pickerOptions0: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              const start =
                new Date(new Date(new Date().toLocaleDateString()).getTime()) -
                3600 * 1000 * 24 * 1;
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [
        // {
        //   domain: "http://www.baidu.com",
        //   status: "1",
        //   time_create: "1583906243",
        //   id: 16516516516,
        // },
      ],
      form: {
        name: "",
        id: "",
        domain_id: "",
      },
      operatingFrom: {
        domain_id: "",
      },

      formLabelWidth: "120px",
      dialogFormVisible: false,
      currentSelection: [],
      multipleSelection: [],
      domainId: [],
      batchbuser_id: "",
      tempArray: {},
    };
  },
  filters: {
    // settimes(data) {
    //   if (data) {
    //     var stat = getymdtime(data * 1000);
    //     return data;
    //   } else {
    //     return data;
    //   }
    // },
  },
  components: {
    pageNation,
  },
  mounted() {
    this.queryinfo();
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryinfo();
    },
    //搜索重置
    reset() {
      this.value = "";
      this.value1 = "";
      this.input = "";
      this.pager.page = 1;
      this.input_text = "";
      this.queryinfo();
    },
    //获取域名数据
    queryinfo() {
      var resyzm = /^\d{12}$/;
      if (this.input_text == "") {
        this.buser_id = "";
        this.input_domain = "";
      } else {
        if (resyzm.test(this.input_text)) {
          this.buser_id = this.input_text;
          this.input_domain = "";
        } else {
          this.buser_id = "";
          this.input_domain = this.input_text;
        }
      }
      let params = new Object();
      params.page = this.pager.page - 1;
      params.buser_id = this.buser_id;
      params.domain = this.input_domain;
      params.order = this.order;
      console.log(this.value)
      if(this.value != "" || this.value === 0){
        params.state = this.value;
      }else{
        params.state = -1;
      }
      if (this.value1) {
        params.end_time = this.value1[1].getTime() / 1000;
        params.start_time = this.value1[0].getTime() / 1000;
      } else {
        params.end_time = 0;
        params.start_time = 0;
      }

      query_domain_for_admin(params)
        .then(res => {
          if (res.status == 0) {
            let tempArr = [];
            tempArr = res.data.result;
            tempArr.forEach((item, index) => {
              let nowlength = item.create_time + "";
              if (nowlength.length == 10) {
                item.create_time = this.common.getTimes(
                  item.create_time * 1000
                );
              } else {
                item.create_time = this.common.getTimes(item.create_time);
              }
            });
            this.tableData = [];
            this.tableData = tempArr;
            this.pager.count = res.data.total;
            this.total_cnt = res.data.total;
          } else {
            this.tableData = [];
          }
        })
        .catch(err => {});
    },

    //获取数据
    getuserlist() {},
    //修改DOMAIN状态
    changedomain(param, type) {
      change_domainstate(param)
        .then(res => {
          if (type == 1) {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "停用成功",
              });
              this.common.monitoringLogs("停用", "停用域名", 1);
            } else {
              this.$message({
                type: "error",
                message: "停用失败",
              });
              this.common.monitoringLogs("停用", "停用域名信息", 0);
            }
            this.queryinfo();
          } else if (type == 2) {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "启用成功",
              });
              this.common.monitoringLogs("启用", "启用域名", 1);
            } else {
              this.$message({
                type: "error",
                message: "启用失败",
              });
              this.common.monitoringLogs("启用", "启用域名", 0);
            }
            this.queryinfo();
          } else if (type == 4) {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "批量启用成功",
              });
              this.common.monitoringLogs("批量启用", "批量启用域名", 1);
            } else {
              this.$message({
                type: "error",
                message: "批量启用失败",
              });
              this.common.monitoringLogs("批量启用", "批量启用域名", 0);
            }
            this.queryinfo();
          } else if (type == 5) {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "批量停用成功",
              });
              this.common.monitoringLogs("批量停用", "批量停用域名", 1);
            } else {
              this.$message({
                type: "error",
                message: "批量停用失败",
              });
              this.common.monitoringLogs("批量停用成功", "批量停用域名", 0);
            }
            this.queryinfo();
          } else {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.common.monitoringLogs("删除", "删除域名", 1);
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请查看要删除的域名下是否存在加速内容",
              });
              this.common.monitoringLogs("删除成功", "删除域名", 0);
            }
            this.queryinfo();
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "后台服务出错",
          });
          this.common.monitoringLogs("修改 ", "修改域名信息", 0);
        });
    },
    //删除
    deletedomain(param) {
      del_domain(param)
        .then(res => {
          if (res.status == 0 && res.data.success_count > 0) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.common.monitoringLogs("删除 ", "删除域名", 1);
          } else {
            this.$message({
              type: "error",
              message: "该渠道ID的此域名下仍有关联的加速内容，不可删除！",
            });
            this.common.monitoringLogs("删除 ", "删除域名", 0);
          }
          this.queryinfo();
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "后台服务出错",
          });
          this.common.monitoringLogs("删除 ", "删除域名", 0);
        });
    },
    //根据状态操作
    operating(tenum) {
      let parmas = new Object();
      parmas.data_count = 0;
      parmas.data = [];
      let obj = {};
      obj.buser_id = this.operatingFrom.buser_id;
      obj.data_array = [];
      obj.data_count = 0;
      obj.data_array[0] = this.operatingFrom.domain_id;
      parmas.data[0] = obj;

      if (tenum == 1) {
        //parmas.state = 0;
        parmas.data[0].state = 0;

        this.changedomain(parmas, tenum);
      } else if (tenum == 2) {
        parmas.data[0].state = 1;

        this.changedomain(parmas, tenum);
      } else if (tenum == 3) {
        this.deletedomain(parmas);
      } else if (tenum == 4) {
        let _this = this;
        let tempparam = {};
        tempparam.data_count = 0;
        tempparam.data = [];

        Object.keys(this.tempArray).forEach(function(key) {
          let obj = {
            buser_id: key,
            data_count: 0,
            state: 1,
            data_array: _this.tempArray[key],
          };
          tempparam.data.push(obj);
        });
        this.changedomain(tempparam, tenum);
      } else if (tenum == 5) {
        let _this = this;
        let tempparam = {};
        tempparam.data_count = 0;
        tempparam.data = [];

        Object.keys(this.tempArray).forEach(function(key) {
          let obj = {
            buser_id: key,
            data_count: 0,
            state: 0,
            data_array: _this.tempArray[key],
          };
          tempparam.data.push(obj);
        });
        this.changedomain(tempparam, tenum);
      } else if (tenum == 6) {
        let _this = this;
        let tempparam = {};
        tempparam.data_count = 0;
        tempparam.data = [];

        Object.keys(this.tempArray).forEach(function(key) {
          let obj = {
            buser_id: key,
            data_count: 0,
            data_array: _this.tempArray[key],
          };
          tempparam.data.push(obj);
        });

        this.deletedomain(tempparam);
      }
    },
    //修改
    revise(num, row) {
      this.dialog_title = "修改域名";
      this.form.name = row.domain;
      this.form.id = row.buser_id;
      this.form.domain_id = row.domain_id;
      this.title_num = num;
      this.dialogFormVisible = true;
    },
    //停用
    disableuser(num, row) {
      this.$confirm(
        "停用后该渠道ID与此域名相关的所有加速内容将停用，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.operatingFrom = row;
          this.operating(1);
        })
        .catch(() => {});
    },
    //启用
    enableuser(num, row) {
      this.operatingFrom = row;
      this.operating(2);
    },
    //删除
    deleateuser(num, row) {
      this.$confirm(
        "删除后该渠道ID的此域名将从列表移动，删除后信息不可恢复，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.operatingFrom = row;
          this.operating(3);
        })
        .catch(() => {});
    },
    //批量启用
    batchenableuser() {
      if (!this.domain_id) {
        this.$message({
          type: "error",
          message: "请至少选择一项",
        });
        return false;
      }
      this.operating(4);
    },
    //批量停用
    batchdisableuser() {
      if (!this.domain_id) {
        this.$message({
          type: "error",
          message: "请至少选择一项",
        });
        return false;
      }
      this.operating(5);
    },
    //批量删除
    batchdeleateuser() {
      if (!this.domain_id || this.domain_id.length == 0) {
        this.$message({
          type: "error",
          message: "请至少选择一项",
        });
        return false;
      }
      this.$confirm(
        "删除后该渠道ID的此域名将从列表移动，删除后信息不可恢复，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.operating(6);
        })
        .catch(() => {});
    },
    //添加URL
    new_btn() {
      this.dialog_title = "新增域名";
      this.dialogFormVisible = true;
    },
    //确定搜索
    seachuser() {
      this.queryinfo();
    },

    //自定义事时间
    gettimes() {
      this.queryinfo();
    },
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },

    //回车事件
    onSubmit() {
      this.pager.page = 1;
      this.queryinfo();
    },
    getdata(val) {
      //this.value=val
      this.queryinfo();
    },
    //排序
    tableSortChange(column) {
      this.currentPage = 1;
      if (column.order == "descending") {
        this.order = 1;
      } else {
        this.order = 0;
      }
      this.getuserlist();
    },
    //多选
    handleSelectionChange(val) {
      this.tempArray = {};
      this.activeTab = false;
      if (val.length > 0) {
        this.domain_id = [];
        for (var i = 0; i < val.length; i++) {
          // console.log(val)
          if (!this.tempArray[val[i].buser_id]) {
            this.tempArray[val[i].buser_id] = [];
          }
          this.tempArray[val[i].buser_id].push(val[i].domain_id);
          //  console.log(this.tempArray)
          // _this.first[item.type] = {}
          if (val[i].state == 1) {
            this.activeTab = true;
          }
          this.batchbuser_id = "";
          this.batchbuser_id = val[i].buser_id;
          this.domain_id[i] = val[i].domain_id;
        }
      } else {
        this.activeTab = false;
        this.domain_id = [];
      }
      //console.log(this.domain_id);
      // if(this.activeTab==false){
      //   this.activeTabs==false
      // }else{
      //   this.activeTabs=true
      // }
    },
    // 刷新已选择数组
    updateSelection() {
      if (this.currentSelection.length) {
        this.multipleSelection = this.multipleSelection.concat(
          this.currentSelection
        );
        this.currentSelection = [];
        console.log("updateSelection:", this.multipleSelection);
      }
    },
    // 整理列表选中项
    formatChoosen(arr) {
      const urlArr = this.tableData.map(item => item.dominds);
      urlArr.forEach((item, index) => {
        if (this.multipleSelection.includes(item)) {
          // 如果存在item，就在selection中删掉，再添加到currentSelection内
          const idx = this.multipleSelection.indexOf(item);
          this.multipleSelection.splice(idx, 1);
          setTimeout(() => {
            this.$refs.multipleTable.toggleRowSelection(this.tableData[index]);
          }, 200);
        }
      });
      console.log("formatChoosen--multipleSelection:", this.multipleSelection);
    },
    getBLen(str) {
      if (str == null) return 0;
      if (typeof str != "string") {
        str += "";
      }
      return str.replace(/[^\x00-\xff]/g, "01").length;
    },
    //校验url
    jiourl(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入源站域名"));
      } else {
        var resyzm = /^http(s)?:\/\/[^\u4e00-\u9fa5]{1,1020}$/;
        // objExp = new RegExp(resyzm);
        if (this.getBLen(value) > 72) {
          callback(new Error("源站域名长度不能超出72个字符"));
        } else if (resyzm.test(value) === false) {
          callback(new Error("源站域名格式错误"));
        } else {
          callback();
        }
      }
    },

    //检查渠道ID
    checkuserId(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入渠道ID"));
      } else {
        var resyzm = /^\d{12}$/;

        if (resyzm.test(value) === false) {
          callback(new Error("渠道ID格式错误"));
        } else {
          callback();
        }
      }
    },
    //添加--关闭
    handleClose() {
      this.quxzteaone();
    },
    //添加--取消
    quxzteaone() {
      this.dialogFormVisible = false;
      this.$refs.accelerate_dialog.resetFields();
      this.form.name = "";
    },
    //添加--确定
    quxzteao() {
      let _this = this;

      this.$refs.accelerate_dialog.validate(valid => {
        if (valid) {
          if (this.dialog_title == "修改域名") {
            let num = _this.title_num;
            this.$confirm(
              "确认修改源站域名为" +
                _this.form.name +
                "？修改后原源站域名" +
                _this.tableData[num].domain +
                "下的加速内容的源站域名将全部自动修改替换为" +
                _this.form.name,
              "修改确认",
              {
                distinguishCancelAndClose: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
              }
            )
              .then(() => {
                let timestamp = new Date().getTime();
                // let param = {};
                let obj = {};
                // param.data_count = 1;
                // param.data_array=[]
                obj.domain = _this.form.name;
                obj.buser_id = this.form.id;
                obj.domain_id = this.form.domain_id;
                obj.create_time = parseInt(timestamp / 1000);
                modify_domain(obj)
                  .then(res => {
                    if (res.status == 0 && res.err_code == 750) {
                      this.$message({
                        type: "success",
                        message: "修改成功",
                      });
                      this.common.monitoringLogs("修改 ", "修改域名信息", 1);
                    } else {
                      this.$message({
                        type: "error",
                        message: "修改失败",
                      });
                      this.common.monitoringLogs("修改 ", "修改域名信息", 0);
                    }
                    this.queryinfo();
                  })
                  .catch(error => {
                    this.$message({
                      type: "error",
                      message: "后台服务出错",
                    });
                    this.common.monitoringLogs("修改 ", "修改域名信息", 0);
                  });

                this.dialogFormVisible = false;
              })
              .catch(action => {
                this.$message({
                  type: "info",
                  message: action === "cancel" ? "取消修改" : "停留在当前页面",
                });
                this.dialogFormVisible = false;
              });
          } else {
            let timestamp = new Date().getTime();
            let param = {};
            let obj = {};
            param.data_count = 1;
            param.data_array = [];
            obj.domain = this.form.name;
            obj.buser_id = this.form.id;
            obj.create_time = parseInt(timestamp / 1000);
            param.data_array[0] = obj;
            add_domain(param)
              .then(res => {
                if (res.status == 0 && res.data.success_count == 1) {
                  this.$message({
                    type: "success",
                    message: "添加成功",
                  });
                  this.common.monitoringLogs("新增", "新增域名", 1);
                  this.dialogFormVisible = false;
                } else if (res.status == 0 && res.data.res_data[0][1] == 1) {
                  this.$message({
                    type: "error",
                    message: "格式错误，添加失败",
                  });
                  this.common.monitoringLogs("新增", "新增域名", 0);
                } else if (res.status == 0 && res.data.res_data[0][1] == 2) {
                  this.$message({
                    type: "error",
                    message: "域名重复，添加失败",
                  });
                  this.common.monitoringLogs("新增", "新增域名", 0);
                } else if (res.status == 0 && res.data.res_data[0][1] == 3) {
                  this.$message({
                    type: "error",
                    message: "渠道ID不存在或者该渠道ID已被冻结，添加失败",
                  });
                  this.common.monitoringLogs("新增", "新增域名", 0);
                } else if (res.status == 0 && res.data.res_data[0][1] == 4) {
                  this.$message({
                    type: "error",
                    message: "数据库写入错误，添加失败",
                  });
                  this.common.monitoringLogs("新增", "新增域名", 0);
                }
                this.queryinfo();
              })
              .catch(error => {
                this.$message({
                  type: "error",
                  message: "后台服务出错",
                });
                this.common.monitoringLogs("新增", "新增域名", 0);
              });
          }
        }
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
  },
};
</script>

<style lang="scss" scoped>
.el-dialog {
  margin-top: 25vh;
  width: 25%;
  height: 280px;
}
.lab_btn {
  padding: 0;
}
</style>
