<template>
  <div class="content">
    <div class="top_title">操作日志</div>
    <div class="seach">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <el-input placeholder="请输入操作人" style="width:200px;margin-right: 10px;" v-model="searchText" class="input-with-select" @keyup.enter.native="searchInfo" maxlength="70">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select v-model="value" placeholder="请选择状态" @change="onChangeTab" style="width:200px;margin-right: 10px;">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="value1" placeholder="请选择操作类型" @change="onChangeTab1" style="width:200px;margin-right: 10px;">
              <el-option v-for="item in options2active" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-date-picker style="margin-right: 10px;" v-model="valueTime" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="device_table">
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBarActive1 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :operatingStatus="operatingStatus" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toChange="toChange"></tableBarActive1>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;display: flex;justify-content: flex-end;align-items: center;">
        <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
      </div>
    </div>
  </div>
</template>

<script>
import tableBarActive1 from "../../comm/tableBarActive1";
import VueCookies from "vue-cookies";

import pageNation from "../../comm/pageNation";
import { actionlog } from "../../servers/api";
import common from "../../comm/js/util.js";
import { Stats } from "fs";
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      form: {},
      dialogVisible: false,
      rotate: false,
      dialogVisible2: false,
      dialogVisible3: false,
      searchText: "",
      valueTime: "",
      placeholder: "请输入账号",
      operatingStatus: false,
      clomnSelection: false,
      reserveselection: true,
      options2active: ["全部", "新增", "修改", "删除", "导出", "登录"],
      value1: "",
      value2: "",
      value: "",
      options2: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "1",
          label: "成功",
        },
        {
          value: "0",
          label: "失败",
        },
      ],
      ruleForm2: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: "",
      },
      ruleForm3: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: "",
        id: "",
      },
      ruleForm4: {
        password: "",
        password2: "",
      },
      //重置密码校验

      rowHeader: [
        {
          prop: "status",
          label: "状态",
        },
        {
          prop: "action",
          label: "操作类型",
        },
        {
          prop: "username",
          label: "操作人",
        },
        {
          prop: "beforevalue",
          label: "原始值",
        },
        {
          prop: "aftervalue",
          label: "修改值",
        },

        {
          prop: "description",
          label: "操作描述",
        },

        {
          prop: "time_update",
          label: "操作时间",
        },
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        width: "400px",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "checkInfo",
          },

          {
            label: "密码重置",
            type: "danger",
            methods: "password",
          },
          {
            label: "禁用",
            type: "danger",
            methods: "disable",
          },
          {
            label: "删除",
            type: "danger",
            methods: "delete",
          },
        ],
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      showState: false,
      allId: [],
    };
  },
  mounted: function() {
    this.queryUserList();
  },
  methods: {
    onChangeTab() {
      this.queryUserList();
    },
    onChangeTab1() {
      this.queryUserList();
    },

    //重置
    reset() {
      this.value1 = "";
      this.searchText = "";
      this.pager.page = 1;
      this.search = " ";
      this.value = "";

      this.valueTime = "";
      this.queryUserList();
    },

    queryUserList() {
      let param = new Object();
      param.page = this.pager.page - 1;
      param.search = this.searchText;
      param.action = this.value1;
      param.utype = "cloud_admin";

      if (this.value == "-1") {
        param.status = null;
      } else {
        param.status = parseInt(this.value);
      }
      if (this.value1 == "全部") {
        param.action = "";
      } else {
        param.action = this.value1;
      }
      if (!this.valueTime) {
        param.start_ts = "";
        param.end_ts = "";
      } else {
        if (this.valueTime[0] == undefined) {
          param.start_ts = "";
        } else {
          param.start_ts = this.valueTime[0].getTime() / 1000;
        }
        if (this.valueTime[1] == undefined) {
          param.end_ts = 0;
        } else {
          param.end_ts = this.valueTime[1].getTime() / 1000;
        }
      }

      actionlog(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.err_msg}`,
              type: "error",
            });
          } else {
            if (res.result.page == 0) {
              this.pager.count =
                res.result.cols.length * (res.result.page + 1) +
                res.result.les_count;
            } else {
              this.pager.count =
                10 * res.result.page +
                res.result.les_count +
                res.result.cols.length;
            }
            let nowArr = res.result.cols;
            for (var i = 0; i < nowArr.length; i++) {
              nowArr[i].time_create = this.common.getTimes(
                parseInt(nowArr[i].time_create * 1000)
              );
              nowArr[i].time_update = this.common.getTimes(
                parseInt(nowArr[i].time_update * 1000)
              );
              if (nowArr[i].status == 0) {
                nowArr[i].status = "失败";
              } else {
                nowArr[i].status = "成功";
              }
            }
            this.tableData = nowArr;
          }
        })
        .catch(error => {});
    },
    //搜索
    searchInfo() {
      this.pager.page = 1;
      this.queryUserList();
    },
    getShow() {
      this.showState = !this.showState;
      this.rotate = !this.rotate;
    },
    //单页显示数据数量
    handleSizeChange() {},
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryUserList();
    },
    //新增
    handleSubmit(ev) {
      //return false
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          var loginParams = {
            username: this.ruleForm2.username,
            nickname: "aa",
            password: this.ruleForm2.password,
            password2: this.ruleForm2.password2,
            role_id: 0,
            phone: this.ruleForm2.phone,
            status: parseInt(this.ruleForm2.radio),
            name: this.ruleForm2.name,
            uid: VueCookies.get("adminid"),
            uname: VueCookies.get("adminuser"),
          };
          userinsert(loginParams).then(data => {
            this.dialogVisible = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error",
              });
            } else {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.queryUserList();
            }
          });
        } else { 
          return false;
        }
      });
    },
    //取消新增
    notall() {
      this.dialogVisible = false;
      this.ruleForm2.username = "";
      this.ruleForm2.password = "";
      this.ruleForm2.password2 = "";
      this.ruleForm2.phone = "";
      this.ruleForm2.name = "";
    },
    //禁用
    disable(val) {
      let nowstatus = 0;
      let tampArr = [];
      tampArr[0] = val.id;
      if (val.status == "正常") {
        nowstatus = 1;
      } else {
        nowstatus = 0;
      }
      let param = {
        id: tampArr,
        status: nowstatus,
      };

      this.$confirm("确定执行该操作麽吗", "提示", {
        type: "warning",
      })
        .then(() => {
          denyuser(param).then(res => {
            //return false
            if (res.status !== 0) {
              this.$message({
                message: msg,
                type: "error",
              });
            } else {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.queryUserList();
            }
          });
        })
        .catch(() => {});
    },
    //修改
    toChange(val) {
      this.$router.push({
        path: "/useInfo",
        query: {
          id: val.id,
          time_create: val.time_create,
          phone: val.phone,
          username: val.username,
          email: val.email,
        },
      });

      //this.ruleForm3.status = parseInt(this.ruleForm3.radio)
    },

    addAccout() {
      this.dialogVisible = true;
    },
  },
  components: {
    pageNation: pageNation,
    tableBarActive1: tableBarActive1,
  },
};
</script>

<style lang="less" scoped>

.addaccout {
  .title {
    width: 100%;
    text-align: center;
  }

  .el-dialog__body {
    padding: 0px;
  }

  .el-form-item {
    display: flex;
  }

  .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
  }

  .el-form-item__error {
    margin-left: 80px;
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
