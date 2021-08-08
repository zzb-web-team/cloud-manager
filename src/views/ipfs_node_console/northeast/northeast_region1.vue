<template>
  <div class="content">
    <!-- 面包屑  -->
    <div class="bread_crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>IPFS节点控制台</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>东北地区</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>IPFS节点网络分布</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 标题 -->
    <div class="ipfs_title">{{location_name}}</div>
    <div class="ipfs_con">
      <div class="ipfs_con_left">区域节点分布</div>
      <div class="ipfs_con_right">
        <span :class="[rotate?'eema':'bluma']" @click="setmap_show()" class="setmap_btn">A区</span>
        <span :class="[rotate?'bluma':'eema']" @click="setmap_show()">B区</span>
      </div>
    </div>
    <div class="ipfs_title_next" v-if="rotate==false">
      <div class="maptitle">北京市</div>
      <remap></remap>
    </div>
    <div class="ipfs_title_next" v-else>
      <div class="maptitle">武汉市</div>
      <demo2></demo2>
    </div>
  </div>
</template>

<script>
import remap from "../../../components/thermal_map";
import demo2 from "../../../components/demo2";
export default {
  data() {
    return {
      location_name: "东北地区",
      rotate: false
    };
  },
  components: {
    remap,
    demo2
  },
  methods: {
    setmap_show() {
      this.rotate = !this.rotate;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
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
    // width: 100%;

    padding-left: 126px;
    padding-right: 126px;
    padding-bottom: 126px;
    text-align: left;
    .maptitle {
      text-align: center;
      margin-bottom: 47px;
      font-size: 22px;
      color: #000000;
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