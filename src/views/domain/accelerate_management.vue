<template>
  <div class="content accelerate">
    <!-- title -->
    <div class="top_title">加速管理</div>
    <div style="margin: auto;margin-left: 45px;margin-right: 45px;" class="acceleerate_con">
      <!-- 搜索栏 -->
      <div class="seach">
        <div class="seach_top">
          <el-input placeholder="请输入域名" v-model="input_domain" class="input-with-select" maxlength="70" @keyup.enter.native="onSubmit">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
          </el-input>

          <div class="seach_top_right" @click="option_display()">
            筛选
            <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
          </div>
        </div>
        <div v-if="optiondisplay" class="seach_bottom">
          <span>状态：</span>
          <el-select v-model="value" placeholder="请选择" @change="getdata()">
            <el-option v-for="(item, index) in options" :key="index + 'reat'" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span style="margin-left: 10px;">日期：</span>
          <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="gettimes" :picker-options="pickerOptions0"></el-date-picker>
          <el-button type="primary" size="mini" @click="seachuser()" style="margin-left: 10px;">确定</el-button>
          <el-button plain size="mini" @click="reset()" style="margin-left: 10px;">重置</el-button>
        </div>
      </div>
      <!-- 表格头部按钮 -->
      <div class="con_lable">
        <div class="con_lable_top_btn" style="padding:10px 0 18px;display: flex;justify-content: space-between;">
          <div>
            <el-button type="primary" @click="new_btn">
              <span class="el-icon-plus"></span>
              添加域名
            </el-button>
          </div>
        </div>

        <!-- 主体表格 -->
        <el-table ref="multipleTable" :data="tableData" stripe border tooltip-effect="dark" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" :default-sort="{ prop: 'date', order: 'descending' }" @selection-change="handleSelectionChange" @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="buser_id" label="渠道ID"></el-table-column>
          <el-table-column prop="domain" label="源站域名"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 1">正常运行</span>
              <span v-else-if="scope.row.state == 0" style="color: red;">已停止</span>
              <span v-else-if="scope.row.state == 2" style="color: red;">回源失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="time_create" sortable="custom" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.create_time | settimes }}
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
            <el-button type="text" size="small" @click="batchdeleateuser()">删除</el-button>
          </div>
          <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
        </div>

        <!-- 添加域名弹窗 -->
        <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" class="add_dialog" @close="handleClose">
          <el-form :model="form" ref="accelerate_dialog">
            <el-form-item label="渠道ID" :label-width="formLabelWidth" prop="id" :rules="{
								required: true,
								message: '渠道ID不能为空',
								trigger: 'blur',
							}">
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
} from "../../servers/api";
export default {
  data() {
    return {
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      input_domain: "",
      buser_id: "158000000011",
      rotate: false,
      optiondisplay: false,
      currentPage: 1,
      dialog_title: "新增域名",
      title_num: 0,
      total_cnt: 1,
      order: 0,
      input: "", //搜索输入框
      value: -1,
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
          value: 2,
          label: "回源失败",
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
      batchbuser_id: "158000000011",
      
    };
  },
  filters: {
    settimes(data) {
      if (data) {
        var stat = getymdtime(data * 1000);
        return data;
      } else {
        return data;
      }
    },
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
      this.value = -1;
      this.value1 = "";
      this.input = "";
      this.pager.page = 1;
      this.input_domain = "";
      this.queryinfo();
    },
    //获取域名数据
    queryinfo() {
      let params = new Object();
      params.page = this.pager.page - 1;
      params.buser_id = this.buser_id;
      params.domain = this.input_domain;
      params.order = this.order;
      params.state = this.value;
      if (this.value1) {
        params.end_time = this.value1[1].getTime() / 1000;
        params.start_time = this.value1[0].getTime() / 1000;
      } else {
        params.end_time = 0;
        params.start_time = 0;
      }
      query_domain(params)
        .then(res => {
          if (res.status == 0) {
            let tempArr = [];
            tempArr = res.data.result;
            tempArr.forEach((item, index) => {
              item.create_time = this.common.getTimes(item.create_time * 1000);
            });
            this.tableData = [];
            this.tableData = tempArr;
            this.pager.count = res.data.total;
            this.total_cnt = res.data.total;
          } else {
          }
        })
        .catch(err => {});
    },

    //获取数据
    getuserlist() {},
    //修改DOMAIN状态
    changedomain(param) {
      change_domainstate(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "操作失败",
            });
          }
          this.queryinfo();
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "后台服务出错",
          });
        });
    },
    //删除
    deletedomain(param) {
      del_domain(param)
        .then(res => {
          if (res.status == 0 && res.data.success_count >0) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
          this.queryinfo();
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "后台服务出错",
          });
        });
    },
    //根据状态操作
    operating(tenum) {
      let parmas = new Object();
      parmas.data_count = 1;
      parmas.data_array = [];
      parmas.data_array[0] = this.operatingFrom.domain_id;
      parmas.buser_id = this.operatingFrom.buser_id;
      //parmas.type = tenum;
      if (tenum == 1) {
        parmas.state = 0;
        this.changedomain(parmas);
      } else if (tenum == 2) {
        parmas.state = 1;
        this.changedomain(parmas);
      } else if (tenum == 3) {
        this.deletedomain(parmas);
      } else if (tenum == 4) {
        console.log(this.batchbuser_id);
        parmas.state = 1;
        parmas.buser_id = this.batchbuser_id;
        parmas.data_array = this.domain_id;
        parmas.data_count=this.domain_id.length
        this.changedomain(parmas);
      } else if (tenum == 5) {
        parmas.state = 0;
        parmas.buser_id = this.batchbuser_id;
        parmas.data_array = this.domain_id;
            parmas.data_count=this.domain_id.length
        this.changedomain(parmas);
      } else if (tenum==6){
        parmas.buser_id = this.batchbuser_id;
        parmas.data_array = this.domain_id;
        parmas.data_count=this.domain_id.length
        this.deletedomain(parmas);
      }
      // getterminal(parmas)
      //   .then(res => {
      //     if (res.status == 0) {
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
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
      this.operatingFrom = row;
      this.operating(1);
    },
    //启用
    enableuser(num, row) {
      this.operatingFrom = row;
      this.operating(2);
    },
    //删除
    deleateuser(num, row) {
      this.operatingFrom = row;
      this.operating(3);
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
      if (!this.domain_id) {
        this.$message({
          type: "error",
          message: "请至少选择一项",
        });
        return false;
      }
      this.operating(6);
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
      this.getuserlist();
    },
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },

    //回车事件
    onSubmit() {
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
      console.log(val);

      // this.batchbuser_id=""
      // this.batchbuser_id=val.buser_id
      // console.log(this.batchbuser_id)
      if (val.length) {
        this.domain_id = [];
        for (var i = 0; i < val.length; i++) {
          this.batchbuser_id = "";
          this.batchbuser_id = val[i].buser_id;
          this.domain_id[i] = val[i].domain_id;
        }
        //         let person =val
        // //         let person = [
        // //      {id: 0, name: "小明"},
        // //      {id: 1, name: "小张"},
        // //      {id: 2, name: "小李"},
        // //      {id: 3, name: "小孙"},
        // //      {id: 1, name: "小周"},
        // //      {id: 2, name: "小陈"},
        // // ];

        // let obj = {};

        // let peon = person.reduce((cur,next) => {
        //     obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
        //     return cur;
        // },[]) //设置cur默认类型为数组，并且初始值为空的数组
        // console.log(peon);
        //console.log(val.map(item))
        // console.log(val.map(item=>item.domain_id))
        //this.domainId=val.map(item=>item.domain_id)
        //this.currentSelection = val.map(item => item.domain_id);
      }
      console.log(this.domain_id);
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
          callback(new Error("源站域名长度不能超出1024个字符"));
        } else if (resyzm.test(value) === false) {
          callback(new Error("源站域名格式错误"));
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
                    } else {
                      this.$message({
                        type: "error",
                        message: "修改失败",
                      });
                    }
                    this.queryinfo();
                  })
                  .catch(error => {
                    this.$message({
                      type: "error",
                      message: "后台服务出错",
                    });
                  });

                this.dialogFormVisible = false;
                // _this.tableData[num].dominds = _this.form.name;
                // _this.tableData[num].id = _this.form.id;
                // this.dialogFormVisible = false;
                // this.$message({
                //   type: "info",
                //   message: "修改成功",
                // });
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
                } else {
                  this.$message({
                    type: "error",
                    message: "添加失败",
                  });
                }
                this.queryinfo();
              })
              .catch(error => {
                this.$message({
                  type: "error",
                  message: "后台服务出错",
                });
              });

            this.dialogFormVisible = false;
          }
        }
      });
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#F3F6FB;color:#333333;font-size:16px;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  text-align: left;
  .seach {
    width: 100%;
    margin: 30px 0 30px 0;
    background: #ffffff;
    border-radius: 2px;
    padding: 21px 37px;
    box-shadow: 0px 0px 7px 0px rgba(41, 108, 171, 0.1);
    .seach_top {
      width: 100%;
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .input-with-select {
        width: 15%;
      }
      .seach_top_right {
        width: 80px;
        text-align: center;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
      }
    }
    .seach_bottom {
      height: 72px;
      background: rgba(242, 246, 250, 1);
      border-radius: 2px;
      display: flex;
      align-items: center;
      padding-left: 27px;
    }
  }
  .con_lable {
    width: 100%;
    background: #ffffff;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
    border-radius: 2px;
    padding: 8px 37px 0;
  }
}
.el-dialog {
  margin-top: 25vh;
  width: 25%;
  height: 280px;
}
.lab_btn {
  padding: 0;
}
</style>
