<template>
  <div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="10"
      layout="sizes,total, prev, pager, next, jumper"
      :total="pagesa"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      currentPage: 1 //初始页
    };
  },
  props: {
    pagesa: {
      type: Number,
      default: 0
    }
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("fathernum", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("fatherMethod", val);
    }
  }
};
</script>
<style lang="scss" scoped></style>
