<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户列表</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <section class="myself-container">
      <div class="device_form">
        <el-form ref="form" :model="form">
          <el-row type="flex">
            <div class="search-con">
              <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
              <el-input
                class="search-input"
                v-model="searchText"
                placeholder="请输入帐户"
                @keyup.enter.native="searchInfo"
              ></el-input>
            </div>
            <div @click="getShow()" class="div_show" style="color:#606266">
              筛选
              <i
                class="el-icon-caret-bottom"
                :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
              ></i>
            </div>
          </el-row>
          <el-row type="flex" class="row_activess" v-show="showState">
            <el-form-item label="状态" style="display: flex;">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchInfo">确定</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reset()">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="devide_table">
        <el-row type="flex" class="row_active">
          <el-col :span="6">
            <el-button type="primary" @click="addAccout">
              新建
              <span class="el-icon-plus"></span>
            </el-button>
          </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
          <el-col :span="24">
            <tableBarActive1
              id="rebateSetTable"
              ref="table1"
              tooltip-effect="dark"
              :tableData="tableData"
              @handleSelectionChange="handleSelectionChange"
              :clomnSelection="clomnSelection"
              :rowHeader="rowHeader"
              :tableOption="tableOption"
              @disable="disable"
              @toChange="toChange"
              @changePassword="changePassword"
              @toDelete="toDelete"
            ></tableBarActive1>
          </el-col>
        </el-row>
      </div>
      <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex">
          <el-col :span="6" style="display: flex;justify-content: justify-content: flex-start;">
            <el-button type="success" size="small" @click="allOn">启用</el-button>
            <el-button type="warning" size="small" @click="allOff">禁用</el-button>
            <el-button type="danger" size="small" @click="allDelete">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <pageNation
              :pager="pager"
              @handleSizeChange="handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
            ></pageNation>
          </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="20%">
        <div class="addaccout">
          <el-form :model="ruleForm2" ref="ruleForm2" label-position="left" class="demo-ruleForm">
            <h3 class="title">新建用户</h3>
            <el-form-item label="使用状态:">
              <el-radio v-model="ruleForm2.radio" label="0">启用</el-radio>
              <el-radio v-model="ruleForm2.radio" label="1">禁用</el-radio>
            </el-form-item>
            <el-form-item
              prop="username"
              :rules="[
      {validator: jiousername, trigger: 'blur' }
    ]"
            >
              <el-form-item label="账号:">
                <el-input v-model="ruleForm2.username" placeholder="4-20位英文加数字组合"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
      {validator: jiopwd, trigger: 'blur' }
    ]"
            >
              <el-form-item label="密码:" placeholder="密码">
                <el-input v-model="ruleForm2.password" type="password" placeholder="6-20位数字字母_组成"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item
              prop="password2"
              :rules="[
      {validator: jioqpwd, trigger: 'blur' }
    ]"
            >
              <el-form-item label="确认密码:">
                <el-input v-model="ruleForm2.password2" placeholder="两次密码须一致" type="password"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item prop="name" :rules="[
      {validator: jioname, trigger: 'blur' }
    ]">
              <el-form-item label="真实姓名:">
                <el-input v-model="ruleForm2.name" placeholder="4-20位汉字数字字母组合"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item
              prop="phone"
              :rules="[
      {validator: jiophone, trigger: 'blur' }
    ]"
            >
              <el-form-item label="联系方式:">
                <el-input v-model="ruleForm2.phone" placeholder="11位有效手机号"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item style="width:100%;display: flex;justify-content:center;">
              <el-button type="primary" @click.native.prevent="handleSubmit">立即提交</el-button>
              <el-button @click="notall()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible2" width="20%">
        <div class="addaccout">
          <el-form :model="ruleForm3" ref="ruleForm3" label-position="left" class="demo-ruleForm">
            <h3 class="title">修改信息</h3>
            <el-form-item label="状态:">
              <el-radio v-model="ruleForm3.radio" label="0">启用</el-radio>
              <el-radio v-model="ruleForm3.radio" label="1">禁用</el-radio>
            </el-form-item>
            <el-form-item
              prop="username"
              :rules="[
      {validator: jiousername, trigger: 'blur' }
    ]"
            >
              <el-form-item label="账号:">
                <el-input v-model="ruleForm3.username" placeholder="账号为4-20位英文加数字组合"></el-input>
              </el-form-item>
            </el-form-item>

            <el-form-item prop="name" :rules="[
      {validator: jioname, trigger: 'blur' }
    ]">
              <el-form-item label="真实姓名:">
                <el-input v-model="ruleForm3.name" placeholder="真实姓名为4-20位汉字数字字母组合"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item
              prop="phone"
              :rules="[
      { validator: jiophone, trigger: 'blur' }
    ]"
            >
              <el-form-item label="联系方式:">
                <el-input v-model="ruleForm3.phone" placeholder="11位有效手机号"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item style="width:100%;display: flex;justify-content:center;">
              <el-button type="primary" @click.native.prevent="handleSubmit4">修改</el-button>
              <el-button @click="nohandleSubmit4()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible3" width="20%">
        <div class="addaccout">
          <el-form
            :model="ruleForm4"
            status-icon
            :rules="rules4"
            ref="ruleForm4"
            label-position="left"
            class="demo-ruleForm"
          >
            <h3 class="title">密码重置</h3>
            <el-form-item prop="username">
              <el-form-item label="账号:">
                <el-input v-model="ruleForm3.username" :disabled="true"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item prop="password">
              <el-form-item label="新密码:">
                <el-input
                  v-model="ruleForm4.password"
                  placeholder="6-20位数字字母_组成"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item prop="password2">
              <el-form-item label="确认密码:">
                <el-input
                  v-model="ruleForm4.password2"
                  placeholder="再出输入密码"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form-item>

            <el-form-item style="width:100%;display: flex;justify-content:center;">
              <el-button type="primary" @click.native.prevent="handleSubmit5">确认</el-button>
              <el-button @click="nohandleSubmit5()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import tableBarActive1 from "../../comm/tableBarActive1";
import VueCookies from "vue-cookies";

import pageNation from "../../comm/pageNation";
import {
  userlist,
  userinsert,
  userupdate,
  userdelete,
  userctrl
} from "../../servers/api";
import common from "../../comm/js/util.js";
import base from "../../components/base"

export default {
    mixins:[base],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        var fsdf = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
        if (fsdf.test(value) === false) {
          callback(new Error("密码格式错误"));
        } else {
          if (this.ruleForm4.password2 !== "") {
            this.$refs.ruleForm4.validateField("password2");
          }
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm4.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      dialogVisible: false,
      rotate: false,
      dialogVisible2: false,
      dialogVisible3: false,
      searchText: "",
      placeholder: "请输入账号",
      operatingStatus: true,
      clomnSelection: true,
      reserveselection: true,
      value1: "",
      value2: "",
      value: "",
      options2: [
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
      ruleForm2: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: ""
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
        id: ""
      },
      ruleForm4: {
        password: "",
        password2: ""
      },
      //重置密码校验
      rules4: {
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      },
      rowHeader: [
        {
          prop: "status",
          label: "状态"
        },
        {
          prop: "username",
          label: "账号"
        },
        {
          prop: "nickname",
          label: "用户名",
          width: "150px"
        },
        {
          prop: "sex",
          label: "修改人",
          width: "150px"
        },
        {
          prop: "time_update",
          label: "修改时间"
        }
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "checkInfo"
          },

          {
            label: "密码重置",
            type: "danger",
            methods: "password"
          },
          {
            label: "禁用",
            type: "danger",
            methods: "disable"
          },
          {
            label: "删除",
            type: "danger",
            methods: "delete"
          }
        ]
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      showState: false,
      allId: []
    };
  },
  mounted: function() {
    this.queryUserList();
  },
  methods: {
    //重置
    reset() {
      this.value = "";
      this.searchText = "";
      this.queryUserList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.allId = [];
      for (var i = 0; i < val.length; i++) {
        this.allId.push(val[i].id);
      }
    },
    //批量启用
    allDisable() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      let param = new Object();
      param.ids = this.allId.join(",");
      param.type = 0;
      userctrl(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.queryUserList();
          }
        })
        .catch(error => {});
    },
    //批量启用
    allOn() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      let param = new Object();
      param.ids = this.allId.join(",");
      param.type = 0;
      userctrl(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.queryUserList();
          }
        })
        .catch(error => {});
    },
    //批量禁用
    allOff() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      let param = new Object();
      param.ids = this.allId.join(",");
      param.type = 1;
      userctrl(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.queryUserList();
          }
        })
        .catch(error => {});
    },
    //批量删除
    allDelete() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      let param = new Object();
      param.ids = this.allId.join(",");
      param.type = 2;
      userctrl(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.queryUserList();
          }
        })
        .catch(error => {});
    },

    queryUserList() {
      let param = new Object();
      param.page = this.pager.page - 1;
      param.search = this.searchText;
      param.status = parseInt(this.value);
      userlist(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          } else {
            if (res.result.page == 0) {
              this.pager.count =
                res.result.cols.length * (res.result.page + 1) +
                res.result.les_count;
            } else {
              this.pager.count =
                10 +
                res.result.cols.length * res.result.page +
                res.result.les_count;
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
                nowArr[i].status = "启用";
              } else {
                nowArr[i].status = "禁用";
              }
            }
            this.tableData = nowArr;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索
    searchInfo() {
      this.showState = false;
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
            uid:VueCookies.get("adminid"),
           uname:VueCookies.get("adminuser")
          };
          userinsert(loginParams).then(data => {
            this.dialogVisible = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.queryUserList();
            }
          });
        } else {
          console.log("error submit!!");
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
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"),
        (this.ruleForm3.password = ""),
        (this.ruleForm3.password2 = ""),
        (this.ruleForm3.role_id = 0);
      if (val.status == "启用") {
        this.ruleForm3.status = 1;
      } else {
        this.ruleForm3.status = 0;
      }
      let param = new Object();
      param = this.ruleForm3;
     this.ruleForm3.uid = VueCookies.get("adminid");
          this.ruleForm3.uname = VueCookies.get("adminuser");

      this.$confirm("确定执行该操作麽吗", "提示", {
        type: "warning"
      })
        .then(() => {
          userupdate(param).then(data => {
            this.dialogVisible2 = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              this.$message({
                message: "禁用成功",
                type: "success"
              });
              this.queryUserList();
            }
          });
        })
        .catch(() => {});
    },
    //修改
    toChange(val) {
      this.dialogVisible2 = true;
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"),
        (this.ruleForm3.password = ""),
        (this.ruleForm3.password2 = ""),
        (this.ruleForm3.role_id = 0);

      //this.ruleForm3.status = parseInt(this.ruleForm3.radio)
    },
    //重置密码
    changePassword(val) {
      this.dialogVisible3 = true;
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"), (this.ruleForm3.role_id = 0);
    },
    //删除
    toDelete(val) {
      let param = new Object();
      param.id = val.id;
      this.$confirm("确定要删除角色吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          userdelete(param)
            .then(res => {
              if (status != 0) {
                this.$message({
                  message: msg,
                  type: "error"
                });
              } else {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.queryUserList();
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    addAccout() {
      this.dialogVisible = true;
    },
    //修改确认
    handleSubmit4(ev) {
      //return false
      var _this = this;
      this.$refs.ruleForm3.validate(valid => {
        if (valid) {
          var loginParams = this.ruleForm3;
          this.ruleForm3.status = parseInt(this.ruleForm3.radio);
          this.ruleForm3.uid = VueCookies.get("adminid");
          this.ruleForm3.uname = VueCookies.get("adminuser");
          userupdate(loginParams).then(data => {
            this.dialogVisible2 = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.queryUserList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消修改
    nohandleSubmit4() {
      this.dialogVisible2 = false;
    },
    //重置密码确认
    handleSubmit5(ev) {
      var _this = this;
      this.$refs.ruleForm4.validate(valid => {
        if (valid) {
          var loginParams = this.ruleForm3;
          this.ruleForm3.password = this.ruleForm4.password;
          this.ruleForm3.password2 = this.ruleForm4.password2;
          this.ruleForm3.status = parseInt(this.ruleForm3.radio);
            this.ruleForm3.uid = VueCookies.get("adminid");
          this.ruleForm3.uname = VueCookies.get("adminuser");

          userupdate(loginParams).then(data => {
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              this.dialogVisible3 = false;
              this.$message({
                message: "重置成功",
                type: "success"
              });
              this.queryUserList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置密码取消
    nohandleSubmit5() {
      this.dialogVisible3 = false;
    },
    //校验账户名
    jiousername(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        var fsdusername = /^[a-zA-Z][a-zA-Z0-9]{3,20}$/;
        if (fsdusername.test(value) === false) {
          callback(new Error("账号格式错误"));
        } else {
          callback();
        }
      }
    },
    //校验真实姓名
    jioname(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else {
        var fsdname = /^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/;
        if (fsdname.test(value) === false) {
          callback(new Error("真实姓名格式错误"));
        } else {
          callback();
        }
      }
    },
    //校验电话号
    jiophone(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var fsdtel = /^[1]([3-9])[0-9]{9}$/;
        if (fsdtel.test(value) === false) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    },
    //校验密码
    jiopwd(rule, value, callback) {
      let fsdfpwd = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
      if (fsdfpwd.test(value) === false) {
        callback(new Error("密码格式错误"));
      } else {
        if (this.ruleForm2.password2 !== "") {
          this.$refs.ruleForm2.validateField("password2");
        }
        callback();
      }
    },
    //校验确认密码
    jioqpwd(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
  },
  components: {
    pageNation: pageNation,
    tableBarActive1: tableBarActive1
  }
};
</script>

<style lang="less">
.search-con {
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #999999;

  i {
  }

  .search-input {
    .el-input__inner {
      border: none;
      background: none;
    }
  }
}

.myself-container {
  // width: 100%;
  // //min-width: 1600px;
  text-align: left;
  .devide_title {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
    background: #f2f2f2;
    padding: 15px 0px;
    box-sizing: border-box;

    .el-col {
      padding: 0px 20px;
    }
  }

  .device_form {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;
    background: #ffffff;
    padding: 15px 30px;
    box-sizing: border-box;

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
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;

    .el-table td,
    .el-table th {
      padding: 6px 0px;
    }

    .row_active {
      margin-top: 10px;
    }
  }

  .devide_pageNation {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;

    .devide_pageNation_active {
      float: right;
    }
  }
}

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
