<template>
<div class="content">
    <div class="top_title" style="display: flex;margin-bottom:20px;">
        <span @click="goback" style="font-size: 24px;color: #202020;"><i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
            批量管理标签</span>
    </div>
    <!-- 头部搜索 -->
    <div class="seach_bottom">
        <el-select v-model="valueStatus" placeholder="请选择">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input v-model="input1Active" placeholder="请输入渠道ID" style="width:220px;margin-left:20px;" @keyup.enter.native="onSubmitKey" maxlength="70"></el-input>

        <el-input v-model="input1" placeholder="请输入URL" style="width:220px;margin-left:20px;" @keyup.enter.native="onSubmitKey1" maxlength="70"></el-input>

        <el-button type="primary" size="mini" @click="seachuser()" style="margin-left:20px;">确定</el-button>
        <!-- <el-button plain size="mini" @click="reset()">重置</el-button> -->
    </div>
    <!-- 中间表格 -->
    <div style="background:#ffffff;margin-top:15px;padding:15px;">
        <el-table :data="tableData" border style="width: 100%;margin-top:10px;" :cell-style="rowClass" :header-cell-style="headClass">
            <el-table-column prop="domain" label="url">
                <template slot-scope="scope">
                    <div style="width: 240px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin:0 auto;">{{scope.row.domain}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="buser_id" label="渠道ID"></el-table-column>

            <el-table-column prop="label" label="主标签">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.label" placeholder="" :disabled="!scope.row.state"></el-input>
                    <!-- <el-select v-model="dynamicValidateForm.labe2" placeholder="请选择">
                        <el-option v-for="(item, index) in labelData" :key="index + item" :label="item.label" :value="item" style="width:250px;"></el-option>
                    </el-select> -->
                </template>
            </el-table-column>
            <!-- <el-table-column prop="label2" label="副标签">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.label2" placeholder="请选择" :disabled="!scope.row.state">
                        <el-option v-for="(item, index) in labelData" :key="index + item" :label="item.label" :value="item.value" style="width:250px;"></el-option>
                    </el-select>
                </template>
            </el-table-column> -->
            <el-table-column label="当前配置">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleClick(scope.$index, scope.row)">{{scope.row.state==false?"修改":"保存"}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 100%;height: auto;overflow: hidden;">
            <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>
        </div>

        <div style="margin-top:15px;text-align: center;">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onBack">取消</el-button>
        </div>

    </div>
</div>
</template>

<script>
import {
    modify_label,
    query_url,
    query_urllabel,
    getterminal,
    check_label
} from "../../servers/api";
import fenye from "@/components/fenye";

import {
    constants
} from 'zlib';
export default {
    data() {
        return {
            dynamicValidateForm: {
                labe2: ""
            },
            currentPage: 1,
            pagesize: 10,
            total_cnt: 0,
            labelData: [],
            value: "",
            value1: "",
            valueStatus: -1,
            input1: '',
            options: [{
                    value: -1,
                    label: "全部"
                }, {
                    value: 0,
                    label: "已配置"
                },
                {
                    value: 1,
                    label: "未配置"
                },
            ],
            tableData: [{
                    domain: "http://www.baidu.com",
                    label: "rjtgag",
                    label2: "1",
                    state: false
                },
                {
                    domain: "http://www.biubiubiu.com",
                    label: "krk145aeg",
                    label2: "1",
                    state: false
                },
                {
                    domain: "http://www.wangyiyun.com",
                    label: "3654451tg45e1g",
                    label2: "1",
                    state: false
                },
                {
                    domain: "http://www.souhu.com",
                    label: "1g5f4ah114g54gre",
                    label2: "2",
                    state: false
                },
                {
                    domain: "http://www.360.com",
                    label: "RQ3851G56A",
                    label2: "2",
                    state: false
                }
            ],
            input1Active: "",
            pageActive: 0,
        };
    },
    mounted() {

        this.queryUrlList()
        this.queryInfoLabel()

        //this.assembleArr()
    },
    methods: {
        //返回
        onBack() {
            this.$router.go(-1);
        },
        //搜索框780字符
        getStringWidth(val) {
            let len = 0;
            for (let i = 0; i < val.length; i++) {
                let length = val.charCodeAt(i);
                if (length >= 0 && length <= 128) {
                    len += 1;
                } else {
                    len += 2;
                }
            }
            return len;
        },
        //查询副标签
        queryInfoLabel() {
            let param = new Object()

            param.chanid = "0",
                param.page = this.pageActive
            getterminal(param).then(res => {
                console.log(res)
                if (res.status == 0)
                    res.result.cols.forEach((item, index) => {
                        let obj = {}
                        obj.value = item.id;
                        obj.label = "渠道ID（" + item.chanid + "）--" + item.name + "--" + item.type;
                        obj.chanid = item.chanid
                        // obj.label= item.id+"+"+item.chanid+"+"+item.name
                        this.labelData.push(obj);

                    });
                if (res.result.les_count == 0) {

                    return false

                } else {
                    this.pageActive++
                    this.queryInfoLabel()
                }

            }).catch(error => {
                console.log(error)

            })

        },
        //回车事件
        onSubmitKey1() {
            if (this.getStringWidth(this.input1) > 70) {
                this.$message({
                    type: "warning",
                    message: "URL搜索输入超出长度限制"
                });
                return false
            }
            this.queryUrlList()
        },
        onSubmitKey() {
            if (this.getStringWidth(this.input1Active) > 70) {
                this.$message({
                    type: "warning",
                    message: "渠道ID搜索输入超出长度限制"
                });
                return false
            }
            this.queryUrlList()
        },
        //返回
        goback() {
            this.$router.go(-1);
        },
        seachuser() {

            this.queryUrlList()

        },
        //获取页码
        handleCurrentChange(pages) {
            console.log(pages);
            this.currentPage = pages;
            this.queryUrlList()
            //this.getdata();
        },
        //获取每页数量
        handleSizeChange(pagetol) {
            console.log(pagetol);
            this.currentPage = pagetol;
            //this.getdata();
        },
        //
        //获取URL列表修改
        queryUrlList() {

            let params = new Object();
            params.page = this.currentPage - 1
            params.buser_id = this.input1Active
            params.url = this.input1
            params.state = this.valueStatus
            if (this.value1) {
                params.end_time = this.value1[1].getTime() / 1000
                params.start_time = this.value1[0].getTime() / 1000
            } else {

            }

            query_url(params)
                .then(res => {
                    console.log(res);
                    if (res.status == 0) {
                        this.total_cnt = res.data.total
                        let tempArr = []
                        let tempArr1 = []
                        tempArr = res.data.result
                        for (var i = 0; i < tempArr.length; i++) {
                            let obj = {
                                state: false,
                                domain: tempArr[i].url,
                                label2: tempArr[i].label2,
                                label: tempArr[i].label,
                                buser_id: tempArr[i].buser_id,
                                nowlabel:tempArr[i].label,
                            }
                            tempArr1.push(obj)
                        }
                        this.tableData = []
                        this.tableData = tempArr1
                        console.log(this.tableData)
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        assembleArr() {
            let tempArr = []
            let tempArr1 = []
            tempArr = JSON.parse(localStorage.getItem('tempUrlArr'))
            for (var i = 0; i < tempArr.length; i++) {
                let obj = {
                    state: false,
                    domain: tempArr[i].url,
                    label2: tempArr[i].label2,
                    label: tempArr[i].label,
                }
                tempArr1.push(obj)
            }
            this.tableData = []
            this.tableData = tempArr1

        },
        //重置
        reset() {
            this.value = "";
            this.value1 = "";
        },

        //单条修改
        handleClick(inds, row) {
            if (row.state == false) {
                this.tableData[inds].state = true;
            } else {
                if (row.label !== "") {
                    //主标签不为空时判断主标签是否重复

                    let nowparam = new Object()
                    nowparam.data_array = []
                    nowparam.data_count = 1
                    nowparam.data_array.push(row.label)
                    check_label(nowparam).then(res => {
                        console.log(res)
                        if (res.data.res_data[0][1] == true) {
                              this.tableData[inds].state = false;
                    let tempArr = []
                    let tempArr1 = []
                    tempArr[0] = row.domain
                    tempArr[1] = row.label
                    tempArr[2] = row.label2
                    tempArr1.push(tempArr)
                    let param = {
                        data_count: 1,
                        data_array: tempArr1
                    }
                    modify_label(param).then(res => {

                        console.log(res)
                        if (res.status == 0) {
                            this.$message({
                                type: "success",
                                message: "修改成功!"
                            });

                        }
                    }).catch(error => {
                        console.log(error)
                    })

                        } else {
                            this.$message({
                                message: "主标签不可重复，请重新输入",
                                type: "warning"
                            });
                        }
                    }).catch(error => {
                        console.log(error)
                    })

                } else {
                    this.tableData[inds].state = false;
                    let tempArr = []
                    let tempArr1 = []
                    tempArr[0] = row.domain
                    tempArr[1] = row.label
                    tempArr[2] = row.label2
                    tempArr1.push(tempArr)
                    let param = {
                        data_count: 1,
                        data_array: tempArr1
                    }
                    modify_label(param).then(res => {

                        console.log(res)
                        if (res.status == 0) {
                            this.$message({
                                type: "success",
                                message: "修改成功!"
                            });

                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }

            }
        },
        //批量修改
        onSubmit() {
            console.log(this.tableData)
          
            let tempArr = []
            let tempLabelArr=[]
            for (var i = 0; i < this.tableData.length; i++) {
                if(this.tableData[i].label !=this.tableData[i].nowlabel){
                     let nowArr = []
                     let nowArrLabel=[]
                nowArr[0] = this.tableData[i].domain
                nowArr[1] = this.tableData[i].label
                nowArr[2] = this.tableData[i].label2
                tempArr.push(nowArr)
                tempLabelArr.push(this.tableData[i].label)

                }
               
            }
              console.log(tempArr)
               let nowparam = new Object()
                    nowparam.data_array = []
                    nowparam.data_count =tempLabelArr.length
                    nowparam.data_array=tempLabelArr
                    check_label(nowparam).then(res => {
                        console.log(res)
                    }).catch(error=>{
                        console.log(error)

                    })
            return false
          
            let arrLength = this.tableData.length
            let param = {
                data_count: arrLength,
                data_array: tempArr
            }
            return false
            modify_label(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.$message({
                        type: "success",
                        message: "修改成功!"
                    });

                }
            }).catch(error => {
                console.log(error)
            })

            console.log(tempArr)

        },

        // 表头样式设置
        headClass() {
            return "text-align: center;background:#eef1f6;";
        },
        // 表格样式设置
        rowClass() {
            return "text-align: center;";
        }
    },
    components: {
        fenye
    },
};
</script>

<style lang="scss" scoped>
.content {
    .seach_bottom {
        text-align: left;
        background: #ffffff;
        border-radius: 10px;
        padding: 10px 15px;
        display: flex;
        justify-content: flex-start;

        span {
            width: 80px;
            display: flex;
            align-items: center;
        }

        .el-select {
            width: 150px;
        }
    }
}
</style>
