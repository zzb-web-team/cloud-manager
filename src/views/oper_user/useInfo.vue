<template>
    <section class="myself-container">
        <div class="top_title" style="display: flex;margin-top:30px;">
            <span @click="goback" style="font-size: 24px;color: #333;">
                <i class="el-icon-arrow-left" style="color: #644CF7;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
                用户详情</span>
        </div>
        <div class="content">
          <div class="user-title">
              <el-row>
                  <el-col :span="5">
                      <div class="user-item">
                          <div class="item-text" style="margin-top:7px;">加速内容</div>
                          <div class="item-text" style="margin-top:7px;">
                              {{count}}个
                          </div>
                      </div>
                  </el-col>
                  <el-col :span="5" style="margin-left:30px;">
                      <div class="user-item">
                          <div class="item-text" style="margin-top:7px;">累计消费流量</div>
                          <div class="item-text" style="margin-top:7px;">
                              {{dataFlow}}
                          </div>
                      </div>
                  </el-col>

              </el-row>
          </div>
          <div class="user-info">
              <div class="title">
                  <div class="title-text">基本信息</div>

              </div>
              <div class="h3" style="text-align: left;">
                  基本信息
              </div>
              <div class="user-con">
                  <div class="item" style="margin-top:10px;">
                      <div class="item-l">用户ID:</div>
                      <div class="item-r">{{ids}}</div>
                  </div>
                  <div class="item">
                      <div class="item-l">用户昵称:</div>
                      <div class="item-r">{{username}}</div>
                  </div>
                  <div class="item">
                      <div class="item-l">手 机 号:</div>
                      <div class="item-r">{{phone}}</div>
                  </div>
                  <div class="item">
                      <div class="item-l">邮箱:</div>
                      <div class="item-r">{{email}}</div>
                  </div>
                  <div class="item">
                      <div class="item-l">注册时间:</div>
                      <div class="item-r">{{time_create}}</div>
                  </div>
              </div>
          </div>
        </div>
    </section>
</template>

<script>
import { query_url_for_admin } from "../../servers/api";
import common from "../../comm/js/util.js";
export default {
  data() {
    return {
      ids: "",
      time_create: "",
      phone: "",
      username: "",
      email: "",
      dataFlow: "",
      count: 0,
    };
  },
  mounted: function() {
    if (this.$route.query.id) {
      this.ids = this.$route.query.id;
    } else {
      this.ids = "";
    }
    if (this.$route.query.time_create) {
      this.time_create = this.$route.query.time_create;
    } else {
      this.time_create = "";
    }
    if (this.$route.query.phone) {
      this.phone = this.$route.query.phone;
    } else {
      this.phone = "";
    }
    if (this.$route.query.username) {
      this.username = this.$route.query.username;
    } else {
      this.username = "";
    }
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
    } else {
      this.email = "";
    }
    if (this.$route.query.dataFlow) {
      this.dataFlow = this.$route.query.dataFlow;
    } else {
      this.dataFlow = 0;
    }
    this.querInfo();
  },
  methods: {
    //获取加速数量
    querInfo() {
      let param = {};
      (param.buser_id = this.ids+""),
        (param.end_time = 0),
        (param.order = 0),
        (param.page = 0),
        (param.start_time = 0),
        (param.state = -1),
        (param.url_name = "");
      query_url_for_admin(param)
        .then(res => {
          if (res.status == 0) {
              
            this.count = res.data.total;
          } else {
            this.count = 0;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "后台服务出错",
          });
        });
    },
    //返回
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.user-title {
  margin-top: 30px;

  .user-item {
    background: #FDFBFB;
    padding: 25px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .item-count,
    .item-text {
      display: flex;
      justify-content: center;
    }
  }
}

.user-info {
  width: 100%;
  margin-top: 30px;

  .title {
    width: 100%;
    border-bottom: 2px solid #644CF7;
    height: 40px;

    .title-text {
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #644CF7;
      color: #ffffff;
    }
  }

  .h3 {
    width: 100%;
    height: 40px;
    background: #FDFBFB;
    border-radius: 4px;
    margin-top: 10px;
    line-height: 40px;
    text-indent: 20px;
    font-size: 14px;
  }

  .user-con {
    width: 100%;

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-left: 25px;
      height: 25px;
      line-height: 25px;
      box-sizing: border-box;
      justify-content: flex-start;
      font-size: 14px;
      color: #666666;
    }
  }
}

.myself-container {
  .el-table th > .cell {
    text-align: center;
  }

  .el-table .cell {
    text-align: center;
  }

  width: 100%;
  //min-width: 1600px;

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
</style>
