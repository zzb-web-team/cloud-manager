<template>
  <div class="content">
    <!-- 面包屑  -->
    <div class="bread_crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>IPFS节点控制台</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>西南地区</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>IPFS节点区位</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 标题 -->
    <div class="ipfs_title">{{location_name}}</div>
    <div class="ipfs_con">
      <div class="ipfs_con_left">节点组网分布</div>
      <div class="ipfs_con_right">
        <span :class="[rotate?'eema':'bluma']" @click="setmap_show()" class="setmap_btn">A区</span>
        <span :class="[rotate?'bluma':'eema']" @click="setmap_show()">B区</span>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="ipfs_title_next" v-if="rotate==false">
      <div class="maptitle">北京市</div>
      <div class="ipfs_con">
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/zong.png" alt />
            <span>总节点</span>
          </div>
          <div class="allnum">12</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/jie.png" alt />
            <span>在线节点</span>
          </div>
          <div class="allnum">10</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/kong.png" alt />
            <span>总空间</span>
          </div>
          <div class="allnum">5000G</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/zhan.png" alt />
            <span>占用空间</span>
          </div>
          <div class="allnum">1000.1G</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/sheng.png" alt />
            <span>剩余空间</span>
          </div>
          <div class="allnum">4000G</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/liu.png" alt />
            <span>累计使用流量</span>
          </div>
          <div class="allnum">500G</div>
        </div>
      </div>
    </div>
    <div class="ipfs_title_next" v-else>
      <div class="maptitle">武汉市</div>
      <div class="ipfs_con">
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/zong.png" alt />
            <span>总节点</span>
          </div>
          <div class="allnum">59</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/jie.png" alt />
            <span>在线节点</span>
          </div>
          <div class="allnum">165</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/kong.png" alt />
            <span>总空间</span>
          </div>
          <div class="allnum">132100G</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/zhan.png" alt />
            <span>占用空间</span>
          </div>
          <div class="allnum">100200.1G</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/sheng.png" alt />
            <span>剩余空间</span>
          </div>
          <div class="allnum">156000G</div>
        </div>
        <div class="ipfs_con_tit">
          <div class="alltitle">
            <img src="../../../assets/img/liu.png" alt />
            <span>累计使用流量</span>
          </div>
          <div class="allnum">105600G</div>
        </div>
      </div>
    </div>
    <div class="select_sort">
      <span>排序：</span>
      <el-select v-model="value" placeholder="请选择排序方式">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="ipfs_box">
      <div class="ipfs_item" v-for="(item,index) in ipfsdata" :key="index" @click="godetail(item)">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <div class="yuan" v-bind:style="{background:item.bgccolor}"></div>
          <span v-bind:style="{color:item.bgccolor}">{{item.devstatus}}</span>
        </div>
        <div class="ipfs_item_img">
          <img src="../../../assets/img/binding_illustration3.png" style="width:60%;" alt />
          <p>节点：{{item.nodeid}}</p>
        </div>
        <ol>
          <li>
            <span class="ipfs_text_title">上行宽带:</span>
            <span class="ipfs_text_con">{{item.upstream}}Mb</span>
          </li>
          <li>
            <span class="ipfs_text_title">下行宽带:</span>
            <span class="ipfs_text_con">{{item.down}}Mb</span>
          </li>
          <li>
            <span class="ipfs_text_title">总容量:</span>
            <span class="ipfs_text_con">{{item.total_capacity}}G</span>
          </li>
          <li>
            <span class="ipfs_text_title">剩余容量:</span>
            <span class="ipfs_text_con">{{item.remaining}}G</span>
          </li>
        </ol>
      </div>
    </div>
    <fenye style="margin: 20px 10px 0px 0px;text-align: right;"></fenye>
  </div>
</template>

<script>
import fenye from "@/components/fenye";
export default {
  data() {
    return {
      location_name: "西南地区",
      rotate: false,
      options: [
        {
          value: "1",
          label: "可用空间从大到小"
        },
        {
          value: "2",
          label: "可用空间从小到大"
        },
        {
          value: "3",
          label: "可用带宽从高到低"
        },
        {
          value: "4",
          label: "可用带宽从抵到高"
        }
      ],
      value: "",
      ipfsdata: [
        {
          nodeid: "1231561fafqw",
          devstatus: "在线",
          bgccolor: "#5CC77D",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "离线",
          bgccolor: "#929292",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "在线",
          bgccolor: "#5CC77D",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "离线",
          bgccolor: "#929292",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "在线",
          bgccolor: "#5CC77D",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "离线",
          bgccolor: "#929292",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "在线",
          bgccolor: "#5CC77D",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "离线",
          bgccolor: "#929292",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "离线",
          bgccolor: "#929292",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        },
        {
          nodeid: "1231561fafqw",
          devstatus: "离线",
          bgccolor: "#929292",
          upstream: 152.1,
          down: 42.33,
          total_capacity: 1000,
          remaining: 270
        }
      ]
    };
  },
  components: {
    fenye
  },
  methods: {
    setmap_show() {
      this.rotate = !this.rotate;
    },
    godetail(dat) {
      console.log(dat);
      sessionStorage.setItem("serdata", JSON.stringify(dat));
      this.$router.push({
        path: "/ipfs_node_location_details"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 1920px;
  max-width: 1920px;
  height: 100%;
  background: rgb(255, 255, 255);
  margin: 30px;
  .bread_crumbs {
    width: 100%;
    padding-bottom: 37px;
    font-size: 26px;
  }
  .ipfs_title {
    padding-left: 37px;
    text-align: left;
    color: #000000;
    font-size: 26px;
  }
  .ipfs_con {
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 37px;
    justify-content: space-between;
    .ipfs_con_right {
      .setmap_btn {
        margin-right: 20px;
      }
    }
  }
  .ipfs_title_next {
    // text-align: left;
    .maptitle {
      text-align: center;
      margin-bottom: 47px;
      font-size: 22px;
      color: #000000;
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
        overflow: hidden;
        .alltitle {
          display: inline-block;
          height: 45px;
          display: flex;
          align-items: center;
          line-height: 45px;
          color: #929292;
          font-size: 18px;
          img {
            width: 10%;
            margin-right: 10px;
          }
        }
        .allnum {
          line-height: 40px;
          color: #1c1a1d;
          font-size: 44px;
        }
      }
    }
  }
  .select_sort {
    text-align: left;
    margin: 37px 0 0 37px;
  }
  .ipfs_box {
    width: 100%;
    padding: 37px;
    justify-content: center;
    display: flex;
    flex-flow: row wrap;
    .ipfs_item {
      width: 228px;
      height: 349px;
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
        border-bottom: 1px solid #eeeeee;
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
  }
}
.eema {
  width: 55px;
  color: #919191;
  line-height: 20px;
  display: inline-block;
  line-height: 30px;
}
.bluma {
  width: 55px;
  color: #919191;
  line-height: 20px;
  display: inline-block;
  line-height: 30px;
  border-bottom: #64a7fc 3px solid;
}
</style>