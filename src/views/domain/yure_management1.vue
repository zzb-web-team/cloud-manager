<template>
    <div class="content">
        <div class="top_title" style="display: flex;margin-bottom: 20px;">
            <span @click="goback" style="font-size: 24px;color: #202020;">
                <i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
                刷新/预热</span>
        </div>
        <!-- 主体内容 -->
        <div class="yure_content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="刷新缓存" name="first">
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="width:80px;float:left;line-height: 40px;">渠道ID：</span>
                        <el-input placeholder="请输入渠道ID" style="width:250px;" v-model="refreshBuserId"></el-input>
                    </div>
                    <span style="width:80px;float:left;line-height: 40px;">刷新区域：</span>
                    <el-cascader style="width:250px;" :options="citylist1" ref="cascaderAddr" :show-all-levels="false" v-model="citylabel" @change="handleChange"></el-cascader>
                    <p style="text-align: left;color: #999999;margin-bottom: 21px;font-size:18px;margin-top:15px;">
                        Filed刷新单次提交最多 10 条，使用回车换行输入，刷新任务完成时间预计为 10 分钟
                    </p>
                    <el-input type="textarea" style="width:800px;" :rows="2" placeholder="请输入内容" :autosize="{ minRows: 10, maxRows: 20 }" v-model="textarea1"></el-input>
                    <div style="margin: 20px 0;">
                        <el-button @click="onsumbit()" style="width:96px;-height:40px;background:rgba(41,122,255,1);border-radius:6px;color:#ffffff;">提交</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内容预热" name="second">
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="width:80px;float:left;line-height: 40px;">渠道ID：</span>
                        <el-input placeholder="请输入渠道ID" style="width:250px;" v-model="refreshBuserId"></el-input>
                    </div>
                    <span style="width:80px;float:left;line-height: 40px;">预热区域：</span>
                    <el-cascader style="width:250px;" :options="citylist1" ref="cascaderAddr1" :show-all-levels="false" v-model="citylabel" @change="handleChange1"></el-cascader>
                    <p style="text-align: left;color: #999999;margin-bottom: 21px;font-size:18px;margin-top:15px;">
                        Filed预热单次提交最多 10 条，使用回车换行输入，刷新任务完成时间预计为 10 分钟
                    </p>
                    <el-input type="textarea" style="width:800px;" :rows="2" placeholder="请输入内容" :autosize="{ minRows: 10, maxRows: 20 }" v-model="textarea1"></el-input>
                    <div style="margin: 20px 0;">
                        <el-button @click="onsumbit()" style="width:96px;-height:40px;background:rgba(41,122,255,1);border-radius:6px;color:#ffffff;">提交</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--  -->
    </div>
</template>

<script>
import fenye from "@/components/fenye";
import { resource_refresh, refresh_state } from "../../servers/api";
export default {
  data() {
    return {
      errarr: "",
      total_cnt: 1,
      activeName: "first",
      radio1: "1",
      textarea1: "",
      radio2: "1",
      textarea2: "",
      optiondisplay: false,
      input: "",
      valuea: "",
      valueb: "",
      rotate: false,
      value1: "",
      citylabel: "",
      citylabel1: "",
      chanid: "",
      options1: [
        {
          value: 0,
          label: "URL刷新",
        },
        {
          value: 1,
          label: "内容预热",
        },
      ],
      options2: [
        {
          value: 0,
          label: "等待刷新",
        },
        {
          value: 1,
          label: "刷新中",
        },
        {
          value: 2,
          label: "刷新失败",
        },
        {
          value: 4,
          label: "等待预热",
        },
        {
          value: 5,
          label: "预热中",
        },
        {
          value: 6,
          label: "预热失败",
        },
        {
          value: 7,
          label: "完成",
        },
      ],

      citylist1: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "华北",
        },
        {
          value: 2,
          label: "西北",
        },
        {
          value: 3,
          label: "东北",
        },
        {
          value: 4,
          label: "华东",
        },
        {
          value: 5,
          label: "华中",
        },
        {
          value: 6,
          label: "西南",
        },
        {
          value: 7,
          label: "华南",
        },
        {
          value: 8,
          label: "其他",
        },
      ],
      BuserId: "",
      area: "",
      area1: "",
      refreshurl: [],
      refreshBuserId: "",
      opType: 0,
    };
  },
  components: {
    fenye,
  },
  created() {},
  mounted() {
    if (this.$route.query.linkTab) {
      this.activeName = this.$route.query.linkTab;
    } else {
      this.activeName = "first";
    }

    // if (this.$cookies.get("adminid")) {
    //     this.chanid = this.$cookies.get("adminid") * 1;
    // } else {
    //     this.$router.push({
    //         path: "/"
    //     });
    // }

    // this.getrefresh();
    //this.getrefreshstate();
  },
  methods: {
    //移除空格
    removeEmpty(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "" || typeof arr[i] == "undefined") {
          arr.splice(i, 1);
          i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
        }
      }
      return arr;
    },
    //刷新提交
    onsumbit() {
      this.refreshurl = this.removeEmpty(this.textarea1.split("\n"));

      if (this.activeName == "first") {
        this.opType = 0;
        if (this.refreshBuserId == "") {
          this.$message.error("请输入要刷新的渠道ID");
          return false;
        }
        if (this.area == "") {
          this.$message.error("请输入要刷新的区域");
          return false;
        }
        if (this.refreshurl == "") {
          this.$message.error("请输入要刷新的URL地址");
          return false;
        }
      } else {
        this.opType = 1;
        if (this.refreshBuserId == "") {
          this.$message.error("请输入要预热的渠道ID");
          return false;
        }
        if (this.area == "") {
          this.$message.error("请输入要预热的区域");
          return false;
        }
        if (this.refreshurl == "") {
          this.$message.error("请输入要预热的URL地址");
          return false;
        }
      }

      let param = new Object();
      param.buser_id = this.refreshBuserId;
      param.area = this.area;
      param.url_name = this.refreshurl;
      param.type = this.opType;
      param.createdtime=parseInt(new Date().getTime()/1000)
      localStorage.setItem("WarmParam","" )
      localStorage.setItem("WarmParam",JSON.stringify(param) )
      resource_refresh(param)
        .then(res => {
          if (res.status == 0) {
            if (res.data.res_data[0][1] == false) {
              this.$message({
                message: "操作失败",
                type: "error",
              });
              return false;

            }
            //debugger
            let teampArr = res.data.res_data;
            let teampArr1 = [];
            let teampArr2 = [];
            for (var i = 0; i < teampArr.length; i++) {
              if (teampArr[i][1] == false) {
                teampArr1.push(teampArr[i][0]);
              } else {
                teampArr2.push(teampArr[i][0]);
              }
            }
            if (teampArr2.length == 0) {
              teampArr2[0] = 0 + "条";
            }

            this.$alert(
              "插入成功URL:" +
                teampArr2 +
                "," +
                "</br>" +
                "插入失败URL:" +
                teampArr1,
              "提示",
              {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                callback: action => {
                  this.$router.push({
                    path: "/yure_management",
                  });
                },
              }
            );
          }
        })
        .catch(error => {});
    },

    //返回
    goback() {
      this.$router.go(-1);
    },
    tijiao() {
      let ser = this.textarea1;
    },
    handleChange() {
      var thsAreaCode = this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels;
      this.area = thsAreaCode[0];
    },
    handleChange1() {
      var thsAreaCode = this.$refs.cascaderAddr1.getCheckedNodes()[0]
        .pathLabels;
      this.area = thsAreaCode[0];
    },
    handleClick(tab, event) {
      this.citylabel = "";
      this.textarea1 = "";
      this.refreshBuserId = "";
    },
    getpage() {},
    gettol() {},
    //筛选按钮
    option_display() {
      this.optiondisplay = !this.optiondisplay;
      this.rotate = !this.rotate;
    },
    //确定
    seachuser() {
      this.optiondisplay = false;
    },
    //重置
    reset() {
      this.input = "";
      this.valuea = "";
      this.valueb = "";
      this.value1 = "";
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eef1f6;color:#333333;font-size:16px;";
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
  .yure_content {
    width: 100%;
    // margin: 15px 0;
  }

  width: 100%;
  height: 100%;
  text-align: left;

  .seach {
    width: 100%;

    // display: flex;
    // align-items: center;
    .seach_top {
      width: 100%;
      height: 60px;
      line-height: 60px;

      .input-with-select {
        width: 300px;
        float: left;
        margin-right: 10px;
      }
    }

    .seach_bottom {
      text-align: left;
      height: 80px;
      background: #f2f6fa;
      border-radius: 10px;
      padding: 10px 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;

      span {
        color: #999999;
        font-size: 14px;
      }
    }
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
