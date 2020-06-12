<template>
    <div class="content">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>域名管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <!-- 搜索 -->
            <div class="seach">
                <div class="seach_top">
                    <el-input placeholder="操作内容、渠道ID" v-model="input" class="input-with-select" @keyup.enter.native="onSubmit">
                        <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
                    </el-input>
                    <div class="seach_top_right" @click="option_display()">
                        筛选
                        <i class="el-icon-caret-bottom" :class="[rotate ? 'fa fa-arrow-down go' : 'fa fa-arrow-down aa']"></i>
                    </div>
                </div>
                <div v-if="optiondisplay" class="seach_bottom">
                    <span>操作类型：</span>
                    <el-select v-model="value" placeholder="请选择" @change="onchangeTab1">
                        <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span>状态：</span>
                    <el-select v-model="valueStatus" placeholder="请选择" @change="onchangeTab">
                        <el-option v-for="(item, index) in optionsStatus" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span>注册时间：</span>
                    <el-date-picker v-model="value1" type="datetimerange" range-separator="至" :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    <el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button>
                    <el-button type="primary" @click="reset()">重置</el-button>

                </div>
            </div>
            <!-- 表格 -->
            <div class="con_lable">
                <div style="padding:10px;text-align: left;">
                    <el-button type="primary" @click="toLink('first')">刷新</el-button>
                    <el-button type="primary" @click="toLink('second')">预热</el-button>
                </div>

                <!-- 表格 -->
                <el-table stripe border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" :default-sort="{ prop: 'date', order: 'descending' }" @sort-change="changeTableSort" @selection-change="handleSelectionChange">
                    <el-table-column label="操作内容" prop="url_name"> </el-table-column>
                    <el-table-column prop="refresh_type" label="操作类型"></el-table-column>
                    <el-table-column prop="are" label="区域"></el-table-column>
                    <el-table-column prop="buser_id" label="渠道ID"></el-table-column>
                    <el-table-column prop="opt_time" :sortable="'custom'" label="操作时间"></el-table-column>
                    <el-table-column prop="state" label="状态"></el-table-column>
                    <el-table-column label="进度">
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.progress"></el-progress>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 按钮 -->
                <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center;">
                    <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fenye from "@/components/fenye";
import { refresh_state_admin } from "../../servers/api";
export default {
  data() {
    return {
      valueStatus: -1,
      input: "", //搜索输入框
      value1: "",
      dialog: false,
      radio: "1",
      radioes: "1",
      activeName: "first",
      sadioes: 1,
      currentPage: 1,
      pagesize: 10,
      total_cnt: 0,
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

      tolpage: 1,

      value: -1,
      options: [
        {
          value: -1,
          label: "全部",
        },

        {
          value: 0,
          label: "刷新缓存",
        },
        {
          value: 1,
          label: "内容预热",
        },
      ],
      optionsStatus: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 2,
          label: "等待中",
        },

        {
          value: 0,
          label: "进行中",
        },
        {
          value: 3,
          label: "失败",
        },
        {
          value: 1,
          label: "完成",
        },
      ],
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      tableData: [],
      url: "",
      buser_id: "",
      order: 1,
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
  created() {},
  mounted() {
    this.queryInfo();
  },
  methods: {
    //排序
    //排序
    changeTableSort(column) {
      this.currentPage = 1;
      if (column.order == "descending") {
        this.order = 0;
      } else {
        this.order = 1;
      }
      this.queryInfo();
    },
    //状态选这改变
    onchangeTab(val) {
      this.queryInfo();
    },
    //状态选这改变
    onchangeTab1(val) {
      this.queryInfo();
    },
    //重置
    reset() {
      this.input = "";
      this.value1 = "";
      this.value = 1;
      this.queryInfo();
    },
    //跳转
    toLink(linkTab) {
      this.$router.push({
        path: "/yure_management1",
        query: {
          linkTab: linkTab,
        },
      });
    },
    //查询信息
    //获取页码
    handleCurrentChange(pages) {
      this.currentPage = pages;
      this.queryInfo();
      //this.getdata();
    },
    //获取每页数量
    handleSizeChange(pagetol) {
     // this.currentPage = pagetol;
      //this.getdata();
    },
    queryInfo() {
      var rx = /^http?:\/\//i;
      if (rx.test(this.input)) {
        this.url = this.input;
        this.buser_id = "";
      } else {
        this.buser_id = this.input;
        this.url = "";
      }
      let startTime = 0;
      let endTime = 0;
      if (this.value1) {
        if (this.value1 == "") {
          startTime = 0;
          endTime = 0;
        } else {
          endTime = this.value1[1].getTime() / 1000;
          startTime = this.value1[0].getTime() / 1000;
        }
      } else {
        startTime = 0;
        endTime = 0;
      }

      let param = {
        url: this.url,
        buser_id: this.buser_id,
        refresh_type: this.value,
        state: this.valueStatus,
        start_time: startTime,
        end_time: endTime,
        page: this.currentPage - 1,
        order: this.order,
      };

      refresh_state_admin(param)
        .then(res => {
          if (res.status == 0) {
            let tempArr = res.data.result;
            this.total_cnt = res.data.total;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].opt_time = this.common.getTimes(
                tempArr[i].opt_time * 1000
              );
              if (tempArr[i].refresh_type == 1) {
                tempArr[i].refresh_type = "内容预热";
              } else {
                tempArr[i].refresh_type = "刷新缓存";
              }
              if (tempArr[i].state == 0) {
                tempArr[i].state = "进行中";
              } else if(tempArr[i].state == 1) {
                tempArr[i].state = "已完成";
              } else if(tempArr[i].state == 2) {
                tempArr[i].state = "等待中";
              } else if(tempArr[i].state == 3) {
                tempArr[i].state = "失败";
              }
            }

            this.tableData = tempArr;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //获取页码
    getpage(pages) {
      this.tolpage = pages;
      //this.getdata();
    },
    //获取每页数量
    gettol(pagetol) {
      this.pagesize = pagetol;
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
      this.queryInfo();
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
    exportExcel1() {
      this.dialog = true;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
  },
};
</script>

<style lang="scss" scoped>
.refresh {
  width: 100%;
  display: flex;
  flex-flow: column;

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 15px;

    textarea {
      width: 700px;
      height: 300px;
      border: 1px solid #dcdfe6;
      resize: none;
    }
  }
}
</style>
