<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>点播加速管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <!-- 搜索 -->
      <div class="seach">
        <div class="seach_top">
          <el-input placeholder="请输入渠道ID丶加速内容" v-model="input_text" style="width:200px;margin-right: 10px;" @keyup.enter.native="onSubmitInput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <!-- <div class="seach_top_right" @click="option_display()">
            筛选
            <i class="el-icon-caret-bottom" :class="[rotate ? 'fa fa-arrow-down go' : 'fa fa-arrow-down aa']"></i>
          </div>
        </div>
        <div v-if="optiondisplay" class="seach_bottom">
          <span>状态：</span> -->
          <el-select v-model="value" placeholder="请选择状态" @change="onchangeTab" style="width:200px;margin-right: 10px;">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <!-- <span>创建日期：</span> -->
          <el-date-picker v-model="value1" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="gettimes"></el-date-picker>
          <el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button>
          <el-button type="primary" @click="reset()" style="margin-left:10px;">重置</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="con_lable">
        <div style="padding:10px 0;display: flex;justify-content: space-between;">
          <div>
            <el-button type="primary" @click="addUrl">
              创建加速内容
              <!-- <span class="el-icon-circle-plus-outline"></span> -->
            </el-button>
            <el-button type="primary" plain @click="onImport">批量导入加速内容</el-button>
            <!-- <el-button type="primary" plain @click="setdomainlist">批量管理标签</el-button> -->
          </div>
          <div>
            <el-button type="primary" @click="toexportExcel">导出</el-button>
          </div>
        </div>

        <!-- 表格 -->
        <el-table stripe ref="multipleTable" border @selection-change="handleSelectionChange" @sort-change="tableSortChange" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="buser_id" label="渠道ID"> </el-table-column>
          <el-table-column prop="url_name" label="加速内容名称">
          </el-table-column>
          <el-table-column prop="domain" label="源站域名">
            <template slot-scope="scope">
              <div style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break:keep-all;margin:0 auto;">{{scope.row.domain}}</div>

            </template>
          </el-table-column>
          <el-table-column prop="host_url" label="回源路径">
            <template slot-scope="scope">
              <div style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break:keep-all;margin:0 auto;">{{scope.row.host_url}}</div>

            </template>
          </el-table-column>
          <el-table-column prop="url" label="播放路径">
            <template slot-scope="scope">
              <div style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break:keep-all;margin:0 auto;">{{scope.row.url}}</div>

            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <span
              style="color:#0ABF5B;"
              v-if="scope.row.state == 1"
              >正常运行</span>
              <span
              style="color:#E54545;"
              v-else-if="scope.row.state == 0"
              >已停止</span>
              <span style="color:#E54545;" v-else
              >回源失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <el-button @click="Configuration(scope.row)" type="text" size="small">配置</el-button>
              <el-button type="text" size="small" @click="updatauser(scope.row)">复制配置</el-button>
              <el-button type="text" size="small" @click="monitor(scope.row)">监控</el-button>
              <el-button type="text" size="small" @click="onDisable(scope.row)">{{ scope.row.state == 1 ? "停用" : "启用" }}</el-button>
              <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">详情</el-button> -->
              <el-button type="text" size="small" @click="deleateuser1(scope.row)" style="color:red;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 按钮 -->
        <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center;">
          <div>
            <el-button @click="enableuser()" type="text">启用</el-button>
            <el-button @click="disableuser()" type="text" style="margin-left:30px;color:red;">停用</el-button>
            <el-button @click="deleateuser()" type="text" style="margin-left:30px;">删除</el-button>
          </div>
          <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="添加域名" :visible.sync="dialogFormVisible" custom-class="customWidth" class="domain_dialog">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
        <el-form-item label="渠道ID:" :label-width="formLabelWidth" prop="account" :rules="{
            required: true,
            message: '渠道ID不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="dynamicValidateForm.buser_id" placeholder="请输入渠道ID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL:" :label-width="formLabelWidth" prop="pwd" placeholder="请输入单个URL" :rules="{
            required: true,
            message: '域名不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="dynamicValidateForm.url" placeholder="请输入渠道域名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频名称:" :label-width="formLabelWidth" prop="conpwd" :rules="{
            required: true,
            message: '视频名称不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="dynamicValidateForm.url_name" placeholder="请输入主标签" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="视频格式" :label-width="formLabelWidth" prop="radio" :rules="{
            required: true,
            message: '业务类型不能为空',
            trigger: 'blur',
          }">
          <el-select v-model="dynamicValidateForm.url_type" placeholder="请选择" style="width:100%;">
            <el-option v-for="(item, index) in videoArr" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主标签:" :label-width="formLabelWidth" prop="conpwd" :rules="{
            required: true,
            message: '主标签不能为空',
            trigger: 'blur',
          }">
          <el-input v-model="dynamicValidateForm.label" placeholder="请输入主标签" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="副标签" :label-width="formLabelWidth" prop="radio" :rules="{
            required: true,
            message: '业务类型不能为空',
            trigger: 'blur',
          }">
          <el-select v-model="dynamicValidateForm.label2" placeholder="请选择" style="width:100%;">
            <el-option v-for="(item, index) in yewu" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="dialogFormVisibles">取 消</el-button>
        <el-button type="primary" @click="onSubmitAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="域名详情" :visible.sync="dialog" custom-class="customWidth" width="50%" style="width:100%:background:red;">
      <el-table ref="multipleTable" :data="tableData">
        <el-table-column prop="dominds" label="配置项"></el-table-column>
        <el-table-column prop="camesd" label="当前配置"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClicks(scope.row)" type="text" size="small">操作</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 复制配置弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialupdata" custom-class="customWidth" width="900px">
      <p style="text-align: left;margin: 10px 0;">
        复制配置允许将一个域名的配置项复制到多个域名，帮助您对域名进行批量配置
      </p>
      <el-steps :active="actives" finish-status="success" align-center>
        <el-step title="选择配置项"></el-step>
        <el-step title="选择域名"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <div v-if="actives === 1">
        <el-table ref="multipleTable" :data="futableData" tooltip-effect="dark" border style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="configuration" label="配置项"></el-table-column>
          <el-table-column prop="nowconfiguration" label="当前配置" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
        <el-button style="margin-top: 12px;" @click="fureset">取消</el-button>
      </div>
      <div v-else-if="actives === 2">
        <div style="display: flex;justify-content: space-between;align-items: center;margin: 10px 0">
          <span style="font-weight: 600;">域名列表</span>
          <div>
            已选择
            <span>{{ nums }}</span>个域名，最多允许50个
          </div>
          <el-input placeholder="请输入域名" v-model="fuinput" style=" width:300px" class="input-with-select" @keyup.enter.native="onSubmit"></el-input>
        </div>
        <div>
          <el-table ref="multipleTable" :data="urllist" tooltip-effect="dark" border style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="url" label="URL"></el-table-column>
          </el-table>
        </div>
        <el-button style="margin-top: 12px;" type="primary" @click="last">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
        <el-button style="margin-top: 12px;" @click="fureset">取消</el-button>
      </div>
      <!-- <div v-else>
            <el-button style="margin-top: 12px;" type="primary" @click="last">上一步</el-button>
            <el-button style="margin-top: 12px;"  @click="fureset">取消</el-button>
          </div>-->
    </el-dialog>
    <!--详情弹窗-->
    <el-dialog :visible.sync="dialogVisible4" width="25%">
      <div class="addaccout">
        <el-form :model="ruleForm5" ref="ruleForm5" label-position="left" class="demo-ruleForm">
          <h3 class="title">详细信息</h3>
          <el-form-item>
            <el-form-item label="加速内容名称:">
              <el-input v-model="ruleForm5.url_name" :disabled="true"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-form-item label="源站域名:">
              <el-input v-model="ruleForm5.url" :disabled="true"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-form-item label="回源路径:">
              <el-input v-model="ruleForm5.host_url" :disabled="true"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="phone">
            <el-form-item label="渠道ID:">
              <el-input v-model="ruleForm5.buser_id" :disabled="true"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="phone">
            <el-form-item label="状态:">
              <el-input v-model="ruleForm5.state" :disabled="true"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="phone">
            <el-form-item label="创建时间:">
              <el-input v-model="ruleForm5.create_time" :disabled="true"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="dialogVisible4 = false">确定</el-button>
            <el-button @click="dialogVisible4 = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fenye from "@/components/fenye";
import common from "../../comm/js/util";
import {
  query_url,
  add_url,
  delete_url,
  change_state,
  query_url_for_admin,
  url_export_for_admin,
} from "../../servers/api";
export default {
  data() {
    //过滤状态

    //重置密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      actives: 1,
      input_text: "",
      nums: 12,
      fuinput: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        account: "",
      },

      futableData: [
        {
          configuration: "回源HOST",
          nowconfiguration: "已配置",
        },
        {
          configuration: "缓存设置",
          nowconfiguration: "已配置",
        },
        {
          configuration: "缓存过期时间",
          nowconfiguration: "已配置",
        },
        {
          configuration: "自定义页面",
          nowconfiguration: "未配置",
        },
        {
          configuration: "Refer防盗链",
          nowconfiguration: "已配置",
        },
        {
          configuration: "URL鉴权",
          nowconfiguration: "已配置",
        },
        {
          configuration: "IP黑/白名单",
          nowconfiguration: "未配置",
        },
      ],
      //重置密码校验
      rules: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
      input: "", //搜索输入框
      value1: "",
      dialogFormVisible: false,
      dialogVisible4: false,
      dialog: false,
      dialupdata: false,
      dialpwdset: false,
      radio: "1",
      radioes: "1",
      isIndeterminate: "",
      sadioes: 1,
      currentPage: 1,
      pagesize: 10,
      total_cnt: 0,
      dynamicValidateForm: {
        buser_id: "",
        url: "",
        url_name: "",
        url_type: "",
        label: "",
        label2: "",
      },
      details: {},
      uetails: {},
      formLabelWidth: "60px",
      optiondisplay: false,
      rotate: false,
      gridData: [],
      tolpage: 1,
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
          label: "已停止",
        },
      ],
      yewu: [
        {
          value: 0,
          label: "视频点播",
        },
        {
          value: 1,
          label: "直播流媒体",
        },
        {
          value: 2,
          label: "文件下载",
        },
      ],
      videoArr: [
        {
          value: 0,
          label: "MP4",
        },
        {
          value: 1,
          label: "hls",
        },
        {
          value: 2,
          label: "flv",
        },
      ],
      value: "",

      tableData: [],
      urllist: [
        {
          url: "http://www.xxx.cn.abc",
        },
        {
          url: "http://www.xxx.cn.abc",
        },
        {
          url: "http://www.xxx.cn.abc",
        },
        {
          url: "http://www.xxx.cn.abc",
        },
        {
          url: "http://www.xxx.cn.abc",
        },
        {
          url: "http://www.xxx.cn.abc",
        },
      ],
      multipleSelection: [],
      buser_id: "",
      nowurl: "",
      ruleForm4: {},
      ruleForm5: {},
      order: 0,
      pageActive: 0,
      tableData: [],
      tableData2: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      buser_id_active: "158000000011",
      tempArray: {},
    };
  },
  components: {
    fenye,
  },
  created() {},
  mounted() {
    this.queryUrlList();
  },
  methods: {
    //监控
    monitor(row) {
      console.log(row)
      let monitorUrlname = row.url_name;
      let monitorChanId = row.buser_id;
      let monitorDomain = row.domain
      //localStorage.setItem("monitorUrlname", monitorUrlname);
      // localStorage.setItem("monitorChanId", monitorChanId);
      this.$router.push({
        path: "/trafficMonitor",
        query: {
          monitorUrlname: monitorUrlname,
          monitorChanId: monitorChanId,
          monitorDomain,
        },
      });
    },
    //状态选这改变
    onchangeTab(val) {
        this.currentPage = 1;
      this.queryUrlList();
    },
    //排序
    //排序
    tableSortChange(column) {
      this.currentPage = 1;
      if (column.order == "descending") {
        this.order = 1;
      } else {
        this.order = 0;
      }
      this.queryUrlList();
    },
    //标签页跳转
    goLink() {
      this.$router.push({
        path: "/back_source",
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量导入
    onImport() {
      this.$router.push({
        path: "/upload",
      });
    },

    //导出

    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "URL",
          "视频名称",
          "渠道ID",
          "状态",
          "创建时间",
          "标签",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "url",
          "url_name",
          "buser_id",
          "state",
          "create_time",
          "label",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "url管理");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 回车键搜索
    onSubmitInput() {
      // var rx = /^http?:\/\//i;
      // if (rx.test(this.input)) {
      //   this.nowurl = this.input;
      // } else {
      //   this.buser_id = this.input;
      // }
      this.currentPage = 1;
      this.queryUrlList();
    },
    //过滤状态
    formatState(rows) {
      if (rows.state == 1) {
        return "正常运行";
      }
       else if(rows.state==0) {
        return "已停止";
      }else if(rows.state==2){
        return "回源失败"
      }
      //return jsonData.map(v => filterVal.map(j => v[j]));
    },

    //复制配置下一步
    next() {
      if (this.actives == 2) {
        const confirmText = [
          "您确定要批量复制配置吗？",
          "域名配置复制后，操作不可逆，请务必确认您的域名复制选择无误零流量宽带较大的域名，请谨慎复制；若您之前有通过工单进行过后端特殊配置（非控制台功能配置），该特殊配置将无法复制。",
        ];
        const newDatas = [];
        const h = this.$createElement;
        for (const i in confirmText) {
          newDatas.push(h("p", null, confirmText[i]));
        }

        this.$confirm("提示", {
          title: "提示",
          message: h("div", null, newDatas),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.dialupdata = false;
            this.actives = 1;
            // 请求成功之后，调用接口
            this.$message({
              type: "success",
              message: "配置成功!",
            });
          })
          .catch(() => {
            this.dialupdata = false;
            this.actives = 1;
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
      if (this.actives++ > 2) {
        if (this.active++ > 2) this.active = 0;
        return false;
      }
    },
    //复制配置上一步
    last() {
      if (this.actives-- < 1) {
        // this.actives = 0;
        return false;
      }
    },
    //复制配置全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //复制配置取消
    fureset() {
      this.actives = 1;
      this.dialupdata = false;
    },
    //配置
    // Configuration(row) {
    //     console.log(row)
    //     return  false
    //     this.$router.push({
    //         path: "/back_source",
    //         query:{
    //             param:""
    //         }
    //     })
    // },
    new_btn() {},
    //添加URL
    onSubmitAdd() {
      this.dialogFormVisible = false;
      let param = new Object();
      param = this.dynamicValidateForm;
      add_url(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.common.monitoringLogs("新增", "新增加速内容", 1);

            this.queryUrlList();
          } else {
            this.common.monitoringLogs("新增 ", "新增加速内容", 0);
          }
        })
        .catch(error => {});
    },
    //新建用户-删除URL
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    //新建用户-添加URL
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    //新建用户-重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //批量管理
    setdomainlist() {
      let tempUrlArr = [];
      tempUrlArr = this.tableData;
      localStorage.setItem("tempUrlArr", JSON.stringify(tempUrlArr));

      this.$router.push({
        path: "/batch_management",
      });
    },
    //获取URL列表
    queryUrlList() {
      var resyzm = /^\d{12}$/;
      if (this.input_text == "") {
        this.buser_id = "";
        this.nowurl = "";
      } else {
        if (resyzm.test(this.input_text)) {
          this.buser_id = this.input_text;
          this.nowurl = "";
        } else {
          this.buser_id = "";
          this.nowurl = this.input_text;
        }
      }

      let params = new Object();

      params.page = this.currentPage - 1;
      params.buser_id = this.buser_id;
      params.url_name = this.nowurl;
      params.order = this.order;
      if (this.value === "") {
        params.state = -1;
      } else {
        params.state = this.value;
      }
      if (this.value1) {
        params.end_time = this.value1[1].getTime() / 1000;
        params.start_time = this.value1[0].getTime() / 1000;
      } else {
        params.end_time = 0;
        params.start_time = 0;
      }
      console.log(params.page)
      query_url_for_admin(params)
        .then(res => {
          if (res.status == 0) {
            let tempArr = [];
            tempArr = res.data.result;
            tempArr.forEach((item, index) => {
             let nowlength=item.create_time+""
              if (nowlength.length == 10) {
                item.create_time = this.common.getTimes(
                  item.create_time * 1000
                );
              }
           else {
                item.create_time = this.common.getTimes(item.create_time);
              }
             
            });
            this.tableData = [];
            this.tableData = tempArr;

            this.total_cnt = res.data.total;
          } else {
            this.tableData = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出
    toexportExcel() {
      let params = new Object();

      params.page = this.currentPage - 1;
      params.buser_id = this.buser_id;
      params.url_name = this.nowurl;
      params.order = this.order;
      if (this.value === "") {
        params.state = -1;
      } else {
        params.state = this.value;
      }
      if (this.value1) {
        params.end_time = this.value1[1].getTime() / 1000;
        params.start_time = this.value1[0].getTime() / 1000;
      } else {
        params.end_time = 0;
        params.start_time = 0;
      }
      url_export_for_admin(params)
        .then(res => {
          if (res.status == 0) {
            let exportLinks = res.data.down_load;
            window.open(exportLinks);

            this.common.monitoringLogs("导出", "导出增加速内容信息表", 1);
          } else {
            this.common.monitoringLogs("导出", "导出增加速内容信息表", 0);
          }
        })
        .catch(err => {
          console.log(err);
          this.common.monitoringLogs("导出", "导出增加速内容信息表", 1);
        });
    },
    //获取页码
    handleCurrentChange(pages) {
      this.currentPage = pages;
      this.queryUrlList();
      //this.getdata();
    },
    //获取每页数量
    handleSizeChange(pagetol) {
      this.currentPage = pagetol;
      //this.getdata();
    },
    //回车事件
    onSubmit() {},
    //配置
    Configuration(val) {
      let tempUrl = val.url_name;
      let tempChanId = val.buser_id;
      localStorage.setItem("tempUrl", tempUrl);
      localStorage.setItem("tempChanId", tempChanId);
      this.$router.push({
        path: "/back_source",
      });
    },
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定搜索
    seachuser() {
      this.queryUrlList();
      //this.value1 = "";
    },
    gettimes() {
      this.queryUrlList();
    },
    //重置
    reset() {
      this.value = "";
      this.value1 = null;
      this.input = "";
      this.buser_id = "";
      this.nowurl = "";
      this.input_text = "";
      this.queryUrlList();
    },
    //新建
    addUrl() {
      this.$router.push({
        path: "/add_url",
      });
      this.dialogFormVisible = true;
    },
    //新建取消
    dialogFormVisibles() {
      this.radio = "1";
      this.dynamicValidateForm.account = "";
      this.dynamicValidateForm.nickname = "";
      this.dynamicValidateForm.pwd = "";
      this.dynamicValidateForm.conpwd = "";
      this.dynamicValidateForm.actualname = "";
      this.dynamicValidateForm.tel = "";
      this.dialogFormVisible = false;
    },
    //新建确定
    dialogFormVisiblea() {
      console.log(
        this.dynamicValidateForm.name,
        this.dynamicValidateForm.region
      );
      this.dynamicValidateForm.name = "";
      this.dynamicValidateForm.region = "";
      this.dialogFormVisible = false;
    },
    //表格查看
    handleClick(row) {
      //this.ruleForm5.state=""
      console.log(row);
      this.ruleForm5 = Object.assign({}, row);
      console.log(row);
      console.log(this.ruleForm5.state);
      if (this.ruleForm5.state == 0) {
        this.ruleForm5.state = "已停止";
      } else {
        this.ruleForm5.state = "正常运行";
      }
      this.dialogVisible4 = true;
    },
    //表格修改
    updatauser(val) {
      let tempUrl = val.url_name;
      let tempChanId = val.buser_id;
      localStorage.setItem("tempUrl", tempUrl);
      localStorage.setItem("tempChanId", tempChanId);
      if (val.radio == "正常运行") {
        this.radioes = "1";
      } else {
        this.radioes = "2";
      }
      this.uetails = val;
      this.$router.push({
        path: "/copy",
        query: {
          linKUrl: val.url,
        },
      });
      // this.dialupdata = true;
    },
    //表格修改取消
    updataa() {
      this.uetails = {};
      this.dialupdata = false;
    },
    //表格修改确认
    updatab() {
      this.uetails = {};
      this.dialupdata = false;
    },
    //单个禁用启用
    onDisable(row) {
      if (row.state == 1) {
        this.$confirm(
          "停用后该渠道ID的此加速内容将关闭加速服务，是否继续？",
          "提示",
          {
            type: "warning",
          }
        )
          .then(() => {
            //停用
            let tempArr = [];
            let tempArr1 = [];
            tempArr[0] = row.url_name;
            // tempArr[1] = 1;
            tempArr1.push(tempArr);

            let tempparam = {};
            tempparam.data_count = 0;
            tempparam.data = [];

            let obj = {
              buser_id: row.buser_id,
              data_count: 0,
              state: 0,
              data_array: tempArr,
            };
            tempparam.data.push(obj);

            change_state(tempparam)
              .then(res => {
                if (res.status == 0) {
                  this.$message({
                    message: "停用成功",
                    type: "success",
                  });
                  this.queryUrlList();
                  this.common.monitoringLogs("修改 ", "停用加速内容", 1);
                } else {
                  this.common.monitoringLogs("修改 ", "停用加速内容", 0);
                }
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      } else if (row.state == 0) {
        this.$confirm("是否要启用此加速内容？", "提示", {
          type: "warning",
        })
          .then(() => {
            //启用
            let tempArr = [];
            let tempArr1 = [];
            tempArr[0] = row.url_name;

            let tempparam = {};
            tempparam.data_count = 0;
            tempparam.data = [];
            let obj = {
              buser_id: row.buser_id,
              data_count: 0,
              state: 1,
              data_array: tempArr,
            };
            tempparam.data.push(obj);

            change_state(tempparam)
              .then(res => {
                if (res.status == 0) {
                  this.$message({
                    message: "启用成功",
                    type: "success",
                  });
                  this.common.monitoringLogs("修改 ", "启用加速内容", 1);
                  this.queryUrlList();
                } else {
                  this.common.monitoringLogs("修改 ", "启用加速内容", 0);
                }
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }

      // this.ruleForm.account = row.account;
      // this.dialpwdset = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "密码重置成功",
            type: "success",
          });
          this.dialpwdset = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialpwdset = false;
    },

    //批量启用
    enableuser() {
      let tempArr = this.multipleSelection;
      this.tempArray = {};

      let tempArr2 = [];
      for (var i = 0; i < tempArr.length; i++) {
        tempArr2.push(tempArr[i].url_name);
        if (!this.tempArray[tempArr[i].buser_id]) {
          this.tempArray[tempArr[i].buser_id] = [];
        }
        this.tempArray[tempArr[i].buser_id].push(tempArr[i].url_name);
      }
      console.log(tempArr2);

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

      let param = new Object();
      param.buser_id = this.buser_id_active;
      param.data_count = tempArr2.length;
      param.data_array = tempArr2;
      param.state = 1;
      change_state(tempparam)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              type: "success",
              message: "批量启用成功!",
            });
            this.queryUrlList();
            this.common.monitoringLogs("修改 ", "批量启用加速内容", 1);
          } else {
            this.common.monitoringLogs("修改 ", "批量启用加速内容", 0);
          }
        })
        .catch(error => {
          console.logA(error);
        });
    },
    //禁用
    disableuser() {
      console.log(this.multipleSelection)
      if(this.multipleSelection.length == 0){
        this.$message({
          type: 'error',
          message: '请至少选择一项！'
        });
        return
      }
      this.$confirm(
        "停用后该渠道ID的此加速内容将关闭加速服务，是否继续？",
        "提示",
        {
          type: "warning",
        }
      )
        .then(() => {
          this.tempArray = {};

          let tempArr = this.multipleSelection;
          let tempArr2 = [];
          for (var i = 0; i < tempArr.length; i++) {
            tempArr2.push(tempArr[i].url_name);
            if (!this.tempArray[tempArr[i].buser_id]) {
              this.tempArray[tempArr[i].buser_id] = [];
            }
            this.tempArray[tempArr[i].buser_id].push(tempArr[i].url_name);
          }
          // console.log(tempArr2);
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

          let param = new Object();
          param.buser_id = this.buser_id_active;
          param.data_count = tempArr2.length;
          param.data_array = tempArr2;
          param.state = 0;
          change_state(tempparam)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  type: "success",
                  message: "批量禁用成功!",
                });
                this.queryUrlList();
                this.common.monitoringLogs("修改 ", "批量禁用加速内容", 1);
              } else {
                this.common.monitoringLogs("修改 ", "批量禁用加速内容", 0);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 删除
    deleateuser(rows) {
      this.tempArray = {};
      let tempArr = this.multipleSelection;
      let tempArr1 = [];
      let tempArr2 = [];
      if (tempArr.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少勾选一项！",
        });
        return false;
      }

      for (var i = 0; i < tempArr.length; i++) {
        if (!this.tempArray[tempArr[i].buser_id]) {
          this.tempArray[tempArr[i].buser_id] = [];
        }
        this.tempArray[tempArr[i].buser_id].push(tempArr[i].url_name);
        if (tempArr[i].state == 1) {
          this.$message({
            type: "warning",
            message:
              "只有禁用的加速内容才能被删除,请检查勾选的加速内容中是否有未被禁用的！",
          });
          return false;
        }
        tempArr1.push(tempArr[i].url_name);
      }

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

      // let param = new Object();
      // param.data_count = tempArr.length;
      // param.data_array = tempArr1;
      // param.buser_id = this.buser_id_active;
      this.$confirm(
        "删除后该渠道ID的此加速内容信息将从列表上移除，删除后信息不可恢复，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delete_url(tempparam)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.queryUrlList();
                this.common.monitoringLogs("删除 ", "删除加速内容", 1);
              } else {
                this.common.monitoringLogs("删除 ", "删除加速内容", 0);
              }
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }, // 表头样式设置
    // 删除
    deleateuser1(rows) {
      if (rows.state == 1) {
        this.$message({
          type: "warning",
          message: "只有禁用的URL才能被删除!",
        });
        return false;
      }

      let tempArr1 = [];
      tempArr1.push(rows.url_name);

      let parmas = new Object();
      parmas.data_count = 0;
      parmas.data = [];
      let obj = {};
      obj.buser_id = rows.buser_id;
      obj.data_array = [];
      obj.data_count = 0;
      obj.data_array = tempArr1;
      parmas.data[0] = obj;

      this.$confirm(
        "删除后该渠道ID的此加速内容信息将从列表上移除，删除后信息不可恢复，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delete_url(parmas)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.queryUrlList();
                this.common.monitoringLogs("删除 ", "删除加速内容", 1);
              } else {
                this.common.monitoringLogs("删除 ", "删除加速内容", 0);
              }
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }, // 表头样式设置
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
</style>
