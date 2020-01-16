<template>
  <div class="content">
    <!-- 面包屑  -->
    <div class="bread_crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>IPFS节点控制台</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>华东地区</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>IPFS节点详情</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 主体内容上 -->
    <div class="ipfs_detail_title">
      <div class="ipfs_item" v-for="(item,index) in serdata" :key="index" @click="godetail(item)">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <div class="yuan" v-bind:style="{background:item.bgccolor}"></div>
          <span v-bind:style="{color:item.bgccolor}">{{item.devstatus}}</span>
        </div>
        <div class="ipfs_item_img">
          <img src="../../../assets/img/binding_illustration3.png" style="width:60%;" alt />
          <p>节点：{{item.nodeid}}</p>
        </div>
      </div>
      <div class="ipfs_item_topright">
        <div>
          <div class="ipfs_con">
            <div class="ipfs_con_tit">
              <div class="alltitle">
                <span>累计使用流量</span>
              </div>
              <div class="allnum">500G</div>
            </div>
            <div class="ipfs_con_tit">
              <div class="alltitle">
                <span>累计传输次数</span>
              </div>
              <div class="allnum">12次</div>
            </div>
            <div class="ipfs_con_tit">
              <div class="alltitle">
                <span>累计存储容量</span>
              </div>
              <div class="allnum">100G</div>
            </div>
            <div class="ipfs_con_tit">
              <div class="alltitle">
                <span>累计存储次数</span>
              </div>
              <div class="allnum">27次</div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: flex-start;align-items: center;font-size: 16px;">
          <div class="ipfs_item_toptwo">
            <div style="display: flex;justify-content: center;align-items: center;">
              <span style="font-size: 18px;font-weight: 600;">ip流量</span>
              <qiu></qiu>
              <span>可用60%</span>
            </div>

            <div class="ipfs_item_toptwo_item">
              <span>总带宽：上下行带宽</span>
              <span>35.00 / 25.00MB</span>
            </div>
            <div class="ipfs_item_toptwo_item">
              <span>使用带宽：上下行带宽</span>
              <span>35.00 / 25.00MB</span>
            </div>
            <div class="ipfs_item_toptwo_item">
              <span>剩余带宽：上下行带宽</span>
              <span>35.00 / 25.00MB</span>
            </div>
          </div>
          <div class="ipfs_item_toptwo">
            <div style="display: flex;justify-content: center;align-items: center;">
              <span style="font-size: 18px;font-weight: 600;">Fs存储</span>
              <qiu></qiu>
              <span>可用60%</span>
            </div>

            <div class="ipfs_item_toptwo_item">
              <span>总存储:</span>
              <span>1000.00GB</span>
            </div>
            <div class="ipfs_item_toptwo_item">
              <span>使用存储:</span>
              <span>10.57GB</span>
            </div>
            <div class="ipfs_item_toptwo_item">
              <span>剩余存储:</span>
              <span>989.43GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ipfs_item_bottom">
      <div class="ipfs_item_bottom_title">
        <span :class="[rotate?'eema':'bluma']" @click="setmap_show()" class="setmap_btn">节点IP流量</span>
        <span :class="[rotate?'bluma':'eema']" @click="setmap_show()">节点FS存储</span>
      </div>
      <div style="padding: 0 37px;">
        <el-table
          :data="tableData"
          border
          height="630"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          style="width: 100%"
        >
          <el-table-column prop="use" label="用途" width="180"></el-table-column>
          <el-table-column prop="upstream" label="上下行带宽" width="180"></el-table-column>
          <el-table-column prop="total" label="共计使用流量"></el-table-column>
          <el-table-column prop="node_ip" label="节点IP"></el-table-column>
          <el-table-column prop="node_id" label="节点ID"></el-table-column>
          <el-table-column prop="start_time" label="启用时间"></el-table-column>
          <el-table-column prop="usage_time" label="使用时长"></el-table-column>
          <el-table-column prop="status_use" label="使用状态"></el-table-column>
          <el-table-column prop="ip_application_channel" label="IP应用渠道"></el-table-column>
          <el-table-column prop="user_id" label="使用者ID"></el-table-column>
        </el-table>
      </div>
      <fenye style="margin: 20px 10px 0px 0px;text-align: right;"></fenye>
    </div>
  </div>
</template>

<script>
import qiu from "@/components/qiu";
import fenye from "@/components/fenye";
export default {
  data() {
    return {
      serdata: [],
      rotate: false,
      tableData: [
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        },
        {
          use: "文件下载", //用途
          upstream: "20 / 13MB", //上下行带宽
          total: "1000MB", //共计使用流量
          node_ip: "10.0.0.164", //节点IP
          node_id: "xxxxxxxxxxxxx", //节点ID
          start_time: "2019-11-09 20：35", //启用时间
          usage_time: "500 S", //使用时长
          status_use: "使用中", //使用状态
          ip_application_channel: "A渠道", //IP应用渠道
          user_id: "xxxxxxxxxxxxx" //使用者ID
        }
      ]
    };
  },
  components: {
    qiu,
    fenye
  },
  mounted() {
    this.serdata.push(JSON.parse(sessionStorage.getItem("serdata")));
    console.log(this.serdata);
  },
  methods: {
    setmap_show() {
      this.rotate = !this.rotate;
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:rgb(194, 213, 245);";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  max-width: 1920px;
  height: 100%;
  background: rgb(255, 255, 255);
  margin: 30px;
  .bread_crumbs {
    width: 100%;
    padding: 37px;
    font-size: 26px;
  }
  .ipfs_detail_title {
    display: flex;
    padding: 37px;
    .ipfs_item {
      width: 228px;
      height: 240px;
      padding: 23px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(216, 226, 240, 1);
      box-shadow: 0px 0px 18px 0px rgba(211, 215, 221, 0.4);
      border-radius: 3px;
      margin-right: 50px;
      margin-top: 25px;
      .yuan {
        width: 10px;
        height: 10px;
        background: #64a7fc;
        border-radius: 50%;
        margin-right: 20px;
      }
      .ipfs_item_img {
        margin: 25px 0;
        // border-bottom: 1px solid #eeeeee;
        color: #404447;
      }
      ol > li {
        line-height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .ipfs_text_title {
          color: #b2b5b8;
        }
        .ipfs_text_con {
          width: 75px;
          text-align: left;
          overflow: hidden;
        }
      }
    }
    .ipfs_item_topright {
       width: 100%;
    }
    .ipfs_item_toptwo {
      width: 282px;
      margin: 0 30px;
      .ipfs_item_toptwo_item {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .ipfs_con {
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 37px;
    justify-content: space-between;
  }
  .ipfs_con {
    // width: 100%;
    height: 123px;
    display: flex;
    .ipfs_con_tit {
     width: 270px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(216, 226, 240, 1);
      box-shadow: 0px 12px 36px 0px rgba(211, 215, 221, 0.4);
      border-radius: 4px;
      text-align: left;
      padding: 2px 30px;
      .alltitle {
        display: inline-block;
        height: 45px;
        display: flex;
        align-items: center;
        line-height: 45px;
        color: #929292;
        font-size: 18px;
      }
      .allnum {
        line-height: 40px;
        color: #1c1a1d;
        font-size: 44px;
      }
    }
  }
  .ipfs_item_bottom {
    .ipfs_item_bottom_title {
      text-align: left;
      padding-left: 17px;
      margin-bottom: 20px;
      .setmap_btn {
        margin: 0 20px;
      }
    }
  }
}
.eema {
  width: 90px;
  color: #919191;
  line-height: 20px;
  display: inline-block;
  line-height: 30px;
}
.bluma {
  width: 90px;
  line-height: 40px;
  color: #64a7fc;
  line-height: 20px;
  display: inline-block;
  line-height: 30px;
  border-bottom: #64a7fc 3px solid;
}
</style>