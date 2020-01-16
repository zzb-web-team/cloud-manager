<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户管理1</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">注册用户</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <!-- 搜索 -->
      <div class="seach">
        <div class="seach_top">
          <el-input
            placeholder="用户ID，手机号，用户名1"
            v-model="input"
            class="input-with-select"
            @keyup.enter.native="onSubmit"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
          </el-input>
          <div class="seach_top_right" @click="option_display()">
            筛选
            <i
              class="el-icon-caret-bottom"
              :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
            ></i>
          </div>
        </div>
        <div v-if="optiondisplay" class="seach_bottom">
          <span>注册时间：</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <div class="seach_bottom_btn">
            <el-button type="primary" plain size="mini" @click="seachuser()">确定</el-button>
            <el-button plain size="mini" @click="reset()">重置</el-button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="con_lable">
        <div style="padding:10px;text-align: right;">
          <el-button type="primary" @click="exportExcel()">导出</el-button>
        </div>

        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          height="auto"
          tooltip-effect="dark"
          style="width: 100%"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status!=='冻结'" style="color:red;">冻结</span>
              <span v-else style="color:green;">正常</span>
            </template>
          </el-table-column>
          <el-table-column prop="user_id" label="用户ID"></el-table-column>
          <el-table-column prop="user_name" label="用户名"></el-table-column>
          <el-table-column prop="user_tel" label="手机号"></el-table-column>
          <el-table-column prop="flow" label="累计消费流量"></el-table-column>
          <el-table-column prop="time_create" sortable label="注册时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.status!=='冻结'">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                <el-button type="text" size="small" @click="disableuser()" style="color:orange;">解冻</el-button>
              </div>
              <div v-else>
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                <el-button type="text" size="small" @click="enableuser()" style="color:green;">冻结</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 详情弹窗 -->
        <el-dialog title="添加用户" :visible.sync="dialog" custom-class="customWidth">
          <el-form :model="details">
            <el-form-item label="使用状态" :label-width="formLabelWidth">
              <el-radio v-model="radioes" label="1" :disabled="true">启用</el-radio>
              <el-radio v-model="radioes" label="2" :disabled="true">冻结</el-radio>
            </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input
                v-model="details.nickname"
                :disabled="true"
                placeholder="请输入账号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input
                v-model="details.username"
                :disabled="true"
                placeholder="请输入真实姓名"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input
                v-model="details.phone"
                maxlength="11"
                :disabled="true"
                placeholder="请输入有效手机号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialog=false">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 按钮 -->
        <div
          style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center;"
        >
          <div>
            <el-button @click="enableuser()" type="success">启用</el-button>
            <el-button @click="disableuser()" type="warning">禁用</el-button>
            <el-button @click="deleateuser()" type="danger">删除</el-button>
          </div>
          <fenye
            style="float:right;margin:10px 0 0 0;"
            @fatherMethod="getpage"
            @fathernum="gettol"
            :pagesa="total_cnt"
          ></fenye>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fenye from "@/components/fenye";
import { userlist } from "../../servers/api";
export default {
  data() {
    return {
      input: "", //搜索输入框
      value1: "",
      dialog: false,
      radio: "1",
      radioes: "1",

      sadioes: 1,
      pagesize: 10,
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
        desc: ""
      },
      details: {},

      formLabelWidth: "60px",
      optiondisplay: false,
      rotate: false,

      tolpage: 1,

      value: "",
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      tableData: [
        {
          status: "冻结",
          user_id: "01653752",
          user_name: "后收",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "48773416"
        },
        {
          status: "正常",
          user_id: "0264512",
          user_name: "哈安万特哈",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "4876487416"
        },
        {
          status: "正常",
          user_id: "0634712",
          user_name: "民工气",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "487416"
        },
        {
          status: "正常",
          user_id: "012",
          user_name: "给尔皮克",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "487412476"
        },
        {
          status: "冻结",
          user_id: "0161362",
          user_name: "提前而已",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "154487416"
        },
        {
          status: "冻结",
          user_id: "01635472",
          user_name: "翢",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "487416"
        },
        {
          status: "正常",
          user_id: "07453712",
          user_name: "特瑞特",
          user_tel: 13501201248,
          time_create: "2019/11/05",
          flow: "876487416"
        }
      ]
    };
  },
  components: {
    fenye
  },
  created() {},
  mounted() {
  
  },
  methods: {
    //获取页码
    getpage(pages) {
      console.log(pages);
      this.tolpage = pages;
      //this.getdata();
    },
    //获取每页数量
    gettol(pagetol) {
      console.log(pagetol);
      this.pagesize = pagetol;
      //this.getdata();
    },
    //回车事件
    onSubmit() {
      console.log("enter");
    },
    //筛选按钮
    option_display() {
      console.log("******");
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定搜索
    seachuser() {
      console.log(this.value, this.input);
      this.optiondisplay = false;
      this.value = "";
      this.input = "";
    },
    //重置
    reset() {
      this.value = "";
      this.input = "";
      console.log("重置");
    },
    //表格查看
    handleClick(row) {
      console.log(row);
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
      console.log(val);
      this.multipleSelection = val;
    },
    // 禁用
    disableuser() {
      this.$confirm("禁用后该用户不能登陆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
          "注册时间"
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "status",
          "user_id",
          "user_name",
          "user_tel",
          "flow",
          "time_create"
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
      return "text-align: center;background:#eef1f6;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    }
  }
};
</script>

<style lang="scss" scoped>

</style>