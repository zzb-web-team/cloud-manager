<template>
<el-table border stripe :data="tableData" ref="table" style="width: 100%" @selection-change="handleSelectionChange" @sort-change='tableSortChange' @select="selectCheckBox" @select-all="selectAll" id="rebateSetTable">
    <el-table-column type="selection" width="55" v-if="clomnSelection"  :selectable="checkboxT"> </el-table-column>
    <el-table-column v-for="(item,index) in rowHeader" :sortable="item.sortable" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
    </el-table-column>
    <el-table-column :label="tableOption.label" :width="tableOption.width">
        <template slot-scope="scope">
            <el-button type="text" @click="toDetails(scope.row)" size="mini">详情</el-button>
            <el-button type="text" @click="toChange(scope.row)" size="mini">修改</el-button>
            <el-button type="text" @click="changePassword(scope.row)" size="mini">重置密码</el-button>
            <!-- <el-button @click="disable(scope.row)" size="mini">{{ scope.row.status}}</el-button> -->
            <el-button type="text" @click="disable(scope.row)" :disabled="scope.row.id == uid || scope.row.id == 1"  size="mini">{{ scope.row.status=='启用'?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="toDelete(scope.row)" size="mini">删除</el-button>

        </template>
    </el-table-column>
</el-table>
</template>

<script>
import VueCookies from "vue-cookies";

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
            default: () => {

            }
        },
        reserveselection: {
            type: Boolean,
            default: () => {

            }
        },
    },
    data() {
        return {
            uid:""
        };
    },
    mounted: function () {
        this.uid = VueCookies.get("adminid");

    },
    methods: {
        checkboxT(row, rowIndex) {
      if (row.id == this.uid || row.id == 1) {
        //if(row.lie =='1'){
        return false; //禁用
      } else {
        return true; //不禁用
      }
    },
      toDetails(val) {
            this.$emit('toDetails', val)
        },

        toDetails(val) {
            this.$emit('toDetails', val)
        },
        tableSortChange(val) {
            this.$emit('tableSortChange', val)
        },
        clearSelection() {
            this.$refs.table.clearSelection();
        },
        toggleRowSelection(a, b) {
            this.$refs.table.toggleRowSelection(a, b);
        },

        disable(val) {
            this.$emit('disable', val)
        },
        toChange(val) {
            this.$emit('toChange', val)
        },
        changePassword(val) {
            this.$emit('changePassword', val)
        },

        toDelete(val) {
            this.$emit('toDelete', val)
        },

        handleSelectionChange(val) {
            //  this.multipleSelection = val;
            this.$emit('handleSelectionChange', val)
        },
        selectCheckBox(a, b) {
            //  this.multipleSelection = val;
            this.$emit('selectCheckBox', {
                a,
                b
            })
        },
        selectAll(a) {
            //  this.multipleSelection = val;
            this.$emit('selectAll', a)
        }
    }
};
</script>

<style lang="less">
.el-table {
    font-size: 12px;
}

.el-table th.gutter {
    display: table-cell !important;
}
</style>
