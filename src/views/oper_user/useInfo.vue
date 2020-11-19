<template>
    <section class="myself-container">
        <div class="top_title" style="display: flex;margin-top:30px;">
            <span @click="goback" style="font-size: 18px;color: #333;">
                <i class="el-icon-arrow-left" style="font-size: 18px;margin-right:0px;"></i>
                详情</span>
        </div>
        <div class="content-main">
          <div class="user-desc">
            <div class="user-desc-wrapper">
              <div class="user-item">
                <div class="item-text">{{count}}</div>
                <div class="item-text" style="margin-top:7px;font-size:16px;font-weight:400;">加速内容</div>
              </div>
              <div class="user-item">
                <div class="item-text">{{dataFlow}}</div>
                <div class="item-text" style="margin-top:7px;font-size:16px;font-weight:400;">累计消费流量</div>
              </div>
            </div>
            <div class="user-table">
              <p>'{{ids}}' 渠道的加速内容</p>
              <ChangeType @selectType="selectType" style="margin: 48px 0 37px"/>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table
                    v-if="accelerateType==0"
                    :data="tableData"
                    border
                    max-height="600px"
                    style="width: 100%;"
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                  >
                    <el-table-column label="直播间ID" prop="roomId"></el-table-column>
                    <el-table-column label="源站域名" prop="url"></el-table-column>
                    <el-table-column label="回源协议" prop="protocol"></el-table-column>
                    <el-table-column label="状态" prop="state"></el-table-column>
                  </el-table>
                  <el-table
                    v-show="accelerateType==1"
                    :data="tableData"
                    border
                    max-height="600px"
                    style="width: 100%;"
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                  >
                    <el-table-column label="直播间ID" prop="roomId"></el-table-column>
                    <el-table-column label="P2P播放流量" prop="p2pFlow"></el-table-column>
                    <el-table-column label="直播源流量" prop="flow"></el-table-column>
                  </el-table>
                  <fenye
                    style="float: right; margin: 10px 0 0 0"
                    @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange"
                    :currentPage="pageNo"
                    :pagesa="total_cnt"
                  ></fenye>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="user-info">
              <div class="title" style="text-align: left;">
                  基本信息
              </div>
              <div class="user-con">
                <div class="item" style="margin-top:10px;">
                    <span class="item-l">用户ID</span>
                    <div class="item-r">{{ids}}</div>
                </div>
                <div class="item">
                    <span class="item-l">用户昵称</span>
                    <div class="item-r">{{username}}</div>
                </div>
                <div class="item">
                    <span class="item-l">手 机 号</span>
                    <div class="item-r">{{phone}}</div>
                </div>
                <div class="item">
                    <div class="item-l">邮箱</div>
                    <div class="item-r">{{email}}</div>
                </div>
                <div class="item">
                    <div class="item-l">注册时间</div>
                    <div class="item-r">{{time_create}}</div>
                </div>
                <div class="item">
                    <div class="item-l">业务类型</div>
                    <div class="item-r">点播加速、直播加速</div>
                </div>
              </div>
              <div style="text-align: right;margin-top:112px">
                <img src="../../assets/img/pic1.png"  width="251px" height="221px" alt="">
              </div>
          </div>
        </div>
    </section>
</template>

<script>
import { query_url_for_admin } from "../../servers/api";
import common from "../../comm/js/util.js";
import fenye from "@/components/fenye";
import ChangeType from "@/components/ChangeType";
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
      tableData: [],
      pageNo: 1,
      total_cnt: 0,
      accelerateType: 0,
    };
  },
  components: {
    fenye,
    ChangeType,
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
    selectType(val){
      console.log(val)
      this.accelerateType = val.accelerateType;
    },
    handleCurrentChange(){

    },
    handleSizeChange(){

    },
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

<style lang="less" scoped>
.content-main{
  margin-top: 47px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  .user-desc {
    // width: 65%;
    margin: 0 24px 40px 0;
    flex: 1;
    min-width: 544px;
    .user-desc-wrapper{
      display: flex;
      flex-direction: row;
      justify-items: center;
      justify-content: space-between;
      .user-item {
        width: 49%;
        background: #fff;
        padding: 25px;
        border-radius: 32px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .item-text {
          font-size: 42px;
          font-weight: bold;
        }
      }
    }
    .user-table{
      margin-top: 24px;
      padding: 65px 72px;
      background: #fff;
      border-radius: 32px;
      width: 100%;
      height: auto;
      p{
        text-align: left;
        font-size: 18;
        color: #333;
      }
    }
  }
  .user-info {
    min-width: 544px;
    background: #fff;
    padding: 64px 32px 32px 64px;
    margin-bottom: 40px;
    border-radius: 32px;
    .title {
      font-size: 18px;
      color: #333;
    }
    .user-con {
      margin-top: 56px;
      width: 100%;
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: flex-start;
        font-size: 16px;
        color: #666666;
        margin-bottom: 46px;
        .item-l{
          text-align: justify;
          text-align-last: justify;
          width: 72px;
        }
        .item-r{
          margin-left: 52px;
        }
      }
    }
  }
}
</style>
