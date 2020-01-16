<template>
  <div class="demo-input-size">
    <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input1" size="mini"></el-input>
    <el-button type="primary" plain @click="setuser">主要按钮</el-button>
    <span>{{cbud}}</span>
  </div>
</template>

<script>
export default {
  name: "titleinput",
  data() {
    return {
      input1: ""
    };
  },
  props: {
    cbud: {
      type: [String, Number],
      default: ""
    }
  },

  mounted() {},
  methods: {
    setuser() {
      console.log(this.input1);
      this.$emit("getMessage", this.input1);
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-input-size {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>