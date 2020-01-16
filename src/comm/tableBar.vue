<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    border
    height="450"
    :cell-style="rowClass"
    :header-cell-style="headClass"
  >
    <el-table-column type="selection" width="55" v-if="clomnSelection"></el-table-column>
    <el-table-column
      v-for="(item,index) in rowHeader"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    ></el-table-column>
    <el-table-column :label="tableOption.label" :width="tableOption.width" v-if="operatingStatus">
      <template slot-scope="scope">
        <a
          style="color:#6699ff;cursor: pointer;"
          size="mini"
          v-for="(item,index) in tableOption.options"
          :key="index"
          :type="item.type"
          @click="handleButton(item.methods,scope.row)"
        >{{item.label}}</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    rowHeader: {
      type: Array,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => {}
    },
    tableOption: {
      type: Object,
      default: () => {}
    },
    clomnSelection: {
      type: Boolean,
      default: () => {}
    },
    operatingStatus: {
      type: Boolean,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  mounted: function() {},
  methods: {
    formatter: function() {
      let ar = "1";
      return ar;
    },
    handleButton(methods, row) {
      this.$emit("handleButton", {
        methods: methods,
        row: row
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
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

<style lang="scss">
.el-table {
  font-size: 12px;
}
.el-table th.gutter {
  display: table-cell !important;
}
</style>
